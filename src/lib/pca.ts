/**
 * Principal Component Analysis via eigen-decomposition of the covariance matrix.
 */
import { columnMeans, covarianceMatrix, dot, symmetricEigen, type Matrix, type Vector } from './linalg'

export interface PcaResult {
  mean: Vector
  /** Principal axes (unit vectors), ordered by decreasing variance. */
  components: Matrix
  /** Variance along each component (eigenvalues of the covariance matrix). */
  variances: Vector
  explainedVarianceRatio: Vector
}

export function pca(data: Matrix): PcaResult {
  const mean = columnMeans(data)
  const { values, vectors } = symmetricEigen(covarianceMatrix(data))
  const clipped = values.map((v) => Math.max(0, v))
  const total = clipped.reduce((a, b) => a + b, 0)
  return {
    mean,
    components: vectors,
    variances: clipped,
    explainedVarianceRatio: clipped.map((v) => (total === 0 ? 0 : v / total)),
  }
}

/** Project centred data onto the first k components. */
export function project(data: Matrix, result: PcaResult, k: number): Matrix {
  return data.map((row) => {
    const centred = row.map((v, j) => v - result.mean[j])
    return result.components.slice(0, k).map((c) => dot(centred, c))
  })
}

/** Reconstruct points from their k-dimensional projections. */
export function reconstruct(projected: Matrix, result: PcaResult): Matrix {
  return projected.map((z) =>
    result.mean.map((m, j) => m + z.reduce((s, zi, k) => s + zi * result.components[k][j], 0)),
  )
}

/** Sample variance of the data projected onto an arbitrary unit direction. */
export function projectedVariance(data: Matrix, direction: Vector): number {
  const n = Math.hypot(...direction)
  const u = direction.map((d) => d / n)
  const mean = columnMeans(data)
  const proj = data.map((row) => dot(row.map((v, j) => v - mean[j]), u))
  return proj.reduce((s, p) => s + p * p, 0) / Math.max(1, data.length - 1)
}
