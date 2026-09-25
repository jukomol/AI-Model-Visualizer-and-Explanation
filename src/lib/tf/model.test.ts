import * as tf from '@tensorflow/tfjs'
import { beforeAll, describe, expect, it } from 'vitest'
import { MODELS, getModelSpec, viewLayers } from '../models'
import { createRng } from '../random'
import { generateShapeDataset } from '../shapeImages'
import { inferShapes, totalParams } from '../tensorShapes'
import { buildActivationModel, buildTfModel, computeActivations, datasetTensors, gradCam, readWeights, trainTfModel } from './model'

beforeAll(async () => {
  await tf.setBackend('cpu')
  await tf.ready()
})

describe('buildTfModel', () => {
  it.each(MODELS.map((m) => m.id))('%s: TF.js shapes and parameter counts match the static inference', (id) => {
    const spec = getModelSpec(id)
    const model = buildTfModel(tf, spec)
    const infos = inferShapes(spec.input, spec.layers)
    model.layers.forEach((layer, i) => {
      const out = (layer.outputShape as number[]).slice(1)
      expect(out).toEqual(infos[i].outputShape)
      expect(layer.countParams()).toBe(infos[i].params)
    })
    expect(model.countParams()).toBe(totalParams(infos))
    model.dispose()
  })

  it('is deterministic for a seed', () => {
    const spec = getModelSpec('tiny-cnn')
    const a = readWeights(buildTfModel(tf, spec, 3))
    const b = readWeights(buildTfModel(tf, spec, 3))
    expect(Array.from(a.conv1.kernel!.data)).toEqual(Array.from(b.conv1.kernel!.data))
  })
})

describe('activations and Grad-CAM', () => {
  const spec = getModelSpec('tiny-cnn')
  const d = generateShapeDataset(4, createRng(1))
  const image = d.images.slice(0, 784)

  it('returns one activation per layer with the view-layer shapes', () => {
    const model = buildTfModel(tf, spec)
    const acts = computeActivations(tf, buildActivationModel(tf, model), image, spec.input)
    const layers = viewLayers(spec).slice(1)
    acts.forEach((a, i) => expect(a.shape).toEqual(layers[i].outputShape))
    const probs = Array.from(acts[acts.length - 1].data)
    expect(probs.reduce((s, p) => s + p, 0)).toBeCloseTo(1, 5)
    // Dropout is the identity at inference.
    expect(Array.from(acts[4].data)).toEqual(Array.from(acts[3].data))
  })

  it('produces a normalised, non-negative Grad-CAM map at input resolution', () => {
    const model = buildTfModel(tf, spec)
    const r = gradCam(tf, model, image, spec.input, 'conv2', 0)
    expect(r.heatmap).toHaveLength(28 * 28)
    expect(r.rawShape).toEqual([11, 11])
    const max = Math.max(...r.heatmap)
    expect(Math.min(...r.heatmap)).toBeGreaterThanOrEqual(0)
    expect(max).toBeLessThanOrEqual(1 + 1e-6)
    expect(r.channelWeights).toHaveLength(16)
  })
})

describe('training loop', () => {
  // The dense-only baseline trains in seconds on the pure-JS CPU backend; the
  // CNNs use the identical loop (TinyShapeNet reaches ~98% validation accuracy
  // after 8 epochs in the browser).
  it('learns the procedural shapes dataset (validation loss falls)', async () => {
    const spec = getModelSpec('mlp')
    const model = buildTfModel(tf, spec, 1)
    const train = datasetTensors(tf, generateShapeDataset(600, createRng(10)), 4)
    const val = datasetTensors(tf, generateShapeDataset(200, createRng(11)), 4)
    const seen: number[] = []
    const logs = await trainTfModel(tf, model, train, val, {
      epochs: 6,
      learningRate: 0.003,
      batchSize: 32,
      onEpochEnd: (l) => void seen.push(l.epoch),
    })
    expect(seen).toEqual([1, 2, 3, 4, 5, 6])
    expect(logs[5].valLoss).toBeLessThan(logs[0].valLoss)
    expect(logs[5].valAcc).toBeGreaterThan(0.4)
    tf.dispose([train.xs, train.ys, val.xs, val.ys])
  }, 60_000)
})
