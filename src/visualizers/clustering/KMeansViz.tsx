import { useEffect, useMemo, useState } from 'react'
import { NativeSelect } from '@/components/ui/select'
import { ControlGroup, LabeledSlider, PlayControls, Segmented, StatTile } from '@/components/viz/Controls'
import { LineChart } from '@/components/viz/LineChart'
import { Plot2D } from '@/components/viz/Plot2D'
import { VizFrame } from '@/components/viz/VizFrame'
import { CATEGORICAL } from '@/lib/colormap'
import { initCentroids, kMeans, silhouetteScore, voronoiCells, type KMeansInit, type Point } from '@/lib/clustering'
import { generatePreset } from '@/lib/datasets2d'
import { createRng } from '@/lib/random'
import { fmt } from '@/lib/utils'
import { useChallengeReporter } from '@/hooks/useChallenge'
import { useDataset, type TableFile } from '@/hooks/useDataset'
import { usePlayback } from '@/hooks/usePlayback'
import { useThemeMode } from '@/hooks/useThemeMode'

type Source = 'blobs' | 'moons' | 'circles' | 'faithful'
const DOMAIN = { xMin: -1, xMax: 1, yMin: -1, yMax: 1 }

export default function KMeansViz({ source: initialSource = 'blobs' }: { source?: Source }) {
  const mode = useThemeMode()
  const report = useChallengeReporter()
  const faithful = useDataset<TableFile>('old-faithful')
  const [source, setSource] = useState<Source>(initialSource)
  const [k, setK] = useState(3)
  const [init, setInit] = useState<KMeansInit>('random')
  const [seed, setSeed] = useState(4)

  const points = useMemo<number[][]>(() => {
    if (source === 'faithful') {
      const rows = faithful.data?.rows ?? []
      if (rows.length === 0) return []
      // Min–max scale both columns into [−0.9, 0.9] so distances weigh them equally.
      const cols = [0, 1].map((j) => rows.map((r) => r[j] as number))
      const lo = cols.map((c) => Math.min(...c))
      const hi = cols.map((c) => Math.max(...c))
      return rows.map((r) => [0, 1].map((j) => -0.9 + (1.8 * ((r[j] as number) - lo[j])) / (hi[j] - lo[j])))
    }
    return generatePreset(source, createRng(1)).map((p) => [p.x, p.y])
  }, [source, faithful.data])

  const run = useMemo(() => (points.length ? kMeans(points, initCentroids(points, k, createRng(seed), init)) : null), [points, k, init, seed])
  const history = run?.history ?? []
  // Frames alternate: 2i = assignment shown with centroids i, 2i+1 = centroids moved.
  const { frame, running, toggle, reset, setFrame } = usePlayback(history.length, 2)
  useEffect(() => reset(), [run, reset])
  const it = history[Math.min(frame, history.length - 1)]
  const converged = run?.converged && frame >= history.length - 1
  const silhouette = useMemo(() => (it && converged ? silhouetteScore(points, it.assignments) : null), [it, converged, points])

  useEffect(() => {
    if (silhouette !== null && source === 'blobs') report('kmeans-silhouette-blobs', silhouette)
  }, [silhouette, source, report])

  const cells = useMemo(() => (it ? voronoiCells(it.centroids as Point[], { xMin: -1, xMax: 1, yMin: -1, yMax: 1 }) : []), [it])
  const colors = CATEGORICAL[mode]
  const trail = history.slice(0, frame + 1)

  return (
    <VizFrame
      title="K-Means (Lloyd's algorithm)"
      description="Each iteration assigns every point to its nearest centroid, which is exactly the Voronoi cell shaded around it, then moves each centroid to the mean of its points. Inertia never increases, but the local optimum it reaches depends on the initialisation."
      controls={
        <>
          <ControlGroup title="Data">
            <NativeSelect aria-label="Dataset" value={source} onChange={(e) => setSource(e.target.value as Source)}>
              <option value="blobs">Four clusters (synthetic)</option>
              <option value="moons">Two moons (synthetic)</option>
              <option value="circles">Concentric circles (synthetic)</option>
              <option value="faithful">Old Faithful eruptions (real)</option>
            </NativeSelect>
          </ControlGroup>
          <ControlGroup title="Algorithm">
            <LabeledSlider label="k (clusters)" value={k} min={1} max={8} step={1} onChange={setK} />
            <Segmented
              label="Initialisation"
              value={init}
              onChange={setInit}
              options={[
                { value: 'random', label: 'Random points' },
                { value: 'kmeans++', label: 'k-means++' },
              ]}
            />
            <button className="text-xs text-primary underline" onClick={() => setSeed((s) => s + 1)}>
              Re-initialise (new seed)
            </button>
            <PlayControls running={running} onToggle={toggle} onStep={() => setFrame(frame + 1)} onReset={reset} playLabel="Iterate" />
          </ControlGroup>
        </>
      }
      footer={source === 'faithful' ? faithful.data?.citation : 'Synthetic data generated in-browser from a fixed seed.'}
    >
      <div className="space-y-3">
        <Plot2D domain={DOMAIN} maxHeight={440} ariaLabel="Data points coloured by cluster with Voronoi cells and centroids">
          {(s) =>
            it && (
              <>
                {cells.map((cell, c) =>
                  cell.length > 2 ? (
                    <polygon key={c} points={cell.map(([x, y]) => `${s.sx(x)},${s.sy(y)}`).join(' ')} fill={colors[c % 8]} fillOpacity={0.1} stroke="var(--viz-axis)" strokeWidth={1} />
                  ) : null,
                )}
                {points.map((p, i) => (
                  <circle key={i} cx={s.sx(p[0])} cy={s.sy(p[1])} r={3.5} fill={colors[it.assignments[i] % 8]} stroke="var(--viz-surface)" strokeWidth={1.5} />
                ))}
                {it.centroids.map((_, c) => (
                  <polyline key={`t${c}`} points={trail.map((h) => `${s.sx(h.centroids[c][0])},${s.sy(h.centroids[c][1])}`).join(' ')} fill="none" className="stroke-foreground" strokeWidth={1.5} strokeOpacity={0.6} />
                ))}
                {it.centroids.map((c, j) => (
                  <g key={`c${j}`} transform={`translate(${s.sx(c[0])},${s.sy(c[1])})`}>
                    <circle r={9} fill={colors[j % 8]} stroke="var(--viz-surface)" strokeWidth={2.5} />
                    <path d="M-4,-4 L4,4 M-4,4 L4,-4" stroke="var(--viz-surface)" strokeWidth={2} />
                  </g>
                ))}
              </>
            )
          }
        </Plot2D>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <StatTile label="Iteration" value={`${frame} / ${Math.max(0, history.length - 1)}`} />
          <StatTile label="Inertia (WCSS)" value={it ? fmt(it.inertia, 3) : '—'} />
          <StatTile label="Silhouette" value={silhouette === null ? (converged ? '—' : 'run to convergence') : fmt(silhouette, 3)} />
          <StatTile label="Status" value={converged ? 'converged' : 'iterating'} tone={converged ? 'good' : undefined} />
        </div>
        {history.length > 1 && (
          <LineChart ariaLabel="Inertia per iteration" data={trail.map((h, i) => ({ iteration: i, inertia: h.inertia }))} xKey="iteration" xLabel="iteration" series={[{ key: 'inertia', label: 'Inertia' }]} height={140} />
        )}
      </div>
    </VizFrame>
  )
}
