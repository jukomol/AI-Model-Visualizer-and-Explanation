import { describe, expect, it } from 'vitest'
import { checkMetric, curriculum, type MetricChallenge } from './curriculum'
import { OBJECTS, simulateDetections } from './detections'
import { iou, matchDetections, nonMaxSuppression } from './geometry'

const challenge = curriculum.nodes.find((n) => n.id === 'nms')!.challenge as MetricChallenge
const exact = (seed: number, iouT: number, scoreT: number) => {
  const kept = nonMaxSuppression(simulateDetections(seed), iouT, scoreT).kept
  const m = matchDetections(kept, OBJECTS, 0.5)
  return m.truePositives === OBJECTS.length && m.falsePositives === 0 ? 1 : 0
}

describe('simulated detector', () => {
  it('produces 6 proposals per object plus 4 background boxes, all scored in (0, 1)', () => {
    const boxes = simulateDetections(5)
    expect(boxes).toHaveLength(OBJECTS.length * 6 + 4)
    boxes.forEach((b) => {
      expect(b.score).toBeGreaterThan(0)
      expect(b.score).toBeLessThan(1)
    })
  })

  it('the highest-scoring proposal for each object overlaps it well', () => {
    const boxes = simulateDetections(5)
    for (const o of OBJECTS) {
      const best = boxes.filter((b) => b.label === o.name).sort((a, b) => b.score - a.score)[0]
      expect(iou(best, o)).toBeGreaterThan(0.6)
    }
  })

  it('the NMS challenge is not solved by the defaults but is solvable', () => {
    expect(checkMetric(challenge, exact(5, 0.9, 0.05))).toBe(false)
    let solvable = false
    for (let t = 0.1; t <= 0.9; t += 0.05) for (let s = 0; s <= 0.8; s += 0.05) if (exact(5, t, s)) solvable = true
    expect(solvable).toBe(true)
  })
})
