import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ControlGroup, LabeledSlider, PlayControls, Segmented, StatTile } from '@/components/viz/Controls'
import { LineChart } from '@/components/viz/LineChart'
import { Plot2D, type PlotScales } from '@/components/viz/Plot2D'
import { paintField } from '@/components/viz/paintField'
import { VizFrame } from '@/components/viz/VizFrame'
import { diverging, rgbString, sequential } from '@/lib/colormap'
import { XOR_DATA, backward, bceLoss, datasetLoss, forward, initMlp, trainStep, type MlpParams } from '@/lib/neural'
import { createRng } from '@/lib/random'
import { fmt } from '@/lib/utils'
import { useAnimationLoop } from '@/hooks/useAnimationLoop'
import { useChallengeReporter } from '@/hooks/useChallenge'
import { useThemeMode } from '@/hooks/useThemeMode'

const W = 560
const H = 300

/** Central-difference estimate of ∂L/∂W[l][j][i] for one example. */
function numericGrad(params: MlpParams, x: number[], y: number, l: number, j: number, i: number): number {
  const h = 1e-5
  const bump = (d: number): MlpParams => ({
    hiddenActivation: params.hiddenActivation,
    layers: params.layers.map((layer, li) => ({
      W: layer.W.map((row, jj) => row.map((w, ii) => (li === l && jj === j && ii === i ? w + d : w))),
      b: layer.b,
    })),
  })
  return (bceLoss(forward(bump(h), x).output, y) - bceLoss(forward(bump(-h), x).output, y)) / (2 * h)
}

