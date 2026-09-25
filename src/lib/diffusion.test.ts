import { describe, expect, it } from 'vitest'
import { ddimSample, makeSchedule, meanNearestDistance, optimalDenoise, qSample, samplingTimesteps, type Vec2 } from './diffusion'
import { createRng } from './random'

describe('noise schedules', () => {
  for (const kind of ['linear', 'cosine'] as const) {
    it(`${kind}: ᾱ decreases monotonically from 1 towards 0`, () => {
      const s = makeSchedule(kind, 1000)
      expect(s.alphaBars).toHaveLength(1001)
      expect(s.alphaBars[0]).toBe(1)
      for (let t = 1; t <= 1000; t++) {
        expect(s.alphaBars[t]).toBeLessThan(s.alphaBars[t - 1])
        expect(s.alphaBars[t]).toBeGreaterThanOrEqual(0)
      }
      expect(s.alphaBars[1000]).toBeLessThan(1e-3)
    })
  }

  it('linear schedule matches Ho et al. endpoints', () => {
    const s = makeSchedule('linear', 1000)
    expect(s.betas[0]).toBeCloseTo(1e-4, 10)
    expect(s.betas[999]).toBeCloseTo(0.02, 10)
  })

  it('cosine schedule destroys information more gradually early on', () => {
    const lin = makeSchedule('linear', 1000)
    const cos = makeSchedule('cosine', 1000)
    expect(cos.alphaBars[250]).toBeGreaterThan(lin.alphaBars[250])
  })
})

describe('forward process', () => {
  it('has mean √ᾱ x₀ and variance 1 − ᾱ', () => {
    const s = makeSchedule('linear', 1000)
    const rng = createRng(1)
    const t = 300
    const x0: Vec2 = [2, -1]
    const xs = Array.from({ length: 20000 }, () => qSample(x0, t, [rng.normal(), rng.normal()], s))
    const mx = xs.reduce((a, p) => a + p[0], 0) / xs.length
    const vx = xs.reduce((a, p) => a + (p[0] - mx) ** 2, 0) / xs.length
    expect(mx).toBeCloseTo(Math.sqrt(s.alphaBars[t]) * 2, 1)
    expect(vx).toBeCloseTo(1 - s.alphaBars[t], 1)
  })
})

describe('optimal denoiser and DDIM sampling', () => {
  const data: Vec2[] = Array.from({ length: 40 }, (_, i) => {
    const a = (i / 40) * 2 * Math.PI
    return [Math.cos(a), Math.sin(a)]
  })
  const schedule = makeSchedule('cosine', 1000)

  it('returns the clean point at t = 0 and the data mean at t = T', () => {
    const x = optimalDenoise([1, 0], 0, data, schedule)
    expect(x[0]).toBeCloseTo(1, 6)
    const mean = optimalDenoise([0.3, -0.2], 1000, data, schedule)
    expect(Math.hypot(mean[0], mean[1])).toBeLessThan(0.05)
  })

  it('timesteps run from T down to 0', () => {
    expect(samplingTimesteps(1000, 4)).toEqual([1000, 750, 500, 250, 0])
  })

  it('samples land on the data manifold with enough steps', () => {
    const traj = ddimSample(data, schedule, 50, 30, createRng(4))
    const finals = traj.map((t) => t[t.length - 1])
    expect(meanNearestDistance(finals, data)).toBeLessThan(0.02)
    finals.forEach((p) => expect(Math.hypot(p[0], p[1])).toBeCloseTo(1, 1))
  })

  it('one giant step collapses samples towards the data mean', () => {
    const traj = ddimSample(data, schedule, 1, 30, createRng(4))
    const finals = traj.map((t) => t[t.length - 1])
    const meanRadius = finals.reduce((s, p) => s + Math.hypot(p[0], p[1]), 0) / finals.length
    expect(meanRadius).toBeLessThan(0.5)
  })
})
