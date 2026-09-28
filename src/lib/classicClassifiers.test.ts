import { describe, expect, it } from 'vitest'
import {
  DEFAULT_CLASSIC_PARAMS,
  accuracyOf,
  adaBoost,
  argmax,
  crossValidatedAccuracy,
  fitClassic,
  gaussianLogPdf,
  probabilityGrid,
  softmaxLog,
  type ClassicKind,
  type ClassicParams,
} from './classicClassifiers'
import { generatePreset, type DatasetPreset } from './datasets2d'
import { createRng } from './random'

const KINDS: ClassicKind[] = ['knn', 'naive-bayes', 'lda', 'qda', 'svm', 'tree', 'forest', 'adaboost']

function data(preset: DatasetPreset, seed = 1, noise?: number) {
  const pts = generatePreset(preset, createRng(seed), noise)
  const labels = pts.map((p) => p.label)
  return { points: pts.map((p) => [p.x, p.y] as [number, number]), labels, classes: Math.max(2, ...labels.map((l) => l + 1)) }
}

const cv = (kind: ClassicKind, preset: DatasetPreset, params: Partial<ClassicParams> = {}) => {
  const d = data(preset)
  return crossValidatedAccuracy(kind, d.points, d.labels, d.classes, { ...DEFAULT_CLASSIC_PARAMS, ...params })
}

describe('helpers', () => {
  it('softmaxLog normalises and zeroes −∞ entries', () => {
    const p = softmaxLog([0, Math.log(3), -Infinity])
    expect(p[0]).toBeCloseTo(0.25, 12)
    expect(p[1]).toBeCloseTo(0.75, 12)
    expect(p[2]).toBe(0)
    expect(softmaxLog([1000, 1000])).toEqual([0.5, 0.5])
  })

  it('gaussianLogPdf matches the closed-form density', () => {
    expect(gaussianLogPdf([0, 0], [0, 0], [1, 0, 1])).toBeCloseTo(-Math.log(2 * Math.PI), 12)
    // Correlated case: ρ = 0.5, x = (1, 1) ⇒ Mahalanobis² = 4/3, det = 0.75.
    expect(gaussianLogPdf([1, 1], [0, 0], [1, 0.5, 1])).toBeCloseTo(-0.5 * (4 / 3 + Math.log(0.75)) - Math.log(2 * Math.PI), 12)
  })
})

describe('every classic model', () => {
  it.each(KINDS)('%s returns valid probability vectors and a grid of the right shape', (kind) => {
    const d = data('blobs')
    const m = fitClassic(kind, d.points, d.labels, d.classes)
    for (const x of [[0, 0], [0.9, -0.9], [-0.3, 0.6]] as [number, number][]) {
      const p = m.predictProba(x)
      expect(p).toHaveLength(4)
      p.forEach((v) => expect(v).toBeGreaterThanOrEqual(0))
      expect(p.reduce((a, b) => a + b, 0)).toBeCloseTo(1, 9)
    }
    const g = probabilityGrid(m, 8)
    expect(g).toHaveLength(8 * 8 * 4)
    expect(g.every(Number.isFinite)).toBe(true)
    expect(accuracyOf(m, d.points, d.labels)).toBeGreaterThan(0.95)
  })

  it.each(KINDS)('%s degrades gracefully with a single class or a gap in the labels', (kind) => {
    const one = fitClassic(kind, [[0, 0], [0.5, 0.5]], [1, 1], 2)
    expect(one.predictProba([0.2, 0.1])).toEqual([0, 1])
    // Classes 0 and 2 painted, class 1 empty: it must never be predicted.
    const d = data('linear')
    const labels = d.labels.map((l) => l * 2)
    const m = fitClassic(kind, d.points, labels, 3)
    for (let i = 0; i < d.points.length; i += 7) expect(m.predictProba(d.points[i])[1]).toBeLessThan(1e-9)
    expect(accuracyOf(m, d.points, labels)).toBeGreaterThan(0.9)
  })
})

