import { useEffect, useMemo, useState } from 'react'
import { ControlGroup, LabeledSlider, PlayControls, Segmented, StatTile } from '@/components/viz/Controls'
import { LineChart } from '@/components/viz/LineChart'
import { ClassLegend, ClassMarker, Plot2D, type PlotScales } from '@/components/viz/Plot2D'
import { hexToRgb, paintField } from '@/components/viz/paintField'
import { VizFrame } from '@/components/viz/VizFrame'
import { CLASS_COLORS } from '@/lib/colormap'
import { generatePreset } from '@/lib/datasets2d'
import { boundarySegment, trainPerceptron, type PerceptronState } from '@/lib/perceptron'
import { createRng } from '@/lib/random'
import { fmt } from '@/lib/utils'
import { useChallengeReporter } from '@/hooks/useChallenge'
import { usePlayback } from '@/hooks/usePlayback'
import { useThemeMode } from '@/hooks/useThemeMode'

const DOMAIN = { xMin: -1, xMax: 1, yMin: -1, yMax: 1 }

export default function PerceptronViz() {
  const mode = useThemeMode()
  const report = useChallengeReporter()
  const [dataset, setDataset] = useState<'linear' | 'xor'>('linear')
  const [seed, setSeed] = useState(3)
  const [lr, setLr] = useState(0.5)
  const points = useMemo(() => {
    const pts = generatePreset(dataset, createRng(seed), 0.02).filter((_, i) => i % 3 === 0)
    return pts.map((p) => ({ x: [p.x, p.y] as [number, number], y: (p.label === 0 ? -1 : 1) as 1 | -1 }))
  }, [dataset, seed])
  const run = useMemo(() => trainPerceptron(points.map((p) => p.x), points.map((p) => p.y), 30, lr), [points, lr])
  const { frame, running, toggle, reset, setFrame } = usePlayback(run.updates.length + 1, 12)
  useEffect(() => reset(), [run, reset])

  const current = frame > 0 ? run.updates[frame - 1] : null
  const state: PerceptronState = current ? current.after : { w: [0, 0], b: 0 }
  const epochsDone = Math.floor(frame / points.length)
  const mistakesPerEpoch = run.mistakesPerEpoch.slice(0, epochsDone)
  const lastEpochMistakes = mistakesPerEpoch[mistakesPerEpoch.length - 1]

  useEffect(() => {
    if (lastEpochMistakes !== undefined && dataset === 'linear') report('perceptron-errors', lastEpochMistakes)
  }, [lastEpochMistakes, dataset, report])

  const shade = (ctx: CanvasRenderingContext2D, s: PlotScales) => {
    if (state.w[0] === 0 && state.w[1] === 0 && state.b === 0) return
    const [neg, pos] = CLASS_COLORS[mode].map(hexToRgb)
    paintField(ctx, s, DOMAIN, 80, (x, y) => {
      const c = state.w[0] * x + state.w[1] * y + state.b >= 0 ? pos : neg
      return [c[0], c[1], c[2], 36]
    })
  }

  const seg = boundarySegment(state)
  return (
    <VizFrame
      title="Perceptron learning rule"
      description="Each step visits one training point. If it lies on the wrong side of the line, the weights move towards it: w ← w + η·y·x. The arrow is the weight vector w, which is always perpendicular to the decision boundary."
      controls={
        <>
          <ControlGroup title="Data">
            <Segmented
              value={dataset}
              onChange={setDataset}
              options={[
                { value: 'linear', label: 'Separable' },
                { value: 'xor', label: 'XOR' },
              ]}
            />
            <button className="text-xs text-primary underline" onClick={() => setSeed((s) => s + 1)}>
              Resample points
            </button>
          </ControlGroup>
          <ControlGroup title="Training">
            <LabeledSlider label="Learning rate η" value={lr} min={0.05} max={2} step={0.05} onChange={setLr} format={(v) => v.toFixed(2)} />
            <PlayControls running={running} onToggle={toggle} onStep={() => setFrame(frame + 1)} onReset={reset} playLabel="Play" />
            <button className="text-xs text-primary underline" onClick={() => setFrame(run.updates.length)}>
              Skip to the end
            </button>
          </ControlGroup>
        </>
      }
    >
      <div className="space-y-3">
        <Plot2D domain={DOMAIN} ariaLabel="Perceptron decision boundary over the training points" background={shade} backgroundKey={`${frame}-${mode}-${dataset}`} maxHeight={440}>
          {(s) => (
            <>
              {seg && <line x1={s.sx(seg[0])} y1={s.sy(seg[1])} x2={s.sx(seg[2])} y2={s.sy(seg[3])} className="stroke-foreground" strokeWidth={2} />}
              {(state.w[0] !== 0 || state.w[1] !== 0) && (
                <g>
                  <defs>
                    <marker id="w-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                      <path d="M0,0 L8,4 L0,8 z" className="fill-primary" />
                    </marker>
                  </defs>
                  {(() => {
                    const n = Math.hypot(...state.w)
                    const L = 0.35
                    return <line x1={s.sx(0)} y1={s.sy(0)} x2={s.sx((state.w[0] / n) * L)} y2={s.sy((state.w[1] / n) * L)} className="stroke-primary" strokeWidth={2.5} markerEnd="url(#w-arrow)" />
                  })()}
                </g>
              )}
              {points.map((p, i) => (
                <ClassMarker key={i} x={s.sx(p.x[0])} y={s.sy(p.x[1])} cls={p.y === -1 ? 0 : 1} r={4.5} faded={current !== null && current.index !== i && false} />
              ))}
              {current && (
                <circle cx={s.sx(points[current.index].x[0])} cy={s.sy(points[current.index].x[1])} r={10} fill="none" strokeWidth={2} className={current.mistake ? 'stroke-destructive' : 'stroke-success'} />
              )}
            </>
          )}
        </Plot2D>
        <ClassLegend labels={['y = −1', 'y = +1']} />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <StatTile label="Step" value={`${frame} / ${run.updates.length}`} />
          <StatTile label="Epoch" value={Math.min(epochsDone + 1, run.mistakesPerEpoch.length)} />
          <StatTile label="Last visit" value={current ? (current.mistake ? 'mistake → update' : 'correct') : '—'} tone={current ? (current.mistake ? 'bad' : 'good') : undefined} />
          <StatTile
            label="Converged"
            value={run.convergedAtEpoch && epochsDone >= run.convergedAtEpoch ? `epoch ${run.convergedAtEpoch}` : run.convergedAtEpoch ? 'not yet' : 'never (in 30 epochs)'}
            tone={run.convergedAtEpoch && epochsDone >= run.convergedAtEpoch ? 'good' : undefined}
          />
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          w = ({fmt(state.w[0], 3)}, {fmt(state.w[1], 3)}), b = {fmt(state.b, 3)}
        </p>
        {mistakesPerEpoch.length > 0 && (
          <LineChart ariaLabel="Mistakes per epoch" data={mistakesPerEpoch.map((m, i) => ({ epoch: i + 1, mistakes: m }))} xKey="epoch" xLabel="epoch" series={[{ key: 'mistakes', label: 'Mistakes' }]} height={140} />
        )}
      </div>
    </VizFrame>
  )
}