export default function BackpropViz() {
  const mode = useThemeMode()
  const report = useChallengeReporter()
  const [hidden, setHidden] = useState(2)
  const [seed, setSeed] = useState(3)
  const [lr, setLr] = useState(2)
  const [params, setParams] = useState<MlpParams>(() => initMlp([2, 2, 1], createRng(3), 'sigmoid'))
  const [sample, setSample] = useState(1)
  const [view, setView] = useState<'forward' | 'backward'>('forward')
  const [running, setRunning] = useState(false)
  const [steps, setSteps] = useState(0)
  const [history, setHistory] = useState<{ step: number; loss: number }[]>([])
  const stepRef = useRef(0)

  const reinit = (h: number, s: number) => {
    setRunning(false)
    stepRef.current = 0
    setSteps(0)
    setHistory([])
    setParams(initMlp([2, h, 1], createRng(s), 'sigmoid'))
  }

  const loss = useMemo(() => datasetLoss(params, XOR_DATA.xs, XOR_DATA.ys), [params])
  useEffect(() => {
    if (hidden === 2) report('backprop-xor-loss', loss)
  }, [loss, hidden, report])

  const train = (n: number) => {
    let p = params
    for (let k = 0; k < n; k++) p = trainStep(p, XOR_DATA.xs, XOR_DATA.ys, lr)
    stepRef.current += n
    const s = stepRef.current
    setSteps(s)
    setHistory((h) => [...h, { step: s, loss: datasetLoss(p, XOR_DATA.xs, XOR_DATA.ys) }].slice(-200))
    setParams(p)
  }
  useAnimationLoop(running, () => train(25), 30)

  const x = XOR_DATA.xs[sample]
  const y = XOR_DATA.ys[sample]
  const trace = useMemo(() => forward(params, x), [params, x])
  const grads = useMemo(() => backward(params, trace, y), [params, trace, y])

  // Node positions: inputs, hidden, output.
  const layerX = [70, W / 2, W - 90]
  const pos = (l: number, j: number, n: number) => ({ x: layerX[l], y: H / 2 + (j - (n - 1) / 2) * (n > 2 ? 86 : 110) })
  const sizes = [2, hidden, 1]
  const maxW = Math.max(...params.layers.flatMap((L) => L.W.flat().map(Math.abs)), 1e-6)
  const maxG = Math.max(...grads.dW.flat(2).map(Math.abs), 1e-9)

  const boundary = (ctx: CanvasRenderingContext2D, s: PlotScales) =>
    paintField(ctx, s, { xMin: -0.5, xMax: 1.5, yMin: -0.5, yMax: 1.5 }, 60, (a, b) => {
      const [r, g, bl] = sequential(forward(params, [a, b]).output, mode)
      return [r, g, bl, 255]
    })

  const check = [
    { l: 0, j: 0, i: 0, label: 'W¹₁₁' },
    { l: 0, j: 1, i: 1, label: 'W¹₂₂' },
    { l: 1, j: 0, i: 0, label: 'W²₁₁' },
  ]

  return (
    <VizFrame
      title="Back-propagation, value by value"
      description="A 2-input network learning XOR. The forward view shows each unit's activation a and each weight w. The backward view shows each unit's error signal δ = ∂L/∂z and each weight's gradient ∂L/∂w for the selected example, all computed by the chain rule."
      controls={
        <>
          <ControlGroup title="Example">
            <Segmented
              value={String(sample)}
              onChange={(v) => setSample(Number(v))}
              options={XOR_DATA.xs.map((xx, i) => ({ value: String(i), label: `(${xx.join(',')})→${XOR_DATA.ys[i]}` }))}
            />
            <Segmented
              value={view}
              onChange={setView}
              options={[
                { value: 'forward', label: 'Forward pass' },
                { value: 'backward', label: 'Backward pass' },
              ]}
            />
          </ControlGroup>
          <ControlGroup title="Training">
            <LabeledSlider label="Learning rate η" value={lr} min={0.1} max={8} step={0.1} onChange={setLr} format={(v) => v.toFixed(1)} />
            <Segmented
              label="Hidden units"
              value={String(hidden)}
              onChange={(v) => {
                setHidden(Number(v))
                reinit(Number(v), seed)
              }}
              options={[
                { value: '2', label: '2' },
                { value: '3', label: '3' },
                { value: '4', label: '4' },
              ]}
            />
            <PlayControls running={running} onToggle={() => setRunning((r) => !r)} onStep={() => train(1)} onReset={() => reinit(hidden, seed)} playLabel="Train" />
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setSeed(seed + 1)
                reinit(hidden, seed + 1)
              }}
            >
              New random initialisation
            </Button>
          </ControlGroup>
        </>
      }
    >
      <div className="space-y-4">
        <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-2xl rounded-lg bg-viz-surface" role="img" aria-label="Network diagram with activations and gradients">
          {params.layers.map((layer, l) =>
            layer.W.map((row, j) =>
              row.map((w, i) => {
                const a = pos(l, i, sizes[l])
                const b = pos(l + 1, j, sizes[l + 1])
                const g = grads.dW[l][j][i]
                const value = view === 'forward' ? w : g
                const t = view === 'forward' ? w / maxW : g / maxG
                const mx = (a.x + b.x) / 2
                const my = (a.y + b.y) / 2
                return (
                  <g key={`${l}-${j}-${i}`}>
                    <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={rgbString(diverging(t, mode))} strokeWidth={1 + 5 * Math.abs(t)} />
                    <text x={mx} y={my - 6} textAnchor="middle" className="fill-foreground font-mono text-[11px]" paintOrder="stroke" stroke="var(--viz-surface)" strokeWidth={4}>
                      {fmt(value, 3)}
                    </text>
                  </g>
                )
              }),
            ),
          )}
          {sizes.map((n, l) =>
            Array.from({ length: n }, (_, j) => {
              const p = pos(l, j, n)
              const act = trace.a[l][j]
              const delta = l > 0 ? grads.delta[l - 1][j] : null
              const label = l === 0 ? `x${j + 1}` : l === 1 ? `h${j + 1}` : 'ŷ'
              return (
                <g key={`n${l}-${j}`}>
                  <circle cx={p.x} cy={p.y} r={30} fill={rgbString(sequential(act, mode))} className="stroke-foreground" strokeWidth={1.5} />
                  <text x={p.x} y={p.y - 4} textAnchor="middle" className="fill-foreground text-[12px] font-semibold" paintOrder="stroke" stroke="var(--viz-surface)" strokeWidth={3}>
                    {label}
                  </text>
                  <text x={p.x} y={p.y + 12} textAnchor="middle" className="fill-foreground font-mono text-[10px]" paintOrder="stroke" stroke="var(--viz-surface)" strokeWidth={3}>
                    {view === 'forward' || delta === null ? `a=${fmt(act, 3)}` : `δ=${fmt(delta, 3)}`}
                  </text>
                </g>
              )
            }),
          )}
          <text x={W - 90} y={H / 2 + 52} textAnchor="middle" className="fill-muted-foreground text-[11px]">
            target y = {y} · loss {fmt(bceLoss(trace.output, y), 3)}
          </text>
        </svg>
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_14rem]">
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <StatTile label="Full-batch steps" value={steps.toLocaleString()} />
              <StatTile label="Mean loss (4 examples)" value={fmt(loss, 4)} tone={loss <= 0.05 ? 'good' : undefined} />
            </div>
            {history.length > 1 && <LineChart ariaLabel="Loss over training steps" data={history} xKey="step" xLabel="step" series={[{ key: 'loss', label: 'Loss' }]} height={150} logY />}
            <table className="w-full text-xs">
              <caption className="mb-1 text-left text-muted-foreground">Gradient check for the selected example: back-prop vs central finite difference</caption>
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="py-1 font-medium">Weight</th>
                  <th className="py-1 font-medium">Back-prop ∂L/∂w</th>
                  <th className="py-1 font-medium">(L(w+h) − L(w−h)) / 2h</th>
                </tr>
              </thead>
              <tbody className="tabular font-mono">
                {check
                  .filter((c) => c.j < sizes[c.l + 1])
                  .map((c) => (
                    <tr key={c.label} className="border-b border-border/60">
                      <td className="py-1">{c.label}</td>
                      <td className="py-1">{grads.dW[c.l][c.j][c.i].toExponential(5)}</td>
                      <td className="py-1">{numericGrad(params, x, y, c.l, c.j, c.i).toExponential(5)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <figure className="space-y-1">
            <Plot2D domain={{ xMin: -0.5, xMax: 1.5, yMin: -0.5, yMax: 1.5 }} ariaLabel="Network output over the input plane" background={boundary} backgroundKey={`${steps}-${hidden}-${seed}-${mode}`} gridStep={0.5}>
              {(s) =>
                XOR_DATA.xs.map((xx, i) => (
                  <circle key={i} cx={s.sx(xx[0])} cy={s.sy(xx[1])} r={7} fill={XOR_DATA.ys[i] ? '#ffffff' : '#000000'} stroke={XOR_DATA.ys[i] ? '#000' : '#fff'} strokeWidth={2} />
                ))
              }
            </Plot2D>
            <figcaption className="text-xs text-muted-foreground">Network output ŷ(x₁, x₂); white dots are y = 1, black dots y = 0.</figcaption>
          </figure>
        </div>
      </div>
    </VizFrame>
  )
}
