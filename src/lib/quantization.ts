/**
 * Post-training quantisation of FP32 tensors to low-bit integers
 * (Jacob et al., 2018; Krishnamoorthi, 2018).
 *
 *   q = clamp(round(x / s) + z, q_min, q_max),   x̂ = s · (q − z)
 */
import type { Rng } from './random'

export interface QuantParams {
  bits: number
  scale: number
  zeroPoint: number
  qmin: number
  qmax: number
  /** The real-valued range that maps onto [qmin, qmax]. */
  range: [number, number]
}

export interface QuantResult extends QuantParams {
  q: Int32Array
  dequantized: Float32Array
  clippedCount: number
}

export type CalibrationMethod = 'minmax' | 'percentile'

/** Choose the clipping range: raw min/max, or symmetric percentiles of |x|-tails. */
export function calibrateRange(values: ArrayLike<number>, method: CalibrationMethod, percentile = 99.9): [number, number] {
  const arr = Float64Array.from(values as ArrayLike<number>).sort()
  if (arr.length === 0) return [0, 0]
  if (method === 'minmax') return [arr[0], arr[arr.length - 1]]
  const pick = (p: number) => arr[Math.min(arr.length - 1, Math.max(0, Math.round((p / 100) * (arr.length - 1))))]
  return [pick(100 - percentile), pick(percentile)]
}

/** Affine (asymmetric) or symmetric quantisation parameters for signed b-bit integers. */
export function quantParams(range: [number, number], bits: number, symmetric: boolean): QuantParams {
  const qmin = -(2 ** (bits - 1))
  const qmax = 2 ** (bits - 1) - 1
  if (symmetric) {
    const a = Math.max(Math.abs(range[0]), Math.abs(range[1])) || 1e-8
    // Restricted range [−qmax, qmax] keeps the grid symmetric around zero.
    return { bits, scale: a / qmax, zeroPoint: 0, qmin: -qmax, qmax, range: [-a, a] }
  }
  // Include 0 so that zero (padding, ReLU outputs) is exactly representable.
  const lo = Math.min(range[0], 0)
  const hi = Math.max(range[1], 0)
  const scale = (hi - lo) / (qmax - qmin) || 1e-8
  const zeroPoint = Math.min(qmax, Math.max(qmin, Math.round(qmin - lo / scale)))
  return { bits, scale, zeroPoint, qmin, qmax, range: [lo, hi] }
}

export function quantize(values: ArrayLike<number>, params: QuantParams): QuantResult {
  const n = values.length
  const q = new Int32Array(n)
  const dequantized = new Float32Array(n)
  let clippedCount = 0
  for (let i = 0; i < n; i++) {
    const raw = Math.round(values[i] / params.scale) + params.zeroPoint
    const c = Math.min(params.qmax, Math.max(params.qmin, raw))
    if (c !== raw) clippedCount++
    q[i] = c
    dequantized[i] = params.scale * (c - params.zeroPoint)
  }
  return { ...params, q, dequantized, clippedCount }
}

export function meanSquaredErrorArrays(a: ArrayLike<number>, b: ArrayLike<number>): number {
  let s = 0
  for (let i = 0; i < a.length; i++) s += (a[i] - b[i]) ** 2
  return s / a.length
}

/** Signal-to-quantisation-noise ratio in decibels: 10·log₁₀(Σx² / Σ(x − x̂)²). */
export function sqnrDb(signal: ArrayLike<number>, approx: ArrayLike<number>): number {
  let p = 0
  let e = 0
  for (let i = 0; i < signal.length; i++) {
    p += signal[i] ** 2
    e += (signal[i] - approx[i]) ** 2
  }
  return e === 0 ? Infinity : 10 * Math.log10(p / e)
}

/** Memory for n parameters at the given bit width (bytes). */
export function memoryBytes(n: number, bits: number): number {
  return Math.ceil((n * bits) / 8)
}

/**
 * A weight tensor with the heavy-tailed shape typical of trained layers:
 * Laplace-distributed bulk plus a handful of large-magnitude outliers.
 */
export function sampleLayerWeights(n: number, rng: Rng, scale = 0.05, outlierFraction = 0.002): Float32Array {
  const out = new Float32Array(n)
  for (let i = 0; i < n; i++) {
    const u = rng.next() - 0.5
    out[i] = -scale * Math.sign(u) * Math.log(1 - 2 * Math.abs(u))
    if (rng.next() < outlierFraction) out[i] = (rng.next() < 0.5 ? -1 : 1) * rng.uniform(0.6, 1.0)
  }
  return out
}
