import * as tf from '@tensorflow/tfjs'
import { beforeAll, describe, expect, it } from 'vitest'
import { checkMetric, curriculum, type MetricChallenge } from '../curriculum'
import { generatePreset } from '../datasets2d'
import { createRng } from '../random'
import { buildClassifier, createTrainer, outputUnits } from './classifier'

beforeAll(async () => {
  await tf.setBackend('cpu')
  await tf.ready()
})

const challenge = (id: string) => curriculum.nodes.find((n) => n.id === id)!.challenge as MetricChallenge

function data(preset: Parameters<typeof generatePreset>[0]) {
  const pts = generatePreset(preset, createRng(1))
  return { points: pts.map((p) => [p.x, p.y] as [number, number]), labels: pts.map((p) => p.label) }
}

describe('Dataset Painter classifiers', () => {
  it('uses a single sigmoid logit for binary problems and softmax otherwise', () => {
    expect(outputUnits(2)).toBe(1)
    expect(outputUnits(4)).toBe(4)
  })

  it('logistic regression reaches the lesson challenge on the linear preset', () => {
    const { points, labels } = data('linear')
    const model = buildClassifier(tf, { kind: 'logistic', hidden: [], activation: 'relu', classes: 2, seed: 1 })
    const t = createTrainer(tf, model, points, labels, 2, 0.1)
    const s = t.step(400)
    expect(checkMetric(challenge('logistic-regression'), s.loss)).toBe(true)
    expect(s.accuracy).toBeGreaterThan(0.95)
    const grid = t.predictGrid(10)
    expect(grid.probs).toHaveLength(10 * 10 * 2)
    t.dispose()
  })

  it('logistic regression cannot solve XOR, an MLP can', () => {
    const { points, labels } = data('xor')
    const lin = createTrainer(tf, buildClassifier(tf, { kind: 'logistic', hidden: [], activation: 'relu', classes: 2, seed: 1 }), points, labels, 2, 0.1)
    expect(lin.step(300).accuracy).toBeLessThan(0.75)
    const mlp = createTrainer(tf, buildClassifier(tf, { kind: 'mlp', hidden: [8], activation: 'tanh', classes: 2, seed: 1 }), points, labels, 2, 0.05)
    expect(mlp.step(500).accuracy).toBeGreaterThan(0.95)
  })

  it('an MLP reaches the spiral challenge', () => {
    const { points, labels } = data('spiral')
    const model = buildClassifier(tf, { kind: 'mlp', hidden: [16, 16], activation: 'tanh', classes: 2, seed: 2 })
    const t = createTrainer(tf, model, points, labels, 2, 0.03)
    const s = t.step(1500)
    expect(checkMetric(challenge('mlp'), s.accuracy)).toBe(true)
  }, 60_000)

  it('handles four classes with a softmax', () => {
    const { points, labels } = data('blobs')
    const t = createTrainer(tf, buildClassifier(tf, { kind: 'logistic', hidden: [], activation: 'relu', classes: 4, seed: 1 }), points, labels, 4, 0.1)
    expect(t.step(300).accuracy).toBeGreaterThan(0.9)
    expect(t.predictGrid(4).probs).toHaveLength(4 * 4 * 4)
  })
})
