import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { pca, project, projectedVariance, reconstruct } from './pca'
import { createRng } from './random'

const iris = JSON.parse(readFileSync('public/datasets/iris.json', 'utf8')) as { rows: (number | string)[][] }
const irisX = iris.rows.map((r) => r.slice(0, 4) as number[])

describe('PCA on Fisher/Anderson Iris (real data)', () => {
  it('has 150 samples with the documented feature means', () => {
    expect(irisX).toHaveLength(150)
    const r = pca(irisX)
    expect(r.mean[0]).toBeCloseTo(5.8433, 3)
    expect(r.mean[1]).toBeCloseTo(3.0573, 3)
    expect(r.mean[2]).toBeCloseTo(3.758, 3)
    expect(r.mean[3]).toBeCloseTo(1.1993, 3)
  })

  it('reproduces the well-known explained-variance ratios (92.5%, 5.3%, 1.7%, 0.5%)', () => {
    const r = pca(irisX)
    expect(r.explainedVarianceRatio[0]).toBeCloseTo(0.9246, 3)
    expect(r.explainedVarianceRatio[1]).toBeCloseTo(0.0531, 3)
    expect(r.explainedVarianceRatio[2]).toBeCloseTo(0.0171, 3)
    expect(r.explainedVarianceRatio[3]).toBeCloseTo(0.0052, 3)
  })

  it('components are orthonormal', () => {
    const { components } = pca(irisX)
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const d = components[i].reduce((s, v, k) => s + v * components[j][k], 0)
        expect(d).toBeCloseTo(i === j ? 1 : 0, 8)
      }
    }
  })
})

describe('PCA properties', () => {
  const rng = createRng(21)
  const data = Array.from({ length: 300 }, () => {
    const t = rng.normal(0, 2)
    return [t + rng.normal(0, 0.3), 0.5 * t + rng.normal(0, 0.3)]
  })

  it('PC1 captures more variance than any other direction', () => {
    const r = pca(data)
    const best = projectedVariance(data, r.components[0])
    expect(best).toBeCloseTo(r.variances[0], 8)
    for (let a = 0; a < Math.PI; a += 0.1) {
      expect(projectedVariance(data, [Math.cos(a), Math.sin(a)])).toBeLessThanOrEqual(best + 1e-9)
    }
  })

  it('reconstruction from all components is exact', () => {
    const r = pca(data)
    const back = reconstruct(project(data, r, 2), r)
    back.forEach((row, i) => row.forEach((v, j) => expect(v).toBeCloseTo(data[i][j], 8)))
  })
})
