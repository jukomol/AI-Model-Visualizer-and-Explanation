import { useEffect, useMemo, useState } from 'react'
import { ControlGroup, LabeledSlider, PlayControls, Segmented, StatTile, ToggleRow } from '@/components/viz/Controls'
import { LineChart } from '@/components/viz/LineChart'
import { Plot2D, type PlotScales } from '@/components/viz/Plot2D'
import { VizFrame } from '@/components/viz/VizFrame'
import { CATEGORICAL, sequential } from '@/lib/colormap'
import { mean } from '@/lib/linalg'
import { gradientDescentLinear, meanSquaredError, olsFit, rSquared } from '@/lib/regression'
import { fmt } from '@/lib/utils'
import { useChallengeReporter } from '@/hooks/useChallenge'
import { useDataset, type AnscombeFile } from '@/hooks/useDataset'
import { usePlayback } from '@/hooks/usePlayback'
import { useThemeMode } from '@/hooks/useThemeMode'

type SetKey = 'I' | 'II' | 'III' | 'IV'

export default function RegressionPlayground() {
  const { data, error } = useDataset<AnscombeFile>('anscombe')
  const mode = useThemeMode()
  const report = useChallengeReporter()
  const [setKey, setSetKey] = useState<SetKey>('I')
  const [lr, setLr] = useState(0.001)
  const [epochs, setEpochs] = useState(200)
  const [standardize, setStandardize] = useState(false)
  const [showOls, setShowOls] = useState(true)

  const xy = data?.sets[setKey]
  const result = useMemo(() => (xy ? gradientDescentLinear(xy.x, xy.y, { learningRate: lr, epochs, standardize }) : null), [xy, lr, epochs, standardize])
  const ols = useMemo(() => (xy ? olsFit(xy.x, xy.y) : null), [xy])
  const history = result?.history ?? []
  const { frame, running, setRunning, toggle, reset, toEnd } = usePlayback(history.length, 40)
  const current = history[frame]

  // Show the finished run whenever the settings change.
  useEffect(() => toEnd(), [result, toEnd])

  useEffect(() => {
    if (current && setKey === 'I') report('linreg-mse-anscombe1', current.loss)
  }, [current, setKey, report])

  // Parameter space actually being optimised (standardised or raw).
  const mx = xy ? mean(xy.x) : 0
  const sx = xy ? Math.sqrt(xy.x.reduce((s, v) => s + (v - mx) ** 2, 0) / xy.x.length) : 1
  const toOpt = (w: number, b: number): [number, number] => (standardize ? [w * sx, b + w * mx] : [w, b])
  const paramDomain = standardize ? { xMin: -1, xMax: 4, yMin: -1, yMax: 10 } : { xMin: -0.4, xMax: 1.4, yMin: -2, yMax: 8 }
  const contour = useMemo(() => {
    if (!xy) return null
    const res = 90
    const vals = new Float32Array(res * res)
    const xs = standardize ? xy.x.map((v) => (v - mx) / sx) : xy.x
    for (let r = 0; r < res; r++) {
      const b = paramDomain.yMax - ((r + 0.5) / res) * (paramDomain.yMax - paramDomain.yMin)
      for (let c = 0; c < res; c++) {
        const w = paramDomain.xMin + ((c + 0.5) / res) * (paramDomain.xMax - paramDomain.xMin)
        let s = 0
        for (let i = 0; i < xs.length; i++) s += (w * xs[i] + b - xy.y[i]) ** 2
        vals[r * res + c] = Math.log(s / xs.length)
      }
    }
    return { res, vals }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xy, standardize])

  const drawContour = (ctx: CanvasRenderingContext2D, s: PlotScales) => {
    if (!contour) return
    const { res, vals } = contour
    let lo = Infinity
    let hi = -Infinity
    vals.forEach((v) => {
      lo = Math.min(lo, v)
      hi = Math.max(hi, v)
    })
    const img = ctx.createImageData(res, res)
    vals.forEach((v, i) => {
      // Posterised into 14 levels of log-loss: the level boundaries read as contour lines.
      const t = 1 - (v - lo) / (hi - lo)
      const level = Math.floor(t * 14) / 14
      const [r, g, b] = sequential(0.08 + level * 0.8, mode)
      img.data.set([r, g, b, 255], i * 4)
    })
    const off = document.createElement('canvas')
    off.width = res
    off.height = res
    off.getContext('2d')!.putImageData(img, 0, 0)
    ctx.drawImage(off, 0, 0, s.width, s.height)
  }

  const series = CATEGORICAL[mode]
  if (error) return <p className="text-destructive">{error}</p>

  return (
    <VizFrame
      title="Gradient descent on Anscombe's quartet"
      description="Real data from Anscombe (1973). Gradient descent fits ŷ = w·x + b by following the negative gradient of the mean squared error. Watch the line on the left and the path through (w, b) space on the right."
      controls={
        <>
          <ControlGroup title="Data">
            <Segmented label="Anscombe set" value={setKey} onChange={(v) => { setSetKey(v); setRunning(false) }} options={(['I', 'II', 'III', 'IV'] as const).map((k) => ({ value: k, label: k }))} />
            <ToggleRow label="Show least-squares line" checked={showOls} onChange={setShowOls} />
          </ControlGroup>
          <ControlGroup title="Optimiser">
            <LabeledSlider label="Learning rate η" value={lr} min={0.0001} max={standardize ? 1 : 0.02} step={0.0001} log onChange={(v) => { setLr(v); setRunning(false) }} format={(v) => v.toPrecision(3)} />
            <LabeledSlider label="Epochs" value={epochs} min={10} max={5000} step={10} log onChange={(v) => { setEpochs(Math.round(v)); setRunning(false) }} format={(v) => Math.round(v).toLocaleString()} />
            <ToggleRow
              label="Standardise x"
              checked={standardize}
              onChange={(v) => {
                setStandardize(v)
                setLr(v ? 0.1 : 0.001)
                setRunning(false)
              }}
              hint="Rescale x to zero mean and unit variance before descending."
            />
            <PlayControls running={running} onToggle={toggle} onReset={reset} playLabel="Replay" />
          </ControlGroup>
        </>
      }
      footer={data?.citation}
    >
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <figure className="space-y-1">
            <figcaption className="text-xs font-medium text-muted-foreground">Data and fitted line</figcaption>
            <Plot2D domain={{ xMin: 2, xMax: 20, yMin: 2, yMax: 14 }} aspect={0.8} ariaLabel="Scatter plot with regression line" gridStep={2}>
              {(s) =>
                xy &&
                current && (
                  <>
                    {xy.x.map((x, i) => (
                      <line key={`r${i}`} x1={s.sx(x)} x2={s.sx(x)} y1={s.sy(xy.y[i])} y2={s.sy(current.slope * x + current.intercept)} stroke={series[1]} strokeWidth={1} opacity={0.6} />
                    ))}
                    {showOls && ols && <line x1={s.sx(2)} x2={s.sx(20)} y1={s.sy(ols.slope * 2 + ols.intercept)} y2={s.sy(ols.slope * 20 + ols.intercept)} className="stroke-muted-foreground" strokeWidth={1} />}
                    <line x1={s.sx(2)} x2={s.sx(20)} y1={s.sy(current.slope * 2 + current.intercept)} y2={s.sy(current.slope * 20 + current.intercept)} stroke={series[0]} strokeWidth={2} />
                    {xy.x.map((x, i) => (
                      <circle key={i} cx={s.sx(x)} cy={s.sy(xy.y[i])} r={4.5} fill={series[0]} stroke="var(--viz-surface)" strokeWidth={2} />
                    ))}
                  </>
                )
              }
            </Plot2D>
          </figure>
          <figure className="space-y-1">
            <figcaption className="text-xs font-medium text-muted-foreground">
              Loss surface over ({standardize ? "w′, b′ standardised" : 'w, b'}); darker = lower MSE
            </figcaption>
            <Plot2D domain={paramDomain} aspect={0.8} ariaLabel="Contour map of the loss with the gradient descent path" background={drawContour} backgroundKey={contour}>
              {(s) => {
                const pts = history.slice(0, frame + 1).map((h) => toOpt(h.slope, h.intercept))
                const opt = ols ? toOpt(ols.slope, ols.intercept) : null
                return (
                  <>
                    <polyline points={pts.map(([w, b]) => `${s.sx(w)},${s.sy(b)}`).join(' ')} fill="none" stroke={series[1]} strokeWidth={2} strokeLinejoin="round" />
                    {pts.length > 0 && <circle cx={s.sx(pts[pts.length - 1][0])} cy={s.sy(pts[pts.length - 1][1])} r={5} fill={series[1]} stroke="var(--viz-surface)" strokeWidth={2} />}
                    {opt && (
                      <g transform={`translate(${s.sx(opt[0])},${s.sy(opt[1])})`}>
                        <path d="M-6,0 L6,0 M0,-6 L0,6" className="stroke-foreground" strokeWidth={2} />
                        <text x={8} y={-6} className="fill-foreground text-[11px]">
                          optimum
                        </text>
                      </g>
                    )}
                  </>
                )
              }}
            </Plot2D>
          </figure>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <StatTile label="Epoch" value={current ? current.epoch.toLocaleString() : '—'} />
          <StatTile label="MSE" value={current ? fmt(current.loss, 4) : '—'} tone={result?.diverged ? 'bad' : undefined} sub={ols && xy ? `optimum ${fmt(meanSquaredError(xy.x, xy.y, ols), 4)}` : undefined} />
          <StatTile label="Slope w" value={current ? fmt(current.slope, 4) : '—'} sub={ols ? `OLS ${fmt(ols.slope, 4)}` : undefined} />
          <StatTile label="Intercept b" value={current ? fmt(current.intercept, 4) : '—'} sub={ols && xy ? `OLS ${fmt(ols.intercept, 4)} · R² ${fmt(rSquared(xy.x, xy.y, ols), 3)}` : undefined} />
        </div>
        {result?.diverged && (
          <p role="alert" className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
            Diverged at epoch {current?.epoch}: the learning rate exceeds 2/λ<sub>max</sub> of the loss curvature, so every step overshoots further.
          </p>
        )}
        <LineChart
          ariaLabel="Mean squared error per epoch"
          data={history.slice(0, frame + 1).filter((h) => Number.isFinite(h.loss))}
          xKey="epoch"
          xLabel="epoch"
          series={[{ key: 'loss', label: 'MSE' }]}
          logY
          height={160}
          reference={ols && xy ? { y: meanSquaredError(xy.x, xy.y, ols), label: 'least-squares minimum' } : undefined}
        />
      </div>
    </VizFrame>
  )
}
