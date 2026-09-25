import { describe, expect, it } from 'vitest'
import { checkMetric, curriculum, type MetricChallenge } from './curriculum'
import { lassoFit, mseOf, polyFeatures, predictPoly, ridgeFit, sampleCurve, solveSpd, trueFunction } from './polyfit'
import { createRng } from './random'

const train = sampleCurve(15, 0.2, createRng(3))
const val = sampleCurve(200, 0.2, createRng(4))

describe('linear algebra helpers', () => {
  it('solves an SPD system', () => {
    const w = solveSpd(
      [
        [4, 2],
        [2, 3],
      ],
      [2, 1],
    )
    expect(4 * w[0] + 2 * w[1]).toBeCloseTo(2, 10)
    expect(2 * w[0] + 3 * w[1]).toBeCloseTo(1, 10)
  })

  it('builds polynomial features', () => {
    expect(polyFeatures(0.5, 3)).toEqual([1, 0.5, 0.25, 0.125])
    expect(predictPoly([1, 2, 3], 2)).toBe(1 + 4 + 12)
  })
})

describe('ridge regression', () => {
  it('with λ = 0 recovers an exact polynomial', () => {
    const xs = [-0.9, -0.3, 0.2, 0.7, 1]
    const ys = xs.map((x) => 1 - 2 * x + 0.5 * x * x)
    const w = ridgeFit(xs, ys, 2, 0)
    expect(w[0]).toBeCloseTo(1, 6)
    expect(w[1]).toBeCloseTo(-2, 6)
    expect(w[2]).toBeCloseTo(0.5, 6)
  })

  it('shrinks coefficients as λ grows', () => {
    const norm = (w: number[]) => Math.hypot(...w.slice(1))
    expect(norm(ridgeFit(train.xs, train.ys, 9, 1))).toBeLessThan(norm(ridgeFit(train.xs, train.ys, 9, 1e-4)))
  })

  it('shows the bias–variance U-shape: validation error falls then rises with degree', () => {
    const v = (deg: number) => mseOf(ridgeFit(train.xs, train.ys, deg, 0), val.xs, val.ys)
    // Degree 1 under-fits (bias), degree 3 is about right, degree ≥ 5 over-fits 15 points (variance).
    expect(v(3)).toBeLessThan(v(1))
    expect(v(9)).toBeGreaterThan(v(3))
    // Training error only ever falls with more capacity.
    expect(mseOf(ridgeFit(train.xs, train.ys, 9, 0), train.xs, train.ys)).toBeLessThan(mseOf(ridgeFit(train.xs, train.ys, 3, 0), train.xs, train.ys))
  })

  it('regularisation rescues a high-degree model (regularization challenge)', () => {
    const c = curriculum.nodes.find((n) => n.id === 'regularization')!.challenge as MetricChallenge
    expect(checkMetric(c, mseOf(ridgeFit(train.xs, train.ys, 12, 0), val.xs, val.ys))).toBe(false)
    expect(checkMetric(c, mseOf(ridgeFit(train.xs, train.ys, 12, 1e-3), val.xs, val.ys))).toBe(true)
  })
})

describe('lasso', () => {
  it('produces exact zeros (sparsity) where ridge does not', () => {
    const w = lassoFit(train.xs, train.ys, 9, 0.02)
    expect(w.slice(1).filter((c) => c === 0).length).toBeGreaterThan(2)
    expect(ridgeFit(train.xs, train.ys, 9, 0.02).slice(1).filter((c) => c === 0).length).toBe(0)
  })

  it('matches least squares as λ → 0 for a well-posed problem', () => {
    const l = lassoFit(train.xs, train.ys, 2, 0, 20000)
    const r = ridgeFit(train.xs, train.ys, 2, 0)
    l.forEach((c, i) => expect(c).toBeCloseTo(r[i], 4))
  })

  it('the true function is what we sample', () => {
    expect(trueFunction(0)).toBe(0)
  })
})
