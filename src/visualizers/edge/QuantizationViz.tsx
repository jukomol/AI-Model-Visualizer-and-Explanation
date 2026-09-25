import { useEffect, useMemo, useState } from 'react'
import { ControlGroup, LabeledSlider, Segmented, StatTile, ToggleRow } from '@/components/viz/Controls'
import { LineChart } from '@/components/viz/LineChart'
import { VizFrame } from '@/components/viz/VizFrame'
import { CATEGORICAL } from '@/lib/colormap'
import { calibrateRange, memoryBytes, quantParams, quantize, sampleLayerWeights, sqnrDb, type CalibrationMethod } from '@/lib/quantization'
import { createRng } from '@/lib/random'
import { fmt } from '@/lib/utils'
import { useChallengeReporter } from '@/hooks/useChallenge'
import { getSession } from '@/hooks/useExplodedModel'
import { useThemeMode } from '@/hooks/useThemeMode'

type Calib = CalibrationMethod | 'manual'
const BINS = 90

function histogram(values: ArrayLike<number>, lo: number, hi: number) {
  const counts = new Array<number>(BINS).fill(0)
  for (let i = 0; i < values.length; i++) {
    const b = Math.floor(((values[i] - lo) / (hi - lo)) * BINS)
    if (b >= 0 && b < BINS) counts[b]++
  }
  return counts
}

