/**
 * CART-style decision trees and random forests for 2-D classification.
 */
import type { Rng } from './random'

export type Criterion = 'gini' | 'entropy'

export interface TreeNode {
  prediction: number
  /** Class counts of the training samples that reached this node. */
  counts: number[]
  impurity: number
  samples: number
  depth: number
  feature?: 0 | 1
  threshold?: number
  left?: TreeNode
  right?: TreeNode
}

export function gini(counts: readonly number[]): number {
  const n = counts.reduce((a, b) => a + b, 0)
  if (n === 0) return 0
  return 1 - counts.reduce((s, c) => s + (c / n) ** 2, 0)
}

/** Shannon entropy in bits. */
export function entropy(counts: readonly number[]): number {
  const n = counts.reduce((a, b) => a + b, 0)
  if (n === 0) return 0
  return counts.reduce((s, c) => (c > 0 ? s - (c / n) * Math.log2(c / n) : s), 0)
}

export interface TreeOptions {
  maxDepth: number
  minSamplesSplit: number
  criterion: Criterion
  classes: number
  /** When set, each split considers one randomly chosen feature (random-forest style). */
  featureRng?: Rng
}

function countsOf(idx: readonly number[], labels: readonly number[], classes: number): number[] {
  const c = new Array<number>(classes).fill(0)
  for (const i of idx) c[labels[i]]++
  return c
}

export function buildTree(points: ReadonlyArray<readonly [number, number]>, labels: readonly number[], options: TreeOptions, idx: number[] = points.map((_, i) => i), depth = 0): TreeNode {
  const imp = options.criterion === 'gini' ? gini : entropy
  const counts = countsOf(idx, labels, options.classes)
  const node: TreeNode = { prediction: counts.indexOf(Math.max(...counts)), counts, impurity: imp(counts), samples: idx.length, depth }
  if (depth >= options.maxDepth || idx.length < options.minSamplesSplit || node.impurity === 0) return node
  const features: (0 | 1)[] = options.featureRng ? [options.featureRng.next() < 0.5 ? 0 : 1] : [0, 1]
  let best: { gain: number; feature: 0 | 1; threshold: number } | null = null
  for (const f of features) {
    const sorted = idx.slice().sort((a, b) => points[a][f] - points[b][f])
    const left = new Array<number>(options.classes).fill(0)
    const right = counts.slice()
    for (let k = 0; k < sorted.length - 1; k++) {
      const lab = labels[sorted[k]]
      left[lab]++
      right[lab]--
      const v = points[sorted[k]][f]
      const vNext = points[sorted[k + 1]][f]
      if (v === vNext) continue
      const nl = k + 1
      const nr = sorted.length - nl
      const weighted = (nl * imp(left) + nr * imp(right)) / sorted.length
      const gain = node.impurity - weighted
      if (!best || gain > best.gain + 1e-12) best = { gain, feature: f, threshold: (v + vNext) / 2 }
    }
  }
  if (!best || best.gain <= 1e-12) return node
  const L = idx.filter((i) => points[i][best!.feature] <= best!.threshold)
  const R = idx.filter((i) => points[i][best!.feature] > best!.threshold)
  node.feature = best.feature
  node.threshold = best.threshold
  node.left = buildTree(points, labels, options, L, depth + 1)
  node.right = buildTree(points, labels, options, R, depth + 1)
  return node
}

export function leafFor(tree: TreeNode, x: readonly number[]): TreeNode {
  let n = tree
  while (n.left && n.right && n.feature !== undefined && n.threshold !== undefined) n = x[n.feature] <= n.threshold ? n.left : n.right
  return n
}

export function predictTree(tree: TreeNode, x: readonly number[]): number {
  return leafFor(tree, x).prediction
}

/** Class probabilities: the class frequencies in the leaf. */
export function predictProbaTree(tree: TreeNode, x: readonly number[]): number[] {
  const c = leafFor(tree, x).counts
  const n = c.reduce((a, b) => a + b, 0) || 1
  return c.map((v) => v / n)
}

export function countNodes(tree: TreeNode): { nodes: number; leaves: number; depth: number } {
  if (!tree.left || !tree.right) return { nodes: 1, leaves: 1, depth: tree.depth }
  const l = countNodes(tree.left)
  const r = countNodes(tree.right)
  return { nodes: 1 + l.nodes + r.nodes, leaves: l.leaves + r.leaves, depth: Math.max(l.depth, r.depth) }
}

export interface Region {
  xMin: number
  xMax: number
  yMin: number
  yMax: number
  prediction: number
  purity: number
}

/** Axis-aligned rectangles (one per leaf) inside a bounding box. */
export function treeRegions(tree: TreeNode, box: Omit<Region, 'prediction' | 'purity'>): Region[] {
  if (!tree.left || !tree.right || tree.feature === undefined || tree.threshold === undefined) {
    const n = tree.counts.reduce((a, b) => a + b, 0) || 1
    return [{ ...box, prediction: tree.prediction, purity: Math.max(...tree.counts) / n }]
  }
  const t = tree.threshold
  if (tree.feature === 0) {
    return [...treeRegions(tree.left, { ...box, xMax: Math.min(box.xMax, t) }), ...treeRegions(tree.right, { ...box, xMin: Math.max(box.xMin, t) })]
  }
  return [...treeRegions(tree.left, { ...box, yMax: Math.min(box.yMax, t) }), ...treeRegions(tree.right, { ...box, yMin: Math.max(box.yMin, t) })]
}

export interface ForestOptions extends Omit<TreeOptions, 'featureRng'> {
  trees: number
  rng: Rng
}

/** Breiman (2001): bootstrap-resampled trees with random feature choice per split. */
export function randomForest(points: ReadonlyArray<readonly [number, number]>, labels: readonly number[], options: ForestOptions): TreeNode[] {
  return Array.from({ length: options.trees }, () => {
    const idx = points.map(() => options.rng.int(points.length))
    return buildTree(points, labels, { ...options, featureRng: options.rng }, idx)
  })
}

export function predictProbaForest(forest: readonly TreeNode[], x: readonly number[]): number[] {
  const acc = forest[0].counts.map(() => 0)
  for (const t of forest) predictProbaTree(t, x).forEach((p, k) => (acc[k] += p))
  return acc.map((v) => v / forest.length)
}

export function predictForest(forest: readonly TreeNode[], x: readonly number[]): number {
  const p = predictProbaForest(forest, x)
  return p.indexOf(Math.max(...p))
}
