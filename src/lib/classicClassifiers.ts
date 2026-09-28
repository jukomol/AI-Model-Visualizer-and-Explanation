/**
 * Classic (non-neural) classifiers for 2-D point clouds, fitted in closed form
 * or by a fast deterministic algorithm so the Dataset Painter can refit them
 * on every edit: k-nearest neighbours, Gaussian naive Bayes, linear and
 * quadratic discriminant analysis, kernel SVMs (one-vs-rest), CART trees,
 * random forests and AdaBoost (SAMME).
 */
import { buildTree, countNodes, predictProbaForest, predictProbaTree, randomForest, type Criterion } from './decisionTree'
import { kernelSvmDecision, trainKernelSvm, type KernelKind } from './kernelSvm'
import { createRng, type Rng } from './random'

export type ClassicKind = 'knn' | 'naive-bayes' | 'lda' | 'qda' | 'svm' | 'tree' | 'forest' | 'adaboost'

export interface ClassicParams {
  /** k-NN: number of neighbours and whether votes are weighted by 1 / distance. */
  k: number
  distanceWeighted: boolean
  /** SVM */
  C: number
  gamma: number
  kernel: KernelKind
  degree: number
  /** Trees, forests and the AdaBoost weak learners. */
  maxDepth: number
  minSamplesSplit: number
  criterion: Criterion
  trees: number
  rounds: number
  weakDepth: number
  /** LDA / QDA: ridge added to the covariance diagonal. */
  reg: number
}

export const DEFAULT_CLASSIC_PARAMS: ClassicParams = {
  k: 5,
  distanceWeighted: false,
  C: 1,
  gamma: 10,
  kernel: 'rbf',
  degree: 3,
  maxDepth: 5,
  minSamplesSplit: 2,
  criterion: 'gini',
  trees: 30,
  rounds: 50,
  weakDepth: 1,
  reg: 0.01,
}

type Pt = readonly [number, number]

export interface SummaryItem {
  label: string
  value: string
}

export interface FittedClassifier {
  kind: ClassicKind
  classes: number
  /** Class probabilities (length `classes`) at a point. */
  predictProba(x: Pt): number[]
  /** One headline number describing model size or complexity. */
  summary: SummaryItem
  /** Training-set indices of SVM support vectors (other models: empty). */
  supportVectors: number[]
}

export function argmax(v: readonly number[]): number {
  let best = 0
  for (let k = 1; k < v.length; k++) if (v[k] > v[best]) best = k
  return best
}

/** Numerically stable softmax that maps −∞ entries (absent classes) to 0. */
export function softmaxLog(logits: readonly number[]): number[] {
  const m = Math.max(...logits)
  if (!Number.isFinite(m)) return logits.map(() => 1 / logits.length)
  const e = logits.map((l) => (Number.isFinite(l) ? Math.exp(l - m) : 0))
  const s = e.reduce((a, b) => a + b, 0)
  return e.map((v) => v / s)
}

function classCounts(labels: readonly number[], classes: number): number[] {
  const c = new Array<number>(classes).fill(0)
  for (const l of labels) c[l]++
  return c
}

function constantModel(kind: ClassicKind, classes: number, cls: number, summary: SummaryItem): FittedClassifier {
  const p = Array.from({ length: classes }, (_, k) => (k === cls ? 1 : 0))
  return { kind, classes, predictProba: () => p.slice(), summary, supportVectors: [] }
}

// ── k-nearest neighbours ──────────────────────────────────────────────────

function fitKnn(points: readonly Pt[], labels: readonly number[], classes: number, p: ClassicParams): FittedClassifier {
  const k = Math.max(1, Math.min(Math.round(p.k), points.length))
  const d2 = new Float64Array(points.length)
  const order = points.map((_, i) => i)
  return {
    kind: 'knn',
    classes,
    summary: { label: 'Stored points', value: points.length.toLocaleString() },
    supportVectors: [],
    predictProba(x) {
      for (let i = 0; i < points.length; i++) d2[i] = (points[i][0] - x[0]) ** 2 + (points[i][1] - x[1]) ** 2
      order.sort((a, b) => d2[a] - d2[b])
      const votes = new Array<number>(classes).fill(0)
      for (let r = 0; r < k; r++) {
        const i = order[r]
        votes[labels[i]] += p.distanceWeighted ? 1 / (Math.sqrt(d2[i]) + 1e-6) : 1
      }
      const s = votes.reduce((a, b) => a + b, 0)
      return votes.map((v) => v / s)
    },
  }
}

// ── Gaussian generative models ────────────────────────────────────────────

interface ClassStats {
  n: number
  mean: [number, number]
  /** Covariance [σxx, σxy, σyy] with a (n − 1) denominator (0 when n < 2). */
  cov: [number, number, number]
}

