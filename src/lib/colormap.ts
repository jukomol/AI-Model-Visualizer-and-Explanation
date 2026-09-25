/**
 * Colour scales for heatmaps, feature maps and weights.
 *
 *  - sequential: one hue (blue), receding toward the chart surface at zero.
 *  - diverging: blue ↔ red poles with a neutral gray midpoint.
 *  - categorical: fixed-order, colour-vision-deficiency-validated slots.
 * Every scale has a light- and a dark-surface variant.
 */

export type RGB = [number, number, number]
export type Mode = 'light' | 'dark'

function hex(h: string): RGB {
  const n = parseInt(h.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

const SEQUENTIAL: Record<Mode, RGB[]> = {
  light: ['#f4f8fd', '#cde2fb', '#9ec5f4', '#6da7ec', '#3987e5', '#256abf', '#184f95', '#0d366b'].map(hex),
  dark: ['#141b26', '#104281', '#1c5cab', '#2a78d6', '#5598e7', '#86b6ef', '#b7d3f6', '#e8f1fd'].map(hex),
}

const DIVERGING: Record<Mode, RGB[]> = {
  light: ['#0d366b', '#256abf', '#6da7ec', '#f0efec', '#ec8e8c', '#d03b3b', '#7f1d1d'].map(hex),
  dark: ['#b7d3f6', '#5598e7', '#1c5cab', '#383835', '#b83a3a', '#e66767', '#f5c2c0'].map(hex),
}

/** Categorical series colours (slot order is part of the CVD-safety design). */
export const CATEGORICAL: Record<Mode, readonly string[]> = {
  light: ['#2a78d6', '#eb6834', '#1baf7a', '#eda100', '#e87ba4', '#008300', '#4a3aa7', '#e34948'],
  dark: ['#3987e5', '#d95926', '#199e70', '#c98500', '#d55181', '#008300', '#9085e9', '#e66767'],
}

/**
 * Class-identity colours for scatter plots (slots 1, 2, 3, 7). The first three
 * validate all-pairs for colour-vision deficiency; a fourth class always gets a
 * distinct marker shape as well, so identity never rests on colour alone.
 */
export const CLASS_COLORS: Record<Mode, readonly string[]> = {
  light: ['#2a78d6', '#eb6834', '#1baf7a', '#4a3aa7'],
  dark: ['#3987e5', '#d95926', '#199e70', '#9085e9'],
}

/** Chart chrome tokens. */
export const CHART_INK: Record<Mode, { surface: string; grid: string; axis: string; muted: string; text: string }> = {
  light: { surface: '#fcfcfb', grid: '#e1e0d9', axis: '#c3c2b7', muted: '#898781', text: '#52514e' },
  dark: { surface: '#1a1a19', grid: '#2c2c2a', axis: '#383835', muted: '#898781', text: '#c3c2b7' },
}

function sample(stops: readonly RGB[], t: number): RGB {
  const x = Math.min(1, Math.max(0, Number.isFinite(t) ? t : 0)) * (stops.length - 1)
  const i = Math.min(stops.length - 2, Math.floor(x))
  const f = x - i
  const a = stops[i]
  const b = stops[i + 1]
  return [Math.round(a[0] + (b[0] - a[0]) * f), Math.round(a[1] + (b[1] - a[1]) * f), Math.round(a[2] + (b[2] - a[2]) * f)]
}

/** t ∈ [0, 1] → one-hue sequential ramp (0 = near the surface). */
export function sequential(t: number, mode: Mode = 'dark'): RGB {
  return sample(SEQUENTIAL[mode], t)
}

/** t ∈ [−1, 1] → blue (negative) / gray (zero) / red (positive). */
export function diverging(t: number, mode: Mode = 'dark'): RGB {
  return sample(DIVERGING[mode], (t + 1) / 2)
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

export type ScaleKind = 'sequential' | 'diverging' | 'grayscale'

/**
 * Convert a row-major scalar field to RGBA pixels.
 * `sequential` normalises to [min, max]; `diverging` to ±max|v| (so zero is
 * always the neutral midpoint); `grayscale` maps [min, max] to black → white.
 */
export function toRgba(
  values: ArrayLike<number>,
  kind: ScaleKind = 'sequential',
  mode: Mode = 'dark',
  range?: [number, number],
): Uint8ClampedArray {
  const out = new Uint8ClampedArray(values.length * 4)
  const [lo, hi] = range ?? minMax(values)
  const m = kind === 'diverging' ? (range ? Math.max(Math.abs(range[0]), Math.abs(range[1])) : maxAbs(values)) || 1 : 1
  const span = hi - lo || 1
  for (let i = 0; i < values.length; i++) {
    let c: RGB
    if (kind === 'diverging') c = diverging(values[i] / m, mode)
    else if (kind === 'grayscale') {
      const g = Math.round(255 * Math.min(1, Math.max(0, (values[i] - lo) / span)))
      c = [g, g, g]
    } else c = sequential((values[i] - lo) / span, mode)
    out[i * 4] = c[0]
    out[i * 4 + 1] = c[1]
    out[i * 4 + 2] = c[2]
    out[i * 4 + 3] = 255
  }
  return out
}

/** Marker shapes that pair with categorical slots so class identity is never colour-only. */
export const CLASS_SHAPES = ['circle', 'square', 'triangle', 'diamond'] as const
export type ClassShape = (typeof CLASS_SHAPES)[number]

/** Text colour (near-black or white) that stays legible on a filled background. */
export function inkOn([r, g, b]: RGB): string {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 140 ? '#0b0b0b' : '#ffffff'
}
