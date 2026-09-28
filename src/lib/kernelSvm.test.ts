import { describe, expect, it } from 'vitest'
import { generatePreset } from './datasets2d'
import { kernel, kernelSvmDecision, trainKernelSvm, type KernelParams } from './kernelSvm'
import { createRng } from './random'
import { trainLinearSvm } from './svm'

const RBF: KernelParams = { kind: 'rbf', gamma: 4, degree: 3, coef0: 1 }

describe('kernels', () => {
  it('evaluates linear, polynomial and RBF kernels', () => {
    expect(kernel({ ...RBF, kind: 'linear' }, [1, 2], [3, 4])).toBe(11)
    expect(kernel({ kind: 'poly', gamma: 1, degree: 2, coef0: 1 }, [1, 2], [3, 4])).toBe(144)
    expect(kernel(RBF, [0, 0], [0, 0])).toBe(1)
    expect(kernel({ ...RBF, gamma: 2 }, [0, 0], [1, 0])).toBeCloseTo(Math.exp(-2), 12)
  })
})

describe('kernel SVM (SMO)', () => {
  it('matches the linear SVM hard-margin solution with a linear kernel', () => {
    const pts: [number, number][] = [[-1, 0], [-2, 1], [-3, -1], [1, 0], [2, -1], [3, 1]]
    const y = [-1, -1, -1, 1, 1, 1] as (1 | -1)[]
    const m = trainKernelSvm(pts, y, createRng(1), { C: 1000, kernel: { ...RBF, kind: 'linear' }, tol: 1e-5 })
    const lin = trainLinearSvm(pts, y, createRng(1), { C: 1000 })
    for (const x of [[0.5, 0.3], [-2, 4], [1.7, -3]]) expect(kernelSvmDecision(m, x)).toBeCloseTo(lin.w[0] * x[0] + lin.w[1] * x[1] + lin.b, 2)
    expect(m.supportVectors.sort()).toEqual([0, 3])
  })

  it('satisfies the dual constraints Σ αᵢyᵢ = 0 and 0 ≤ α ≤ C', () => {
    const data = generatePreset('moons', createRng(3))
    const y = data.map((p) => (p.label === 1 ? 1 : -1)) as (1 | -1)[]
    const C = 0.7
    const m = trainKernelSvm(data.map((p) => [p.x, p.y] as [number, number]), y, createRng(2), { C, kernel: RBF })
    expect(Math.abs(m.alphas.reduce((s, a, i) => s + a * y[i], 0))).toBeLessThan(1e-8)
    m.alphas.forEach((a) => {
      expect(a).toBeGreaterThanOrEqual(0)
      expect(a).toBeLessThanOrEqual(C + 1e-12)
    })
  })

  it('separates concentric circles with an RBF kernel, which no linear boundary can', () => {
    const data = generatePreset('circles', createRng(5))
    const pts = data.map((p) => [p.x, p.y] as [number, number])
    const y = data.map((p) => (p.label === 1 ? 1 : -1)) as (1 | -1)[]
    const m = trainKernelSvm(pts, y, createRng(1), { C: 10, kernel: RBF })
    const acc = pts.filter((x, i) => Math.sign(kernelSvmDecision(m, x)) === y[i]).length / pts.length
    expect(acc).toBeGreaterThan(0.97)
    // Only a subset of points end up as support vectors.
    expect(m.supportVectors.length).toBeLessThan(pts.length / 2)
    // KKT: non-support vectors lie on or outside the margin.
    const svs = new Set(m.supportVectors)
    pts.forEach((x, i) => {
      if (!svs.has(i)) expect(y[i] * kernelSvmDecision(m, x)).toBeGreaterThan(1 - 0.01)
    })
  })

  it('uses more support vectors (a wigglier boundary) as γ grows', () => {
    const data = generatePreset('moons', createRng(1), 0.15)
    const pts = data.map((p) => [p.x, p.y] as [number, number])
    const y = data.map((p) => (p.label === 1 ? 1 : -1)) as (1 | -1)[]
    const sv = (gamma: number) => trainKernelSvm(pts, y, createRng(1), { C: 1, kernel: { ...RBF, gamma } }).supportVectors.length
    expect(sv(200)).toBeGreaterThan(sv(2))
  })
})
