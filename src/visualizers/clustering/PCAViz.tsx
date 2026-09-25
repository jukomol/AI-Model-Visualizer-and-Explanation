import { useEffect, useMemo, useState } from 'react'
import { ControlGroup, LabeledSlider, Segmented, StatTile, ToggleRow } from '@/components/viz/Controls'
import { ClassLegend, ClassMarker, Plot2D } from '@/components/viz/Plot2D'
import { VizFrame } from '@/components/viz/VizFrame'
import { CATEGORICAL } from '@/lib/colormap'
import { pca, project, projectedVariance } from '@/lib/pca'
import { createRng } from '@/lib/random'
import { fmt, pct } from '@/lib/utils'
import { useChallengeReporter } from '@/hooks/useChallenge'
import { useDataset, type TableFile } from '@/hooks/useDataset'
import { useThemeMode } from '@/hooks/useThemeMode'

function ToyPCA() {
  const mode = useThemeMode()
  const report = useChallengeReporter()
  const [angleDeg, setAngleDeg] = useState(90)
  const [corr, setCorr] = useState(0.8)
  const [reveal, setReveal] = useState(false)
  const data = useMemo(() => {
    const rng = createRng(12)
    return Array.from({ length: 160 }, () => {
      const a = rng.normal(0, 0.38)
      const b = rng.normal(0, 0.38)
      return [a, corr * a + Math.sqrt(1 - corr * corr) * b * 0.55]
    })
  }, [corr])
  const result = useMemo(() => pca(data), [data])
  const theta = (angleDeg * Math.PI) / 180
  const u = [Math.cos(theta), Math.sin(theta)]
  const captured = projectedVariance(data, u)
  const ratio = captured / result.variances[0]
  useEffect(() => report('pca-variance-ratio', ratio), [ratio, report])
  const [mx, my] = result.mean
  const colors = CATEGORICAL[mode]
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_17rem]">
      <div className="space-y-3">
        <Plot2D domain={{ xMin: -1.2, xMax: 1.2, yMin: -1.2, yMax: 1.2 }} maxHeight={430} ariaLabel="Scatter plot with a projection axis and projected points">
          {(s) => {
            const proj = data.map((p) => {
              const t = (p[0] - mx) * u[0] + (p[1] - my) * u[1]
              return [mx + t * u[0], my + t * u[1]]
            })
            return (
              <>
                <line x1={s.sx(mx - 1.6 * u[0])} y1={s.sy(my - 1.6 * u[1])} x2={s.sx(mx + 1.6 * u[0])} y2={s.sy(my + 1.6 * u[1])} stroke={colors[1]} strokeWidth={2} />
                {data.map((p, i) => (
                  <line key={`r${i}`} x1={s.sx(p[0])} y1={s.sy(p[1])} x2={s.sx(proj[i][0])} y2={s.sy(proj[i][1])} className="stroke-muted-foreground" strokeWidth={1} strokeOpacity={0.35} />
                ))}
                {data.map((p, i) => (
                  <circle key={i} cx={s.sx(p[0])} cy={s.sy(p[1])} r={3.5} fill={colors[0]} stroke="var(--viz-surface)" strokeWidth={1.5} />
                ))}
                {proj.map((p, i) => (
                  <circle key={`p${i}`} cx={s.sx(p[0])} cy={s.sy(p[1])} r={2.5} fill={colors[1]} />
                ))}
                {reveal &&
                  result.components.map((c, k) => {
                    const L = 2 * Math.sqrt(result.variances[k])
                    return (
                      <g key={k}>
                        <line x1={s.sx(mx)} y1={s.sy(my)} x2={s.sx(mx + c[0] * L)} y2={s.sy(my + c[1] * L)} className="stroke-foreground" strokeWidth={2.5} />
                        <text x={s.sx(mx + c[0] * L) + 6} y={s.sy(my + c[1] * L)} className="fill-foreground text-xs font-semibold">
                          PC{k + 1}
                        </text>
                      </g>
                    )
                  })}
              </>
            )
          }}
        </Plot2D>
        <div className="grid grid-cols-3 gap-2">
          <StatTile label="Variance on your axis" value={fmt(captured, 4)} />
          <StatTile label="PC1 variance λ₁" value={fmt(result.variances[0], 4)} />
          <StatTile label="Share of λ₁ captured" value={pct(ratio)} tone={ratio >= 0.99 ? 'good' : undefined} />
        </div>
      </div>
      <div className="space-y-4">
        <ControlGroup title="Projection axis">
          <LabeledSlider label="Angle θ" value={angleDeg} min={0} max={180} step={0.5} onChange={setAngleDeg} format={(v) => `${v.toFixed(1)}°`} />
          <ToggleRow label="Reveal principal components" checked={reveal} onChange={setReveal} hint="Arrows have length 2√λ (two standard deviations)." />
        </ControlGroup>
        <ControlGroup title="Data">
          <LabeledSlider label="Correlation" value={corr} min={-0.95} max={0.95} step={0.05} onChange={setCorr} format={(v) => v.toFixed(2)} />
          <p className="text-xs text-muted-foreground">
            Explained variance: PC1 {pct(result.explainedVarianceRatio[0])}, PC2 {pct(result.explainedVarianceRatio[1])}.
          </p>
        </ControlGroup>
      </div>
    </div>
  )
}

