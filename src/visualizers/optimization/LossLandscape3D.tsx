import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { NativeSelect } from '@/components/ui/select'
import { ControlGroup, LabeledSlider, PlayControls, Segmented } from '@/components/viz/Controls'
import { ErrorBoundary } from '@/components/viz/ErrorBoundary'
import { Plot2D, type PlotScales } from '@/components/viz/Plot2D'
import { VizFrame } from '@/components/viz/VizFrame'
import { CATEGORICAL, sequential } from '@/lib/colormap'
import { SURFACES } from '@/lib/lossSurfaces'
import { DEFAULT_OPTIMIZER_CONFIGS, OPTIMIZER_LABELS, runOptimizer, type OptimizerId } from '@/lib/optimizers'
import { cn, fmt } from '@/lib/utils'
import { useChallengeReporter } from '@/hooks/useChallenge'
import { usePlayback } from '@/hooks/usePlayback'
import { useThemeMode } from '@/hooks/useThemeMode'

const LandscapeScene = lazy(() => import('./LandscapeScene'))

const OPTIMIZERS: Exclude<OptimizerId, 'adamw'>[] = ['sgd', 'momentum', 'nesterov', 'adagrad', 'rmsprop', 'adam']
/** Colour follows the optimiser, never its rank in the list. */
const SLOT: Record<OptimizerId, number> = { sgd: 0, momentum: 1, nesterov: 2, adagrad: 3, rmsprop: 4, adam: 6, adamw: 7 }

const DEFAULT_LR: Record<string, Record<Exclude<OptimizerId, 'adamw'>, number>> = {
  bowl: { sgd: 0.1, momentum: 0.03, nesterov: 0.03, adagrad: 0.5, rmsprop: 0.05, adam: 0.1 },
  rosenbrock: { sgd: 0.001, momentum: 0.0005, nesterov: 0.0005, adagrad: 0.1, rmsprop: 0.005, adam: 0.02 },
  himmelblau: { sgd: 0.01, momentum: 0.003, nesterov: 0.003, adagrad: 0.5, rmsprop: 0.05, adam: 0.1 },
  saddle: { sgd: 0.05, momentum: 0.03, nesterov: 0.03, adagrad: 0.3, rmsprop: 0.02, adam: 0.05 },
}

export interface LossLandscape3DProps {
  surface?: keyof typeof SURFACES
}

