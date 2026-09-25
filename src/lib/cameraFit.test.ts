import { describe, expect, it } from 'vitest'
import { fitDistance } from './cameraFit'

describe('fitDistance', () => {
  it('fits a unit cube seen head-on', () => {
    // Front face at z = 0.5; half-height 0.5 must fit tan(fov/2)·(d − 0.5).
    const d = fitDistance([-0.5, -0.5, -0.5], [0.5, 0.5, 0.5], [0, 0, 1], 90, 1, 1)
    expect(d).toBeCloseTo(1, 6)
  })

  it('needs more distance for a narrower field of view and for wider boxes', () => {
    const a = fitDistance([-1, -1, -1], [1, 1, 1], [0, 0, 1], 60, 1)
    const b = fitDistance([-1, -1, -1], [1, 1, 1], [0, 0, 1], 30, 1)
    const c = fitDistance([-4, -1, -1], [4, 1, 1], [0, 0, 1], 60, 1)
    expect(b).toBeGreaterThan(a)
    expect(c).toBeGreaterThan(a)
  })

  it('a wide aspect ratio lets a long box fit closer', () => {
    const narrow = fitDistance([-8, -1, -1], [8, 1, 1], [-0.6, 0.3, 0.7], 35, 1)
    const wide = fitDistance([-8, -1, -1], [8, 1, 1], [-0.6, 0.3, 0.7], 35, 2.5)
    expect(wide).toBeLessThan(narrow)
  })
})
