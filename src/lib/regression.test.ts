import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import {
  accuracy,
  binaryCrossEntropy,
  gradientDescentLinear,
  meanSquaredError,
  olsFit,
  rSquared,
  sigmoid,
} from './regression'

const anscombe = JSON.parse(readFileSync('public/datasets/anscombe.json', 'utf8')) as {
  sets: Record<'I' | 'II' | 'III' | 'IV', { x: number[]; y: number[] }>
}

describe("OLS on Anscombe's quartet (real published data)", () => {
  it('all four sets share y ≈ 3.00 + 0.500x and R² ≈ 0.67', () => {
    for (const key of ['I', 'II', 'III', 'IV'] as const) {
      const { x, y } = anscombe.sets[key]
      const fit = olsFit(x, y)
      expect(fit.slope).toBeCloseTo(0.5, 2)
      expect(fit.intercept).toBeCloseTo(3.0, 1)
      expect(rSquared(x, y, fit)).toBeCloseTo(0.67, 2)
    }
  })

  it('minimum MSE on set I is ≈ 1.251', () => {
    const { x, y } = anscombe.sets.I
    expect(meanSquaredError(x, y, olsFit(x, y))).toBeCloseTo(1.2512, 3)
  })
})

describe('gradientDescentLinear', () => {
  const { x, y } = anscombe.sets.I

  it('converges to the OLS solution with standardised inputs in a few hundred epochs', () => {
    const r = gradientDescentLinear(x, y, { learningRate: 0.1, epochs: 300, standardize: true })
    const ols = olsFit(x, y)
    expect(r.diverged).toBe(false)
    expect(r.final.slope).toBeCloseTo(ols.slope, 3)
    expect(r.final.intercept).toBeCloseTo(ols.intercept, 2)
  })

  it('is slow on raw inputs because the loss surface is ill-conditioned', () => {
    const slow = gradientDescentLinear(x, y, { learningRate: 0.01, epochs: 300 })
    expect(slow.final.loss).toBeGreaterThan(1.3)
    const patient = gradientDescentLinear(x, y, { learningRate: 0.01, epochs: 3000 })
    expect(patient.final.loss).toBeLessThan(1.3)
  })

  it('diverges above the stability limit 2/λ_max ≈ 0.0109', () => {
    expect(gradientDescentLinear(x, y, { learningRate: 0.0115, epochs: 3000 }).diverged).toBe(true)
  })

  it('loss is monotonically non-increasing for a stable step size', () => {
    const r = gradientDescentLinear(x, y, { learningRate: 0.005, epochs: 500 })
    for (let i = 1; i < r.history.length; i++) expect(r.history[i].loss).toBeLessThanOrEqual(r.history[i - 1].loss + 1e-12)
  })
})

describe('logistic helpers', () => {
  it('sigmoid is stable for large magnitudes', () => {
    expect(sigmoid(0)).toBe(0.5)
    expect(sigmoid(1000)).toBe(1)
    expect(sigmoid(-1000)).toBe(0)
    expect(sigmoid(2) + sigmoid(-2)).toBeCloseTo(1, 12)
  })

  it('cross-entropy is ln 2 for p = 0.5 and finite for confident mistakes', () => {
    expect(binaryCrossEntropy([0.5, 0.5], [0, 1])).toBeCloseTo(Math.LN2, 12)
    expect(Number.isFinite(binaryCrossEntropy([1], [0]))).toBe(true)
  })

  it('accuracy counts exact matches', () => {
    expect(accuracy([1, 0, 1, 1], [1, 1, 1, 0])).toBe(0.5)
  })
})
