/**
 * Loss functions and their derivatives.
 *
 * Regression losses are written as functions of the residual r = ŷ − y.
 * Binary classification losses are written as functions of the margin
 * m = y·f(x) with y ∈ {−1, +1}: positive margins are correct, and the size of
 * the margin is the confidence.
 */
import { createOptimizer } from './optimizers'
import { createRng } from './random'

export type RegressionLossId = 'mse' | 'mae' | 'huber' | 'logcosh' | 'quantile'
export type MarginLossId = 'zero-one' | 'hinge' | 'squared-hinge' | 'logistic' | 'exponential' | 'focal'

export const REGRESSION_LOSS_LABELS: Record<RegressionLossId, string> = {
  mse: 'Squared error (MSE)',
  mae: 'Absolute error (MAE)',
  huber: 'Huber',
  logcosh: 'Log-cosh',
  quantile: 'Quantile (pinball)',
}

export const MARGIN_LOSS_LABELS: Record<MarginLossId, string> = {
  'zero-one': '0–1 loss',
  hinge: 'Hinge (SVM)',
  'squared-hinge': 'Squared hinge',
  logistic: 'Logistic / cross-entropy',
  exponential: 'Exponential (AdaBoost)',
  focal: 'Focal',
}

/** Loss value for residual r = ŷ − y. `param` is δ for Huber, τ for quantile. */
export function regressionLoss(id: RegressionLossId, r: number, param = 1): number {
  switch (id) {
    case 'mse':
      return r * r
    case 'mae':
      return Math.abs(r)
    case 'huber':
      return Math.abs(r) <= param ? 0.5 * r * r : param * (Math.abs(r) - 0.5 * param)
    case 'logcosh': {
      // log(cosh r) = |r| + log1p(e^{−2|r|}) − log 2, stable for large |r|.
      const a = Math.abs(r)
      return a + Math.log1p(Math.exp(-2 * a)) - Math.LN2
    }
    case 'quantile': {
      // Pinball loss on u = y − ŷ = −r: τ·u if u ≥ 0 else (τ − 1)·u.
      const u = -r
      return u >= 0 ? param * u : (param - 1) * u
    }
  }
}

/** dL/dr (a subgradient where L is not differentiable). */
export function regressionLossGrad(id: RegressionLossId, r: number, param = 1): number {
  switch (id) {
    case 'mse':
      return 2 * r
    case 'mae':
      return Math.sign(r)
    case 'huber':
      return Math.abs(r) <= param ? r : param * Math.sign(r)
    case 'logcosh':
      return Math.tanh(r)
    case 'quantile':
      return r > 0 ? 1 - param : r < 0 ? -param : 0
  }
}

function sigmoid(z: number): number {
  return z >= 0 ? 1 / (1 + Math.exp(-z)) : Math.exp(z) / (1 + Math.exp(z))
}

/** Loss value for margin m = y·f(x). `param` is γ for focal loss. */
export function marginLoss(id: MarginLossId, m: number, param = 2): number {
  switch (id) {
    case 'zero-one':
      return m <= 0 ? 1 : 0
    case 'hinge':
      return Math.max(0, 1 - m)
    case 'squared-hinge':
      return Math.max(0, 1 - m) ** 2
    case 'logistic':
      // log(1 + e^{−m}), computed stably.
      return m > 0 ? Math.log1p(Math.exp(-m)) : -m + Math.log1p(Math.exp(m))
    case 'exponential':
      return Math.exp(-m)
    case 'focal': {
      const p = sigmoid(m)
      return (1 - p) ** param * marginLoss('logistic', m)
    }
  }
}

export function marginLossGrad(id: MarginLossId, m: number, param = 2): number {
  switch (id) {
    case 'zero-one':
      return 0
    case 'hinge':
      return m < 1 ? -1 : 0
    case 'squared-hinge':
      return m < 1 ? -2 * (1 - m) : 0
    case 'logistic':
      return -sigmoid(-m)
    case 'exponential':
      return -Math.exp(-m)
    case 'focal': {
      // d/dm [(1−p)^γ · (−log p)] with p = σ(m), dp/dm = p(1−p).
      const p = sigmoid(m)
      const ce = marginLoss('logistic', m)
      return -param * (1 - p) ** param * p * ce - (1 - p) ** (param + 1)
    }
  }
}

/** Multi-class cross-entropy −Σ y_k log softmax(z)_k and its gradient softmax(z) − y. */
export function softmaxCrossEntropy(logits: readonly number[], target: number): { loss: number; grad: number[] } {
  const m = Math.max(...logits)
  const e = logits.map((z) => Math.exp(z - m))
  const s = e.reduce((a, b) => a + b, 0)
  const p = e.map((v) => v / s)
  return { loss: -Math.log(p[target]), grad: p.map((v, k) => v - (k === target ? 1 : 0)) }
}

export interface LineFit {
  slope: number
  intercept: number
}

/**
 * Fit y = w·x + b by minimising the mean of a regression loss with Adam.
 * Inputs are standardised internally so every loss converges in a few hundred steps.
 */
export function fitLineWithLoss(xs: readonly number[], ys: readonly number[], id: RegressionLossId, param = 1, steps = 1500): LineFit {
  const n = xs.length
  const mx = xs.reduce((a, b) => a + b, 0) / n
  const sx = Math.sqrt(xs.reduce((a, b) => a + (b - mx) ** 2, 0) / n) || 1
  const my = ys.reduce((a, b) => a + b, 0) / n
  const sy = Math.sqrt(ys.reduce((a, b) => a + (b - my) ** 2, 0) / n) || 1
  const u = xs.map((x) => (x - mx) / sx)
  const v = ys.map((y) => (y - my) / sy)
  // δ is given in the original y units.
  const p = id === 'huber' ? param / sy : param
  const opt = createOptimizer({ id: 'adam', learningRate: 0.05 })
  let theta = [0, 0]
  for (let t = 0; t < steps; t++) {
    let gw = 0
    let gb = 0
    for (let i = 0; i < n; i++) {
      const g = regressionLossGrad(id, theta[0] * u[i] + theta[1] - v[i], p)
      gw += g * u[i]
      gb += g
    }
    const lr = 0.05 * (1 - t / steps) + 1e-4
    theta = opt.step(theta, [gw / n, gb / n], undefined, lr)
  }
  const slope = (theta[0] * sy) / sx
  return { slope, intercept: my + theta[1] * sy - slope * mx }
}

/**
 * y = 2x + 1 + N(0, 0.3²) on x ∈ [0, 10), with `outliers` points in the right
 * half shifted up by `magnitude` — outliers that correlate with x and so tilt
 * a least-squares fit. Returns the true slope for reference.
 */
export function outlierDataset(outliers = 6, magnitude = 20, seed = 4): { xs: number[]; ys: number[]; isOutlier: boolean[]; trueSlope: number } {
  const rng = createRng(seed)
  const xs = Array.from({ length: 40 }, (_, i) => i / 4)
  const ys = xs.map((x) => 2 * x + 1 + rng.normal(0, 0.3))
  const candidates = Array.from({ length: 20 }, (_, k) => 20 + ((k * 3 + 1) % 20))
  const chosen = new Set(candidates.slice(0, outliers))
  const isOutlier = xs.map((_, i) => chosen.has(i))
  return { xs, ys: ys.map((y, i) => (isOutlier[i] ? y + magnitude : y)), isOutlier, trueSlope: 2 }
}
