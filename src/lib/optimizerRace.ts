/**
 * Train identical small networks with different optimisers on the same data
 * and record their learning curves — the "optimizer race". Everything is
 * plain TypeScript (manual back-propagation), so runs are deterministic.
 */
import type { LabeledPoint } from './datasets2d'
import { backward, forward, initMlp, type MlpParams } from './neural'
import { createOptimizer, type OptimizerConfig } from './optimizers'
import { createRng } from './random'
import { scheduleMultiplier, type ScheduleId } from './schedules'

export function flattenParams(p: MlpParams): number[] {
  return p.layers.flatMap((l) => [...l.W.flat(), ...l.b])
}

export function unflattenParams(v: readonly number[], template: MlpParams): MlpParams {
  let k = 0
  return {
    hiddenActivation: template.hiddenActivation,
    layers: template.layers.map((l) => ({
      W: l.W.map((row) => row.map(() => v[k++])),
      b: l.b.map(() => v[k++]),
    })),
  }
}

/** Mean binary cross-entropy and its gradient (flattened) over a set of examples. */
export function lossAndGradient(p: MlpParams, xs: readonly (readonly number[])[], ys: readonly number[]): { loss: number; grad: number[] } {
  const grad = new Array<number>(flattenParams(p).length).fill(0)
  let loss = 0
  xs.forEach((x, n) => {
    const tr = forward(p, x)
    const q = Math.min(1 - 1e-12, Math.max(1e-12, tr.output))
    loss += -(ys[n] * Math.log(q) + (1 - ys[n]) * Math.log(1 - q))
    const g = backward(p, tr, ys[n])
    let k = 0
    g.dW.forEach((layer, l) => {
      layer.flat().forEach((v) => (grad[k++] += v))
      g.db[l].forEach((v) => (grad[k++] += v))
    })
  })
  return { loss: loss / xs.length, grad: grad.map((v) => v / xs.length) }
}

export function accuracyOf(p: MlpParams, xs: readonly (readonly number[])[], ys: readonly number[]): number {
  let c = 0
  xs.forEach((x, i) => (c += Number((forward(p, x).output >= 0.5 ? 1 : 0) === ys[i])))
  return c / xs.length
}

export interface RaceOptions {
  steps: number
  hidden: number[]
  /** Examples per step; 0 = full batch. */
  batchSize: number
  schedule: ScheduleId
  seed: number
}

export interface RaceResult {
  id: string
  /** Full-dataset loss after each step (index 0 = before training). */
  losses: number[]
  accuracy: number
  diverged: boolean
  params: MlpParams
}

export function runRace(data: readonly LabeledPoint[], configs: readonly OptimizerConfig[], options: RaceOptions): RaceResult[] {
  const xs = data.map((d) => [d.x, d.y])
  const ys = data.map((d) => d.label)
  const init = initMlp([2, ...options.hidden, 1], createRng(options.seed), 'tanh')
  return configs.map((cfg) => {
    const opt = createOptimizer(cfg)
    const batchRng = createRng(options.seed + 1)
    let theta = flattenParams(init)
    let params = init
    const losses = [lossAndGradient(params, xs, ys).loss]
    let diverged = false
    let order = batchRng.shuffle(xs.map((_, i) => i))
    let cursor = 0
    for (let t = 0; t < options.steps; t++) {
      let bx = xs
      let by = ys
      if (options.batchSize > 0 && options.batchSize < xs.length) {
        if (cursor + options.batchSize > order.length) {
          order = batchRng.shuffle(order)
          cursor = 0
        }
        const idx = order.slice(cursor, cursor + options.batchSize)
        cursor += options.batchSize
        bx = idx.map((i) => xs[i])
        by = idx.map((i) => ys[i])
      }
      const { grad } = lossAndGradient(params, bx, by)
      theta = opt.step(theta, grad, undefined, cfg.learningRate * scheduleMultiplier(options.schedule, t, options.steps))
      params = unflattenParams(theta, init)
      const full = lossAndGradient(params, xs, ys).loss
      if (!Number.isFinite(full) || theta.some((v) => !Number.isFinite(v) || Math.abs(v) > 1e6)) {
        diverged = true
        break
      }
      losses.push(full)
    }
    return { id: cfg.id, losses, accuracy: diverged ? NaN : accuracyOf(params, xs, ys), diverged, params }
  })
}
