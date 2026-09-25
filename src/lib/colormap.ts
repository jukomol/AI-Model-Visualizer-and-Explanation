/**
 * Perceptually-uniform colour maps for heatmaps, feature maps and weights.
 */

export type RGB = [number, number, number]

// Viridis control points (matplotlib), 0–255.
const VIRIDIS: RGB[] = [
  [68, 1, 84],
  [72, 40, 120],
  [62, 73, 137],
  [49, 104, 142],
  [38, 130, 142],
  [31, 158, 137],
  [53, 183, 121],
  [109, 205, 89],
  [180, 222, 44],
  [253, 231, 37],
]

// Blue → near-white → red diverging map (RdBu reversed), 0–255.
const DIVERGING: RGB[] = [
  [33, 102, 172],
  [103, 169, 207],
  [209, 229, 240],
  [247, 247, 247],
  [253, 219, 199],
  [239, 138, 98],
  [178, 24, 43],
]

function sample(stops: readonly RGB[], t: number): RGB {
  const x = Math.min(1, Math.max(0, Number.isFinite(t) ? t : 0)) * (stops.length - 1)
  const i = Math.min(stops.length - 2, Math.floor(x))
  const f = x - i
  const a = stops[i]
  const b = stops[i + 1]
  return [Math.round(a[0] + (b[0] - a[0]) * f), Math.round(a[1] + (b[1] - a[1]) * f), Math.round(a[2] + (b[2] - a[2]) * f)]
}

/** t ∈ [0, 1] → viridis. */
export function viridis(t: number): RGB {
  return sample(VIRIDIS, t)
}

/** t ∈ [−1, 1] → blue (negative) / white (zero) / red (positive). */
export function diverging(t: number): RGB {
  return sample(DIVERGING, (t + 1) / 2)
}

export function rgbString([r, g, b]: RGB, alpha = 1): string {
  return alpha === 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export function minMax(values: ArrayLike<number>): [number, number] {
  let lo = Infinity
  let hi = -Infinity
  for (let i = 0; i < values.length; i++) {
    const v = values[i]
    if (v < lo) lo = v
    if (v > hi) hi = v
  }
  return [lo, hi]
}

export function maxAbs(values: ArrayLike<number>): number {
  let m = 0
  for (let i = 0; i < values.length; i++) m = Math.max(m, Math.abs(values[i]))
  return m
}

/**
 * Convert a row-major scalar field to RGBA pixels.
 * `sequential` normalises to [min, max] with viridis; `diverging` to ±max|v|.
 */
export function toRgba(
  values: ArrayLike<number>,
  mode: 'sequential' | 'diverging' = 'sequential',
  range?: [number, number],
): Uint8ClampedArray {
  const out = new Uint8ClampedArray(values.length * 4)
  const [lo, hi] = range ?? minMax(values)
  const m = mode === 'diverging' ? (range ? Math.max(Math.abs(range[0]), Math.abs(range[1])) : maxAbs(values)) || 1 : 1
  const span = hi - lo || 1
  for (let i = 0; i < values.length; i++) {
    const c = mode === 'diverging' ? diverging(values[i] / m) : viridis((values[i] - lo) / span)
    out[i * 4] = c[0]
    out[i * 4 + 1] = c[1]
    out[i * 4 + 2] = c[2]
    out[i * 4 + 3] = 255
  }
  return out
}

/** Colours used for class labels throughout the app (colour-blind friendly). */
export const CLASS_COLORS = ['#38bdf8', '#f97316', '#a3e635', '#e879f9', '#facc15', '#f43f5e'] as const
