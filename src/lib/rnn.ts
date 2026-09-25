/**
 * Vanilla (Elman) recurrent network and the vanishing / exploding gradient
 * problem.  h_t = φ(W_h h_{t−1} + W_x x_t + b)
 *
 * Back-propagation through time multiplies one Jacobian per step:
 *   ∂h_T/∂h_t = Π_{k=t+1}^{T} diag(φ′(z_k)) W_h
 * so gradient norms shrink or grow roughly like ‖W_h‖^(T−t).
 */
import { matVec, transpose, type Matrix } from './linalg'
import { createRng, type Rng } from './random'

export type RnnActivation = 'tanh' | 'linear'

/** Random orthogonal matrix (Gram–Schmidt on a Gaussian matrix) scaled by `gain`. */
export function scaledOrthogonal(n: number, gain: number, rng: Rng): Matrix {
  const cols: number[][] = []
  while (cols.length < n) {
    let v = Array.from({ length: n }, () => rng.normal())
    for (const c of cols) {
      const d = v.reduce((s, vi, i) => s + vi * c[i], 0)
      v = v.map((vi, i) => vi - d * c[i])
    }
    const len = Math.hypot(...v)
    if (len < 1e-8) continue
    cols.push(v.map((vi) => vi / len))
  }
  // Columns are orthonormal; transpose into row-major W and scale.
  return transpose(cols).map((row) => row.map((w) => w * gain))
}

export interface RnnConfig {
  hidden: number
  steps: number
  /** ‖W_h‖₂ — all singular values of the recurrent matrix equal this gain. */
  recurrentGain: number
  activation: RnnActivation
  inputScale: number
  seed: number
}

export interface RnnRun {
  /** Hidden states h_0 … h_T (h_0 = 0). */
  states: number[][]
  /** ‖∂L/∂h_t‖ for t = 0 … T with L = mean(h_T). */
  gradientNorms: number[]
}

export function runRnn(config: RnnConfig): RnnRun {
  const rng = createRng(config.seed)
  const n = config.hidden
  const Wh = scaledOrthogonal(n, config.recurrentGain, rng)
  const Wx = Array.from({ length: n }, () => [rng.normal(0, config.inputScale)])
  const act = (z: number) => (config.activation === 'tanh' ? Math.tanh(z) : z)
  const states: number[][] = [new Array<number>(n).fill(0)]
  for (let t = 1; t <= config.steps; t++) {
    const x = rng.normal()
    const z = matVec(Wh, states[t - 1]).map((v, i) => v + Wx[i][0] * x)
    states.push(z.map(act))
  }
  const WhT = transpose(Wh)
  let g = new Array<number>(n).fill(1 / n)
  const norms = new Array<number>(config.steps + 1)
  norms[config.steps] = Math.hypot(...g)
  for (let t = config.steps; t >= 1; t--) {
    const local = g.map((gi, i) => gi * (config.activation === 'tanh' ? 1 - states[t][i] ** 2 : 1))
    g = matVec(WhT, local)
    norms[t - 1] = Math.hypot(...g)
  }
  return { states, gradientNorms: norms }
}
