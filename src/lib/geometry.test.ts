import { describe, expect, it } from 'vitest'
import { boxArea, intersection, iou, matchDetections, nonMaxSuppression, softNms, type ScoredBox } from './geometry'

const box = (x1: number, y1: number, x2: number, y2: number) => ({ x1, y1, x2, y2 })

describe('iou', () => {
  it('is 1 for identical boxes and 0 for disjoint boxes', () => {
    expect(iou(box(0, 0, 2, 2), box(0, 0, 2, 2))).toBe(1)
    expect(iou(box(0, 0, 1, 1), box(2, 2, 3, 3))).toBe(0)
  })

  it('treats touching edges as zero overlap', () => {
    expect(intersection(box(0, 0, 1, 1), box(1, 0, 2, 1))).toBeNull()
    expect(iou(box(0, 0, 1, 1), box(1, 0, 2, 1))).toBe(0)
  })

  it('matches a hand-computed partial overlap', () => {
    // Intersection 1×1 = 1, union 4 + 4 − 1 = 7.
    expect(iou(box(0, 0, 2, 2), box(1, 1, 3, 3))).toBeCloseTo(1 / 7, 12)
  })

  it('handles containment', () => {
    // Inner area 1, outer area 16.
    expect(iou(box(0, 0, 4, 4), box(1, 1, 2, 2))).toBeCloseTo(1 / 16, 12)
  })

  it('is symmetric and bounded', () => {
    const a = box(0.3, 0.1, 5.2, 4.4)
    const b = box(2.1, -1, 7, 3.3)
    expect(iou(a, b)).toBeCloseTo(iou(b, a), 12)
    expect(iou(a, b)).toBeGreaterThan(0)
    expect(iou(a, b)).toBeLessThan(1)
    expect(boxArea(box(3, 3, 1, 1))).toBe(0)
  })
})

describe('nonMaxSuppression', () => {
  const boxes: ScoredBox[] = [
    { id: 0, ...box(0, 0, 10, 10), score: 0.9 },
    { id: 1, ...box(1, 1, 11, 11), score: 0.8 }, // IoU with 0 ≈ 0.68
    { id: 2, ...box(20, 20, 30, 30), score: 0.7 },
    { id: 3, ...box(21, 20, 31, 30), score: 0.6 }, // IoU with 2 ≈ 0.82
    { id: 4, ...box(50, 50, 60, 60), score: 0.05 },
  ]

  it('keeps one box per object at a moderate threshold', () => {
    const r = nonMaxSuppression(boxes, 0.5, 0.1)
    expect(r.kept.map((b) => b.id)).toEqual([0, 2])
    expect(r.suppressed.map((s) => s.box.id).sort()).toEqual([1, 3])
    expect(r.belowScore.map((b) => b.id)).toEqual([4])
    expect(r.steps).toHaveLength(2)
    expect(r.suppressed.find((s) => s.box.id === 1)?.by.id).toBe(0)
  })

  it('keeps everything with a threshold of 1 and nothing overlaps at threshold 0', () => {
    expect(nonMaxSuppression(boxes, 1).kept).toHaveLength(5)
    const strict = nonMaxSuppression(boxes, 0)
    expect(strict.kept.map((b) => b.id)).toEqual([0, 2, 4])
  })

  it('only suppresses within the same class label', () => {
    const labelled: ScoredBox[] = [
      { id: 0, ...box(0, 0, 10, 10), score: 0.9, label: 'cat' },
      { id: 1, ...box(0, 0, 10, 10), score: 0.8, label: 'dog' },
    ]
    expect(nonMaxSuppression(labelled, 0.5).kept).toHaveLength(2)
  })

  it('outputs boxes in descending score order', () => {
    const kept = nonMaxSuppression(boxes, 0.9).kept
    for (let i = 1; i < kept.length; i++) expect(kept[i - 1].score).toBeGreaterThanOrEqual(kept[i].score)
  })
})

describe('softNms', () => {
  it('decays overlapping scores instead of deleting them', () => {
    const b: ScoredBox[] = [
      { id: 0, ...box(0, 0, 10, 10), score: 0.9 },
      { id: 1, ...box(1, 1, 11, 11), score: 0.8 },
    ]
    const out = softNms(b, 0.5)
    expect(out).toHaveLength(2)
    const o = iou(b[0], b[1])
    expect(out[1].score).toBeCloseTo(0.8 * Math.exp(-(o * o) / 0.5), 10)
  })
})

describe('matchDetections', () => {
  it('counts true positives, false positives and misses', () => {
    const gt = [box(0, 0, 10, 10), box(20, 20, 30, 30)]
    const preds = [box(0, 0, 10, 10), box(1, 1, 11, 11), box(50, 50, 60, 60)]
    expect(matchDetections(preds, gt)).toEqual({ truePositives: 1, falsePositives: 2, missed: 1 })
  })
})
