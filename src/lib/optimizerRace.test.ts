import { describe, expect, it } from 'vitest'
import { generatePreset } from './datasets2d'
import { backward, forward, initMlp } from './neural'
import { createOptimizer, DEFAULT_OPTIMIZER_CONFIGS } from './optimizers'
import { accuracyOf, flattenParams, lossAndGradient, runRace, unflattenParams } from './optimizerRace'
import { createRng } from './random'

const moons = generatePreset('moons', createRng(1))
const base = { steps: 300, hidden: [8], batchSize: 0, schedule: 'constant' as const, seed: 3 }

describe('parameter flattening', () => {
  it('round-trips', () => {
    const p = initMlp([2, 5, 3, 1], createRng(1), 'tanh')
    expect(unflattenParams(flattenParams(p), p)).toEqual(p)
  })

  it('batch gradient equals the average of per-example back-prop gradients', () => {
    const p = initMlp([2, 4, 1], createRng(2), 'tanh')
    const xs = [
      [0.1, 0.2],
      [-0.5, 0.7],
    ]
    const ys = [1, 0]
    const { grad } = lossAndGradient(p, xs, ys)
    const g0 = backward(p, forward(p, xs[0]), ys[0])
    const g1 = backward(p, forward(p, xs[1]), ys[1])
    expect(grad[0]).toBeCloseTo((g0.dW[0][0][0] + g1.dW[0][0][0]) / 2, 12)
  })
})

describe('new optimisers', () => {
  it('AdaGrad steps shrink as squared gradients accumulate', () => {
    const opt = createOptimizer({ id: 'adagrad', learningRate: 1 })
    let t = [0]
    const steps: number[] = []
    for (let i = 0; i < 4; i++) {
      const next = opt.step(t, [1])
      steps.push(Math.abs(next[0] - t[0]))
      t = next
    }
    // Step k has size 1/√k.
    steps.forEach((s, k) => expect(s).toBeCloseTo(1 / Math.sqrt(k + 1), 6))
  })

  it('AdamW decays weights even when the gradient is zero; Adam does not', () => {
    const adamw = createOptimizer({ id: 'adamw', learningRate: 0.1, weightDecay: 0.5 })
    const adam = createOptimizer({ id: 'adam', learningRate: 0.1 })
    expect(adamw.step([2], [0])[0]).toBeCloseTo(2 - 0.1 * 0.5 * 2, 10)
    expect(adam.step([2], [0])[0]).toBe(2)
  })

  it('a learning-rate override replaces the configured rate for that step', () => {
    const opt = createOptimizer({ id: 'sgd', learningRate: 1 })
    expect(opt.step([1], [1], undefined, 0.25)[0]).toBe(0.75)
  })
})

describe('optimizer race', () => {
  it('Adam beats plain SGD at their default settings on two moons', () => {
    const [sgd, adam] = runRace(moons, [DEFAULT_OPTIMIZER_CONFIGS.sgd, DEFAULT_OPTIMIZER_CONFIGS.adam], base)
    expect(adam.losses[adam.losses.length - 1]).toBeLessThan(sgd.losses[sgd.losses.length - 1])
    expect(adam.accuracy).toBeGreaterThan(0.85)
  })

  it('SGD reaches the lesson target with a well-tuned learning rate', () => {
    const [sgd] = runRace(moons, [{ id: 'sgd', learningRate: 1.0 }], { ...base, steps: 400 })
    expect(sgd.losses[sgd.losses.length - 1]).toBeLessThanOrEqual(0.3)
  })

  it('mini-batches make the loss curve noisy but still decreasing on average', () => {
    const [r] = runRace(moons, [{ id: 'sgd', learningRate: 0.5 }], { ...base, batchSize: 16 })
    const early = r.losses.slice(0, 20).reduce((a, b) => a + b, 0) / 20
    const late = r.losses.slice(-20).reduce((a, b) => a + b, 0) / 20
    expect(late).toBeLessThan(early)
    const jumps = r.losses.slice(1).filter((l, i) => l > r.losses[i]).length
    expect(jumps).toBeGreaterThan(5)
  })

  it('flags divergence for an absurd learning rate', () => {
    const [r] = runRace(moons, [{ id: 'sgd', learningRate: 1e6 }], base)
    expect(r.diverged || r.accuracy < 0.7).toBe(true)
  })

  it('accuracyOf matches a manual count', () => {
    const p = initMlp([2, 3, 1], createRng(9), 'tanh')
    const xs = moons.map((d) => [d.x, d.y])
    const ys = moons.map((d) => d.label)
    const manual = xs.filter((x, i) => Number(forward(p, x).output >= 0.5) === ys[i]).length / xs.length
    expect(accuracyOf(p, xs, ys)).toBeCloseTo(manual, 12)
  })
})
