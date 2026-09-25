/**
 * Activation functions, their derivatives, and a simulation of how signals
 * and gradients propagate through a deep fully-connected network.
 */
import type { Rng } from './random'

export type ActivationId = 'sigmoid' | 'tanh' | 'relu' | 'leaky-relu' | 'elu' | 'gelu' | 'silu' | 'softplus'

export const ACTIVATION_LABELS: Record<ActivationId, string> = {
  sigmoid: 'Sigmoid',
  tanh: 'tanh',
  relu: 'ReLU',
  'leaky-relu': 'Leaky ReLU (0.01)',
  elu: 'ELU',
  gelu: 'GELU',
  silu: 'SiLU / Swish',
  softplus: 'Softplus',
}

export const ACTIVATION_TEX: Record<ActivationId, string> = {
  sigmoid: String.raw`\sigma(x) = \frac{1}{1 + e^{-x}}`,
  tanh: String.raw`\tanh(x) = \frac{e^{x} - e^{-x}}{e^{x} + e^{-x}}`,
  relu: String.raw`\operatorname{ReLU}(x) = \max(0, x)`,
  'leaky-relu': String.raw`\operatorname{LReLU}(x) = \max(0.01x,\ x)`,
  elu: String.raw`\operatorname{ELU}(x) = \begin{cases} x & x > 0 \\ e^{x} - 1 & x \le 0 \end{cases}`,
  gelu: String.raw`\operatorname{GELU}(x) = x\,\Phi(x) = \tfrac{x}{2}\big(1 + \operatorname{erf}(x/\sqrt2)\big)`,
  silu: String.raw`\operatorname{SiLU}(x) = x\,\sigma(x)`,
  softplus: String.raw`\operatorname{softplus}(x) = \log(1 + e^{x})`,
}

/** Error function, Abramowitz & Stegun 7.1.26 (|error| < 1.5·10⁻⁷). */
export function erf(x: number): number {
  const s = Math.sign(x)
  const a = Math.abs(x)
  const t = 1 / (1 + 0.3275911 * a)
  const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-a * a)
  return s * y
}

const sig = (x: number) => (x >= 0 ? 1 / (1 + Math.exp(-x)) : Math.exp(x) / (1 + Math.exp(x)))
const phi = (x: number) => Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI)
const Phi = (x: number) => 0.5 * (1 + erf(x / Math.SQRT2))

export function activation(id: ActivationId, x: number): number {
  switch (id) {
    case 'sigmoid':
      return sig(x)
    case 'tanh':
      return Math.tanh(x)
    case 'relu':
      return Math.max(0, x)
    case 'leaky-relu':
      return x > 0 ? x : 0.01 * x
    case 'elu':
      return x > 0 ? x : Math.expm1(x)
    case 'gelu':
      return x * Phi(x)
    case 'silu':
      return x * sig(x)
    case 'softplus':
      return x > 30 ? x : Math.log1p(Math.exp(x))
  }
}

export function activationGrad(id: ActivationId, x: number): number {
  switch (id) {
    case 'sigmoid': {
      const s = sig(x)
      return s * (1 - s)
    }
    case 'tanh':
      return 1 - Math.tanh(x) ** 2
    case 'relu':
      return x > 0 ? 1 : 0
    case 'leaky-relu':
      return x > 0 ? 1 : 0.01
    case 'elu':
      return x > 0 ? 1 : Math.exp(x)
    case 'gelu':
      return Phi(x) + x * phi(x)
    case 'silu': {
      const s = sig(x)
      return s + x * s * (1 - s)
    }
    case 'softplus':
      return sig(x)
  }
}

export type InitScheme = 'xavier' | 'he' | 'small'

export const INIT_LABELS: Record<InitScheme, string> = {
  xavier: 'Xavier/Glorot  N(0, 1/n)',
  he: 'He/Kaiming  N(0, 2/n)',
  small: 'Naive  N(0, 0.01²)',
}

export interface DeepSignal {
  /** Standard deviation of the activations after each layer. */
  activationStd: number[]
  /** Mean ‖∂L/∂a‖ arriving at each layer's output (index 0 = first layer). */
  gradientNorm: number[]
  /** Fraction of units that are inactive (zero gradient) for every example. */
  deadFraction: number[]
}

/**
 * Push a batch of standard-normal inputs through `depth` random dense layers
 * of `width` units, then back-propagate a random unit-norm output gradient.
 */
export function simulateDeepNetwork(depth: number, width: number, act: ActivationId, init: InitScheme, rng: Rng, batch = 64): DeepSignal {
  const std = init === 'he' ? Math.sqrt(2 / width) : init === 'xavier' ? Math.sqrt(1 / width) : 0.01
  const Ws = Array.from({ length: depth }, () => Array.from({ length: width }, () => Array.from({ length: width }, () => rng.normal(0, std))))
  let a = Array.from({ length: batch }, () => Array.from({ length: width }, () => rng.normal()))
  const pre: number[][][] = []
  const activationStd: number[] = []
  const deadFraction: number[] = []
  for (const W of Ws) {
    const z = a.map((x) => W.map((row) => row.reduce((s, w, i) => s + w * x[i], 0)))
    pre.push(z)
    a = z.map((row) => row.map((v) => activation(act, v)))
    const flat = a.flat()
    const m = flat.reduce((s, v) => s + v, 0) / flat.length
    activationStd.push(Math.sqrt(flat.reduce((s, v) => s + (v - m) ** 2, 0) / flat.length))
    let dead = 0
    for (let j = 0; j < width; j++) if (z.every((row) => activationGrad(act, row[j]) === 0)) dead++
    deadFraction.push(dead / width)
  }
  let g = Array.from({ length: batch }, () => {
    const v = Array.from({ length: width }, () => rng.normal())
    const n = Math.hypot(...v)
    return v.map((x) => x / n)
  })
  const gradientNorm = new Array<number>(depth).fill(0)
  for (let l = depth - 1; l >= 0; l--) {
    gradientNorm[l] = g.reduce((s, row) => s + Math.hypot(...row), 0) / batch
    const local = g.map((row, b) => row.map((v, j) => v * activationGrad(act, pre[l][b][j])))
    // ∂L/∂a_{l−1} = Wᵀ (g ⊙ φ′(z_l))
    g = local.map((row) => Array.from({ length: width }, (_, i) => row.reduce((s, v, j) => s + Ws[l][j][i] * v, 0)))
  }
  return { activationStd, gradientNorm, deadFraction }
}