describe('inductive biases', () => {
  it('linear discriminant analysis cannot separate concentric circles; QDA and naive Bayes can', () => {
    expect(cv('lda', 'circles')).toBeLessThan(0.65)
    expect(cv('qda', 'circles')).toBeGreaterThan(0.95)
    expect(cv('naive-bayes', 'circles')).toBeGreaterThan(0.95)
  })

  it('naive Bayes fails on XOR (features are not independent given the class) while QDA succeeds', () => {
    expect(cv('naive-bayes', 'xor')).toBeLessThan(0.65)
    expect(cv('qda', 'xor')).toBeGreaterThan(0.95)
  })

  it('boosted stumps are additive in x and y, so they cannot express XOR; depth-2 weak learners can', () => {
    expect(cv('adaboost', 'xor', { weakDepth: 1 })).toBeLessThan(0.75)
    expect(cv('adaboost', 'xor', { weakDepth: 2 })).toBeGreaterThan(0.95)
  })

  it('1-NN memorises the training set but generalises worse than larger k on noisy data', () => {
    const d = data('moons', 2, 0.3)
    const p = { ...DEFAULT_CLASSIC_PARAMS, k: 1 }
    expect(accuracyOf(fitClassic('knn', d.points, d.labels, d.classes, p), d.points, d.labels)).toBe(1)
    const cv1 = crossValidatedAccuracy('knn', d.points, d.labels, d.classes, p)
    const cv15 = crossValidatedAccuracy('knn', d.points, d.labels, d.classes, { ...p, k: 15 })
    expect(cv15).toBeGreaterThan(cv1)
  })

  it('an unrestricted tree fits noisy training data perfectly but a forest generalises better', () => {
    const d = data('moons', 2, 0.3)
    const deep = { ...DEFAULT_CLASSIC_PARAMS, maxDepth: 30 }
    expect(accuracyOf(fitClassic('tree', d.points, d.labels, d.classes, deep), d.points, d.labels)).toBe(1)
    expect(crossValidatedAccuracy('forest', d.points, d.labels, d.classes, deep)).toBeGreaterThan(crossValidatedAccuracy('tree', d.points, d.labels, d.classes, deep))
  })

  it('an RBF SVM, k-NN and a forest all learn the two spirals', () => {
    expect(cv('svm', 'spiral', { gamma: 30, C: 10 })).toBeGreaterThan(0.95)
    expect(cv('knn', 'spiral')).toBeGreaterThan(0.95)
    expect(cv('forest', 'spiral', { maxDepth: 12 })).toBeGreaterThan(0.9)
  })

  it('reports SVM support vectors as training indices', () => {
    const d = data('moons')
    const m = fitClassic('svm', d.points, d.labels, d.classes)
    expect(m.supportVectors.length).toBeGreaterThan(0)
    expect(m.supportVectors.every((i) => i >= 0 && i < d.points.length)).toBe(true)
    expect(m.summary.value).toBe(String(m.supportVectors.length))
  })
})

describe('AdaBoost (SAMME)', () => {
  it('drives weighted weak-learner error below chance and never assigns non-positive weights', () => {
    const d = data('moons')
    const e = adaBoost(d.points, d.labels, 2, 30, 1, createRng(1))
    expect(e.learners.length).toBe(30)
    e.errors.forEach((err) => expect(err).toBeLessThan(0.5))
    e.learners.forEach((l) => expect(l.alpha).toBeGreaterThan(0))
  })

  it('does not cycle on four quadrant blobs (tie-breaking between x- and y-splits)', () => {
    expect(cv('adaboost', 'blobs')).toBeGreaterThan(0.95)
  })
})

describe('cross-validation', () => {
  it('is deterministic for a fixed seed and uses every point exactly once', () => {
    const d = data('moons')
    const a = crossValidatedAccuracy('tree', d.points, d.labels, 2, DEFAULT_CLASSIC_PARAMS, 5, 3)
    expect(crossValidatedAccuracy('tree', d.points, d.labels, 2, DEFAULT_CLASSIC_PARAMS, 5, 3)).toBe(a)
    // Accuracy over n held-out points is a multiple of 1/n.
    expect(Math.abs(a * d.points.length - Math.round(a * d.points.length))).toBeLessThan(1e-9)
  })

  it('argmax picks the first maximum', () => {
    expect(argmax([0.2, 0.5, 0.5])).toBe(1)
  })
})
