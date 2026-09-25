/**
 * TensorFlow.js model construction, training, activation extraction and
 * Grad-CAM for the architectures in models.json. The `tf` namespace is passed
 * in so this module stays loadable without eagerly importing TF.js.
 */
import type * as TF from '@tensorflow/tfjs'
import type { ModelSpec } from '../models'
import type { ShapeDataset } from '../shapeImages'

type Tf = typeof TF

export function buildTfModel(tf: Tf, spec: ModelSpec, seed = 1): TF.Sequential {
  const model = tf.sequential({ name: spec.id })
  spec.layers.forEach((l, i) => {
    const first = i === 0 ? { inputShape: spec.input } : {}
    const init = () => tf.initializers.glorotUniform({ seed: seed * 100 + i })
    switch (l.type) {
      case 'conv2d':
        model.add(
          tf.layers.conv2d({
            ...first,
            name: l.id,
            filters: l.filters,
            kernelSize: l.kernelSize,
            strides: l.strides ?? 1,
            padding: l.padding ?? 'valid',
            activation: l.activation ?? 'linear',
            kernelInitializer: init(),
          }),
        )
        break
      case 'maxPooling2d':
        model.add(tf.layers.maxPooling2d({ ...first, name: l.id, poolSize: l.poolSize, strides: l.strides ?? l.poolSize }))
        break
      case 'averagePooling2d':
        model.add(tf.layers.averagePooling2d({ ...first, name: l.id, poolSize: l.poolSize, strides: l.strides ?? l.poolSize }))
        break
      case 'dropout':
        model.add(tf.layers.dropout({ ...first, name: l.id, rate: l.rate, seed: seed * 100 + i }))
        break
      case 'flatten':
        model.add(tf.layers.flatten({ ...first, name: l.id }))
        break
      case 'dense':
        model.add(tf.layers.dense({ ...first, name: l.id, units: l.units, activation: l.activation ?? 'linear', kernelInitializer: init() }))
        break
      case 'softmax':
        model.add(tf.layers.activation({ ...first, name: l.id, activation: 'softmax' }))
        break
    }
  })
  return model
}

/** A functional model exposing every layer's output (for feature-map inspection). */
export function buildActivationModel(tf: Tf, model: TF.LayersModel): TF.LayersModel {
  return tf.model({ inputs: model.inputs, outputs: model.layers.map((l) => l.output as TF.SymbolicTensor) })
}

export interface LayerActivation {
  shape: number[]
  data: Float32Array
}

/** Run one image through the network and read back every intermediate tensor. */
export function computeActivations(tf: Tf, activationModel: TF.LayersModel, image: Float32Array, inputShape: number[]): LayerActivation[] {
  const outs = tf.tidy(() => {
    const x = tf.tensor(image, [1, ...inputShape])
    const r = activationModel.predict(x)
    return (Array.isArray(r) ? r : [r]).map((t) => t.squeeze([0]))
  })
  const result = outs.map((t) => ({ shape: t.shape.slice(), data: t.dataSync() as Float32Array }))
  tf.dispose(outs)
  return result
}

export interface LayerWeights {
  kernel?: { shape: number[]; data: Float32Array }
  bias?: { shape: number[]; data: Float32Array }
}

export function readWeights(model: TF.LayersModel): Record<string, LayerWeights> {
  const out: Record<string, LayerWeights> = {}
  for (const layer of model.layers) {
    const w = layer.getWeights()
    if (w.length === 0) continue
    out[layer.name] = {
      kernel: { shape: w[0].shape.slice(), data: w[0].dataSync() as Float32Array },
      bias: w[1] ? { shape: w[1].shape.slice(), data: w[1].dataSync() as Float32Array } : undefined,
    }
  }
  return out
}

export interface EpochLog {
  epoch: number
  loss: number
  acc: number
  valLoss: number
  valAcc: number
}

export function datasetTensors(tf: Tf, d: ShapeDataset, classes: number) {
  return tf.tidy(() => ({
    xs: tf.tensor4d(d.images, [d.count, d.size, d.size, 1]),
    ys: tf.oneHot(tf.tensor1d(d.labels, 'int32'), classes).toFloat(),
  }))
}

