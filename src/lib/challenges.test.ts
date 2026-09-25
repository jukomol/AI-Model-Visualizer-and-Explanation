/**
 * Feasibility tests: every metric challenge in curriculum.json must be
 * achievable with the same library code the visualizers run.
 */
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { initCentroids, kMeans, silhouetteScore } from './clustering'
import { checkMetric, curriculum, type MetricChallenge } from './curriculum'
import { generatePreset } from './datasets2d'
import { ddimSample, makeSchedule, meanNearestDistance, type Vec2 } from './diffusion'
import { SURFACES } from './lossSurfaces'
import { runOptimizer } from './optimizers'
import { calibrateRange, quantParams, quantize, sampleLayerWeights, sqnrDb } from './quantization'
import { createRng } from './random'
import { gradientDescentLinear } from './regression'

const challenge = (id: string) => curriculum.nodes.find((n) => n.id === id)!.challenge as MetricChallenge

describe('metric challenges are achievable', () => {
  it('linear regression: MSE ≤ 1.30 on Anscombe I', () => {
    const { sets } = JSON.parse(readFileSync('public/datasets/anscombe.json', 'utf8'))
    const r = gradientDescentLinear(sets.I.x, sets.I.y, { learningRate: 0.01, epochs: 3000 })
    expect(checkMetric(challenge('linear-regression'), r.final.loss)).toBe(true)
    // …but not with the default settings.
    const d = gradientDescentLinear(sets.I.x, sets.I.y, { learningRate: 0.001, epochs: 200 })
    expect(checkMetric(challenge('linear-regression'), d.final.loss)).toBe(false)
  })

  it('gradient descent: Rosenbrock loss ≤ 0.01 within 1000 steps', () => {
    const t = runOptimizer(SURFACES.rosenbrock, { id: 'adam', learningRate: 0.05, beta1: 0.9, beta2: 0.999 }, 1000)
    const best = Math.min(...t.points.map((p) => p.loss))
    expect(checkMetric(challenge('gradient-descent'), best)).toBe(true)
    // Plain SGD at a stable learning rate is far too slow.
    const sgd = runOptimizer(SURFACES.rosenbrock, { id: 'sgd', learningRate: 0.001 }, 1000)
    expect(checkMetric(challenge('gradient-descent'), Math.min(...sgd.points.map((p) => p.loss)))).toBe(false)
  })

  it('k-means: silhouette ≥ 0.60 on the four-cluster preset only with the right k', () => {
    const pts = generatePreset('blobs', createRng(1)).map((p) => [p.x, p.y])
    const score = (k: number) => {
      const { history } = kMeans(pts, initCentroids(pts, k, createRng(2), 'kmeans++'))
      return silhouetteScore(pts, history[history.length - 1].assignments)
    }
    expect(checkMetric(challenge('k-means'), score(4))).toBe(true)
    expect(checkMetric(challenge('k-means'), score(2))).toBe(false)
    expect(checkMetric(challenge('k-means'), score(8))).toBe(false)
  })

  it('diffusion: enough DDIM steps put samples on the data', () => {
    // Mirrors DiffusionViz: data scaled ×1.6, error reported in the original units.
    const data: Vec2[] = generatePreset('moons', createRng(1), 0.03).map((p) => [p.x * 1.6, p.y * 1.6])
    const err = (kind: 'linear' | 'cosine', steps: number) =>
      meanNearestDistance(ddimSample(data, makeSchedule(kind, 1000), steps, 120, createRng(1)).map((t) => t[t.length - 1]), data) / 1.6
    // The visualizer's defaults (linear schedule, 5 steps) do not pass…
    expect(checkMetric(challenge('diffusion'), err('linear', 5))).toBe(false)
    expect(checkMetric(challenge('diffusion'), err('cosine', 1))).toBe(false)
    // …but more steps, or the cosine schedule, do.
    expect(checkMetric(challenge('diffusion'), err('linear', 50))).toBe(true)
    expect(checkMetric(challenge('diffusion'), err('cosine', 10))).toBe(true)
  })

  it('quantisation: 4-bit SQNR target needs a clipped calibration range', () => {
    const w = sampleLayerWeights(4096, createRng(7))
    const sq = (range: [number, number]) => sqnrDb(w, quantize(w, quantParams(range, 4, true)).dequantized)
    const minmax = sq(calibrateRange(w, 'minmax'))
    expect(checkMetric(challenge('quantization'), minmax)).toBe(false)
    expect(checkMetric(challenge('quantization'), sq(calibrateRange(w, 'percentile', 99)))).toBe(true)
  })
})
