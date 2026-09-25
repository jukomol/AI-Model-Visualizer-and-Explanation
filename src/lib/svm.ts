/**
 * Linear soft-margin Support Vector Machine trained with Platt's Sequential
 * Minimal Optimisation (SMO) on the dual problem:
 *   max_α Σαᵢ − ½ ΣΣ αᵢαⱼ yᵢyⱼ ⟨xᵢ, xⱼ⟩   s.t. 0 ≤ αᵢ ≤ C,  Σ αᵢ yᵢ = 0
 * The primal solution is w = Σ αᵢ yᵢ xᵢ; points with αᵢ > 0 are support vectors.
 */
import type { Rng } from './random'

export interface SvmModel {
  w: [number, number]
  b: number
  alphas: number[]
  supportVectors: number[]
  iterations: number
}

export interface SvmOptions {
  C: number
  tol?: number
  maxPasses?: number
  maxIterations?: number
}

export function trainLinearSvm(
  points: readonly (readonly number[])[],
  labels: readonly (1 | -1)[],
  rng: Rng,
  options: SvmOptions,
): SvmModel {
  const n = points.length
  const C = options.C
  const tol = options.tol ?? 1e-4
  const maxPasses = options.maxPasses ?? 20
  const maxIterations = options.maxIterations ?? 20000
  const K = points.map((a) => points.map((b) => a[0] * b[0] + a[1] * b[1]))
  const alphas = new Array<number>(n).fill(0)
  let b = 0
  const f = (i: number) => {
    let s = b
    for (let k = 0; k < n; k++) if (alphas[k] !== 0) s += alphas[k] * labels[k] * K[k][i]
    return s
  }
  let passes = 0
  let iterations = 0
  while (passes < maxPasses && iterations < maxIterations) {
    let changed = 0
    for (let i = 0; i < n; i++) {
      iterations++
      const Ei = f(i) - labels[i]
      if (!((labels[i] * Ei < -tol && alphas[i] < C) || (labels[i] * Ei > tol && alphas[i] > 0))) continue
      let j = rng.int(n - 1)
      if (j >= i) j++
      const Ej = f(j) - labels[j]
      const ai = alphas[i]
      const aj = alphas[j]
      const L = labels[i] !== labels[j] ? Math.max(0, aj - ai) : Math.max(0, ai + aj - C)
      const H = labels[i] !== labels[j] ? Math.min(C, C + aj - ai) : Math.min(C, ai + aj)
      if (L >= H) continue
      const eta = 2 * K[i][j] - K[i][i] - K[j][j]
      if (eta >= 0) continue
      let ajNew = aj - (labels[j] * (Ei - Ej)) / eta
      ajNew = Math.min(H, Math.max(L, ajNew))
      if (Math.abs(ajNew - aj) < 1e-7) continue
      const aiNew = ai + labels[i] * labels[j] * (aj - ajNew)
      const b1 = b - Ei - labels[i] * (aiNew - ai) * K[i][i] - labels[j] * (ajNew - aj) * K[i][j]
      const b2 = b - Ej - labels[i] * (aiNew - ai) * K[i][j] - labels[j] * (ajNew - aj) * K[j][j]
      alphas[i] = aiNew
      alphas[j] = ajNew
      if (aiNew > 0 && aiNew < C) b = b1
      else if (ajNew > 0 && ajNew < C) b = b2
      else b = (b1 + b2) / 2
      changed++
    }
    passes = changed === 0 ? passes + 1 : 0
  }
  const w: [number, number] = [0, 0]
  alphas.forEach((a, k) => {
    w[0] += a * labels[k] * points[k][0]
    w[1] += a * labels[k] * points[k][1]
  })
  const supportVectors = alphas.map((a, k) => (a > 1e-6 ? k : -1)).filter((k) => k >= 0)
  return { w, b, alphas, supportVectors, iterations }
}

export function svmDecision(model: Pick<SvmModel, 'w' | 'b'>, x: readonly number[]): number {
  return model.w[0] * x[0] + model.w[1] * x[1] + model.b
}

/** Width of the margin band between the two supporting hyperplanes: 2 / ‖w‖. */
export function marginWidth(model: Pick<SvmModel, 'w'>): number {
  const n = Math.hypot(model.w[0], model.w[1])
  return n === 0 ? Infinity : 2 / n
}

/** Average hinge loss max(0, 1 − y f(x)). */
export function hingeLoss(model: Pick<SvmModel, 'w' | 'b'>, points: readonly (readonly number[])[], labels: readonly (1 | -1)[]): number {
  let s = 0
  points.forEach((x, i) => (s += Math.max(0, 1 - labels[i] * svmDecision(model, x))))
  return s / points.length
}