function classStats(points: readonly Pt[], labels: readonly number[], classes: number): ClassStats[] {
  return Array.from({ length: classes }, (_, k) => {
    const idx = labels.flatMap((l, i) => (l === k ? [i] : []))
    const n = idx.length
    if (n === 0) return { n, mean: [0, 0], cov: [0, 0, 0] }
    const mx = idx.reduce((s, i) => s + points[i][0], 0) / n
    const my = idx.reduce((s, i) => s + points[i][1], 0) / n
    let sxx = 0
    let sxy = 0
    let syy = 0
    for (const i of idx) {
      const dx = points[i][0] - mx
      const dy = points[i][1] - my
      sxx += dx * dx
      sxy += dx * dy
      syy += dy * dy
    }
    const d = Math.max(1, n - 1)
    return { n, mean: [mx, my], cov: [sxx / d, sxy / d, syy / d] }
  })
}

/** log 𝒩(x; μ, Σ) for a 2×2 covariance [a, b, c] = [[a, b], [b, c]]. */
export function gaussianLogPdf(x: Pt, mean: readonly [number, number], cov: readonly [number, number, number]): number {
  const [a, b, c] = cov
  const det = a * c - b * b
  const dx = x[0] - mean[0]
  const dy = x[1] - mean[1]
  const q = (c * dx * dx - 2 * b * dx * dy + a * dy * dy) / det
  return -0.5 * (q + Math.log(det)) - Math.log(2 * Math.PI)
}

function fitGaussian(kind: 'naive-bayes' | 'lda' | 'qda', points: readonly Pt[], labels: readonly number[], classes: number, p: ClassicParams): FittedClassifier {
  const stats = classStats(points, labels, classes)
  const n = points.length
  const present = stats.filter((s) => s.n > 0).length
  const logPrior = stats.map((s) => (s.n > 0 ? Math.log(s.n / n) : -Infinity))
  let covs: [number, number, number][]
  if (kind === 'lda') {
    // Pooled within-class covariance Σ = Σₖ (nₖ − 1) Σₖ / (n − K).
    const pooled: [number, number, number] = [0, 0, 0]
    for (const s of stats) for (let j = 0; j < 3; j++) pooled[j] += Math.max(0, s.n - 1) * s.cov[j]
    const d = Math.max(1, n - present)
    const shared: [number, number, number] = [pooled[0] / d + p.reg, pooled[1] / d, pooled[2] / d + p.reg]
    covs = stats.map(() => shared)
  } else if (kind === 'qda') {
    covs = stats.map((s) => [s.cov[0] + p.reg, s.cov[1], s.cov[2] + p.reg])
  } else {
    // Naive Bayes: features independent given the class ⇒ diagonal covariance.
    const maxVar = Math.max(1e-12, ...stats.flatMap((s) => [s.cov[0], s.cov[2]]))
    const eps = 1e-3 * maxVar
    covs = stats.map((s) => [s.cov[0] + eps, 0, s.cov[2] + eps])
  }
  const perClass = kind === 'lda' ? 2 : kind === 'qda' ? 5 : 4
  const params = present * perClass + (kind === 'lda' ? 3 : 0) + Math.max(0, present - 1)
  return {
    kind,
    classes,
    summary: { label: 'Parameters', value: String(params) },
    supportVectors: [],
    predictProba: (x) => softmaxLog(stats.map((s, k) => (s.n > 0 ? logPrior[k] + gaussianLogPdf(x, s.mean, covs[k]) : -Infinity))),
  }
}

// ── Kernel SVM (one-vs-rest) ──────────────────────────────────────────────

function fitSvm(points: readonly Pt[], labels: readonly number[], classes: number, p: ClassicParams, seed: number): FittedClassifier {
  const present = classCounts(labels, classes).flatMap((c, k) => (c > 0 ? [k] : []))
  const kernelParams = { kind: p.kernel, gamma: p.gamma, degree: p.degree, coef0: 1 }
  const train = (positive: (l: number) => boolean, s: number) =>
    trainKernelSvm(points, labels.map((l) => (positive(l) ? 1 : -1)), createRng(s), { C: p.C, kernel: kernelParams })
  const svs = new Set<number>()
  // Two classes need one machine; K > 2 trains one per class against the rest.
  const machines =
    present.length === 2
      ? [{ cls: present[1], other: present[0], m: train((l) => l === present[1], seed) }]
      : present.map((cls, i) => ({ cls, other: -1, m: train((l) => l === cls, seed + i) }))
  machines.forEach(({ m }) => m.supportVectors.forEach((i) => svs.add(i)))
  return {
    kind: 'svm',
    classes,
    summary: { label: 'Support vectors', value: svs.size.toLocaleString() },
    supportVectors: [...svs].sort((a, b) => a - b),
    predictProba(x) {
      // Decision values are margins, not probabilities; a softmax over 2·f gives
      // a monotone confidence for shading (no Platt calibration is fitted).
      const logits = new Array<number>(classes).fill(-Infinity)
      if (machines.length === 1) {
        const { cls, other, m } = machines[0]
        const f = kernelSvmDecision(m, x)
        logits[cls] = f
        logits[other] = -f
      } else for (const { cls, m } of machines) logits[cls] = 2 * kernelSvmDecision(m, x)
      return softmaxLog(logits)
    },
  }
}

