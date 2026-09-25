/**
 * Denoising diffusion (Sohl-Dickstein et al., 2015; Ho et al., 2020; Song et
 * al., 2021) on 2-D point clouds.
 *
 * Forward process:  q(x_t | x_0) = N(√ᾱ_t x_0, (1 − ᾱ_t) I)
 *
 * The reverse process needs E[x_0 | x_t]. For an empirical data distribution
 * (a finite set of points) this posterior mean has a closed form — a softmax
 * over data points — so the sampler below uses the *exact optimal denoiser*
 * instead of a trained network. (A perfect denoiser memorises its training set;
 * real networks generalise precisely because they are smooth approximations.)
 */
import type { Rng } from './random'

export type ScheduleKind = 'linear' | 'cosine'

export interface NoiseSchedule {
  kind: ScheduleKind
  T: number
  betas: number[]
  /** ᾱ_t for t = 0 … T, with ᾱ_0 = 1. */
  alphaBars: number[]
}

export function makeSchedule(kind: ScheduleKind, T = 1000): NoiseSchedule {
  const betas: number[] = []
  const alphaBars = [1]
  if (kind === 'linear') {
    // Ho et al. (2020): β from 1e−4 to 0.02 over T = 1000 steps.
    for (let t = 1; t <= T; t++) {
      const beta = 1e-4 + ((0.02 - 1e-4) * (t - 1)) / Math.max(1, T - 1)
      betas.push(beta)
      alphaBars.push(alphaBars[t - 1] * (1 - beta))
    }
  } else {
    // Nichol & Dhariwal (2021): ᾱ(t) = f(t)/f(0), f(t) = cos²(((t/T + s)/(1 + s))·π/2).
    const s = 0.008
    const f = (t: number) => Math.cos((((t / T) + s) / (1 + s)) * (Math.PI / 2)) ** 2
    for (let t = 1; t <= T; t++) {
      const beta = Math.min(0.999, 1 - f(t) / f(t - 1))
      betas.push(beta)
      alphaBars.push(alphaBars[t - 1] * (1 - beta))
    }
  }
  return { kind, T, betas, alphaBars }
}

export type Vec2 = [number, number]

/** Closed-form forward sample x_t = √ᾱ_t x_0 + √(1 − ᾱ_t) ε. */
export function qSample(x0: Vec2, t: number, eps: Vec2, schedule: NoiseSchedule): Vec2 {
  const ab = schedule.alphaBars[t]
  const a = Math.sqrt(ab)
  const b = Math.sqrt(1 - ab)
  return [a * x0[0] + b * eps[0], a * x0[1] + b * eps[1]]
}

/**
 * Posterior mean E[x_0 | x_t] under the empirical distribution of `data`:
 *   w_i ∝ exp(−‖x_t − √ᾱ_t x⁽ⁱ⁾‖² / (2(1 − ᾱ_t))),   x̂_0 = Σ w_i x⁽ⁱ⁾
 */
export function optimalDenoise(xt: Vec2, t: number, data: readonly Vec2[], schedule: NoiseSchedule): Vec2 {
  const ab = schedule.alphaBars[t]
  const a = Math.sqrt(ab)
  const v = Math.max(1e-12, 1 - ab)
  const logits = data.map((d) => -((xt[0] - a * d[0]) ** 2 + (xt[1] - a * d[1]) ** 2) / (2 * v))
  const m = Math.max(...logits)
  let z = 0
  let x = 0
  let y = 0
  logits.forEach((l, i) => {
    const w = Math.exp(l - m)
    z += w
    x += w * data[i][0]
    y += w * data[i][1]
  })
  return [x / z, y / z]
}

/** Evenly spaced timesteps T = τ_S > … > τ_0 = 0 used by the accelerated sampler. */
export function samplingTimesteps(T: number, steps: number): number[] {
  const ts: number[] = []
  for (let k = steps; k >= 0; k--) ts.push(Math.round((k * T) / steps))
  return ts
}

/**
 * Deterministic DDIM sampling (η = 0):
 *   ε̂ = (x_t − √ᾱ_t x̂_0) / √(1 − ᾱ_t)
 *   x_{t′} = √ᾱ_{t′} x̂_0 + √(1 − ᾱ_{t′}) ε̂
 * Returns the full trajectory of every sample.
 */
export function ddimSample(
  data: readonly Vec2[],
  schedule: NoiseSchedule,
  steps: number,
  count: number,
  rng: Rng,
): Vec2[][] {
  const ts = samplingTimesteps(schedule.T, steps)
  const trajectories: Vec2[][] = []
  for (let n = 0; n < count; n++) {
    let x: Vec2 = [rng.normal(), rng.normal()]
    const traj: Vec2[] = [x]
    for (let k = 0; k < ts.length - 1; k++) {
      const t = ts[k]
      const tNext = ts[k + 1]
      const x0 = optimalDenoise(x, t, data, schedule)
      const ab = schedule.alphaBars[t]
      const abNext = schedule.alphaBars[tNext]
      const s = Math.sqrt(Math.max(1e-12, 1 - ab))
      const eps: Vec2 = [(x[0] - Math.sqrt(ab) * x0[0]) / s, (x[1] - Math.sqrt(ab) * x0[1]) / s]
      x = [
        Math.sqrt(abNext) * x0[0] + Math.sqrt(1 - abNext) * eps[0],
        Math.sqrt(abNext) * x0[1] + Math.sqrt(1 - abNext) * eps[1],
      ]
      traj.push(x)
    }
    trajectories.push(traj)
  }
  return trajectories
}

/** Mean distance from each sample to its nearest data point. */
export function meanNearestDistance(samples: readonly Vec2[], data: readonly Vec2[]): number {
  if (samples.length === 0) return 0
  let s = 0
  for (const p of samples) {
    let best = Infinity
    for (const d of data) best = Math.min(best, Math.hypot(p[0] - d[0], p[1] - d[1]))
    s += best
  }
  return s / samples.length
}