export default function QuantizationViz() {
  const mode = useThemeMode()
  const report = useChallengeReporter()
  const [source, setSource] = useState<'synthetic' | 'tinycnn'>('synthetic')
  const [bits, setBits] = useState(8)
  const [symmetric, setSymmetric] = useState(true)
  const [calib, setCalib] = useState<Calib>('minmax')
  const [percentile, setPercentile] = useState(99.9)
  const [clip, setClip] = useState(0.3)

  const tiny = getSession('tiny-cnn')
  const trainedWeights = useMemo(
    () => (source === 'tinycnn' && tiny.state.history.length > 0 ? (tiny.weights().fc1?.kernel?.data ?? null) : null),
    [source, tiny],
  )
  const weights = useMemo(() => (source === 'tinycnn' && trainedWeights ? Float32Array.from(trainedWeights) : sampleLayerWeights(4096, createRng(7))), [source, trainedWeights])
  const [wMin, wMax] = useMemo(() => calibrateRange(weights, 'minmax'), [weights])
  const maxAbs = Math.max(Math.abs(wMin), Math.abs(wMax))
  const range: [number, number] = calib === 'manual' ? [-clip, clip] : calibrateRange(weights, calib === 'minmax' ? 'minmax' : 'percentile', percentile)
  const params = quantParams(range, bits, symmetric)
  const q = useMemo(() => quantize(weights, params), [weights, params.scale, params.zeroPoint, params.qmin, params.qmax]) // eslint-disable-line react-hooks/exhaustive-deps
  const sqnr = sqnrDb(weights, q.dequantized)
  const mse = q.dequantized.reduce((s, v, i) => s + (v - weights[i]) ** 2, 0) / weights.length
  useEffect(() => {
    if (bits === 4 && source === 'synthetic') report('quant-sqnr-4bit', sqnr)
  }, [bits, source, sqnr, report])

  const sweep = useMemo(() => {
    const out: { clip: number; sqnr: number }[] = []
    for (let k = 1; k <= 60; k++) {
      const c = (maxAbs * k) / 60
      out.push({ clip: Number(c.toFixed(4)), sqnr: sqnrDb(weights, quantize(weights, quantParams([-c, c], bits, true)).dequantized) })
    }
    return out
  }, [weights, bits, maxAbs])
  const best = sweep.reduce((a, b) => (b.sqnr > a.sqnr ? b : a), sweep[0])

  const lo = -maxAbs * 1.05
  const hi = maxAbs * 1.05
  const hist = useMemo(() => histogram(weights, lo, hi), [weights, lo, hi])
  const hmax = Math.max(...hist)
  const levels = useMemo(() => {
    const out: number[] = []
    for (let k = params.qmin; k <= params.qmax; k++) out.push(params.scale * (k - params.zeroPoint))
    return out
  }, [params.qmin, params.qmax, params.scale, params.zeroPoint])
  const W = 600
  const H = 170
  const sx = (v: number) => ((v - lo) / (hi - lo)) * W
  const colors = CATEGORICAL[mode]
  const fp32 = memoryBytes(weights.length, 32)
  const intb = memoryBytes(weights.length, bits)
  const examples = [0, 1, 2, 3, 4].map((k) => Math.floor((k * weights.length) / 5))

  return (
    <VizFrame
      title="Post-training quantisation"
      description="Every FP32 weight snaps to one of 2^b integer levels. The vertical ticks are those levels mapped back to real values. Widen the range and outliers survive, but the grid gets coarser. Clip it and the bulk gets finer steps, but outliers saturate."
      controls={
        <>
          <ControlGroup title="Weights">
            <Segmented
              value={source}
              onChange={setSource}
              options={[
                { value: 'synthetic', label: 'Heavy-tailed layer' },
                { value: 'tinycnn', label: 'Your TinyShapeNet fc1' },
              ]}
            />
            {source === 'tinycnn' && !trainedWeights && <p className="text-xs text-warning">Train TinyShapeNet in the exploded-network lesson first. Showing the synthetic layer until then.</p>}
          </ControlGroup>
          <ControlGroup title="Quantiser">
            <LabeledSlider label="Bit width b" value={bits} min={2} max={8} step={1} onChange={setBits} format={(v) => `INT${v} · ${2 ** v} levels`} />
            <ToggleRow label="Symmetric (zero-point 0)" checked={symmetric} onChange={setSymmetric} />
            <Segmented
              label="Calibration range"
              value={calib}
              onChange={setCalib}
              options={[
                { value: 'minmax', label: 'min / max' },
                { value: 'percentile', label: 'percentile' },
                { value: 'manual', label: 'manual' },
              ]}
            />
            {calib === 'percentile' && <LabeledSlider label="Percentile" value={percentile} min={90} max={100} step={0.05} onChange={setPercentile} format={(v) => `${v.toFixed(2)}%`} />}
            {calib === 'manual' && <LabeledSlider label="Clip at ±α" value={clip} min={maxAbs / 60} max={maxAbs} step={maxAbs / 600} onChange={setClip} format={(v) => v.toFixed(3)} />}
          </ControlGroup>
        </>
      }
    >
      <div className="space-y-4">
        <svg viewBox={`0 0 ${W} ${H + 24}`} className="mx-auto w-full max-w-3xl rounded-lg bg-viz-surface" role="img" aria-label="Histogram of weights with quantisation levels and clipping range">
          {hist.map((c, b) => {
            const h = (c / hmax) * (H - 10)
            return <rect key={b} x={(b * W) / BINS + 1} y={H - h} width={W / BINS - 2} height={h} rx={1.5} fill={colors[0]} />
          })}
          {levels.length <= 64 &&
            levels.map((v, k) => <line key={k} x1={sx(v)} x2={sx(v)} y1={H} y2={H + 8} className="stroke-foreground" strokeWidth={1} />)}
          <rect x={sx(params.range[0])} y={0} width={sx(params.range[1]) - sx(params.range[0])} height={H} className="fill-primary/5 stroke-primary" strokeWidth={1.5} />
          <line x1={sx(0)} x2={sx(0)} y1={0} y2={H} className="stroke-viz-axis" strokeWidth={1} />
          <text x={sx(params.range[0]) + 4} y={14} className="fill-foreground font-mono text-[11px]">
            {fmt(params.range[0], 3)}
          </text>
          <text x={sx(params.range[1]) - 4} y={14} textAnchor="end" className="fill-foreground font-mono text-[11px]">
            {fmt(params.range[1], 3)}
          </text>
          <text x={4} y={H + 20} className="fill-muted-foreground text-[10px]">
            {levels.length <= 64 ? `ticks: the ${levels.length} representable values` : `${levels.length} representable values (too dense to draw)`}
          </text>
        </svg>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <StatTile label="Scale s" value={params.scale.toExponential(3)} sub={`zero-point z = ${params.zeroPoint}`} />
          <StatTile label="SQNR" value={`${fmt(sqnr, 2)} dB`} sub={`MSE ${mse.toExponential(2)}`} tone={bits === 4 && sqnr >= 14.5 ? 'good' : undefined} />
          <StatTile label="Clipped weights" value={q.clippedCount} sub={`${((100 * q.clippedCount) / weights.length).toFixed(2)}% saturate`} />
          <StatTile label="Memory" value={`${(fp32 / intb).toFixed(1)}× smaller`} sub={`${(fp32 / 1024).toFixed(1)} KiB → ${(intb / 1024).toFixed(2)} KiB`} />
        </div>
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_16rem]">
          <LineChart
            ariaLabel="SQNR as a function of the symmetric clipping range"
            data={sweep}
            xKey="clip"
            xLabel="clip range ±α"
            series={[{ key: 'sqnr', label: `SQNR (INT${bits}, symmetric)` }]}
            yDomain={['auto', 'auto']}
            reference={{ y: best.sqnr, label: `best ${fmt(best.sqnr, 1)} dB at ±${fmt(best.clip, 3)}` }}
            height={180}
          />
          <table className="self-start text-xs">
            <caption className="mb-1 text-left text-muted-foreground">x → q → x̂ for sample weights</caption>
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="py-1 pr-2 font-medium">x (FP32)</th>
                <th className="py-1 pr-2 font-medium">q</th>
                <th className="py-1 font-medium">x̂</th>
              </tr>
            </thead>
            <tbody className="tabular font-mono">
              {examples.map((i) => (
                <tr key={i} className="border-b border-border/60">
                  <td className="py-1 pr-2">{weights[i].toFixed(5)}</td>
                  <td className="py-1 pr-2">{q.q[i]}</td>
                  <td className="py-1">{q.dequantized[i].toFixed(5)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </VizFrame>
  )
}
