import { describe, expect, it } from 'vitest'
import {
  fitLineWithLoss,
  marginLoss,
  outlierDataset,
  marginLossGrad,
  regressionLoss,
  regressionLossGrad,
  softmaxCrossEntropy,
  type MarginLossId,
  type RegressionLossId,
} from './losses'
import { olsFit } from './regression'

const numeric = (f: (x: number) => number, x: number, h = 1e-6) => (f(x + h) - f(x - h)) / (2 * h)

describe('regression losses', () => {
  const ids: RegressionLossId[] = ['mse', 'mae', 'huber', 'logcosh', 'quantile']

  it.each(ids)('%s gradient matches finite differences away from kinks', (id) => {
    for (const r of [-3.3, -0.4, 0.7, 2.9]) expect(regressionLossGrad(id, r, 0.8)).toBeCloseTo(numeric((x) => regressionLoss(id, x, 0.8), r), 5)
  })

  it('all are zero at r = 0 and non-negative', () => {
    for (const id of ids) {
      expect(regressionLoss(id, 0, 0.5)).toBeCloseTo(0, 12)
      for (const r of [-5, -1, 1, 5]) expect(regressionLoss(id, r, 0.5)).toBeGreaterThanOrEqual(0)
    }
  })

  it('Huber is quadratic inside δ, linear outside, and continuous at δ', () => {
    const d = 1.5
    expect(regressionLoss('huber', 1, d)).toBe(0.5)
    expect(regressionLoss('huber', d - 1e-9, d)).toBeCloseTo(regressionLoss('huber', d + 1e-9, d), 6)
    expect(regressionLoss('huber', 10, d) - regressionLoss('huber', 9, d)).toBeCloseTo(d, 10)
  })

  it('log-cosh ≈ r²/2 near 0 and ≈ |r| − log 2 far away, without overflow', () => {
    expect(regressionLoss('logcosh', 0.01)).toBeCloseTo(0.00005, 8)
    expect(regressionLoss('logcosh', 800)).toBeCloseTo(800 - Math.LN2, 6)
  })

  it('quantile loss is asymmetric: τ = 0.9 punishes under-prediction 9× more', () => {
    expect(regressionLoss('quantile', -1, 0.9) / regressionLoss('quantile', 1, 0.9)).toBeCloseTo(9, 10)
  })
})

describe('margin losses', () => {
  const ids: MarginLossId[] = ['hinge', 'squared-hinge', 'logistic', 'exponential', 'focal']

  it.each(ids)('%s gradient matches finite differences', (id) => {
    for (const m of [-2.2, -0.3, 0.4, 2.5]) expect(marginLossGrad(id, m, 2)).toBeCloseTo(numeric((x) => marginLoss(id, x, 2), m), 5)
  })

  it('every surrogate upper-bounds the 0–1 loss (logistic in bits)', () => {
    for (let m = -3; m <= 3; m += 0.25) {
      const zo = marginLoss('zero-one', m)
      expect(marginLoss('hinge', m)).toBeGreaterThanOrEqual(zo)
      expect(marginLoss('exponential', m)).toBeGreaterThanOrEqual(zo)
      expect(marginLoss('logistic', m) / Math.LN2).toBeGreaterThanOrEqual(zo - 1e-12)
    }
  })

  it('logistic loss equals binary cross-entropy of σ(m)', () => {
    const m = 0.8
    expect(marginLoss('logistic', m)).toBeCloseTo(-Math.log(1 / (1 + Math.exp(-m))), 12)
    expect(marginLoss('logistic', 1000)).toBeCloseTo(0, 12)
    expect(marginLoss('logistic', -1000)).toBeCloseTo(1000, 6)
  })

  it('focal loss with γ = 0 is the logistic loss, and γ > 0 down-weights easy examples', () => {
    expect(marginLoss('focal', 0.7, 0)).toBeCloseTo(marginLoss('logistic', 0.7), 12)
    expect(marginLoss('focal', 3, 2) / marginLoss('logistic', 3)).toBeLessThan(0.01)
  })
})

describe('softmax cross-entropy', () => {
  it('has gradient p − y', () => {
    const { loss, grad } = softmaxCrossEntropy([2, 1, 0], 0)
    const p0 = Math.exp(2) / (Math.exp(2) + Math.exp(1) + 1)
    expect(loss).toBeCloseTo(-Math.log(p0), 12)
    expect(grad[0]).toBeCloseTo(p0 - 1, 12)
    expect(grad.reduce((a, b) => a + b, 0)).toBeCloseTo(0, 12)
  })
})

describe('robust line fitting', () => {
  const { xs, ys, trueSlope, isOutlier } = outlierDataset(6, 20)
  const rel = (s: number) => Math.abs(s - trueSlope) / trueSlope

  it('generates 40 points with the requested number of outliers in the right half', () => {
    expect(xs).toHaveLength(40)
    expect(isOutlier.filter(Boolean)).toHaveLength(6)
    isOutlier.forEach((o, i) => o && expect(i).toBeGreaterThanOrEqual(20))
  })

  it('MSE matches ordinary least squares', () => {
    const fit = fitLineWithLoss(xs, ys, 'mse')
    const ols = olsFit(xs, ys)
    expect(fit.slope).toBeCloseTo(ols.slope, 2)
    expect(fit.intercept).toBeCloseTo(ols.intercept, 1)
  })

  it('outliers tilt MSE while MAE and Huber stay near the true slope (loss-functions challenge)', () => {
    expect(rel(fitLineWithLoss(xs, ys, 'mse').slope)).toBeGreaterThan(0.3)
    expect(rel(fitLineWithLoss(xs, ys, 'mae').slope)).toBeLessThan(0.05)
    expect(rel(fitLineWithLoss(xs, ys, 'huber', 1).slope)).toBeLessThan(0.05)
  })

  it('without outliers every loss recovers the slope', () => {
    const clean = outlierDataset(0)
    for (const id of ['mse', 'mae', 'huber', 'logcosh'] as const) expect(rel(fitLineWithLoss(clean.xs, clean.ys, id).slope)).toBeLessThan(0.05)
  })
})
