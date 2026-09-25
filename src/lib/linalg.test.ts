import { describe, expect, it } from 'vitest'
import {
  covarianceMatrix,
  dot,
  identity,
  matMul,
  matVec,
  softmax,
  spectralNorm,
  symmetricEigen,
  transpose,
  variance,
} from './linalg'

describe('basic linear algebra', () => {
  it('computes dot products and matrix products', () => {
    expect(dot([1, 2, 3], [4, 5, 6])).toBe(32)
    expect(matMul([[1, 2], [3, 4]], [[5, 6], [7, 8]])).toEqual([[19, 22], [43, 50]])
    expect(matVec([[1, 0], [0, 2]], [3, 4])).toEqual([3, 8])
    expect(transpose([[1, 2, 3]])).toEqual([[1], [2], [3]])
    expect(matMul(identity(3), [[1], [2], [3]])).toEqual([[1], [2], [3]])
  })

  it('throws on mismatched shapes', () => {
    expect(() => dot([1], [1, 2])).toThrow()
    expect(() => matMul([[1, 2]], [[1, 2]])).toThrow()
  })
})

describe('softmax', () => {
  it('sums to one and is shift invariant', () => {
    const p = softmax([1, 2, 3])
    expect(p.reduce((a, b) => a + b, 0)).toBeCloseTo(1, 12)
    const q = softmax([1001, 1002, 1003])
    p.forEach((v, i) => expect(q[i]).toBeCloseTo(v, 12))
  })

  it('treats -Infinity as a masked entry', () => {
    const p = softmax([0, -Infinity, 0])
    expect(p).toEqual([0.5, 0, 0.5])
  })
})

describe('statistics', () => {
  it('computes population variance and sample covariance', () => {
    expect(variance([1, 2, 3, 4])).toBeCloseTo(1.25)
    const c = covarianceMatrix([
      [1, 2],
      [2, 4],
      [3, 6],
    ])
    expect(c[0][0]).toBeCloseTo(1)
    expect(c[0][1]).toBeCloseTo(2)
    expect(c[1][1]).toBeCloseTo(4)
  })
})

describe('symmetricEigen (Jacobi)', () => {
  it('diagonalises a known 2×2 matrix', () => {
    const { values, vectors } = symmetricEigen([
      [2, 1],
      [1, 2],
    ])
    expect(values[0]).toBeCloseTo(3)
    expect(values[1]).toBeCloseTo(1)
    expect(Math.abs(vectors[0][0])).toBeCloseTo(Math.SQRT1_2)
    expect(Math.abs(vectors[0][1])).toBeCloseTo(Math.SQRT1_2)
  })

  it('satisfies A v = λ v for a 4×4 matrix', () => {
    const a = [
      [4, 1, 2, 0.5],
      [1, 3, 0, 1],
      [2, 0, 5, 1],
      [0.5, 1, 1, 2],
    ]
    const { values, vectors } = symmetricEigen(a)
    values.forEach((lambda, k) => {
      const av = matVec(a, vectors[k])
      av.forEach((x, i) => expect(x).toBeCloseTo(lambda * vectors[k][i], 8))
    })
    // Trace is preserved.
    expect(values.reduce((s, v) => s + v, 0)).toBeCloseTo(14, 8)
  })
})

describe('spectralNorm', () => {
  it('returns the largest singular value', () => {
    expect(spectralNorm([[3, 0], [0, 1]])).toBeCloseTo(3, 6)
    expect(spectralNorm([[0, 2], [0, 0]])).toBeCloseTo(2, 6)
  })
})