function IrisPCA() {
  const mode = useThemeMode()
  const { data, error } = useDataset<TableFile>('iris')
  const species = useMemo(() => Array.from(new Set(data?.rows.map((r) => r[4] as string) ?? [])), [data])
  const X = useMemo(() => data?.rows.map((r) => r.slice(0, 4) as number[]) ?? [], [data])
  const result = useMemo(() => (X.length ? pca(X) : null), [X])
  const Z = useMemo(() => (result ? project(X, result, 2) : []), [X, result])
  if (error) return <p className="text-destructive">{error}</p>
  if (!result || !data) return <p className="text-muted-foreground">Loading Iris…</p>
  const colors = CATEGORICAL[mode]
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_17rem]">
      <div className="space-y-2">
        <Plot2D domain={{ xMin: -4.5, xMax: 4.5, yMin: -1.6, yMax: 1.6 }} aspect={0.55} ariaLabel="Iris flowers projected onto the first two principal components" gridStep={1}>
          {(s) => Z.map((z, i) => <ClassMarker key={i} x={s.sx(z[0])} y={s.sy(z[1])} cls={species.indexOf(data.rows[i][4] as string)} r={4} />)}
        </Plot2D>
        <ClassLegend labels={species} />
        <p className="text-xs text-muted-foreground">
          150 flowers × 4 measurements (cm) projected onto PC1 (x) and PC2 (y). The species separate along PC1 even though PCA never saw the labels.
        </p>
      </div>
      <div className="space-y-3">
        <p className="text-sm font-medium">Explained variance (scree)</p>
        <ul className="space-y-1.5">
          {result.explainedVarianceRatio.map((r, k) => (
            <li key={k} className="flex items-center gap-2 text-xs">
              <span className="w-9 font-mono">PC{k + 1}</span>
              <span className="h-3 flex-1 rounded-sm bg-muted">
                <span className="block h-full rounded-sm" style={{ width: `${r * 100}%`, background: colors[0] }} />
              </span>
              <span className="tabular w-12 text-right font-mono">{pct(r)}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm font-medium">PC1 loadings</p>
        <ul className="space-y-0.5 font-mono text-xs text-muted-foreground">
          {data.columns.slice(0, 4).map((c, j) => (
            <li key={c}>
              {c.padEnd(13, ' ')} {fmt(result.components[0][j], 3)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function PCAViz() {
  const [tab, setTab] = useState<'toy' | 'iris'>('toy')
  const iris = useDataset<TableFile>('iris')
  return (
    <VizFrame
      title="Principal Component Analysis"
      description="PCA finds the directions of maximum variance. Rotate the orange axis by hand and watch the projected points (orange dots) spread out. The variance along the axis peaks exactly at the first principal component."
      footer={tab === 'iris' ? iris.data?.citation : undefined}
    >
      <div className="space-y-4">
        <Segmented
          value={tab}
          onChange={setTab}
          options={[
            { value: 'toy', label: '2-D: find PC1 by hand' },
            { value: 'iris', label: 'Iris: 4-D → 2-D' },
          ]}
          className="max-w-sm"
        />
        {tab === 'toy' ? <ToyPCA /> : <IrisPCA />}
      </div>
    </VizFrame>
  )
}
