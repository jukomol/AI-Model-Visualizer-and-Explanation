import * as tf from '@tensorflow/tfjs'
import { beforeAll, describe, expect, it } from 'vitest'
import { DEFAULT_CLASSIC_PARAMS, crossValidatedAccuracy, type ClassicKind, type ClassicParams } from '@/lib/classicClassifiers'
import { PRESET_LABELS, generatePreset, type DatasetPreset } from '@/lib/datasets2d'
import { createRng } from '@/lib/random'
import { buildClassifier, createTrainer } from '@/lib/tf/classifier'
import { CLASSIC_MODELS, PAINTER_MODELS, UNSUPPORTED, fallbackModel, unsupportedReason, type PainterModel } from './painterModels'

const PRESETS = Object.keys(PRESET_LABELS) as DatasetPreset[]
const FAILS_BELOW = 0.75
const WORKS_FROM = 0.85

/** Settings the painter's controls can reach, sampled across their ranges. */
const SWEEPS: Record<ClassicKind, Partial<ClassicParams>[]> = {
  knn: [{ k: 1 }, { k: 5 }, { k: 15 }],
  'naive-bayes': [{}],
  lda: [{ reg: 0.0001 }, { reg: 0.01 }, { reg: 0.3 }],
  qda: [{ reg: 0.0001 }, { reg: 0.01 }, { reg: 0.3 }],
  svm: [1, 10].flatMap((C) => [1, 10, 50].map((gamma) => ({ C, gamma }))),
  tree: [{ maxDepth: 5 }, { maxDepth: 10 }, { maxDepth: 15 }],
  forest: [{ maxDepth: 5 }, { maxDepth: 12 }],
  adaboost: [{ weakDepth: 1 }, { weakDepth: 2 }, { weakDepth: 3 }],
}

function data(preset: DatasetPreset) {
  const pts = generatePreset(preset, createRng(1))
  const labels = pts.map((p) => p.label)
  return { points: pts.map((p) => [p.x, p.y] as [number, number]), labels, classes: Math.max(2, ...labels.map((l) => l + 1)) }
}

function bestClassicAccuracy(kind: ClassicKind, preset: DatasetPreset): number {
  const d = data(preset)
  return Math.max(...SWEEPS[kind].map((p) => crossValidatedAccuracy(kind, d.points, d.labels, d.classes, { ...DEFAULT_CLASSIC_PARAMS, ...p })))
}

beforeAll(async () => {
  await tf.setBackend('cpu')
  await tf.ready()
})

describe('model availability per preset', () => {
  it('only lists real models and presets, each with a reason', () => {
    for (const [preset, models] of Object.entries(UNSUPPORTED)) {
      expect(PRESETS).toContain(preset)
      for (const [model, reason] of Object.entries(models!)) {
        expect(Object.keys(PAINTER_MODELS)).toContain(model)
        expect(reason.length).toBeGreaterThan(10)
      }
    }
    // Every preset keeps plenty of choice, and the fallbacks are never disabled.
    for (const preset of PRESETS) {
      expect(Object.keys(UNSUPPORTED[preset] ?? {}).length).toBeLessThanOrEqual(4)
      for (const model of Object.keys(PAINTER_MODELS) as PainterModel[]) expect(unsupportedReason(fallbackModel(model), preset)).toBeNull()
    }
  })

  const pairs = CLASSIC_MODELS.flatMap((kind) => PRESETS.map((preset) => [kind, preset] as const))
  it.each(pairs)('%s on %s: disabled exactly when no setting fits the data', (kind, preset) => {
    const best = bestClassicAccuracy(kind, preset)
    if (unsupportedReason(kind, preset)) expect(best).toBeLessThan(FAILS_BELOW)
    else expect(best).toBeGreaterThanOrEqual(WORKS_FROM)
  })

  it.each(PRESETS)('logistic regression on %s: disabled exactly when a linear boundary cannot fit', (preset) => {
    const d = data(preset)
    const best = Math.max(
      ...[0.03, 0.1].map((lr) => {
        const model = buildClassifier(tf, { kind: 'logistic', hidden: [], activation: 'relu', classes: d.classes, seed: 1 })
        const t = createTrainer(tf, model, d.points, d.labels, d.classes, lr)
        const acc = t.step(300).accuracy
        t.dispose()
        model.dispose()
        return acc
      }),
    )
    if (unsupportedReason('logistic', preset)) expect(best).toBeLessThan(FAILS_BELOW)
    else expect(best).toBeGreaterThanOrEqual(WORKS_FROM)
  })

  it('never disables the MLP, a universal approximator', () => {
    for (const preset of PRESETS) expect(unsupportedReason('mlp', preset)).toBeNull()
  })
})