export interface TrainOptions {
  epochs: number
  learningRate: number
  batchSize: number
  onEpochEnd?: (log: EpochLog) => void | Promise<void>
  onBatchEnd?: (batch: number) => void | Promise<void>
  shouldStop?: () => boolean
  /** Epoch index to start numbering from (continuing training). */
  initialEpoch?: number
}

/** Adam + categorical cross-entropy, validating after every epoch. */
export async function trainTfModel(
  tf: Tf,
  model: TF.LayersModel,
  train: { xs: TF.Tensor; ys: TF.Tensor },
  val: { xs: TF.Tensor; ys: TF.Tensor },
  options: TrainOptions,
): Promise<EpochLog[]> {
  model.compile({ optimizer: tf.train.adam(options.learningRate), loss: 'categoricalCrossentropy', metrics: ['accuracy'] })
  const logs: EpochLog[] = []
  const start = options.initialEpoch ?? 0
  await model.fit(train.xs, train.ys, {
    epochs: start + options.epochs,
    initialEpoch: start,
    batchSize: options.batchSize,
    shuffle: true,
    validationData: [val.xs, val.ys],
    yieldEvery: 'batch',
    callbacks: {
      onBatchEnd: async (batch) => {
        await options.onBatchEnd?.(batch)
        if (options.shouldStop?.()) model.stopTraining = true
      },
      onEpochEnd: async (epoch, l) => {
        const log: EpochLog = {
          epoch: epoch + 1,
          loss: Number(l?.loss),
          acc: Number(l?.acc ?? l?.accuracy),
          valLoss: Number(l?.val_loss),
          valAcc: Number(l?.val_acc ?? l?.val_accuracy),
        }
        logs.push(log)
        await options.onEpochEnd?.(log)
      },
    },
  })
  return logs
}

/**
 * Grad-CAM (Selvaraju et al., 2017) for the conv layer `convLayerName`:
 *   α_k = mean_{i,j} ∂y^c/∂A^k_{ij},   L = ReLU(Σ_k α_k A^k)
 * y^c is the pre-softmax logit of class c. Returns an H×W map in [0, 1]
 * upsampled to the input resolution, plus the raw low-resolution map.
 */
export function gradCam(
  tf: Tf,
  model: TF.LayersModel,
  image: Float32Array,
  inputShape: number[],
  convLayerName: string,
  classIndex: number,
): { heatmap: Float32Array; raw: Float32Array; rawShape: [number, number]; channelWeights: Float32Array } {
  const convIdx = model.layers.findIndex((l) => l.name === convLayerName)
  const logitsIdx = model.layers.findIndex((l) => l.name === 'logits')
  if (convIdx < 0 || logitsIdx <= convIdx) throw new Error('gradCam: conv layer must precede the logits layer')
  const featureModel = tf.model({ inputs: model.inputs, outputs: model.layers[convIdx].output as TF.SymbolicTensor })
  const result = tf.tidy(() => {
    const x = tf.tensor(image, [1, ...inputShape])
    const A = featureModel.predict(x) as TF.Tensor4D
    const head = (a: TF.Tensor): TF.Tensor => {
      let h = a
      for (let i = convIdx + 1; i <= logitsIdx; i++) h = model.layers[i].apply(h, { training: false }) as TF.Tensor
      return h
    }
    const score = (a: TF.Tensor) => head(a).slice([0, classIndex], [1, 1]).sum()
    const grads = tf.grad(score)(A) as TF.Tensor4D
    const weights = grads.mean([1, 2]) // [1, K]
    const k = A.shape[3]
    const cam = tf.relu(A.mul(weights.reshape([1, 1, 1, k])).sum(-1)) // [1, h, w]
    const max = cam.max()
    const norm = cam.div(tf.maximum(max, tf.scalar(1e-8)))
    const up = tf.image.resizeBilinear(norm.expandDims(-1) as TF.Tensor4D, [inputShape[0], inputShape[1]]).squeeze()
    return { up, raw: norm.squeeze(), weights: weights.squeeze() }
  })
  const out = {
    heatmap: result.up.dataSync() as Float32Array,
    raw: result.raw.dataSync() as Float32Array,
    rawShape: [result.raw.shape[0], result.raw.shape[1]] as [number, number],
    channelWeights: result.weights.dataSync() as Float32Array,
  }
  tf.dispose([result.up, result.raw, result.weights])
  featureModel.dispose?.()
  return out
}
