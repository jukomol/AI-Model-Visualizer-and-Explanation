import { describe, expect, it } from 'vitest'
import { boundarySegment, perceptronStep, predictPerceptron, trainPerceptron } from './perceptron'

describe('perceptron', () => {
  it('updates only on mistakes using w ← w + ηyx', () => {
    const s0 = { w: [0, 0] as [number, number], b: 0 }
    const r = perceptronStep(s0, [2, 1], -1)
    expect(r.mistake).toBe(true)
    expect(r.state).toEqual({ w: [-2, -1], b: -1 })
    const r2 = perceptronStep(r.state, [2, 1], -1)
    expect(r2.mistake).toBe(false)
    expect(r2.state).toBe(r.state)
  })

  it('converges on linearly separable data (Novikoff) and separates it', () => {
    const pts = [
      [1, 2],
      [2, 3],
      [3, 3],
      [-1, -1],
      [-2, -1],
      [-1, -3],
    ]
    const labels = [1, 1, 1, -1, -1, -1] as const
    const run = trainPerceptron(pts, [...labels], 100)
    expect(run.convergedAtEpoch).not.toBeNull()
    pts.forEach((p, i) => expect(predictPerceptron(run.final, p)).toBe(labels[i]))
    expect(run.mistakesPerEpoch[run.mistakesPerEpoch.length - 1]).toBe(0)
  })

  it('never converges on XOR', () => {
    const pts = [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ]
    const run = trainPerceptron(pts, [-1, 1, 1, -1], 200)
    expect(run.convergedAtEpoch).toBeNull()
    run.mistakesPerEpoch.forEach((m) => expect(m).toBeGreaterThan(0))
  })
})

describe('boundarySegment', () => {
  it('returns endpoints that satisfy w·x + b = offset', () => {
    for (const st of [{ w: [1, 2] as [number, number], b: 0.3 }, { w: [3, -0.5] as [number, number], b: -1 }]) {
      for (const off of [0, 1, -1]) {
        const seg = boundarySegment(st, off)!
        expect(st.w[0] * seg[0] + st.w[1] * seg[1] + st.b).toBeCloseTo(off, 10)
        expect(st.w[0] * seg[2] + st.w[1] * seg[3] + st.b).toBeCloseTo(off, 10)
      }
    }
  })

  it('is null for a zero weight vector', () => {
    expect(boundarySegment({ w: [0, 0], b: 1 })).toBeNull()
  })
})
