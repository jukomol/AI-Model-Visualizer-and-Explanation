import { describe, expect, it } from 'vitest'
import { createRng } from './random'
import { hingeLoss, marginWidth, svmDecision, trainLinearSvm } from './svm'

describe('linear SVM (SMO)', () => {
  it('finds the maximum-margin separator for a symmetric toy problem', () => {
    const pts = [
      [-1, 0],
      [-2, 1],
      [-3, -1],
      [1, 0],
      [2, -1],
      [3, 1],
    ]
    const labels = [-1, -1, -1, 1, 1, 1] as const
    const m = trainLinearSvm(pts, [...labels], createRng(1), { C: 1000 })
    // Optimal hyperplane is x = 0 with margin 2.
    expect(m.w[0]).toBeCloseTo(1, 3)
    expect(m.w[1]).toBeCloseTo(0, 3)
    expect(m.b).toBeCloseTo(0, 3)
    expect(marginWidth(m)).toBeCloseTo(2, 3)
    expect(m.supportVectors.sort()).toEqual([0, 3])
    // Hard-margin constraints hold.
    pts.forEach((p, i) => expect(labels[i] * svmDecision(m, p)).toBeGreaterThanOrEqual(1 - 1e-3))
    expect(hingeLoss(m, pts, [...labels])).toBeLessThan(1e-3)
  })

  it('satisfies the dual constraints Σ αᵢyᵢ = 0 and 0 ≤ α ≤ C', () => {
    const rng = createRng(4)
    const pts: number[][] = []
    const labels: (1 | -1)[] = []
    for (let i = 0; i < 30; i++) {
      const y = i % 2 === 0 ? 1 : -1
      pts.push([rng.normal(y * 1, 0.8), rng.normal(y * 0.5, 0.8)])
      labels.push(y)
    }
    const C = 0.5
    const m = trainLinearSvm(pts, labels, createRng(2), { C })
    const s = m.alphas.reduce((acc, a, i) => acc + a * labels[i], 0)
    expect(Math.abs(s)).toBeLessThan(1e-6)
    m.alphas.forEach((a) => {
      expect(a).toBeGreaterThanOrEqual(0)
      expect(a).toBeLessThanOrEqual(C + 1e-9)
    })
  })

  it('a smaller C gives a wider (softer) margin', () => {
    const rng = createRng(8)
    const pts: number[][] = []
    const labels: (1 | -1)[] = []
    for (let i = 0; i < 40; i++) {
      const y = i % 2 === 0 ? 1 : -1
      pts.push([rng.normal(y * 1.2, 0.7), rng.normal(0, 0.7)])
      labels.push(y)
    }
    const hard = trainLinearSvm(pts, labels, createRng(3), { C: 100 })
    const soft = trainLinearSvm(pts, labels, createRng(3), { C: 0.05 })
    expect(marginWidth(soft)).toBeGreaterThan(marginWidth(hard))
  })
})
