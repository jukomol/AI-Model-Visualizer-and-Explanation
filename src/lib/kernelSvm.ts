/**
 * Kernel soft-margin SVM trained with SMO on the dual problem
 *   max_α Σαᵢ − ½ ΣΣ αᵢαⱼ yᵢyⱼ K(xᵢ, xⱼ)   s.t. 0 ≤ αᵢ ≤ C,  Σ αᵢ yᵢ = 0
 * with a cached error vector Eᵢ = f(xᵢ) − yᵢ and Platt's second-choice
 * heuristic (maximise |Eᵢ − Eⱼ|), falling back to a random partner.
 * The decision function is f(x) = Σ αᵢ yᵢ K(xᵢ, x) + b.
 */
import type { Rng } from './random'

export type KernelKind = 'linear' | 'poly' | 'rbf'

export interface KernelParams {
  kind: KernelKind
  /** RBF width: K = exp(−γ‖a − b‖²). Also scales the polynomial kernel. */
  gamma: number
  degree: number
  coef0: number
}

export function kernel(p: KernelParams, a: readonly number[], b: readonly number[]): number {
  const d0 = a[0] - b[0]
  const d1 = a[1] - b[1]
  switch (p.kind) {
    case 'linear':
      return a[0] * b[0] + a[1] * b[1]
    case 'poly':
      return (p.gamma * (a[0] * b[0] + a[1] * b[1]) + p.coef0) ** p.degree
    case 'rbf':
      return Math.exp(-p.gamma * (d0 * d0 + d1 * d1))
  }
}

export interface KernelSvmModel {
  kernel: KernelParams
  b: number
  /** Indices (into the training set) of the support vectors, αᵢ > 0. */
  supportVectors: number[]
  /** Support-vector coordinates and their coefficients αᵢyᵢ. */
  svPoints: [number, number][]
  svCoef: number[]
  alphas: number[]
  iterations: number
}

export interface KernelSvmOptions {
  C: number
  kernel: KernelParams
  tol?: number
  maxPasses?: number
  maxIterations?: number
}

export function trainKernelSvm(
  points: ReadonlyArray<readonly [number, number]>,
  labels: readonly (1 | -1)[],
  rng: Rng,
  options: KernelSvmOptions,
): KernelSvmModel {
  const n = points.length
  const { C } = options
  const tol = options.tol ?? 1e-3
  const maxPasses = options.maxPasses ?? 5
  const maxIterations = options.maxIterations ?? 200 * Math.max(n, 1)
  const K = new Float64Array(n * n)
  for (let i = 0; i < n; i++) for (let j = i; j < n; j++) K[i * n + j] = K[j * n + i] = kernel(options.kernel, points[i], points[j])
  const alphas = new Float64Array(n)
  // With α = 0 and b = 0, f ≡ 0 so Eᵢ = −yᵢ.
  const E = Float64Array.from(labels, (y) => -y)
  let b = 0

  const takeStep = (i: number, j: number): boolean => {
    if (i === j) return false
    const yi = labels[i]
    const yj = labels[j]
    const ai = alphas[i]
    const aj = alphas[j]
    const L = yi !== yj ? Math.max(0, aj - ai) : Math.max(0, ai + aj - C)
    const H = yi !== yj ? Math.min(C, C + aj - ai) : Math.min(C, ai + aj)
    if (H - L < 1e-12) return false
    const kii = K[i * n + i]
    const kjj = K[j * n + j]
    const kij = K[i * n + j]
    const eta = 2 * kij - kii - kjj
    if (eta >= -1e-12) return false
    let ajNew = aj - (yj * (E[i] - E[j])) / eta
    ajNew = Math.min(H, Math.max(L, ajNew))
    if (Math.abs(ajNew - aj) < 1e-8 * (ajNew + aj + 1e-8)) return false
    const aiNew = ai + yi * yj * (aj - ajNew)
    const b1 = b - E[i] - yi * (aiNew - ai) * kii - yj * (ajNew - aj) * kij
    const b2 = b - E[j] - yi * (aiNew - ai) * kij - yj * (ajNew - aj) * kjj
    const bNew = aiNew > 0 && aiNew < C ? b1 : ajNew > 0 && ajNew < C ? b2 : (b1 + b2) / 2
    const di = yi * (aiNew - ai)
    const dj = yj * (ajNew - aj)
    const db = bNew - b
    for (let k = 0; k < n; k++) E[k] += di * K[i * n + k] + dj * K[j * n + k] + db
    alphas[i] = aiNew
    alphas[j] = ajNew
    b = bNew
    return true
  }

  let passes = 0
  let iterations = 0
  while (passes < maxPasses && iterations < maxIterations) {
    let changed = 0
    for (let i = 0; i < n && iterations < maxIterations; i++) {
      iterations++
      const r = labels[i] * E[i]
      if (!((r < -tol && alphas[i] < C) || (r > tol && alphas[i] > 0))) continue
      // Second choice: the non-bound partner with the largest |Eᵢ − Eⱼ|.
      let j = -1
      let best = 0
      for (let k = 0; k < n; k++) {
        if (alphas[k] <= 0 || alphas[k] >= C) continue
        const gap = Math.abs(E[i] - E[k])
        if (gap > best) {
          best = gap
          j = k
        }
      }
      if (j >= 0 && takeStep(i, j)) {
        changed++
        continue
      }
      if (n < 2) continue
      let r2 = rng.int(n - 1)
      if (r2 >= i) r2++
      if (takeStep(i, r2)) changed++
    }
    passes = changed === 0 ? passes + 1 : 0
  }

  const supportVectors: number[] = []
  alphas.forEach((a, k) => {
    if (a > 1e-7) supportVectors.push(k)
  })
  return {
    kernel: options.kernel,
    b,
    supportVectors,
    svPoints: supportVectors.map((k) => [points[k][0], points[k][1]]),
    svCoef: supportVectors.map((k) => alphas[k] * labels[k]),
    alphas: Array.from(alphas),
    iterations,
  }
}

export function kernelSvmDecision(model: KernelSvmModel, x: readonly number[]): number {
  let s = model.b
  for (let k = 0; k < model.svPoints.length; k++) s += model.svCoef[k] * kernel(model.kernel, model.svPoints[k], x)
  return s
}