// ── AdaBoost (SAMME) with weighted CART weak learners ─────────────────────

interface WeightedNode {
  prediction: number
  feature?: 0 | 1
  threshold?: number
  left?: WeightedNode
  right?: WeightedNode
}

function weightedGini(w: readonly number[]): number {
  const s = w.reduce((a, b) => a + b, 0)
  if (s <= 0) return 0
  return 1 - w.reduce((acc, v) => acc + (v / s) ** 2, 0)
}

/**
 * Weighted-Gini CART. Features are scanned in a random order (as in
 * scikit-learn) so exact ties between an x- and a y-split are broken randomly;
 * a fixed order makes multi-class SAMME cycle between two identical stumps.
 */
export function buildWeightedTree(points: readonly Pt[], labels: readonly number[], weights: readonly number[], classes: number, maxDepth: number, rng: Rng, idx: number[] = points.map((_, i) => i), depth = 0): WeightedNode {
  const totals = new Array<number>(classes).fill(0)
  for (const i of idx) totals[labels[i]] += weights[i]
  const node: WeightedNode = { prediction: argmax(totals) }
  const W = totals.reduce((a, b) => a + b, 0)
  const imp = weightedGini(totals)
  if (depth >= maxDepth || idx.length < 2 || imp <= 1e-12) return node
  let best: { score: number; feature: 0 | 1; threshold: number } | null = null
  const features: (0 | 1)[] = rng.next() < 0.5 ? [0, 1] : [1, 0]
  for (const f of features) {
    const sorted = idx.slice().sort((a, b) => points[a][f] - points[b][f])
    const left = new Array<number>(classes).fill(0)
    const right = totals.slice()
    let wl = 0
    for (let r = 0; r < sorted.length - 1; r++) {
      const i = sorted[r]
      left[labels[i]] += weights[i]
      right[labels[i]] -= weights[i]
      wl += weights[i]
      const v = points[i][f]
      const vNext = points[sorted[r + 1]][f]
      if (v === vNext) continue
      const score = (wl * weightedGini(left) + (W - wl) * weightedGini(right)) / W
      if (!best || score < best.score - 1e-12) best = { score, feature: f, threshold: (v + vNext) / 2 }
    }
  }
  if (!best || best.score >= imp - 1e-12) return node
  const { feature, threshold } = best
  node.feature = feature
  node.threshold = threshold
  node.left = buildWeightedTree(points, labels, weights, classes, maxDepth, rng, idx.filter((i) => points[i][feature] <= threshold), depth + 1)
  node.right = buildWeightedTree(points, labels, weights, classes, maxDepth, rng, idx.filter((i) => points[i][feature] > threshold), depth + 1)
  return node
}

function predictWeighted(t: WeightedNode, x: Pt): number {
  let n = t
  while (n.left && n.right && n.feature !== undefined && n.threshold !== undefined) n = x[n.feature] <= n.threshold ? n.left : n.right
  return n.prediction
}

export interface BoostedEnsemble {
  learners: { tree: WeightedNode; alpha: number }[]
  /** Weighted training error of each round's weak learner. */
  errors: number[]
}

/** Zhu et al. (2009) SAMME: αₘ = log((1 − errₘ)/errₘ) + log(K − 1). */
export function adaBoost(points: readonly Pt[], labels: readonly number[], classes: number, rounds: number, weakDepth: number, rng: Rng = createRng(1)): BoostedEnsemble {
  const n = points.length
  const K = Math.max(2, classCounts(labels, classes).filter((c) => c > 0).length)
  let w = new Array<number>(n).fill(1 / n)
  const learners: BoostedEnsemble['learners'] = []
  const errors: number[] = []
  for (let m = 0; m < rounds; m++) {
    const tree = buildWeightedTree(points, labels, w, classes, weakDepth, rng)
    const wrong = points.map((x, i) => predictWeighted(tree, x) !== labels[i])
    const err = w.reduce((s, wi, i) => s + (wrong[i] ? wi : 0), 0)
    errors.push(err)
    if (err <= 1e-10) {
      // A perfect weak learner dominates every later vote; stop here.
      learners.push({ tree, alpha: learners.length === 0 ? 1 : 10 + Math.log(K - 1) })
      break
    }
    if (err >= 1 - 1 / K) {
      if (learners.length === 0) learners.push({ tree, alpha: 1 })
      break
    }
    const alpha = Math.log((1 - err) / err) + Math.log(K - 1)
    learners.push({ tree, alpha })
    w = w.map((wi, i) => (wrong[i] ? wi * Math.exp(alpha) : wi))
    const s = w.reduce((a, b) => a + b, 0)
    w = w.map((wi) => wi / s)
  }
  return { learners, errors }
}

