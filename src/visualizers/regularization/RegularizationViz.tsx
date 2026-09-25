import { useEffect, useMemo, useState } from 'react'
import { ControlGroup, LabeledSlider, Segmented, StatTile } from '@/components/viz/Controls'
import { LineChart } from '@/components/viz/LineChart'
import { Plot2D } from '@/components/viz/Plot2D'
import { VizFrame } from '@/components/viz/VizFrame'
import { CATEGORICAL } from '@/lib/colormap'
import { linspace } from '@/lib/linalg'
import { lassoFit, mseOf, predictPoly, ridgeFit, sampleCurve, trueFunction } from '@/lib/polyfit'
import { createRng } from '@/lib/random'
import { fmt } from '@/lib/utils'
import { useChallengeReporter } from '@/hooks/useChallenge'
import { useThemeMode } from '@/hooks/useThemeMode'

type Reg = 'none' | 'ridge' | 'lasso'

function fit(reg: Reg, xs: number[], ys: number[], degree: number, lambda: number) {
  if (reg === 'lasso') return lassoFit(xs, ys, degree, lambda, 1500)
  return ridgeFit(xs, ys, degree, reg === 'ridge' ? lambda : 0)
}

export default function RegularizationViz() {
  const mode = useThemeMode()
  const report = useChallengeReporter()
  const [degree, setDegree] = useState(12)
  const [reg, setReg] = useState<Reg>('none')
  const [logLambda, setLogLambda] = useState(-3)
  const [noise, setNoise] = useState(0.2)
  const [seed, setSeed] = useState(3)
  const lambda = 10 ** logLambda
  const train = useMemo(() => sampleCurve(15, noise, createRng(seed)), [noise, seed])
  const val = useMemo(() => sampleCurve(200, noise, createRng(seed + 1)), [noise, seed])
  const w = useMemo(() => fit(reg, train.xs, train.ys, degree, lambda), [reg, train, degree, lambda])
  const trainMse = mseOf(w, train.xs, train.ys)
  const valMse = mseOf(w, val.xs, val.ys)
  useEffect(() => {
    if (degree >= 10) report('reg-val-mse', valMse)
  }, [degree, valMse, report])

  const byDegree = useMemo(
    () =>
      Array.from({ length: 14 }, (_, k) => {
        const d = k + 1
        const wd = fit(reg, train.xs, train.ys, d, lambda)
        return { degree: d, train: mseOf(wd, train.xs, train.ys), validation: mseOf(wd, val.xs, val.ys) }
      }),
    [reg, train, val, lambda],
  )
  const byLambda = useMemo(
    () =>
      reg === 'none'
        ? []
        : linspace(-6, 0, 25).map((l) => {
            const wl = fit(reg, train.xs, train.ys, degree, 10 ** l)
            return { logLambda: Number(l.toFixed(2)), train: mseOf(wl, train.xs, train.ys), validation: mseOf(wl, val.xs, val.ys) }
          }),
    [reg, train, val, degree],
  )
  const curve = useMemo(() => linspace(-1, 1, 200).map((x) => [x, predictPoly(w, x)] as const), [w])
  const truth = useMemo(() => linspace(-1, 1, 100).map((x) => [x, trueFunction(x)] as const), [])
  const colors = CATEGORICAL[mode]
  const maxAbs = Math.max(...w.slice(1).map(Math.abs), 1e-9)
  const zeros = w.slice(1).filter((c) => c === 0).length

  return (
    <VizFrame
      title="Over-fitting and regularisation"
      description="Fit a polynomial to 15 noisy samples of a smooth curve, then check it against 200 fresh validation points. High degree plus no penalty fits the noise. L2 (ridge) shrinks every coefficient, and L1 (lasso) switches some off entirely."
      controls={
        <>
          <ControlGroup title="Model">
            <LabeledSlider label="Polynomial degree" value={degree} min={1} max={14} step={1} onChange={setDegree} />
            <Segmented
              label="Penalty"
              value={reg}
              onChange={setReg}
              options={[
                { value: 'none', label: 'None' },
                { value: 'ridge', label: 'Ridge (L2)' },
                { value: 'lasso', label: 'Lasso (L1)' },
              ]}
            />
            {reg !== 'none' && <LabeledSlider label="Strength λ" value={logLambda} min={-6} max={0} step={0.05} onChange={setLogLambda} format={(v) => (10 ** v).toExponential(1)} />}
          </ControlGroup>
          <ControlGroup title="Data">
            <LabeledSlider label="Noise σ" value={noise} min={0.02} max={0.5} step={0.01} onChange={setNoise} format={(v) => v.toFixed(2)} />
            <button className="text-xs text-primary underline" onClick={() => setSeed((s) => s + 2)}>
              Draw a new training set
            </button>
          </ControlGroup>
        </>
      }
    >
      <div className="space-y-4">
        <Plot2D domain={{ xMin: -1.05, xMax: 1.05, yMin: -2, yMax: 2 }} aspect={0.55} ariaLabel="Training points, validation points, the true curve and the fitted polynomial" gridStep={0.5}>
          {(s) => (
            <>
              {val.xs.map((x, i) => (
                <circle key={`v${i}`} cx={s.sx(x)} cy={s.sy(val.ys[i])} r={2} className="fill-muted-foreground" opacity={0.35} />
              ))}
              <polyline points={truth.map(([x, y]) => `${s.sx(x)},${s.sy(y)}`).join(' ')} fill="none" className="stroke-muted-foreground" strokeWidth={1} />
              <polyline points={curve.map(([x, y]) => `${s.sx(x)},${s.sy(Math.max(-3, Math.min(3, y)))}`).join(' ')} fill="none" stroke={colors[1]} strokeWidth={2} />
              {train.xs.map((x, i) => (
                <circle key={`t${i}`} cx={s.sx(x)} cy={s.sy(train.ys[i])} r={5} fill={colors[0]} stroke="var(--viz-surface)" strokeWidth={2} />
              ))}
            </>
          )}
        </Plot2D>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block size-2.5 rounded-full" style={{ background: colors[0] }} /> 15 training points
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block size-2 rounded-full bg-muted-foreground opacity-50" /> validation points
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-0.5 w-4 rounded" style={{ background: colors[1] }} /> fitted polynomial
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-px w-4 bg-muted-foreground" /> true curve sin(πx) + 0.3x
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <StatTile label="Training MSE" value={fmt(trainMse, 4)} />
          <StatTile label="Validation MSE" value={fmt(valMse, 4)} tone={degree >= 10 ? (valMse <= 0.15 ? 'good' : 'bad') : undefined} sub={`noise floor σ² = ${fmt(noise * noise, 3)}`} />
          <StatTile label="‖w‖₂ (no intercept)" value={fmt(Math.hypot(...w.slice(1)), 3)} />
          <StatTile label="Zero coefficients" value={`${zeros} / ${degree}`} sub={reg === 'lasso' ? 'L1 induces sparsity' : undefined} />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <figure>
            <figcaption className="mb-1 text-xs font-medium text-muted-foreground">Error vs degree (current penalty): the bias–variance U</figcaption>
            <LineChart
              ariaLabel="Training and validation error as a function of polynomial degree"
              data={byDegree}
              xKey="degree"
              xLabel="degree"
              series={[
                { key: 'train', label: 'Training', slot: 0 },
                { key: 'validation', label: 'Validation', slot: 1 },
              ]}
              logY
              yDomain={['auto', 'auto']}
              height={210}
            />
          </figure>
          {reg !== 'none' ? (
            <figure>
              <figcaption className="mb-1 text-xs font-medium text-muted-foreground">Error vs log₁₀ λ at degree {degree}</figcaption>
              <LineChart
                ariaLabel="Training and validation error as a function of the regularisation strength"
                data={byLambda}
                xKey="logLambda"
                xLabel="log₁₀ λ"
                series={[
                  { key: 'train', label: 'Training', slot: 0 },
                  { key: 'validation', label: 'Validation', slot: 1 },
                ]}
                logY
                yDomain={['auto', 'auto']}
                height={210}
              />
            </figure>
          ) : (
            <div className="flex items-center rounded-lg border bg-muted/40 p-4 text-sm text-muted-foreground">Choose Ridge or Lasso to see how the validation error depends on λ.</div>
          )}
        </div>
        <figure className="space-y-1">
          <figcaption className="text-xs font-medium text-muted-foreground">Coefficient magnitudes |w₁| … |w_d| (relative)</figcaption>
          <div className="flex h-20 items-end gap-1 rounded-lg border bg-background/50 p-2" role="img" aria-label="Bar chart of coefficient magnitudes">
            {w.slice(1).map((c, k) => (
              <div key={k} className="flex flex-1 flex-col items-center gap-0.5" title={`w${k + 1} = ${c.toExponential(3)}`}>
                <div className="w-full max-w-6 rounded-t-sm" style={{ height: `${Math.max(c === 0 ? 0 : 2, (Math.abs(c) / maxAbs) * 52)}px`, background: c === 0 ? 'transparent' : colors[0] }} />
                <span className="font-mono text-[9px] text-muted-foreground">{c === 0 ? '0' : k + 1}</span>
              </div>
            ))}
          </div>
        </figure>
      </div>
    </VizFrame>
  )
}
