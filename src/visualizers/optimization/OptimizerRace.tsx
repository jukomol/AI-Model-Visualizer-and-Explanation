import { Flag } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { NativeSelect } from '@/components/ui/select'
import { Tex } from '@/components/math/Tex'
import { ControlGroup, LabeledSlider, Segmented } from '@/components/viz/Controls'
import { LineChart } from '@/components/viz/LineChart'
import { ClassMarker, Plot2D, type PlotScales } from '@/components/viz/Plot2D'
import { paintField, hexToRgb } from '@/components/viz/paintField'
import { VizFrame } from '@/components/viz/VizFrame'
import { CATEGORICAL, CLASS_COLORS } from '@/lib/colormap'
import { generatePreset, PRESET_LABELS, type DatasetPreset } from '@/lib/datasets2d'
import { forward } from '@/lib/neural'
import { runRace, type RaceResult } from '@/lib/optimizerRace'
import { DEFAULT_OPTIMIZER_CONFIGS, OPTIMIZER_LABELS, type OptimizerId } from '@/lib/optimizers'
import { createRng } from '@/lib/random'
import { SCHEDULE_FORMULAS, SCHEDULE_LABELS, scheduleMultiplier, type ScheduleId } from '@/lib/schedules'
import { cn, fmt, pct } from '@/lib/utils'
import { useChallengeReporter } from '@/hooks/useChallenge'
import { useThemeMode } from '@/hooks/useThemeMode'

const IDS: OptimizerId[] = ['sgd', 'momentum', 'nesterov', 'adagrad', 'rmsprop', 'adam', 'adamw']
const SLOT: Record<OptimizerId, number> = { sgd: 0, momentum: 1, nesterov: 2, adagrad: 3, rmsprop: 4, adam: 6, adamw: 7 }
const DEFAULT_LR: Record<OptimizerId, number> = { sgd: 0.05, momentum: 0.05, nesterov: 0.05, adagrad: 0.2, rmsprop: 0.01, adam: 0.02, adamw: 0.02 }
const DOMAIN = { xMin: -1, xMax: 1, yMin: -1, yMax: 1 }

interface Settings {
  preset: DatasetPreset
  hidden: number
  steps: number
  batch: number
  schedule: ScheduleId
  enabled: OptimizerId[]
  lrs: Record<OptimizerId, number>
}

function Boundary({ result, points }: { result: RaceResult; points: ReturnType<typeof generatePreset> }) {
  const mode = useThemeMode()
  const [c0, c1] = CLASS_COLORS[mode].map(hexToRgb)
  const bg = (ctx: CanvasRenderingContext2D, s: PlotScales) =>
    paintField(ctx, s, DOMAIN, 44, (x, y) => {
      const p = forward(result.params, [x, y]).output
      const c = p >= 0.5 ? c1 : c0
      return [c[0], c[1], c[2], Math.round(20 + 90 * Math.abs(p - 0.5) * 2)]
    })
  return (
    <Plot2D domain={DOMAIN} ariaLabel={`Decision regions learned with ${OPTIMIZER_LABELS[result.id as OptimizerId]}`} background={bg} backgroundKey={`${result.id}-${result.losses.length}-${mode}`} showAxes={false}>
      {(s) => points.map((p, i) => <ClassMarker key={i} x={s.sx(p.x)} y={s.sy(p.y)} cls={p.label} r={2.5} ring={false} />)}
    </Plot2D>
  )
}

