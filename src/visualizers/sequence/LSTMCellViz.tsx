import { useMemo, useState } from 'react'
import { ControlGroup, LabeledSlider, StatTile } from '@/components/viz/Controls'
import { LineChart } from '@/components/viz/LineChart'
import { VizFrame } from '@/components/viz/VizFrame'
import { inkOn, rgbString, sequential } from '@/lib/colormap'
import { cellStateGradient, lstmStep, runLstm, scalarLstm } from '@/lib/lstm'
import { fmt } from '@/lib/utils'
import { useThemeMode } from '@/hooks/useThemeMode'

const T = 60
const PULSE_AT = 5

export default function LSTMCellViz() {
  const mode = useThemeMode()
  const [bf, setBf] = useState(2)
  const [bi, setBi] = useState(-2)
  const [bo, setBo] = useState(0)
  const [x, setX] = useState(1)
  const [cPrev, setCPrev] = useState(0.5)
  const [hPrev, setHPrev] = useState(0)

  const params = useMemo(
    () =>
      scalarLstm({
        input: { w: 4, u: 0, b: bi },
        forget: { w: -1, u: 0, b: bf },
        output: { w: 0, u: 0, b: bo },
        candidate: { w: 2, u: 0, b: 0 },
      }),
    [bf, bi, bo],
  )
  const step = lstmStep(params, [x], [hPrev], [cPrev])

  // Store-and-recall task: one input pulse at t = 5, zeros afterwards.
  const seq = useMemo(() => {
    const xs = Array.from({ length: T }, (_, t) => [t === PULSE_AT ? 1 : 0])
    const steps = runLstm(params, xs, [0], [0])
    const grad = cellStateGradient(steps)
    // Vanilla RNN baseline with the same pulse: h_t = tanh(0.9 h_{t−1} + x_t).
    let h = 0
    const rnn = xs.map(([v]) => (h = Math.tanh(0.9 * h + v)))
    return steps.map((s, t) => ({ t: t + 1, cell: s.c[0], rnn: rnn[t], grad: grad[t + 1] }))
  }, [params])
  const memoryLeft = seq[T - 1].cell / (Math.max(...seq.map((s) => s.cell)) || 1)

  const Gate = ({ label, value, x: gx, y: gy, fn }: { label: string; value: number; x: number; y: number; fn: string }) => {
    const fill = sequential(fn === 'tanh' ? (value + 1) / 2 : value, mode)
    const ink = inkOn(fill)
    return (
    <g transform={`translate(${gx},${gy})`}>
      <rect x={-40} y={-20} width={80} height={40} rx={8} fill={rgbString(fill)} className="stroke-foreground/40" />
      <text textAnchor="middle" y={-4} className="text-[9px] font-semibold" fill={ink}>
        {label} {fn === 'tanh' ? 'tanh' : 'σ'}
      </text>
      <text textAnchor="middle" y={11} className="font-mono text-[10px]" fill={ink}>
        {fmt(value, 3)}
      </text>
    </g>
    )
  }

  return (
    <VizFrame
      title="Inside an LSTM cell"
      description="Top: a single-unit cell. Drag the gate biases and inputs to see each gate open and close. Bottom: the cell stores a single input pulse (t = 5). With the forget gate open, the memory and its gradient survive for dozens of steps, while a vanilla RNN forgets within a few."
      controls={
        <>
          <ControlGroup title="Gate biases">
            <LabeledSlider label="Forget bias b_f" value={bf} min={-4} max={6} step={0.1} onChange={setBf} format={(v) => v.toFixed(1)} hint="Jozefowicz et al. (2015) recommend initialising b_f ≈ 1 or higher." />
            <LabeledSlider label="Input bias b_i" value={bi} min={-6} max={4} step={0.1} onChange={setBi} format={(v) => v.toFixed(1)} />
            <LabeledSlider label="Output bias b_o" value={bo} min={-4} max={4} step={0.1} onChange={setBo} format={(v) => v.toFixed(1)} />
          </ControlGroup>
          <ControlGroup title="One step">
            <LabeledSlider label="Input xₜ" value={x} min={-1} max={1} step={0.05} onChange={setX} format={(v) => v.toFixed(2)} />
            <LabeledSlider label="Previous cell cₜ₋₁" value={cPrev} min={-1.5} max={1.5} step={0.05} onChange={setCPrev} format={(v) => v.toFixed(2)} />
            <LabeledSlider label="Previous hidden hₜ₋₁" value={hPrev} min={-1} max={1} step={0.05} onChange={setHPrev} format={(v) => v.toFixed(2)} />
          </ControlGroup>
        </>
      }
    >
      <div className="space-y-4">
        <svg viewBox="0 0 560 250" className="mx-auto w-full max-w-3xl rounded-lg bg-viz-surface" role="img" aria-label="LSTM cell diagram with gate values">
          {/* cell-state conveyor belt */}
          <line x1={20} y1={50} x2={540} y2={50} className="stroke-foreground" strokeWidth={3} />
          <text x={24} y={40} className="fill-muted-foreground font-mono text-[11px]">
            cₜ₋₁ = {fmt(cPrev, 3)}
          </text>
          <text x={536} y={40} textAnchor="end" className="fill-foreground font-mono text-[11px] font-semibold">
            cₜ = {fmt(step.c[0], 3)}
          </text>
          <circle cx={150} cy={50} r={13} fill="var(--viz-surface)" className="stroke-foreground" strokeWidth={2} />
          <text x={150} y={55} textAnchor="middle" className="fill-foreground text-[14px]">
            ×
          </text>
          <circle cx={300} cy={50} r={13} fill="var(--viz-surface)" className="stroke-foreground" strokeWidth={2} />
          <text x={300} y={55} textAnchor="middle" className="fill-foreground text-[14px]">
            +
          </text>
          <line x1={150} y1={63} x2={150} y2={130} className="stroke-muted-foreground" strokeWidth={1.5} />
          <line x1={250} y1={130} x2={300} y2={63} className="stroke-muted-foreground" strokeWidth={1.5} />
          <line x1={340} y1={130} x2={300} y2={63} className="stroke-muted-foreground" strokeWidth={1.5} />
          <line x1={450} y1={50} x2={450} y2={190} className="stroke-muted-foreground" strokeWidth={1.5} />
          <Gate label="forget f" value={step.f[0]} x={150} y={150} fn="σ" />
          <Gate label="input i" value={step.i[0]} x={250} y={150} fn="σ" />
          <Gate label="cand. g" value={step.g[0]} x={340} y={150} fn="tanh" />
          <Gate label="output o" value={step.o[0]} x={450} y={150} fn="σ" />
          <text x={450} y={225} textAnchor="middle" className="fill-foreground font-mono text-[11px] font-semibold">
            hₜ = o·tanh(cₜ) = {fmt(step.h[0], 3)}
          </text>
          <text x={20} y={240} className="fill-muted-foreground font-mono text-[10px]">
            xₜ = {fmt(x, 2)}, hₜ₋₁ = {fmt(hPrev, 2)} · cₜ = f·cₜ₋₁ + i·g = {fmt(step.f[0], 2)}·{fmt(cPrev, 2)} + {fmt(step.i[0], 2)}·{fmt(step.g[0], 2)}
          </text>
        </svg>
        <div className="grid grid-cols-3 gap-2">
          <StatTile label="Memory left at t = 60" value={`${(memoryLeft * 100).toFixed(1)}%`} tone={memoryLeft > 0.5 ? 'good' : 'bad'} />
          <StatTile label="∂c₆₀/∂c₅ ≈ Π f" value={seq[PULSE_AT].grad.toExponential(2)} />
          <StatTile label="Vanilla RNN at t = 60" value={fmt(seq[T - 1].rnn, 4)} />
        </div>
        <LineChart
          ariaLabel="Cell state of the LSTM versus the hidden state of a vanilla RNN after a single pulse"
          data={seq}
          xKey="t"
          xLabel="time step"
          series={[
            { key: 'cell', label: 'LSTM cell state cₜ', slot: 0 },
            { key: 'rnn', label: 'Vanilla RNN hₜ', slot: 1 },
          ]}
          yDomain={['auto', 'auto']}
          height={180}
        />
        <p className="text-xs text-muted-foreground">
          The vanilla RNN uses h = tanh(0.9·h + x). The same pulse fades as 0.9ᵗ multiplied by tanh′. Colour key for gates: {' '}
          <span className="inline-block size-2.5 rounded-sm align-middle" style={{ background: rgbString(sequential(0.1, mode)) }} /> closed ·{' '}
          <span className="inline-block size-2.5 rounded-sm align-middle" style={{ background: rgbString(sequential(0.9, mode)) }} /> open.
        </p>
      </div>
    </VizFrame>
  )
}
