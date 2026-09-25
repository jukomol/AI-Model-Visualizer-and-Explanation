import { describe, expect, it } from 'vitest'
import { generatePreset } from './datasets2d'
import { buildTree, countNodes, entropy, gini, predictForest, predictTree, randomForest, treeRegions } from './decisionTree'
import { polygonArea } from './clustering'
import { createRng } from './random'

const toXY = (preset: Parameters<typeof generatePreset>[0], seed: number, noise?: number) => {
  const pts = generatePreset(preset, createRng(seed), noise)
  return { X: pts.map((p) => [p.x, p.y] as [number, number]), y: pts.map((p) => p.label) }
}

describe('impurity measures', () => {
  it('are zero for pure nodes and maximal for even splits', () => {
    expect(gini([10, 0])).toBe(0)
    expect(gini([5, 5])).toBe(0.5)
    expect(entropy([5, 5])).toBe(1)
    expect(entropy([4, 4, 4, 4])).toBe(2)
    expect(entropy([7, 0])).toBe(0)
  })
})

describe('decision tree', () => {
  it('greedy splitting struggles with XOR: no single split has much gain, so it needs extra depth', () => {
    const { X, y } = toXY('xor', 1, 0)
    const acc = (depth: number) => {
      const t = buildTree(X, y, { maxDepth: depth, minSamplesSplit: 2, criterion: 'gini', classes: 2 })
      return X.filter((x, i) => predictTree(t, x) === y[i]).length / X.length
    }
    expect(acc(1)).toBeLessThan(0.75)
    // An oracle could solve XOR with depth 2; greedy CART cannot see that far ahead.
    expect(acc(2)).toBeLessThan(1)
    expect(acc(8)).toBe(1)
  })

  it('respects the depth limit and fully fits training data when unlimited', () => {
    const { X, y } = toXY('moons', 2)
    const shallow = buildTree(X, y, { maxDepth: 3, minSamplesSplit: 2, criterion: 'entropy', classes: 2 })
    expect(countNodes(shallow).depth).toBeLessThanOrEqual(3)
    const deep = buildTree(X, y, { maxDepth: 50, minSamplesSplit: 2, criterion: 'gini', classes: 2 })
    expect(X.every((x, i) => predictTree(deep, x) === y[i])).toBe(true)
  })

  it('leaf regions tile the bounding box', () => {
    const { X, y } = toXY('moons', 3)
    const t = buildTree(X, y, { maxDepth: 5, minSamplesSplit: 2, criterion: 'gini', classes: 2 })
    const regions = treeRegions(t, { xMin: -1, xMax: 1, yMin: -1, yMax: 1 })
    const area = regions.reduce((s, r) => s + polygonArea([[r.xMin, r.yMin], [r.xMax, r.yMin], [r.xMax, r.yMax], [r.xMin, r.yMax]]), 0)
    expect(area).toBeCloseTo(4, 8)
    expect(regions).toHaveLength(countNodes(t).leaves)
  })
})

describe('random forest', () => {
  it('generalises better than a single fully-grown tree on noisy moons', () => {
    const train = toXY('moons', 4, 0.25)
    const test = toXY('moons', 5, 0.25)
    const acc = (predict: (x: number[]) => number) => test.X.filter((x, i) => predict(x) === test.y[i]).length / test.X.length
    const tree = buildTree(train.X, train.y, { maxDepth: 50, minSamplesSplit: 2, criterion: 'gini', classes: 2 })
    const forest = randomForest(train.X, train.y, { trees: 40, maxDepth: 50, minSamplesSplit: 2, criterion: 'gini', classes: 2, rng: createRng(1) })
    expect(acc((x) => predictForest(forest, x))).toBeGreaterThan(acc((x) => predictTree(tree, x)))
  })
})

describe('decision-trees challenge', () => {
  it('a fully grown tree misses the target, a pruned tree or forest reaches it', async () => {
    const { checkMetric, curriculum } = await import('./curriculum')
    const c = curriculum.nodes.find((n) => n.id === 'decision-trees')!.challenge as import('./curriculum').MetricChallenge
    const train = toXY('moons', 4, 0.25)
    const test = toXY('moons', 5, 0.25)
    const acc = (predict: (x: number[]) => number) => test.X.filter((x, i) => predict(x) === test.y[i]).length / test.X.length
    const deep = buildTree(train.X, train.y, { maxDepth: 50, minSamplesSplit: 2, criterion: 'gini', classes: 2 })
    const pruned = buildTree(train.X, train.y, { maxDepth: 2, minSamplesSplit: 2, criterion: 'gini', classes: 2 })
    expect(checkMetric(c, acc((x) => predictTree(deep, x)))).toBe(false)
    expect(checkMetric(c, acc((x) => predictTree(pruned, x)))).toBe(true)
  })
})
