/**
 * A tiny fully-connected network with explicit forward and backward passes,
 * used to make back-propagation visible value by value.
 */
import type { Rng } from './random'
import { sigmoid } from './regression'

export type Activation = 'sigmoid' | 'tanh' | 'relu'

export interface DenseLayerParams {
  /** W[j][i]: weight from input i to unit j. */
  W: number[][]
  b: number[]
}

export interface MlpParams {
  layers: DenseLayerParams[]
  hiddenActivation: Activation
}

export function activate(a: Activation, z: number): number {
  if (a === 'sigmoid') return sigmoid(z)
  if (a === 'tanh') return Math.tanh(z)
  return Math.max(0, z)
}

/** Derivative expressed through the activation output h = act(z) (and z for ReLU). */
export function activationGrad(a: Activation, h: number, z: number): number {
  if (a === 'sigmoid') return h * (1 - h)
  if (a === 'tanh') return 1 - h * h
  return z > 0 ? 1 : 0
}

/** Xavier/Glorot-uniform initialisation: U(−√(6/(fan_in+fan_out)), +…). */
export function initMlp(sizes: readonly number[], rng: Rng, hiddenActivation: Activation = 'sigmoid'): MlpParams {
  const layers: DenseLayerParams[] = []
  for (let l = 1; l < sizes.length; l++) {
    const limit = Math.sqrt(6 / (sizes[l - 1] + sizes[l]))
    layers.push({
      W: Array.from({ length: sizes[l] }, () => Array.from({ length: sizes[l - 1] }, () => rng.uniform(-limit, limit))),
      b: new Array<number>(sizes[l]).fill(0),
    })
  }
  return { layers, hiddenActivation }
}

export interface ForwardTrace {
  /** Pre-activations z per layer. */
  z: number[][]
  /** Activations per layer, including the input as activations[0]. */
  a: number[][]
  output: number
}

/** Forward pass; the final layer is a single sigmoid unit. */
export function forward(params: MlpParams, x: readonly number[]): ForwardTrace {
  const a: number[][] = [x.slice()]
  const z: number[][] = []
  params.layers.forEach((layer, l) => {
    const last = l === params.layers.length - 1
    const zl = layer.W.map((row, j) => row.reduce((s, w, i) => s + w * a[l][i], layer.b[j]))
    z.push(zl)
    a.push(zl.map((v) => (last ? sigmoid(v) : activate(params.hiddenActivation, v))))
  })
  return { z, a, output: a[a.length - 1][0] }
}

export interface Gradients {
  dW: number[][][]
  db: number[][]
  /** ∂L/∂z per layer (the "error signal" δ). */
  delta: number[][]
}

/**
 * Back-propagation of the binary cross-entropy loss for one example.
 * For a sigmoid output with BCE, δ_out = ŷ − y; for hidden layers
 * δ_l = (W_{l+1}ᵀ δ_{l+1}) ⊙ act′(z_l).
 */
export function backward(params: MlpParams, trace: ForwardTrace, y: number): Gradients {
  const L = params.layers.length
  const delta: number[][] = new Array(L)
  delta[L - 1] = [trace.output - y]
  for (let l = L - 2; l >= 0; l--) {
    const next = params.layers[l + 1]
    delta[l] = trace.z[l].map((zj, j) => {
      const back = next.W.reduce((s, row, k) => s + row[j] * delta[l + 1][k], 0)
      return back * activationGrad(params.hiddenActivation, trace.a[l + 1][j], zj)
    })
  }
  const dW = params.layers.map((layer, l) => layer.W.map((row, j) => row.map((_, i) => delta[l][j] * trace.a[l][i])))
  const db = delta.map((d) => d.slice())
  return { dW, db, delta }
}

export function bceLoss(p: number, y: number): number {
  const eps = 1e-12
  const q = Math.min(1 - eps, Math.max(eps, p))
  return -(y * Math.log(q) + (1 - y) * Math.log(1 - q))
}

export function datasetLoss(params: MlpParams, xs: readonly (readonly number[])[], ys: readonly number[]): number {
  return xs.reduce((s, x, i) => s + bceLoss(forward(params, x).output, ys[i]), 0) / xs.length
}

/** One full-batch gradient-descent step (gradients averaged over the batch). */
export function trainStep(params: MlpParams, xs: readonly (readonly number[])[], ys: readonly number[], lr: number): MlpParams {
  const acc = params.layers.map((layer) => ({
    W: layer.W.map((row) => row.map(() => 0)),
    b: layer.b.map(() => 0),
  }))
  xs.forEach((x, n) => {
    const g = backward(params, forward(params, x), ys[n])
    acc.forEach((a, l) => {
      a.W.forEach((row, j) => row.forEach((_, i) => (row[i] += g.dW[l][j][i])))
      a.b.forEach((_, j) => (a.b[j] += g.db[l][j]))
    })
  })
  const m = xs.length
  return {
    hiddenActivation: params.hiddenActivation,
    layers: params.layers.map((layer, l) => ({
      W: layer.W.map((row, j) => row.map((w, i) => w - (lr * acc[l].W[j][i]) / m)),
      b: layer.b.map((bj, j) => bj - (lr * acc[l].b[j]) / m),
    })),
  }
}

export const XOR_DATA = {
  xs: [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
  ],
  ys: [0, 1, 1, 0],
}