export default function LossLandscape3D({ surface: initialSurface = 'rosenbrock' }: LossLandscape3DProps) {
  const mode = useThemeMode()
  const report = useChallengeReporter()
  const [surfaceId, setSurfaceId] = useState<string>(initialSurface)
  const surface = SURFACES[surfaceId]
  const [enabled, setEnabled] = useState<Set<Exclude<OptimizerId, 'adamw'>>>(new Set(['sgd', 'momentum', 'adam']))
  const [lrs, setLrs] = useState<Record<Exclude<OptimizerId, 'adamw'>, number>>(DEFAULT_LR[initialSurface])
  const [beta, setBeta] = useState(0.9)
  const [steps, setSteps] = useState(300)
  const [start, setStart] = useState<[number, number]>(surface.start)
  const [view, setView] = useState<'3d' | '2d'>('3d')

  const trajectories = useMemo(
    () =>
      OPTIMIZERS.filter((o) => enabled.has(o)).map((id) => {
        const cfg = { ...DEFAULT_OPTIMIZER_CONFIGS[id], learningRate: lrs[id], beta1: beta }
        return { id, traj: runOptimizer(surface, cfg, steps, start) }
      }),
    [enabled, lrs, beta, steps, start, surface],
  )
  const { frame, running, toggle, reset, toEnd, setFrame } = usePlayback(steps + 1, 60)
  useEffect(() => toEnd(), [trajectories, toEnd])

  const bestAt = (t: (typeof trajectories)[number]) => Math.min(...t.traj.points.slice(0, frame + 1).map((p) => p.loss))
  useEffect(() => {
    if (surfaceId !== 'rosenbrock' || trajectories.length === 0) return
    report('gd-rosenbrock-loss', Math.min(...trajectories.map(bestAt)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frame, trajectories, surfaceId, report])

  const contour = (ctx: CanvasRenderingContext2D, s: PlotScales) => {
    const res = 100
    const d = surface.domain
    const vals = new Float32Array(res * res)
    let lo = Infinity
    let hi = -Infinity
    for (let r = 0; r < res; r++) {
      for (let c = 0; c < res; c++) {
        const v = surface.display(surface.f(d.xMin + ((c + 0.5) / res) * (d.xMax - d.xMin), d.yMax - ((r + 0.5) / res) * (d.yMax - d.yMin)))
        vals[r * res + c] = v
        lo = Math.min(lo, v)
        hi = Math.max(hi, v)
      }
    }
    const img = ctx.createImageData(res, res)
    vals.forEach((v, i) => {
      const t = (v - lo) / (hi - lo || 1)
      const level = Math.floor((1 - t) * 14) / 14
      const [r, g, b] = sequential(0.08 + level * 0.8, mode)
      img.data.set([r, g, b, 255], i * 4)
    })
    const off = document.createElement('canvas')
    off.width = res
    off.height = res
    off.getContext('2d')!.putImageData(img, 0, 0)
    ctx.drawImage(off, 0, 0, s.width, s.height)
  }

  const changeSurface = (id: string) => {
    setSurfaceId(id)
    setLrs(DEFAULT_LR[id])
    setStart(SURFACES[id].start)
  }

  const colors = CATEGORICAL[mode]
  const paths = trajectories.map((t) => ({ id: t.id, color: colors[SLOT[t.id]], points: t.traj.points }))
  const d = surface.domain

  return (
    <VizFrame
      title="Loss landscapes & optimisers"
      description={surface.description}
      controls={
        <>
          <ControlGroup title="Surface">
            <NativeSelect aria-label="Loss surface" value={surfaceId} onChange={(e) => changeSurface(e.target.value)}>
              {Object.values(SURFACES).map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </NativeSelect>
            <p className="text-xs text-muted-foreground">
              Start ({fmt(start[0], 2)}, {fmt(start[1], 2)}): click the contour map to move it.
            </p>
          </ControlGroup>
          <ControlGroup title="Optimisers">
            {OPTIMIZERS.map((o) => (
              <div key={o} className="space-y-1">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <input
                    type="checkbox"
                    checked={enabled.has(o)}
                    onChange={(e) => {
                      const next = new Set(enabled)
                      if (e.target.checked) next.add(o)
                      else next.delete(o)
                      setEnabled(next)
                    }}
                    className="accent-[var(--primary)]"
                  />
                  <span className="inline-block h-0.5 w-4 rounded" style={{ background: colors[SLOT[o]] }} aria-hidden />
                  {OPTIMIZER_LABELS[o]}
                </label>
                {enabled.has(o) && (
                  <LabeledSlider label="η" value={lrs[o]} min={0.00005} max={0.5} step={0.0001} log onChange={(v) => setLrs({ ...lrs, [o]: v })} format={(v) => v.toPrecision(2)} />
                )}
              </div>
            ))}
            <LabeledSlider label="β (momentum / Adam β₁)" value={beta} min={0} max={0.99} step={0.01} onChange={setBeta} format={(v) => v.toFixed(2)} />
            <LabeledSlider label="Step budget" value={steps} min={10} max={1000} step={10} onChange={setSteps} />
            <PlayControls running={running} onToggle={toggle} onReset={reset} playLabel="Animate" />
          </ControlGroup>
        </>
      }
    >
      <div className="space-y-3">
        <Segmented
          value={view}
          onChange={setView}
          options={[
            { value: '3d', label: '3-D surface' },
            { value: '2d', label: 'Contour map' },
          ]}
          className="max-w-xs"
        />
        <div className={cn('h-[380px] overflow-hidden rounded-lg border', view !== '3d' && 'hidden')}>
          {view === '3d' && (
            <ErrorBoundary name="3-D loss surface">
              <Suspense fallback={<div className="flex h-full items-center justify-center text-sm text-muted-foreground">Loading 3-D engine…</div>}>
                <LandscapeScene surface={surface} paths={paths} frame={frame} mode={mode} />
              </Suspense>
            </ErrorBoundary>
          )}
        </div>
        {view === '2d' && (
          <Plot2D
            domain={d}
            aspect={Math.min(1, (d.yMax - d.yMin) / (d.xMax - d.xMin))}
            maxHeight={420}
            ariaLabel="Contour map of the loss with optimiser trajectories; click to set the start point"
            background={contour}
            backgroundKey={`${surfaceId}-${mode}`}
            onPointerDown={([x, y]) => setStart([x, y])}
          >
            {(s) => (
              <>
                {paths.map((p) => {
                  const pts = p.points.slice(0, frame + 1)
                  const head = pts[pts.length - 1]
                  return (
                    <g key={p.id}>
                      <polyline points={pts.map((q) => `${s.sx(q.x)},${s.sy(q.y)}`).join(' ')} fill="none" stroke={p.color} strokeWidth={2} strokeLinejoin="round" />
                      {head && <circle cx={s.sx(head.x)} cy={s.sy(head.y)} r={5} fill={p.color} stroke="var(--viz-surface)" strokeWidth={2} />}
                    </g>
                  )
                })}
                {surface.minima.map(([x, y], i) => (
                  <path key={i} d={`M${s.sx(x) - 5},${s.sy(y)} L${s.sx(x) + 5},${s.sy(y)} M${s.sx(x)},${s.sy(y) - 5} L${s.sx(x)},${s.sy(y) + 5}`} className="stroke-foreground" strokeWidth={2} />
                ))}
              </>
            )}
          </Plot2D>
        )}
        <label className="flex items-center gap-3 text-sm">
          <span className="w-20 text-muted-foreground">Step {frame}</span>
          <input type="range" min={0} max={steps} value={frame} onChange={(e) => setFrame(Number(e.target.value))} className="flex-1 accent-[var(--primary)]" aria-label="Optimisation step" />
        </label>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-xs text-muted-foreground">
                <th className="py-1.5 pr-3 font-medium">Optimiser</th>
                <th className="py-1.5 pr-3 font-medium">η</th>
                <th className="py-1.5 pr-3 font-medium">Loss at step {frame}</th>
                <th className="py-1.5 pr-3 font-medium">Best so far</th>
                <th className="py-1.5 font-medium">Position</th>
              </tr>
            </thead>
            <tbody className="tabular">
              {trajectories.map((t) => {
                const p = t.traj.points[Math.min(frame, t.traj.points.length - 1)]
                return (
                  <tr key={t.id} className="border-b border-border/60">
                    <td className="py-1.5 pr-3">
                      <span className="mr-2 inline-block h-0.5 w-4 rounded align-middle" style={{ background: colors[SLOT[t.id]] }} aria-hidden />
                      {OPTIMIZER_LABELS[t.id]}
                    </td>
                    <td className="py-1.5 pr-3 font-mono">{lrs[t.id].toPrecision(2)}</td>
                    <td className="py-1.5 pr-3 font-mono">{t.traj.diverged && frame >= t.traj.points.length - 1 ? 'diverged' : fmt(p.loss, 4)}</td>
                    <td className="py-1.5 pr-3 font-mono">{fmt(bestAt(t), 4)}</td>
                    <td className="py-1.5 font-mono">
                      ({fmt(p.x, 3)}, {fmt(p.y, 3)})
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </VizFrame>
  )
}
