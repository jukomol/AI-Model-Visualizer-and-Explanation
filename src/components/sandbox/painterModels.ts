import type { ClassicKind } from '@/lib/classicClassifiers'
import type { DatasetPreset } from '@/lib/datasets2d'
import type { ClassifierKind } from '@/lib/tf/classifier'

export type PainterModel = ClassifierKind | ClassicKind

export interface PainterModelInfo {
  label: string
  /** Neural models train iteratively with TF.js; classic ones refit instantly on every edit. */
  family: 'neural' | 'classic'
  how: string
  goodAt: string
  weakAt: string
}

export const PAINTER_MODELS: Record<PainterModel, PainterModelInfo> = {
  logistic: {
    label: 'Logistic regression',
    family: 'neural',
    how: 'A single linear layer with a sigmoid (softmax for 3+ classes), trained by gradient descent on cross-entropy.',
    goodAt: 'Linearly separable data; calibrated probabilities; a strong, interpretable baseline.',
    weakAt: 'Any curved boundary: circles, moons, XOR, spirals.',
  },
  mlp: {
    label: 'Multilayer perceptron',
    family: 'neural',
    how: 'Stacked dense layers with non-linear activations, trained with Adam by backpropagation.',
    goodAt: 'Arbitrary smooth boundaries given enough units, and it scales to large datasets.',
    weakAt: 'Needs tuning (depth, width, learning rate) and many steps; can overfit small datasets.',
  },
  knn: {
    label: 'k-nearest neighbours',
    family: 'classic',
    how: 'No training: a point takes the majority label of its k closest training points (optionally weighted by 1 / distance).',
    goodAt: 'Any boundary shape, low-dimensional data, and a quick non-parametric baseline.',
    weakAt: 'Small k memorises noise; slow prediction on big datasets; suffers in high dimensions.',
  },
  'naive-bayes': {
    label: 'Gaussian naive Bayes',
    family: 'classic',
    how: 'Fits one axis-aligned Gaussian per class, assumes the features are independent given the class, and applies Bayes’ rule.',
    goodAt: 'Tiny datasets, very fast training, and text-like data with many features.',
    weakAt: 'Correlated features (e.g. XOR, rotated clusters), because the independence assumption breaks.',
  },
  lda: {
    label: 'Linear discriminant analysis',
    family: 'classic',
    how: 'One Gaussian per class, all sharing a single covariance matrix, which makes every boundary a straight line.',
    goodAt: 'Elliptical classes with similar spread; stable with few samples; doubles as dimensionality reduction.',
    weakAt: 'Classes that differ in spread rather than position (concentric circles), and any curved boundary.',
  },
  qda: {
    label: 'Quadratic discriminant analysis',
    family: 'classic',
    how: 'One Gaussian per class with its own covariance, so the boundaries are conics (ellipses, parabolas, hyperbolas).',
    goodAt: 'Classes with different shapes or spreads, such as circles or XOR-like quadrants.',
    weakAt: 'Multi-modal classes (spirals, moons); needs more data per class than LDA.',
  },
  svm: {
    label: 'Support vector machine',
    family: 'classic',
    how: 'Maximises the margin between classes. The kernel trick lets it draw curved boundaries; only the ringed support vectors matter.',
    goodAt: 'Medium-sized datasets with clear margins; the RBF kernel handles most 2-D shapes.',
    weakAt: 'Very large datasets (training is roughly quadratic), and it is sensitive to C and γ; scores are not probabilities.',
  },
  tree: {
    label: 'Decision tree',
    family: 'classic',
    how: 'Greedy axis-aligned splits that most reduce impurity (Gini or entropy), applied recursively.',
    goodAt: 'Interpretable rules and mixed feature types, with no need to scale the features.',
    weakAt: 'Staircase boundaries on diagonal structure, and deep trees overfit (high variance).',
  },
  forest: {
    label: 'Random forest',
    family: 'classic',
    how: 'Averages many trees, each trained on a bootstrap sample with a random feature per split, to reduce variance.',
    goodAt: 'Tabular data: a robust default that needs little tuning.',
    weakAt: 'Less interpretable than one tree; boundaries stay axis-aligned and blocky.',
  },
  adaboost: {
    label: 'AdaBoost',
    family: 'classic',
    how: 'Adds weak trees one at a time, up-weighting the points the ensemble still gets wrong (SAMME for multi-class).',
    goodAt: 'Turning very simple rules into a strong classifier; a precursor of gradient boosting.',
    weakAt: 'Label noise (misclassified outliers get huge weights). Stumps are additive in x and y, so they cannot express XOR.',
  },
}

export const NEURAL_MODELS = (Object.keys(PAINTER_MODELS) as PainterModel[]).filter((k) => PAINTER_MODELS[k].family === 'neural') as ClassifierKind[]
export const CLASSIC_MODELS = (Object.keys(PAINTER_MODELS) as PainterModel[]).filter((k) => PAINTER_MODELS[k].family === 'classic') as ClassicKind[]

export function isClassic(kind: PainterModel): kind is ClassicKind {
  return PAINTER_MODELS[kind].family === 'classic'
}

/**
 * Model/preset pairs where no setting of the model's controls can fit the data,
 * with the structural reason. Verified in painterModels.test.ts: every listed pair
 * stays below 75 % accuracy across a sweep of its settings, and every pair not
 * listed reaches at least 85 %. Models that merely need tuning (e.g. AdaBoost
 * stumps on XOR, fixed by deeper weak learners) are not listed.
 */
export const UNSUPPORTED: Partial<Record<DatasetPreset, Partial<Record<PainterModel, string>>>> = {
  xor: {
    logistic: 'its boundary is a single straight line',
    lda: 'its boundaries are straight lines',
    'naive-bayes': 'x and y are only informative together, which breaks the independence assumption',
  },
  circles: {
    logistic: 'its boundary is a single straight line',
    lda: 'both rings share a centre, and LDA only separates class means',
  },
  spiral: {
    logistic: 'its boundary is a single straight line',
    lda: 'its boundaries are straight lines',
    qda: 'one Gaussian per class cannot follow a spiral arm',
    'naive-bayes': 'one axis-aligned Gaussian per class cannot follow a spiral arm',
  },
}

/** Why `model` cannot fit `preset`, or null when it can. */
export function unsupportedReason(model: PainterModel, preset: DatasetPreset): string | null {
  return UNSUPPORTED[preset]?.[model] ?? null
}

/** A model to fall back to when the current one cannot fit the new preset. */
export function fallbackModel(model: PainterModel): PainterModel {
  return isClassic(model) ? 'knn' : 'mlp'
}