/** Share of the total vote weight Σαₘ given to each class. */
export function boostedVotes(e: BoostedEnsemble, x: Pt, classes: number): number[] {
  const votes = new Array<number>(classes).fill(0)
  let total = 0
  for (const { tree, alpha } of e.learners) {
    votes[predictWeighted(tree, x)] += alpha
    total += alpha
  }
  return votes.map((v) => v / (total || 1))
}

// ── Public API ────────────────────────────────────────────────────────────

export function fitClassic(kind: ClassicKind, points: readonly Pt[], labels: readonly number[], classes: number, params: ClassicParams = DEFAULT_CLASSIC_PARAMS, seed = 1): FittedClassifier {
  const counts = classCounts(labels, classes)
  const present = counts.filter((c) => c > 0).length
  if (present < 2) return constantModel(kind, classes, Math.max(0, argmax(counts)), { label: 'Classes', value: String(present) })
  switch (kind) {
    case 'knn':
      return fitKnn(points, labels, classes, params)
    case 'naive-bayes':
    case 'lda':
    case 'qda':
      return fitGaussian(kind, points, labels, classes, params)
    case 'svm':
      return fitSvm(points, labels, classes, params, seed)
    case 'tree': {
      const tree = buildTree(points, labels, { maxDepth: params.maxDepth, minSamplesSplit: params.minSamplesSplit, criterion: params.criterion, classes })
      return { kind, classes, summary: { label: 'Leaves', value: String(countNodes(tree).leaves) }, supportVectors: [], predictProba: (x) => predictProbaTree(tree, x) }
    }
    case 'forest': {
      const forest = randomForest(points, labels, { trees: params.trees, maxDepth: params.maxDepth, minSamplesSplit: params.minSamplesSplit, criterion: params.criterion, classes, rng: createRng(seed) })
      const leaves = forest.reduce((s, t) => s + countNodes(t).leaves, 0)
      return { kind, classes, summary: { label: 'Total leaves', value: leaves.toLocaleString() }, supportVectors: [], predictProba: (x) => predictProbaForest(forest, x) }
    }
    case 'adaboost': {
      const e = adaBoost(points, labels, classes, params.rounds, params.weakDepth, createRng(seed))
      return { kind, classes, summary: { label: 'Boosting rounds', value: String(e.learners.length) }, supportVectors: [], predictProba: (x) => boostedVotes(e, x, classes) }
    }
  }
}

/** Class probabilities on a res×res grid over [−1, 1]², row 0 at y = +1. Shape res·res·classes. */
export function probabilityGrid(model: FittedClassifier, res: number): Float32Array {
  const out = new Float32Array(res * res * model.classes)
  for (let r = 0; r < res; r++) {
    const y = 1 - (2 * (r + 0.5)) / res
    for (let c = 0; c < res; c++) out.set(model.predictProba([-1 + (2 * (c + 0.5)) / res, y]), (r * res + c) * model.classes)
  }
  return out
}

export function accuracyOf(model: FittedClassifier, points: readonly Pt[], labels: readonly number[]): number {
  if (points.length === 0) return NaN
  let hit = 0
  points.forEach((x, i) => (hit += argmax(model.predictProba(x)) === labels[i] ? 1 : 0))
  return hit / points.length
}

/** Mean held-out accuracy over `folds` random, class-stratified folds. */
export function crossValidatedAccuracy(kind: ClassicKind, points: readonly Pt[], labels: readonly number[], classes: number, params: ClassicParams, folds = 5, seed = 1): number {
  const rng = createRng(seed * 7919 + 13)
  const fold = new Array<number>(points.length)
  for (let k = 0; k < classes; k++) {
    const idx = rng.shuffle(labels.flatMap((l, i) => (l === k ? [i] : [])))
    idx.forEach((i, r) => (fold[i] = r % folds))
  }
  let hit = 0
  let total = 0
  for (let f = 0; f < folds; f++) {
    const trainIdx = points.flatMap((_, i) => (fold[i] !== f ? [i] : []))
    const testIdx = points.flatMap((_, i) => (fold[i] === f ? [i] : []))
    if (testIdx.length === 0 || trainIdx.length < 2) continue
    const model = fitClassic(kind, trainIdx.map((i) => points[i]), trainIdx.map((i) => labels[i]), classes, params, seed + f)
    for (const i of testIdx) hit += argmax(model.predictProba(points[i])) === labels[i] ? 1 : 0
    total += testIdx.length
  }
  return total ? hit / total : NaN
}
