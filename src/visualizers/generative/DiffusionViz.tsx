import { useEffect, useMemo, useState } from 'react'
import { NativeSelect } from '@/components/ui/select'
import { ControlGroup, LabeledSlider, PlayControls, Segmented, StatTile } from '@/components/viz/Controls'
import { LineChart } from '@/components/viz/LineChart'
import { Plot2D } from '@/components/viz/Plot2D'
import { VizFrame } from '@/components/viz/VizFrame'
import { CATEGORICAL } from '@/lib/colormap'
import { generatePreset, type DatasetPreset } from '@/lib/datasets2d'
import { ddimSample, makeSchedule, meanNearestDistance, qSample, type ScheduleKind, type Vec2 } from '@/lib/diffusion'
import { createRng } from '@/lib/random'
import { fmt } from '@/lib/utils'
import { useChallengeReporter } from '@/hooks/useChallenge'
import { usePlayback } from '@/hooks/usePlayback'
import { useThemeMode } from '@/hooks/useThemeMode'

const DOMAIN = { xMin: -2.4, xMax: 2.4, yMin: -2.4, yMax: 2.4 }
const T = 1000

export default function DiffusionViz() {
  const mode = useThemeMode()
  const report = useChallengeReporter()
  const [preset, setPreset] = useState<DatasetPreset>('moons')
  const [kind, setKind] = useState<ScheduleKind>('linear')
  const [phase, setPhase] = useState<'forward' | 'reverse'>('forward')
  const [t, setT] = useState(250)
  const [steps, setSteps] = useState(5)
  const [count, setCount] = useState(120)
  const [seed, setSeed] = useState(1)

  const data = useMemo<Vec2[]>(() => generatePreset(preset, createRng(1), 0.03).map((p) => [p.x * 1.6, p.y * 1.6]), [preset])
  const schedule = useMemo(() => makeSchedule(kind, T), [kind])
  const other = useMemo(() => makeSchedule(kind === 'cosine' ? 'linear' : 'cosine', T), [kind])
  const noise = useMemo(() => {
    const rng = createRng(99)
    return data.map(() => [rng.normal(), rng.normal()] as Vec2)
  }, [data])
  const noised = useMemo(() => data.map((x0, i) => qSample(x0, t, noise[i], schedule)), [data, noise, t, schedule])

  const trajectories = useMemo(() => (phase === 'reverse' ? ddimSample(data, schedule, steps, count, createRng(seed)) : []), [phase, data, schedule, steps, count, seed])
  const { frame, running, toggle, reset, toEnd, setFrame } = usePlayback(steps + 1, 6)
  useEffect(() => toEnd(), [trajectories, toEnd])
  const finals = trajectories.map((tr) => tr[tr.length - 1])
  const error = finals.length ? meanNearestDistance(finals, data) : null
  useEffect(() => {
    if (error !== null) report('diffusion-sample-error', error / 1.6)
  }, [error, report])

  const abData = useMemo(
    () =>
      Array.from({ length: 101 }, (_, k) => {
        const tt = k * 10
        return { t: tt, [kind]: schedule.alphaBars[tt], [kind === 'cosine' ? 'linear' : 'cosine']: other.alphaBars[tt] }
      }),
    [schedule, other, kind],
  )
  const colors = CATEGORICAL[mode]
  const sampleTimes = useMemo(() => Array.from({ length: steps + 1 }, (_, k) => Math.round(((steps - k) * T) / steps)), [steps])

  return (
    <VizFrame
      title="Diffusion: noise in, data out"
      description="Forward: every step adds a little Gaussian noise until the data is indistinguishable from N(0, I). Reverse: starting from pure noise, DDIM repeatedly estimates the clean point x̂₀ and steps towards it. The denoiser here is the exact optimum for this training set, so no network is needed."
      controls={
        <>
          <ControlGroup title="Setup">
            <NativeSelect aria-label="Data distribution" value={preset} onChange={(e) => setPreset(e.target.value as DatasetPreset)}>
              <option value="moons">Two moons</option>
              <option value="spiral">Two spirals</option>
              <option value="circles">Concentric circles</option>
              <option value="blobs">Four clusters</option>
            </NativeSelect>
            <Segmented
              label="Noise schedule"
              value={kind}
              onChange={setKind}
              options={[
                { value: 'linear', label: 'Linear (Ho 2020)' },
                { value: 'cosine', label: 'Cosine (Nichol 2021)' },
              ]}
            />
            <Segmented
              value={phase}
              onChange={setPhase}
              options={[
                { value: 'forward', label: 'Forward q(xₜ|x₀)' },
                { value: 'reverse', label: 'Reverse (sample)' },
              ]}
            />
          </ControlGroup>
          {phase === 'forward' ? (
            <ControlGroup title="Forward process">
              <LabeledSlider label="Timestep t" value={t} min={0} max={T} step={1} onChange={setT} />
            </ControlGroup>
          ) : (
            <ControlGroup title="DDIM sampler">
              <LabeledSlider label="Sampling steps" value={steps} min={1} max={100} step={1} onChange={setSteps} hint="Fewer steps means bigger jumps: faster, but less accurate." />
              <LabeledSlider label="Samples" value={count} min={20} max={300} step={10} onChange={setCount} />
              <PlayControls running={running} onToggle={toggle} onStep={() => setFrame(frame + 1)} onReset={reset} playLabel="Denoise" />
              <button className="text-xs text-primary underline" onClick={() => setSeed((s) => s + 1)}>
                Draw new noise
              </button>
            </ControlGroup>
          )}
        </>
      }
    >
      <div className="space-y-4">
        <Plot2D domain={DOMAIN} maxHeight={430} ariaLabel={phase === 'forward' ? 'Noised data points at timestep t' : 'Samples moving from noise to data'}>
          {(s) => (
            <>
              {data.map((p, i) => (
                <circle key={`d${i}`} cx={s.sx(p[0])} cy={s.sy(p[1])} r={phase === 'forward' ? 2 : 3} className="fill-muted-foreground" opacity={phase === 'forward' ? 0.35 : 0.5} />
              ))}
              {phase === 'forward' &&
                noised.map((p, i) => <circle key={`n${i}`} cx={s.sx(p[0])} cy={s.sy(p[1])} r={3.5} fill={colors[0]} stroke="var(--viz-surface)" strokeWidth={1.5} />)}
              {phase === 'reverse' &&
                trajectories.map((tr, i) => {
                  const pts = tr.slice(0, frame + 1)
                  const head = pts[pts.length - 1]
                  return (
                    <g key={`s${i}`}>
                      <polyline points={pts.map((p) => `${s.sx(p[0])},${s.sy(p[1])}`).join(' ')} fill="none" stroke={colors[1]} strokeWidth={1} opacity={0.35} />
                      <circle cx={s.sx(head[0])} cy={s.sy(head[1])} r={3.5} fill={colors[1]} stroke="var(--viz-surface)" strokeWidth={1.5} />
                    </g>
                  )
                })}
            </>
          )}
        </Plot2D>
        {phase === 'forward' ? (
          <div className="grid grid-cols-3 gap-2">
            <StatTile label="ᾱₜ (signal kept)" value={fmt(schedule.alphaBars[t], 4)} />
            <StatTile label="√ᾱₜ · x₀ weight" value={fmt(Math.sqrt(schedule.alphaBars[t]), 3)} />
            <StatTile label="Noise std √(1−ᾱₜ)" value={fmt(Math.sqrt(1 - schedule.alphaBars[t]), 3)} />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            <StatTile label="Current timestep" value={sampleTimes[Math.min(frame, steps)]} sub={`step ${frame} of ${steps}`} />
            <StatTile label="Mean distance to data" value={error === null ? '—' : fmt(error / 1.6, 4)} sub="in the original [−1, 1] units" tone={error !== null && error / 1.6 <= 0.05 ? 'good' : undefined} />
            <StatTile label="Denoiser calls" value={(steps * count).toLocaleString()} />
          </div>
        )}
        <LineChart
          ariaLabel="Cumulative signal fraction alpha-bar over timesteps for both schedules"
          data={abData}
          xKey="t"
          xLabel="timestep t"
          series={[
            { key: kind, label: `ᾱₜ ${kind} (active)`, slot: 0 },
            { key: kind === 'cosine' ? 'linear' : 'cosine', label: `ᾱₜ ${kind === 'cosine' ? 'linear' : 'cosine'}`, slot: 1 },
          ]}
          yDomain={[0, 1]}
          height={170}
        />
      </div>
    </VizFrame>
  )
}
