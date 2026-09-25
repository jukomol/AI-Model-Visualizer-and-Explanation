import { describe, expect, it } from 'vitest'
import {
  adjacentNodes,
  checkMetric,
  computeTreeLayout,
  curriculum,
  depthLevels,
  nextRecommended,
  nodeStatus,
  topologicalOrder,
  trackProgress,
  validateCurriculum,
  type Curriculum,
} from './curriculum'

describe('curriculum.json', () => {
  it('is valid: unique ids, known prerequisites and tracks, no cycles', () => {
    expect(validateCurriculum(curriculum)).toEqual([])
  })

  it('covers every topic in the blueprint', () => {
    const ids = curriculum.nodes.map((n) => n.id)
    for (const id of [
      'linear-regression', 'logistic-regression', 'perceptron', 'gradient-descent', 'svm', 'k-means', 'pca',
      'backpropagation', 'cnn-convolutions', 'exploded-networks', 'pooling', 'grad-cam', 'nms',
      'rnn', 'lstm', 'attention-transformers', 'diffusion', 'quantization',
    ]) {
      expect(ids).toContain(id)
    }
  })

  it('cites the milestone papers named in the blueprint', () => {
    const papers = curriculum.nodes.flatMap((n) => n.papers)
    const has = (author: string, year: number) => papers.some((p) => p.authors.includes(author) && p.year === year)
    expect(has('Rosenblatt', 1958)).toBe(true)
    expect(has('LeCun', 1989)).toBe(true)
    expect(has('Krizhevsky', 2012)).toBe(true)
    expect(has('Goodfellow', 2014)).toBe(true)
    expect(has('Vaswani', 2017)).toBe(true)
  })

  it('every node has formulas, papers with https links where given, and a challenge', () => {
    for (const n of curriculum.nodes) {
      expect(n.keyFormulas.length).toBeGreaterThan(0)
      expect(n.papers.length).toBeGreaterThan(0)
      n.papers.forEach((p) => p.url && expect(p.url).toMatch(/^https:\/\//))
      expect(['metric', 'quiz']).toContain(n.challenge.type)
      expect(n.route).toBe(`/learn/${n.id}`)
    }
  })
})

describe('unlock rules', () => {
  it('roots are available, dependants locked until prerequisites are mastered', () => {
    const none = new Set<string>()
    const lr = curriculum.nodes.find((n) => n.id === 'linear-regression')!
    const gd = curriculum.nodes.find((n) => n.id === 'gradient-descent')!
    expect(nodeStatus(lr, none)).toBe('available')
    expect(nodeStatus(gd, none)).toBe('locked')
    expect(nodeStatus(gd, new Set(['linear-regression']))).toBe('available')
    expect(nodeStatus(lr, new Set(['linear-regression']))).toBe('mastered')
  })

  it('recommends the next available node', () => {
    expect(nextRecommended(new Set())?.id).toBe('linear-regression')
    expect(nextRecommended(new Set(curriculum.nodes.map((n) => n.id)))).toBeUndefined()
  })

  it('checks metric thresholds in both directions', () => {
    const lte = { type: 'metric' as const, prompt: '', metric: 'x', comparator: 'lte' as const, threshold: 1 }
    expect(checkMetric(lte, 0.9)).toBe(true)
    expect(checkMetric(lte, 1.1)).toBe(false)
    expect(checkMetric({ ...lte, comparator: 'gte' }, 1.1)).toBe(true)
    expect(checkMetric(lte, Number.NaN)).toBe(false)
  })

  it('reports per-track progress', () => {
    const p = trackProgress(new Set(['linear-regression', 'rnn']))
    expect(p.foundations.mastered).toBe(1)
    expect(p.modern.mastered).toBe(1)
    expect(p.foundations.total + p.cv.total + p.modern.total).toBe(curriculum.nodes.length)
  })
})

describe('graph algorithms', () => {
  it('orders prerequisites before dependants', () => {
    const order = topologicalOrder(curriculum.nodes).map((n) => n.id)
    for (const n of curriculum.nodes) for (const p of n.prerequisites) expect(order.indexOf(p)).toBeLessThan(order.indexOf(n.id))
  })

  it('detects cycles', () => {
    const cyclic: Curriculum = {
      version: 1,
      tracks: curriculum.tracks,
      nodes: [
        { ...curriculum.nodes[0], id: 'a', prerequisites: ['b'] },
        { ...curriculum.nodes[0], id: 'b', prerequisites: ['a'] },
      ],
    }
    expect(validateCurriculum(cyclic).join()).toMatch(/cycle/)
  })

  it('computes longest-path depth', () => {
    const levels = depthLevels(curriculum.nodes)
    expect(levels.get('linear-regression')).toBe(0)
    expect(levels.get('gradient-descent')).toBe(1)
    expect(levels.get('backpropagation')).toBe(3)
  })

  it('tree layout keeps prerequisites in earlier rows and never overfills a slot', () => {
    const layout = computeTreeLayout(curriculum)
    const row = new Map(layout.map((l) => [l.id, l.row]))
    for (const n of curriculum.nodes) for (const p of n.prerequisites) expect(row.get(p)!).toBeLessThan(row.get(n.id)!)
    const cells = new Set(layout.map((l) => `${l.lane}:${l.row}:${l.slot}`))
    expect(cells.size).toBe(layout.length)
    layout.forEach((l) => expect(l.slot).toBeLessThan(2))
  })

  it('provides previous / next navigation', () => {
    const { prev, next } = adjacentNodes('gradient-descent')
    expect(prev).toBeDefined()
    expect(next).toBeDefined()
    expect(adjacentNodes(topologicalOrder(curriculum.nodes)[0].id).prev).toBeUndefined()
  })
})
