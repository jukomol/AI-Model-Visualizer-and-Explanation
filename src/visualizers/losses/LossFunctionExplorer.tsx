import { useEffect, useMemo, useState } from 'react'
import { NativeSelect } from '@/components/ui/select'
import { ControlGroup, LabeledSlider, Segmented, StatTile } from '@/components/viz/Controls'
import { LineChart } from '@/components/viz/LineChart'
import { Plot2D } from '@/components/viz/Plot2D'
import { VizFrame } from '@/components/viz/VizFrame'
import { CATEGORICAL } from '@/lib/colormap'
import { linspace } from '@/lib/linalg'
import {
  MARGIN_LOSS_LABELS,
  REGRESSION_LOSS_LABELS,
  fitLineWithLoss,
  marginLoss,
  marginLossGrad,
  outlierDataset,
  regressionLoss,
  regressionLossGrad,
  type MarginLossId,
  type RegressionLossId,
} from '@/lib/losses'
import { fmt, pct } from '@/lib/utils'
import { useChallengeReporter } from '@/hooks/useChallenge'
import { useThemeMode } from '@/hooks/useThemeMode'

type Tab = 'regression' | 'classification' | 'outliers'

/** Colour follows the loss, never its position in the selection. */
const REG_SLOT: Record<RegressionLossId, number> = { mse: 0, mae: 1, huber: 2, logcosh: 4, quantile: 6 }
const MARGIN_SLOT: Record<MarginLossId, number> = { 'zero-one': 7, hinge: 0, 'squared-hinge': 2, logistic: 1, exponential: 4, focal: 6 }

function Checklist<T extends string>({ items, labels, selected, onChange, slots }: { items: T[]; labels: Record<T, string>; selected: Set<T>; onChange: (s: Set<T>) => void; slots: Record<T, number> }) {
  const mode = useThemeMode()
  return (
    <div className="space-y-1.5">
      {items.map((id) => (
        <label key={id} className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            className="accent-[var(--primary)]"
            checked={selected.has(id)}
            onChange={(e) => {
              const next = new Set(selected)
              if (e.target.checked) next.add(id)
              else next.delete(id)
              onChange(next)
            }}
          />
          <span className="inline-block h-0.5 w-4 rounded" style={{ background: CATEGORICAL[mode][slots[id]] }} aria-hidden />
          {labels[id]}
        </label>
      ))}
    </div>
  )
}

function ShapeCharts({ data, series, xLabel, xKey }: { data: object[]; series: { key: string; label: string; slot: number }[]; xLabel: string; xKey: string }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <figure>
        <figcaption className="mb-1 text-xs font-medium text-muted-foreground">Loss L</figcaption>
        <LineChart ariaLabel="Loss as a function of the error" data={data} xKey={xKey} xLabel={xLabel} series={series} yDomain={[0, 'auto']} height={240} />
      </figure>
      <figure>
        <figcaption className="mb-1 text-xs font-medium text-muted-foreground">Gradient dL/d{xKey === 'r' ? 'r' : 'm'}: what the optimiser feels</figcaption>
        <LineChart ariaLabel="Gradient of the loss" data={data} xKey={xKey} xLabel={xLabel} series={series.map((s) => ({ ...s, key: `${s.key}_g` }))} yDomain={['auto', 'auto']} height={240} />
      </figure>
    </div>
  )
}

