import { lazy } from 'react'
import { withSuspense, type AnyComponent } from '@/components/viz/withSuspense'

export interface VisualizerEntry {
  name: string
  title: string
  load: () => Promise<{ default: AnyComponent }>
}

/** Every interactive visualizer, lazily loaded so heavy libraries download on demand. */
export const VISUALIZERS: VisualizerEntry[] = [
  { name: 'RegressionPlayground', title: 'Linear regression by gradient descent', load: () => import('./regression/RegressionPlayground') },
  { name: 'LossLandscape3D', title: '3-D loss landscapes & optimisers', load: () => import('./optimization/LossLandscape3D') },
  { name: 'LossFunctionExplorer', title: 'Loss functions & robustness', load: () => import('./losses/LossFunctionExplorer') },
  { name: 'OptimizerRace', title: 'Optimizer race & learning-rate schedules', load: () => import('./optimization/OptimizerRace') },
  { name: 'RegularizationViz', title: 'Regularisation & bias–variance', load: () => import('./regularization/RegularizationViz') },
  { name: 'DecisionTreeViz', title: 'Decision trees & random forests', load: () => import('./trees/DecisionTreeViz') },
  { name: 'DatasetPainter', title: 'Dataset painter + classifiers', load: () => import('@/components/sandbox/DatasetPainter') },
  { name: 'PerceptronViz', title: 'Perceptron learning rule', load: () => import('./classifiers/PerceptronViz') },
  { name: 'SVMViz', title: 'Support vector machine', load: () => import('./classifiers/SVMViz') },
  { name: 'KMeansViz', title: 'K-Means & Voronoi cells', load: () => import('./clustering/KMeansViz') },
  { name: 'PCAViz', title: 'Principal component analysis', load: () => import('./clustering/PCAViz') },
  { name: 'BackpropViz', title: 'Back-propagation value by value', load: () => import('./neural/BackpropViz') },
  { name: 'ActivationExplorer', title: 'Activation functions & initialisation', load: () => import('./neural/ActivationExplorer') },
  { name: 'CNNFilterViewer', title: 'Convolution walkthrough', load: () => import('./vision/CNNFilterViewer') },
  { name: 'PoolingViz', title: 'Max & average pooling', load: () => import('./vision/PoolingViz') },
  { name: 'ExplodedNetworkViewer', title: 'Exploded CNN viewer', load: () => import('./exploded-network/ExplodedNetworkViewer') },
  { name: 'GradCamViz', title: 'Grad-CAM explanations', load: () => import('./vision/GradCamViz') },
  { name: 'NMSVisualizer', title: 'Non-maximum suppression', load: () => import('./vision/NMSVisualizer') },
  { name: 'RNNGradientViz', title: 'RNN vanishing / exploding gradients', load: () => import('./sequence/RNNGradientViz') },
  { name: 'LSTMCellViz', title: 'LSTM cell & memory', load: () => import('./sequence/LSTMCellViz') },
  { name: 'AttentionHeatmap', title: 'Self-attention heatmap', load: () => import('./attention/AttentionHeatmap') },
  { name: 'DiffusionViz', title: 'Diffusion forward & reverse process', load: () => import('./generative/DiffusionViz') },
  { name: 'QuantizationViz', title: 'FP32 → INT8 quantisation', load: () => import('./edge/QuantizationViz') },
  { name: 'GridWorldViz', title: 'Q-learning grid world', load: () => import('./rl/GridWorldViz') },
  { name: 'CodeSandbox', title: 'Tensor sandbox (TF.js code runner)', load: () => import('@/components/sandbox/CodeSandbox') },
]

export const visualizerComponents: Record<string, AnyComponent> = Object.fromEntries(
  VISUALIZERS.map((v) => [v.name, withSuspense(lazy(v.load), v.name)]),
)
