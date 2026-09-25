/**
 * First-order optimisers implemented exactly as published, operating on a
 * parameter vector θ given its gradient g.
 */
import type { LossSurface } from './lossSurfaces'

export type OptimizerId = 'sgd' | 'momentum' | 'nesterov' | 'adagrad' | 'rmsprop' | 'adam' | 'adamw'

export interface OptimizerConfig {
  id: OptimizerId
  learningRate: number
  /** Momentum coefficient (momentum/nesterov) or β₁ (Adam). */
  beta1?: number
  /** Squared-gradient decay (RMSProp ρ, Adam β₂). */
  beta2?: number
  epsilon?: number
  /** Decoupled weight decay λ (AdamW). */
  weightDecay?: number
}

export interface Optimizer {
  config: OptimizerConfig
  /**
   * Returns the updated parameters. `gradAt` lets Nesterov look ahead;
   * `lr` overrides the configured learning rate (for schedules).
   */
  step(theta: number[], grad: number[], gradAt?: (theta: number[]) => number[], lr?: number): number[]
}

export const OPTIMIZER_LABELS: Record<OptimizerId, string> = {
  sgd: 'SGD',
  momentum: 'Momentum',
  nesterov: 'Nesterov',
  adagrad: 'AdaGrad',
  rmsprop: 'RMSProp',
  adam: 'Adam',
  adamw: 'AdamW',
}

export const DEFAULT_OPTIMIZER_CONFIGS: Record<OptimizerId, OptimizerConfig> = {
  sgd: { id: 'sgd', learningRate: 0.01 },
  momentum: { id: 'momentum', learningRate: 0.01, beta1: 0.9 },
  nesterov: { id: 'nesterov', learningRate: 0.01, beta1: 0.9 },
  adagrad: { id: 'adagrad', learningRate: 0.1, epsilon: 1e-8 },
  rmsprop: { id: 'rmsprop', learningRate: 0.01, beta2: 0.9, epsilon: 1e-8 },
  adam: { id: 'adam', learningRate: 0.05, beta1: 0.9, beta2: 0.999, epsilon: 1e-8 },
  adamw: { id: 'adamw', learningRate: 0.05, beta1: 0.9, beta2: 0.999, epsilon: 1e-8, weightDecay: 0.01 },
}

export function createOptimizer(config: OptimizerConfig): Optimizer {
  const baseLr = config.learningRate
  const b1 = config.beta1 ?? 0.9
  const b2 = config.beta2 ?? 0.999
  const eps = config.epsilon ?? 1e-8
  let v: number[] | null = null // velocity / first moment
  let s: number[] | null = null // second moment
  let t = 0
  return {
    config,
    step(theta, grad, gradAt, lrOverride) {
      t++
      const lr = lrOverride ?? baseLr
      switch (config.id) {
        case 'sgd':
          // θ ← θ − η g
          return theta.map((p, i) => p - lr * grad[i])
        case 'momentum': {
          // v ← μ v + g ; θ ← θ − η v   (Polyak heavy ball)
          v = v ? v.map((vi, i) => b1 * vi + grad[i]) : grad.slice()
          const vel = v
          return theta.map((p, i) => p - lr * vel[i])
        }
        case 'nesterov': {
          // g̃ = ∇L(θ − η μ v) ; v ← μ v + g̃ ; θ ← θ − η v
          const prev = v ?? theta.map(() => 0)
          const lookahead = theta.map((p, i) => p - lr * b1 * prev[i])
          const g = gradAt ? gradAt(lookahead) : grad
          v = prev.map((vi, i) => b1 * vi + g[i])
          const vel = v
          return theta.map((p, i) => p - lr * vel[i])
        }
        case 'adagrad': {
          // s ← s + g² ; θ ← θ − η g / (√s + ε)   (Duchi et al., 2011)
          s = (s ?? theta.map(() => 0)).map((si, i) => si + grad[i] ** 2)
          const sq = s
          return theta.map((p, i) => p - (lr * grad[i]) / (Math.sqrt(sq[i]) + eps))
        }
        case 'rmsprop': {
          // s ← ρ s + (1 − ρ) g² ; θ ← θ − η g / (√s + ε)
          s = (s ?? theta.map(() => 0)).map((si, i) => b2 * si + (1 - b2) * grad[i] ** 2)
          const sq = s
          return theta.map((p, i) => p - (lr * grad[i]) / (Math.sqrt(sq[i]) + eps))
        }
        case 'adam':
        case 'adamw': {
          // m ← β₁m + (1−β₁)g ; v ← β₂v + (1−β₂)g² ; bias-correct ; θ ← θ − η m̂/(√v̂ + ε)
          v = (v ?? theta.map(() => 0)).map((mi, i) => b1 * mi + (1 - b1) * grad[i])
          s = (s ?? theta.map(() => 0)).map((si, i) => b2 * si + (1 - b2) * grad[i] ** 2)
          const m = v
          const sq = s
          const c1 = 1 - b1 ** t
          const c2 = 1 - b2 ** t
          // AdamW (Loshchilov & Hutter, 2019) decays weights directly instead of adding λθ to g.
          const wd = config.id === 'adamw' ? (config.weightDecay ?? 0) : 0
          return theta.map((p, i) => p - lr * ((m[i] / c1) / (Math.sqrt(sq[i] / c2) + eps) + wd * p))
        }
      }
    },
  }
}

export interface TrajectoryPoint {
  step: number
  x: number
  y: number
  loss: number
}

export interface Trajectory {
  points: TrajectoryPoint[]
  diverged: boolean
}

/** Run an optimiser on a 2-D surface, stopping early on divergence. */
export function runOptimizer(
  surface: LossSurface,
  config: OptimizerConfig,
  steps: number,
  start: [number, number] = surface.start,
): Trajectory {
  const opt = createOptimizer(config)
  let theta = [start[0], start[1]]
  const points: TrajectoryPoint[] = [{ step: 0, x: theta[0], y: theta[1], loss: surface.f(theta[0], theta[1]) }]
  const gradAt = (p: number[]) => surface.grad(p[0], p[1])
  for (let k = 1; k <= steps; k++) {
    theta = opt.step(theta, gradAt(theta), gradAt)
    const loss = surface.f(theta[0], theta[1])
    if (!Number.isFinite(loss) || Math.abs(theta[0]) > 1e6 || Math.abs(theta[1]) > 1e6) {
      return { points, diverged: true }
    }
    points.push({ step: k, x: theta[0], y: theta[1], loss })
  }
  return { points, diverged: false }
}
