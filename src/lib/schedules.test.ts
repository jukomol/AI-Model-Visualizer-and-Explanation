import { describe, expect, it } from 'vitest'
import { scheduleMultiplier, type ScheduleId } from './schedules'

const ids: ScheduleId[] = ['constant', 'step', 'exponential', 'cosine', 'warmup-cosine', 'one-cycle', 'inverse-sqrt']

describe('learning-rate schedules', () => {
  it.each(ids)('%s stays within (0, 1]', (id) => {
    for (let t = 0; t < 200; t++) {
      const m = scheduleMultiplier(id, t, 200)
      expect(m).toBeGreaterThan(0)
      expect(m).toBeLessThanOrEqual(1 + 1e-12)
    }
  })

  it('has the documented shapes', () => {
    expect(scheduleMultiplier('step', 99, 200)).toBe(1)
    expect(scheduleMultiplier('step', 100, 200)).toBeCloseTo(0.1)
    expect(scheduleMultiplier('step', 150, 200)).toBeCloseTo(0.01)
    expect(scheduleMultiplier('cosine', 0, 200)).toBe(1)
    expect(scheduleMultiplier('cosine', 100, 200)).toBeCloseTo(0.5)
    expect(scheduleMultiplier('exponential', 200, 200)).toBeCloseTo(0.01)
  })

  it('warm-up schedules ramp up first', () => {
    for (const id of ['warmup-cosine', 'one-cycle', 'inverse-sqrt'] as const) {
      expect(scheduleMultiplier(id, 0, 1000)).toBeLessThan(scheduleMultiplier(id, 50, 1000))
    }
    // One-cycle peaks at 30% of training.
    expect(scheduleMultiplier('one-cycle', 300, 1000)).toBeCloseTo(1, 6)
    // Inverse square root peaks at the end of warm-up and then decays as t^−½.
    expect(scheduleMultiplier('inverse-sqrt', 99, 1000)).toBeCloseTo(1, 6)
    expect(scheduleMultiplier('inverse-sqrt', 399, 1000)).toBeCloseTo(0.5, 6)
  })
})