export default function LossFunctionExplorer({ initialTab = 'regression' }: { initialTab?: Tab }) {
  const mode = useThemeMode()
  const report = useChallengeReporter()
  const [tab, setTab] = useState<Tab>(initialTab)
  const [reg, setReg] = useState<Set<RegressionLossId>>(new Set(['mse', 'mae', 'huber']))
  const [margin, setMargin] = useState<Set<MarginLossId>>(new Set(['zero-one', 'hinge', 'logistic', 'exponential']))
  const [delta, setDelta] = useState(1)
  const [tau, setTau] = useState(0.8)
  const [gamma, setGamma] = useState(2)
  const [outliers, setOutliers] = useState(6)
  const [magnitude, setMagnitude] = useState(20)
  const [fitLoss, setFitLoss] = useState<RegressionLossId>('mse')

  const regData = useMemo(
    () =>
      linspace(-4, 4, 161).map((r) => {
        const row: Record<string, number> = { r: Number(r.toFixed(2)) }
        for (const id of reg) {
          const p = id === 'huber' ? delta : tau
          row[id] = regressionLoss(id, r, p)
          row[`${id}_g`] = regressionLossGrad(id, r, p)
        }
        return row
      }),
    [reg, delta, tau],
  )
  const marginData = useMemo(
    () =>
      linspace(-3, 3, 121).map((m) => {
        const row: Record<string, number> = { m: Number(m.toFixed(2)) }
        for (const id of margin) {
          row[id] = marginLoss(id, m, gamma)
          row[`${id}_g`] = marginLossGrad(id, m, gamma)
        }
        return row
      }),
    [margin, gamma],
  )

  const data = useMemo(() => outlierDataset(outliers, magnitude), [outliers, magnitude])
  const fits = useMemo(() => {
    const p = fitLoss === 'huber' ? delta : tau
    return { mse: fitLineWithLoss(data.xs, data.ys, 'mse'), chosen: fitLineWithLoss(data.xs, data.ys, fitLoss, p) }
  }, [data, fitLoss, delta, tau])
  const relErr = Math.abs(fits.chosen.slope - data.trueSlope) / data.trueSlope
  useEffect(() => {
    if (tab === 'outliers' && outliers >= 6) report('robust-slope-error', relErr)
  }, [tab, outliers, relErr, report])

  const colors = CATEGORICAL[mode]
  return (
    <VizFrame
      title="Loss functions"
      description="A loss turns an error into a number to minimise, and its gradient decides how hard each example pulls on the model. Compare shapes and gradients, then see what that means for outliers."
      controls={
        <>
          {tab === 'regression' && (
            <ControlGroup title="Regression losses">
              <Checklist items={['mse', 'mae', 'huber', 'logcosh', 'quantile']} labels={REGRESSION_LOSS_LABELS} selected={reg} onChange={setReg} slots={REG_SLOT} />
              <LabeledSlider label="Huber δ" value={delta} min={0.1} max={3} step={0.05} onChange={setDelta} format={(v) => v.toFixed(2)} />
              <LabeledSlider label="Quantile τ" value={tau} min={0.05} max={0.95} step={0.05} onChange={setTau} format={(v) => v.toFixed(2)} />
            </ControlGroup>
          )}
          {tab === 'classification' && (
            <ControlGroup title="Margin losses">
              <Checklist items={['zero-one', 'hinge', 'squared-hinge', 'logistic', 'exponential', 'focal']} labels={MARGIN_LOSS_LABELS} selected={margin} onChange={setMargin} slots={MARGIN_SLOT} />
              <LabeledSlider label="Focal γ" value={gamma} min={0} max={5} step={0.1} onChange={setGamma} format={(v) => v.toFixed(1)} />
            </ControlGroup>
          )}
          {tab === 'outliers' && (
            <ControlGroup title="Robust fitting">
              <NativeSelect aria-label="Loss to fit with" value={fitLoss} onChange={(e) => setFitLoss(e.target.value as RegressionLossId)}>
                {(['mse', 'mae', 'huber', 'logcosh', 'quantile'] as const).map((id) => (
                  <option key={id} value={id}>
                    Fit with {REGRESSION_LOSS_LABELS[id]}
                  </option>
                ))}
              </NativeSelect>
              {fitLoss === 'huber' && <LabeledSlider label="Huber δ (y units)" value={delta} min={0.1} max={30} step={0.1} onChange={setDelta} format={(v) => v.toFixed(1)} />}
              {fitLoss === 'quantile' && <LabeledSlider label="Quantile τ" value={tau} min={0.05} max={0.95} step={0.05} onChange={setTau} format={(v) => v.toFixed(2)} />}
              <LabeledSlider label="Number of outliers" value={outliers} min={0} max={12} step={1} onChange={setOutliers} />
              <LabeledSlider label="Outlier size" value={magnitude} min={2} max={40} step={1} onChange={setMagnitude} />
            </ControlGroup>
          )}
        </>
      }
    >
      <div className="space-y-4">
        <Segmented
          value={tab}
          onChange={setTab}
          options={[
            { value: 'regression', label: 'Regression r = ŷ − y' },
            { value: 'classification', label: 'Classification m = y·f(x)' },
            { value: 'outliers', label: 'Outliers' },
          ]}
          className="max-w-xl"
        />
        {tab === 'regression' && (
          <ShapeCharts data={regData} xKey="r" xLabel="residual r = ŷ − y" series={[...reg].map((id) => ({ key: id, label: REGRESSION_LOSS_LABELS[id], slot: REG_SLOT[id] }))} />
        )}
        {tab === 'classification' && (
          <>
            <ShapeCharts data={marginData} xKey="m" xLabel="margin m = y·f(x)  (m < 0: misclassified)" series={[...margin].map((id) => ({ key: id, label: MARGIN_LOSS_LABELS[id], slot: MARGIN_SLOT[id] }))} />
            <p className="text-xs text-muted-foreground">
              The 0–1 loss is what we care about but has zero gradient almost everywhere. Every surrogate is a convex (or smooth) upper bound that
              still points the optimiser in the right direction.
            </p>
          </>
        )}
        {tab === 'outliers' && (
          <div className="space-y-3">
            <Plot2D domain={{ xMin: -0.5, xMax: 10.5, yMin: -2, yMax: 50 }} aspect={0.55} ariaLabel="Data with outliers and two fitted lines" gridStep={5}>
              {(s) => (
                <>
                  <line x1={s.sx(-0.5)} x2={s.sx(10.5)} y1={s.sy(2 * -0.5 + 1)} y2={s.sy(2 * 10.5 + 1)} className="stroke-muted-foreground" strokeWidth={1} />
                  {[
                    { f: fits.mse, c: colors[REG_SLOT.mse] },
                    ...(fitLoss === 'mse' ? [] : [{ f: fits.chosen, c: colors[REG_SLOT[fitLoss]] }]),
                  ].map(({ f, c }, k) => (
                    <line key={k} x1={s.sx(-0.5)} x2={s.sx(10.5)} y1={s.sy(f.slope * -0.5 + f.intercept)} y2={s.sy(f.slope * 10.5 + f.intercept)} stroke={c} strokeWidth={2} />
                  ))}
                  {data.xs.map((x, i) => (
                    <circle key={i} cx={s.sx(x)} cy={s.sy(data.ys[i])} r={data.isOutlier[i] ? 5 : 4} fill={data.isOutlier[i] ? colors[7] : colors[0]} stroke="var(--viz-surface)" strokeWidth={2} />
                  ))}
                </>
              )}
            </Plot2D>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block h-0.5 w-4 rounded" style={{ background: colors[REG_SLOT.mse] }} /> MSE fit
              </span>
              {fitLoss !== 'mse' && (
                <span className="inline-flex items-center gap-1.5">
                  <span className="inline-block h-0.5 w-4 rounded" style={{ background: colors[REG_SLOT[fitLoss]] }} /> {REGRESSION_LOSS_LABELS[fitLoss]} fit
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block h-px w-4 bg-muted-foreground" /> true line y = 2x + 1
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block size-2 rounded-full" style={{ background: colors[7] }} /> outlier
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <StatTile label="MSE slope" value={fmt(fits.mse.slope, 3)} sub={`error ${pct(Math.abs(fits.mse.slope - 2) / 2)}`} />
              <StatTile label={`${REGRESSION_LOSS_LABELS[fitLoss]} slope`} value={fmt(fits.chosen.slope, 3)} sub={`error ${pct(relErr)}`} tone={relErr <= 0.05 ? 'good' : 'bad'} />
              <StatTile label="True slope" value="2" sub={`${outliers} outliers of +${magnitude}`} />
            </div>
          </div>
        )}
      </div>
    </VizFrame>
  )
}
