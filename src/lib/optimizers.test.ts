import { describe, expect, it } from 'vitest'
import { SURFACES, numericGradient } from './lossSurfaces'
import { createOptimizer, runOptimizer } from './optimizers'

describe('loss surfaces', () => {
  it('analytic gradients match finite differences', () => {
    for (const s of Object.values(SURFACES)) {
      for (const [x, y] of [
        [0.3, -0.7],
        [-1.2, 1.1],
        [1.7, 0.4],
      ]) {
        const [gx, gy] = s.grad(x, y)
        const [nx, ny] = numericGradient(s.f, x, y)
        expect(gx).toBeCloseTo(nx, 3)
        expect(gy).toBeCloseTo(ny, 3)
      }
    }
  })

  it('gradients vanish at the listed minima', () => {
    for (const s of Object.values(SURFACES)) {
      for (const [x, y] of s.minima) {
        const [gx, gy] = s.grad(x, y)
        expect(Math.hypot(gx, gy)).toBeLessThan(1e-3)
      }
    }
  })
})

describe('optimisers', () => {
  it('SGD takes the textbook step θ − ηg', () => {
    const opt = createOptimizer({ id: 'sgd', learningRate: 0.1 })
    expect(opt.step([1, 2], [10, -20])).toEqual([0, 4])
  })

  it("Adam's first step has magnitude ≈ η in every coordinate", () => {
    const opt = createOptimizer({ id: 'adam', learningRate: 0.05, beta1: 0.9, beta2: 0.999, epsilon: 1e-8 })
    const next = opt.step([0, 0], [123, -0.001])
    expect(next[0]).toBeCloseTo(-0.05, 6)
    expect(next[1]).toBeCloseTo(0.05, 3)
  })

  it('momentum accumulates velocity along a constant gradient', () => {
    const opt = createOptimizer({ id: 'momentum', learningRate: 1, beta1: 0.5 })
    let t = [0]
    t = opt.step(t, [1]) // v = 1
    t = opt.step(t, [1]) // v = 1.5
    expect(t[0]).toBeCloseTo(-2.5)
  })

  it('SGD converges on the bowl with a stable learning rate and diverges above 2/λmax', () => {
    const ok = runOptimizer(SURFACES.bowl, { id: 'sgd', learningRate: 0.15 }, 300)
    expect(ok.diverged).toBe(false)
    expect(ok.points[ok.points.length - 1].loss).toBeLessThan(1e-6)
    // Largest curvature is 10, so η > 0.2 makes the y-coordinate explode.
    const bad = runOptimizer(SURFACES.bowl, { id: 'sgd', learningRate: 0.21 }, 2000)
    expect(bad.diverged).toBe(true)
  })

  it('Adam reaches the Rosenbrock valley floor within the lesson budget', () => {
    const traj = runOptimizer(SURFACES.rosenbrock, { id: 'adam', learningRate: 0.02, beta1: 0.9, beta2: 0.999 }, 2000)
    const last = traj.points[traj.points.length - 1]
    expect(last.loss).toBeLessThan(0.01)
  })

  it('momentum escapes the saddle faster than SGD', () => {
    const steps = 60
    const sgd = runOptimizer(SURFACES.saddle, { id: 'sgd', learningRate: 0.05 }, steps)
    const mom = runOptimizer(SURFACES.saddle, { id: 'momentum', learningRate: 0.05, beta1: 0.9 }, steps)
    const lastLoss = (t: typeof sgd) => t.points[t.points.length - 1].loss
    expect(lastLoss(mom)).toBeLessThan(lastLoss(sgd))
  })

  it('Nesterov and RMSProp decrease the loss on the bowl', () => {
    for (const cfg of [
      { id: 'nesterov' as const, learningRate: 0.05, beta1: 0.9 },
      { id: 'rmsprop' as const, learningRate: 0.02, beta2: 0.9 },
    ]) {
      const t = runOptimizer(SURFACES.bowl, cfg, 200)
      expect(t.points[t.points.length - 1].loss).toBeLessThan(t.points[0].loss * 0.01)
    }
  })
})
