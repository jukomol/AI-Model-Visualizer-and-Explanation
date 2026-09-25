/**
 * Linear and logistic regression primitives.
 */
import { mean } from './linalg'

export interface LinearFit {
  slope: number
  intercept: number
}

/** Closed-form ordinary least squares for y = w·x + b. */
export function olsFit(x: readonly number[], y: readonly number[]): LinearFit {
  const mx = mean(x)
  const my = mean(y)
  let sxy = 0
  let sxx = 0
  for (let i = 0; i < x.length; i++) {
    sxy += (x[i] - mx) * (y[i] - my)
    sxx += (x[i] - mx) ** 2
  }
  const slope = sxx === 0 ? 0 : sxy / sxx
  return { slope, intercept: my - slope * mx }
}

export function meanSquaredError(x: readonly number[], y: readonly number[], fit: LinearFit): number {
  let s = 0
  for (let i = 0; i < x.length; i++) s += (fit.slope * x[i] + fit.intercept - y[i]) ** 2
  return s / x.length
}

/** Coefficient of determination R² = 1 − SS_res / SS_tot. */
export function rSquared(x: readonly number[], y: readonly number[], fit: LinearFit): number {
  const my = mean(y)
  let ssRes = 0
  let ssTot = 0
  for (let i = 0; i < x.length; i++) {
    ssRes += (y[i] - (fit.slope * x[i] + fit.intercept)) ** 2
    ssTot += (y[i] - my) ** 2
  }
  return 1 - ssRes / ssTot
}

export interface GDOptions {
  learningRate: number
  epochs: number
  init?: LinearFit
  /**
   * Standardise x to zero mean / unit variance before optimising. The returned
   * parameters are mapped back to the original x scale.
   */
  standardize?: boolean
}

export interface GDSnapshot extends LinearFit {
  epoch: number
  loss: number
}

export interface GDResult {
  history: GDSnapshot[]
  final: GDSnapshot
  diverged: boolean
}

/**
 * Full-batch gradient descent on the MSE loss
 *   L(w, b) = (1/n) Σ (w xᵢ + b − yᵢ)²
 *   ∂L/∂w = (2/n) Σ (w xᵢ + b − yᵢ) xᵢ,   ∂L/∂b = (2/n) Σ (w xᵢ + b − yᵢ)
 */
export function gradientDescentLinear(x: readonly number[], y: readonly number[], options: GDOptions): GDResult {
  const n = x.length
  const mx = options.standardize ? mean(x) : 0
  const sx = options.standardize ? Math.sqrt(x.reduce((s, v) => s + (v - mx) ** 2, 0) / n) || 1 : 1
  const xs = x.map((v) => (v - mx) / sx)
  // Parameters live in the (possibly) standardised space: y = w' x' + b'.
  let w = options.init ? options.init.slope * sx : 0
  let b = options.init ? options.init.intercept + options.init.slope * mx : 0
  const toOriginal = (): LinearFit => ({ slope: w / sx, intercept: b - (w * mx) / sx })
  const lossNow = () => {
    let s = 0
    for (let i = 0; i < n; i++) s += (w * xs[i] + b - y[i]) ** 2
    return s / n
  }
  const history: GDSnapshot[] = [{ epoch: 0, ...toOriginal(), loss: lossNow() }]
  const every = Math.max(1, Math.floor(options.epochs / 400))
  let diverged = false
  for (let epoch = 1; epoch <= options.epochs; epoch++) {
    let gw = 0
    let gb = 0
    for (let i = 0; i < n; i++) {
      const r = w * xs[i] + b - y[i]
      gw += r * xs[i]
      gb += r
    }
    w -= options.learningRate * ((2 / n) * gw)
    b -= options.learningRate * ((2 / n) * gb)
    const loss = lossNow()
    if (!Number.isFinite(loss) || loss > 1e12) {
      diverged = true
      history.push({ epoch, ...toOriginal(), loss: Number.isFinite(loss) ? loss : Infinity })
      break
    }
    if (epoch % every === 0 || epoch === options.epochs) history.push({ epoch, ...toOriginal(), loss })
  }
  return { history, final: history[history.length - 1], diverged }
}

export function sigmoid(z: number): number {
  if (z >= 0) return 1 / (1 + Math.exp(-z))
  const e = Math.exp(z)
  return e / (1 + e)
}

/** Mean binary cross-entropy with probabilities clipped away from 0 and 1. */
export function binaryCrossEntropy(probabilities: readonly number[], labels: readonly number[]): number {
  const eps = 1e-12
  let s = 0
  for (let i = 0; i < labels.length; i++) {
    const p = Math.min(1 - eps, Math.max(eps, probabilities[i]))
    s += -(labels[i] * Math.log(p) + (1 - labels[i]) * Math.log(1 - p))
  }
  return s / labels.length
}

export function accuracy(predicted: readonly number[], labels: readonly number[]): number {
  if (labels.length === 0) return 0
  let c = 0
  for (let i = 0; i < labels.length; i++) if (predicted[i] === labels[i]) c++
  return c / labels.length
}
