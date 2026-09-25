/**
 * Small dense linear-algebra helpers on plain number arrays.
 * These power the pure-TypeScript visualizers (PCA, attention, RNNs) and are
 * deliberately simple so the maths stays readable next to the lessons.
 */

export type Vector = number[]
export type Matrix = number[][]

export function zeros(rows: number, cols: number): Matrix {
  return Array.from({ length: rows }, () => new Array<number>(cols).fill(0))
}

export function identity(n: number): Matrix {
  const m = zeros(n, n)
  for (let i = 0; i < n; i++) m[i][i] = 1
  return m
}

export function dot(a: Vector, b: Vector): number {
  if (a.length !== b.length) throw new Error(`dot: length mismatch ${a.length} vs ${b.length}`)
  let s = 0
  for (let i = 0; i < a.length; i++) s += a[i] * b[i]
  return s
}

export function norm(a: Vector): number {
  return Math.sqrt(dot(a, a))
}

export function add(a: Vector, b: Vector): Vector {
  return a.map((v, i) => v + b[i])
}

export function sub(a: Vector, b: Vector): Vector {
  return a.map((v, i) => v - b[i])
}

export function scale(a: Vector, s: number): Vector {
  return a.map((v) => v * s)
}

export function transpose(m: Matrix): Matrix {
  if (m.length === 0) return []
  return m[0].map((_, j) => m.map((row) => row[j]))
}

export function matMul(a: Matrix, b: Matrix): Matrix {
  const n = a.length
  const k = b.length
  if (n > 0 && a[0].length !== k) throw new Error(`matMul: inner dims ${a[0].length} vs ${k}`)
  const p = k > 0 ? b[0].length : 0
  const out = zeros(n, p)
  for (let i = 0; i < n; i++) {
    for (let t = 0; t < k; t++) {
      const ait = a[i][t]
      if (ait === 0) continue
      for (let j = 0; j < p; j++) out[i][j] += ait * b[t][j]
    }
  }
  return out
}

/** y = M x */
export function matVec(m: Matrix, x: Vector): Vector {
  return m.map((row) => dot(row, x))
}

/** Numerically stable softmax: subtracts the max before exponentiating. */
export function softmax(z: Vector): Vector {
  const finite = z.filter((v) => Number.isFinite(v))
  if (finite.length === 0) return z.map(() => 1 / z.length)
  const m = Math.max(...finite)
  const e = z.map((v) => (Number.isFinite(v) ? Math.exp(v - m) : 0))
  const s = e.reduce((acc, v) => acc + v, 0)
  return e.map((v) => v / s)
}

export function mean(values: readonly number[]): number {
  if (values.length === 0) return NaN
  let s = 0
  for (const v of values) s += v
  return s / values.length
}

/** Population variance (divides by n). */
export function variance(values: readonly number[]): number {
  const mu = mean(values)
  let s = 0
  for (const v of values) s += (v - mu) ** 2
  return s / values.length
}

/** Column means of a data matrix (rows = samples). */
export function columnMeans(data: Matrix): Vector {
  const d = data[0]?.length ?? 0
  const mu = new Array<number>(d).fill(0)
  for (const row of data) for (let j = 0; j < d; j++) mu[j] += row[j]
  return mu.map((v) => v / data.length)
}

/** Sample covariance matrix (divides by n - 1). */
export function covarianceMatrix(data: Matrix): Matrix {
  const n = data.length
  const mu = columnMeans(data)
  const d = mu.length
  const c = zeros(d, d)
  for (const row of data) {
    for (let i = 0; i < d; i++) {
      const di = row[i] - mu[i]
      for (let j = i; j < d; j++) c[i][j] += di * (row[j] - mu[j])
    }
  }
  for (let i = 0; i < d; i++) {
    for (let j = i; j < d; j++) {
      c[i][j] /= Math.max(1, n - 1)
      c[j][i] = c[i][j]
    }
  }
  return c
}

export interface EigenResult {
  /** Eigenvalues sorted in descending order. */
  values: Vector
  /** Unit eigenvectors; vectors[k] pairs with values[k]. */
  vectors: Matrix
}

/**
 * Jacobi eigenvalue algorithm for real symmetric matrices.
 * Repeatedly zeroes the largest off-diagonal element with a Givens rotation.
 */
export function symmetricEigen(a: Matrix, maxSweeps = 100, tol = 1e-12): EigenResult {
  const n = a.length
  const m = a.map((row) => row.slice())
  const v = identity(n)
  for (let sweep = 0; sweep < maxSweeps * n * n; sweep++) {
    let p = 0
    let q = 1
    let max = 0
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        if (Math.abs(m[i][j]) > max) {
          max = Math.abs(m[i][j])
          p = i
          q = j
        }
      }
    }
    if (max < tol) break
    const theta = (m[q][q] - m[p][p]) / (2 * m[p][q])
    const t = Math.sign(theta || 1) / (Math.abs(theta) + Math.sqrt(theta * theta + 1))
    const c = 1 / Math.sqrt(t * t + 1)
    const s = t * c
    for (let k = 0; k < n; k++) {
      const mkp = m[k][p]
      const mkq = m[k][q]
      m[k][p] = c * mkp - s * mkq
      m[k][q] = s * mkp + c * mkq
    }
    for (let k = 0; k < n; k++) {
      const mpk = m[p][k]
      const mqk = m[q][k]
      m[p][k] = c * mpk - s * mqk
      m[q][k] = s * mpk + c * mqk
    }
    for (let k = 0; k < n; k++) {
      const vkp = v[k][p]
      const vkq = v[k][q]
      v[k][p] = c * vkp - s * vkq
      v[k][q] = s * vkp + c * vkq
    }
  }
  const pairs = Array.from({ length: n }, (_, k) => ({
    value: m[k][k],
    vector: v.map((row) => row[k]),
  }))
  pairs.sort((x, y) => y.value - x.value)
  return {
    values: pairs.map((p) => p.value),
    vectors: pairs.map((p) => {
      // Canonical sign: make the largest-magnitude component positive.
      const idx = p.vector.reduce((best, val, i, arr) => (Math.abs(val) > Math.abs(arr[best]) ? i : best), 0)
      return p.vector[idx] < 0 ? p.vector.map((x) => -x) : p.vector
    }),
  }
}

/** Largest singular value (spectral norm ‖M‖₂) via power iteration on MᵀM. */
export function spectralNorm(m: Matrix, iterations = 100): number {
  const n = m[0]?.length ?? 0
  let v: Vector = new Array<number>(n).fill(1 / Math.sqrt(n))
  const mt = transpose(m)
  let sigma = 0
  for (let it = 0; it < iterations; it++) {
    const w = matVec(mt, matVec(m, v))
    const nw = norm(w)
    if (nw === 0) return 0
    v = scale(w, 1 / nw)
    sigma = Math.sqrt(nw)
  }
  return sigma
}

export function clamp(x: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, x))
}

export function linspace(a: number, b: number, n: number): Vector {
  if (n === 1) return [a]
  return Array.from({ length: n }, (_, i) => a + ((b - a) * i) / (n - 1))
}
