/**
 * Polynomial regression with L2 (ridge) and L1 (lasso) regularisation, used to
 * show over-fitting, the bias–variance trade-off and sparsity.
 */
import type { Rng } from './random'

/** Features [1, x, x², …, x^d] for x already scaled into [−1, 1]. */
export function polyFeatures(x: number, degree: number): number[] {
  const f = [1]
  for (let k = 1; k <= degree; k++) f.push(f[k - 1] * x)
  return f
}

/** Solve A w = b for symmetric positive-definite A (Cholesky). */
export function solveSpd(A: number[][], b: number[]): number[] {
  const n = A.length
  const L = A.map(() => new Array<number>(n).fill(0))
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      let s = A[i][j]
      for (let k = 0; k < j; k++) s -= L[i][k] * L[j][k]
      if (i === j) {
        if (s <= 0) throw new Error('solveSpd: matrix is not positive definite')
        L[i][i] = Math.sqrt(s)
      } else L[i][j] = s / L[j][j]
    }
  }
  const y = new Array<number>(n).fill(0)
  for (let i = 0; i < n; i++) {
    let s = b[i]
    for (let k = 0; k < i; k++) s -= L[i][k] * y[k]
    y[i] = s / L[i][i]
  }
  const w = new Array<number>(n).fill(0)
  for (let i = n - 1; i >= 0; i--) {
    let s = y[i]
    for (let k = i + 1; k < n; k++) s -= L[k][i] * w[k]
    w[i] = s / L[i][i]
  }
  return w
}

/**
 * Ridge regression: minimise (1/n)‖Xw − y‖² + λ‖w₁:d‖² (the intercept is not
 * penalised). Closed form: (XᵀX/n + λ D) w = Xᵀy/n. A tiny jitter keeps
 * λ = 0 solvable for exactly-determined fits.
 */
export function ridgeFit(xs: readonly number[], ys: readonly number[], degree: number, lambda: number): number[] {
  const n = xs.length
  const d = degree + 1
  const A = Array.from({ length: d }, () => new Array<number>(d).fill(0))
  const b = new Array<number>(d).fill(0)
  xs.forEach((x, i) => {
    const f = polyFeatures(x, degree)
    for (let p = 0; p < d; p++) {
      b[p] += (f[p] * ys[i]) / n
      for (let q = 0; q < d; q++) A[p][q] += (f[p] * f[q]) / n
    }
  })
  for (let p = 0; p < d; p++) A[p][p] += (p === 0 ? 0 : lambda) + 1e-10
  return solveSpd(A, b)
}

/**
 * Lasso: minimise (1/2n)‖Xw − y‖² + λ‖w₁:d‖₁ by cyclic coordinate descent
 * with soft-thresholding (Friedman, Hastie & Tibshirani, 2010).
 */
export function lassoFit(xs: readonly number[], ys: readonly number[], degree: number, lambda: number, sweeps = 3000): number[] {
  const n = xs.length
  const d = degree + 1
  const X = xs.map((x) => polyFeatures(x, degree))
  const w = new Array<number>(d).fill(0)
  const col2 = Array.from({ length: d }, (_, j) => X.reduce((s, row) => s + row[j] ** 2, 0) / n)
  const resid = ys.slice()
  for (let sweep = 0; sweep < sweeps; sweep++) {
    let maxChange = 0
    for (let j = 0; j < d; j++) {
      // ρ = (1/n) Σ x_ij (r_i + x_ij w_j)
      let rho = 0
      for (let i = 0; i < n; i++) rho += X[i][j] * (resid[i] + X[i][j] * w[j])
      rho /= n
      const next = j === 0 ? rho / col2[j] : Math.sign(rho) * Math.max(0, Math.abs(rho) - lambda) / col2[j]
      const delta = next - w[j]
      if (delta !== 0) {
        for (let i = 0; i < n; i++) resid[i] -= X[i][j] * delta
        w[j] = next
        maxChange = Math.max(maxChange, Math.abs(delta))
      }
    }
    if (maxChange < 1e-10) break
  }
  return w
}

export function predictPoly(w: readonly number[], x: number): number {
  let s = 0
  let p = 1
  for (const c of w) {
    s += c * p
    p *= x
  }
  return s
}

export function mseOf(w: readonly number[], xs: readonly number[], ys: readonly number[]): number {
  return xs.reduce((s, x, i) => s + (predictPoly(w, x) - ys[i]) ** 2, 0) / xs.length
}

/** The ground-truth curve for the regularisation lesson. */
export function trueFunction(x: number): number {
  return Math.sin(Math.PI * x) + 0.3 * x
}

/** Noisy samples of the true function on [−1, 1]. */
export function sampleCurve(n: number, noise: number, rng: Rng): { xs: number[]; ys: number[] } {
  const xs = Array.from({ length: n }, () => rng.uniform(-1, 1)).sort((a, b) => a - b)
  return { xs, ys: xs.map((x) => trueFunction(x) + rng.normal(0, noise)) }
}
