import { useMemo, useState } from 'react'
import { ControlGroup, LabeledSlider, Segmented, StatTile } from '@/components/viz/Controls'
import { HeatmapCanvas } from '@/components/viz/HeatmapCanvas'
import { LineChart } from '@/components/viz/LineChart'
import { VizFrame } from '@/components/viz/VizFrame'
import { diverging, rgbString } from '@/lib/colormap'
import { runRnn, type RnnActivation } from '@/lib/rnn'
import { useThemeMode } from '@/hooks/useThemeMode'

export default function RNNGradientViz() {
  const mode = useThemeMode()
  const [gain, setGain] = useState(0.9)
  const [steps, setSteps] = useState(40)
  const [activation, setActivation] = useState<RnnActivation>('tanh')
  const [inputScale, setInputScale] = useState(0.8)
  const hidden = 12
  const run = useMemo(() => runRnn({ hidden, steps, recurrentGain: gain, activation, inputScale, seed: 3 }), [gain, steps, activation, inputScale])
  const g = run.gradientNorms
  const ratio = g[0] / g[steps]
  const data = g.map((v, t) => ({ t, norm: v / g[steps], bound: gain ** (steps - t) }))
  const hiddenField = useMemo(() => {
    const out = new Float32Array(hidden * steps)
    for (let t = 1; t <= steps; t++) for (let i = 0; i < hidden; i++) out[i * steps + (t - 1)] = run.states[t][i]
    return out
  }, [run, steps])
  const shown = Math.min(steps, 24)
  return (
    <VizFrame
      title="Back-propagation through time"
      description="An Elman RNN with an orthogonal recurrent matrix scaled so every singular value equals the gain. The chart shows how much gradient from the loss at the final step reaches each earlier step. The product of Jacobians makes it shrink or grow exponentially."
      controls={
        <>
          <ControlGroup title="Recurrent weights">
            <LabeledSlider label="Gain ‖W_h‖" value={gain} min={0.5} max={1.5} step={0.01} onChange={setGain} format={(v) => v.toFixed(2)} />
            <Segmented
              label="Activation φ"
              value={activation}
              onChange={setActivation}
              options={[
                { value: 'tanh', label: 'tanh' },
                { value: 'linear', label: 'linear' },
              ]}
            />
            <LabeledSlider label="Input scale" value={inputScale} min={0} max={2} step={0.05} onChange={setInputScale} format={(v) => v.toFixed(2)} hint="Larger inputs saturate tanh, and saturation shrinks the gradient further." />
          </ControlGroup>
          <ControlGroup title="Sequence">
            <LabeledSlider label="Length T" value={steps} min={5} max={80} step={1} onChange={setSteps} />
          </ControlGroup>
        </>
      }
    >
      <div className="space-y-4">
        <svg viewBox={`0 0 ${shown * 40 + 20} 70`} className="w-full" role="img" aria-label="Unrolled RNN with backward gradient strength per step">
          {Array.from({ length: shown }, (_, k) => {
            const t = steps - shown + k + 1
            const strength = Math.min(1, g[t] / Math.max(...g.slice(steps - shown)))
            return (
              <g key={t} transform={`translate(${10 + k * 40}, 10)`}>
                {k > 0 && <line x1={-12} y1={20} x2={0} y2={20} stroke={rgbString(diverging(Math.min(1, strength), mode))} strokeWidth={1 + 4 * strength} />}
                <rect width={28} height={40} rx={6} fill={rgbString(diverging(strength, mode))} />
                <text x={14} y={25} textAnchor="middle" className="text-[9px] font-semibold" fill={strength > 0.55 ? '#fff' : 'currentColor'}>
                  h{t}
                </text>
                <text x={14} y={56} textAnchor="middle" className="fill-muted-foreground text-[8px]">
                  {t === steps ? 'loss' : ''}
                </text>
              </g>
            )
          })}
        </svg>
        <p className="text-xs text-muted-foreground">Last {shown} steps; colour and link width show the relative gradient norm ‖∂L/∂hₜ‖ arriving at each step.</p>
        <div className="grid grid-cols-3 gap-2">
          <StatTile label="‖∂L/∂h₀‖ / ‖∂L/∂h_T‖" value={ratio.toExponential(2)} tone={ratio < 1e-3 || ratio > 1e3 ? 'bad' : 'good'} />
          <StatTile label="Linear prediction gain^T" value={(gain ** steps).toExponential(2)} />
          <StatTile label="Regime" value={ratio < 1e-2 ? 'vanishing' : ratio > 1e2 ? 'exploding' : 'stable'} />
        </div>
        <LineChart
          ariaLabel="Relative gradient norm per time step"
          data={data}
          xKey="t"
          xLabel="time step t"
          series={[
            { key: 'norm', label: 'Measured ‖∂L/∂hₜ‖ (relative)', slot: 0 },
            { key: 'bound', label: 'gain^(T−t)', slot: 1 },
          ]}
          logY
          yDomain={['auto', 'auto']}
          height={200}
        />
        <figure className="space-y-1">
          <figcaption className="text-xs font-medium text-muted-foreground">Hidden state hₜ over time ({hidden} units × {steps} steps; blue −1 … red +1)</figcaption>
          <HeatmapCanvas values={hiddenField} width={steps} height={hidden} scale="diverging" range={[-1, 1]} displayWidth="100%" displayHeight={96} label="Heatmap of hidden states over time" />
        </figure>
      </div>
    </VizFrame>
  )
}