export default function OptimizerRace() {
  const mode = useThemeMode()
  const report = useChallengeReporter()
  const [draft, setDraft] = useState<Settings>({
    preset: 'moons',
    hidden: 8,
    steps: 300,
    batch: 0,
    schedule: 'constant',
    enabled: ['sgd', 'momentum', 'rmsprop', 'adam'],
    lrs: DEFAULT_LR,
  })
  const [settings, setSettings] = useState<Settings>(draft)
  const dirty = JSON.stringify(draft) !== JSON.stringify(settings)
  const points = useMemo(() => generatePreset(settings.preset, createRng(1)), [settings.preset])
  const results = useMemo(
    () =>
      runRace(
        points,
        settings.enabled.map((id) => ({ ...DEFAULT_OPTIMIZER_CONFIGS[id], learningRate: settings.lrs[id] })),
        { steps: settings.steps, hidden: [settings.hidden], batchSize: settings.batch, schedule: settings.schedule, seed: 3 },
      ),
    [points, settings],
  )
  useEffect(() => {
    const sgd = results.find((r) => r.id === 'sgd')
    if (sgd && settings.preset === 'moons' && settings.steps <= 400) report('race-sgd-loss', sgd.diverged ? Infinity : sgd.losses[sgd.losses.length - 1])
  }, [results, settings, report])

  const chartData = useMemo(() => {
    const every = Math.max(1, Math.floor(settings.steps / 200))
    const rows: Record<string, number>[] = []
    for (let t = 0; t <= settings.steps; t += every) {
      const row: Record<string, number> = { step: t }
      results.forEach((r) => {
        if (t < r.losses.length) row[r.id] = r.losses[t]
      })
      rows.push(row)
    }
    return rows
  }, [results, settings.steps])
  const lrData = useMemo(() => {
    const every = Math.max(1, Math.floor(draft.steps / 150))
    const rows: { step: number; multiplier: number }[] = []
    for (let t = 0; t < draft.steps; t += every) rows.push({ step: t, multiplier: scheduleMultiplier(draft.schedule, t, draft.steps) })
    return rows
  }, [draft.schedule, draft.steps])

  const set = (patch: Partial<Settings>) => setDraft({ ...draft, ...patch })
  const colors = CATEGORICAL[mode]
  const stepsTo = (r: RaceResult, target: number) => {
    const i = r.losses.findIndex((l) => l <= target)
    return i < 0 ? '—' : i
  }

  return (
    <VizFrame
      title="Optimizer race"
      description="Every optimiser trains an identical 2-layer tanh network from the same random initialisation on the same data. The only differences are the update rule and its learning rate. Losses are measured on the full dataset after every step."
      controls={
        <>
          <ControlGroup title="Task">
            <NativeSelect aria-label="Dataset" value={draft.preset} onChange={(e) => set({ preset: e.target.value as DatasetPreset })}>
              {(['moons', 'circles', 'xor', 'spiral'] as const).map((p) => (
                <option key={p} value={p}>
                  {PRESET_LABELS[p]}
                </option>
              ))}
            </NativeSelect>
            <LabeledSlider label="Hidden units" value={draft.hidden} min={2} max={24} step={1} onChange={(v) => set({ hidden: v })} />
            <LabeledSlider label="Steps" value={draft.steps} min={50} max={1000} step={50} onChange={(v) => set({ steps: v })} />
            <Segmented
              label="Batch"
              value={String(draft.batch)}
              onChange={(v) => set({ batch: Number(v) })}
              options={[
                { value: '0', label: 'Full' },
                { value: '32', label: '32' },
                { value: '8', label: '8' },
              ]}
            />
            <NativeSelect aria-label="Learning-rate schedule" value={draft.schedule} onChange={(e) => set({ schedule: e.target.value as ScheduleId })}>
              {(Object.keys(SCHEDULE_LABELS) as ScheduleId[]).map((id) => (
                <option key={id} value={id}>
                  {SCHEDULE_LABELS[id]}
                </option>
              ))}
            </NativeSelect>
          </ControlGroup>
          <ControlGroup title="Optimisers & learning rates">
            {IDS.map((id) => (
              <div key={id} className="space-y-1">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <input
                    type="checkbox"
                    className="accent-[var(--primary)]"
                    checked={draft.enabled.includes(id)}
                    onChange={(e) => set({ enabled: e.target.checked ? IDS.filter((x) => x === id || draft.enabled.includes(x)) : draft.enabled.filter((x) => x !== id) })}
                  />
                  <span className="inline-block h-0.5 w-4 rounded" style={{ background: colors[SLOT[id]] }} aria-hidden />
                  {OPTIMIZER_LABELS[id]}
                </label>
                {draft.enabled.includes(id) && (
                  <LabeledSlider label="η" value={draft.lrs[id]} min={0.0005} max={3} step={0.0005} log onChange={(v) => set({ lrs: { ...draft.lrs, [id]: v } })} format={(v) => v.toPrecision(2)} />
                )}
              </div>
            ))}
          </ControlGroup>
        </>
      }
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={() => setSettings(draft)} disabled={!dirty}>
            <Flag /> {dirty ? 'Run race with new settings' : 'Race is up to date'}
          </Button>
          {dirty && <span className="text-xs text-muted-foreground">Settings changed. The results below are from the previous run.</span>}
        </div>
        <LineChart
          ariaLabel="Training loss per step for each optimiser"
          data={chartData}
          xKey="step"
          xLabel="step"
          series={results.map((r) => ({ key: r.id, label: OPTIMIZER_LABELS[r.id as OptimizerId], slot: SLOT[r.id as OptimizerId] }))}
          logY
          yDomain={['auto', 'auto']}
          height={250}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-xs text-muted-foreground">
                <th className="py-1.5 pr-3 font-medium">Optimiser</th>
                <th className="py-1.5 pr-3 font-medium">η</th>
                <th className="py-1.5 pr-3 font-medium">Final loss</th>
                <th className="py-1.5 pr-3 font-medium">Accuracy</th>
                <th className="py-1.5 font-medium">Steps to loss ≤ 0.3</th>
              </tr>
            </thead>
            <tbody className="tabular">
              {results.map((r) => (
                <tr key={r.id} className="border-b border-border/60">
                  <td className="py-1.5 pr-3">
                    <span className="mr-2 inline-block h-0.5 w-4 rounded align-middle" style={{ background: colors[SLOT[r.id as OptimizerId]] }} aria-hidden />
                    {OPTIMIZER_LABELS[r.id as OptimizerId]}
                  </td>
                  <td className="py-1.5 pr-3 font-mono">{settings.lrs[r.id as OptimizerId].toPrecision(2)}</td>
                  <td className={cn('py-1.5 pr-3 font-mono', r.diverged && 'text-destructive')}>{r.diverged ? 'diverged' : fmt(r.losses[r.losses.length - 1], 4)}</td>
                  <td className="py-1.5 pr-3 font-mono">{r.diverged ? '—' : pct(r.accuracy)}</td>
                  <td className="py-1.5 font-mono">{stepsTo(r, 0.3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {results.map((r) => (
            <figure key={r.id} className="space-y-1">
              <figcaption className="flex items-center gap-1.5 text-xs font-medium">
                <span className="inline-block h-0.5 w-3 rounded" style={{ background: colors[SLOT[r.id as OptimizerId]] }} aria-hidden />
                {OPTIMIZER_LABELS[r.id as OptimizerId]}
              </figcaption>
              {r.diverged ? <div className="flex aspect-square items-center justify-center rounded-lg bg-muted text-xs text-destructive">diverged</div> : <Boundary result={r} points={points} />}
            </figure>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <figure>
            <figcaption className="mb-1 text-xs font-medium text-muted-foreground">Learning-rate multiplier η_t / η₀: {SCHEDULE_LABELS[draft.schedule]}</figcaption>
            <LineChart ariaLabel="Learning-rate schedule" data={lrData} xKey="step" xLabel="step" series={[{ key: 'multiplier', label: 'η_t / η₀' }]} yDomain={[0, 1]} height={150} />
          </figure>
          <div className="self-center rounded-lg border bg-muted/40 p-3">
            <Tex display math={SCHEDULE_FORMULAS[draft.schedule]} className="text-sm" />
          </div>
        </div>
      </div>
    </VizFrame>
  )
}
