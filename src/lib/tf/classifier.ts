/**
 * Small TF.js classifiers for 2-D point clouds (Dataset Painter): logistic
 * regression and multilayer perceptrons trained full-batch with Adam on
 * logits, so the loss is computed in a numerically stable way.
 */
import type * as TF from '@tensorflow/tfjs'

type Tf = typeof TF

export type ClassifierKind = 'logistic' | 'mlp'
export type HiddenActivation = 'relu' | 'tanh' | 'sigmoid'

export interface ClassifierConfig {
  kind: ClassifierKind
  hidden: number[]
  activation: HiddenActivation
  classes: number
  seed: number
}

/** Binary problems use one sigmoid logit (true logistic regression); K > 2 uses a softmax. */
export function outputUnits(classes: number): number {
  return classes <= 2 ? 1 : classes
}

export function buildClassifier(tf: Tf, cfg: ClassifierConfig): TF.Sequential {
  const model = tf.sequential()
  const hidden = cfg.kind === 'mlp' ? cfg.hidden : []
  hidden.forEach((units, i) => {
    model.add(
      tf.layers.dense({
        units,
        activation: cfg.activation,
        kernelInitializer: tf.initializers.glorotUniform({ seed: cfg.seed * 31 + i }),
        ...(i === 0 ? { inputShape: [2] } : {}),
      }),
    )
  })
  model.add(
    tf.layers.dense({
      units: outputUnits(cfg.classes),
      activation: 'linear',
      kernelInitializer: tf.initializers.glorotUniform({ seed: cfg.seed * 31 + 99 }),
      ...(hidden.length === 0 ? { inputShape: [2] } : {}),
    }),
  )
  return model
}

export interface StepStats {
  loss: number
  accuracy: number
}

export interface Trainer {
  /** Run `n` full-batch Adam steps and return the final loss / accuracy. */
  step(n: number): StepStats
  /** Class probabilities on a res×res grid over [−1, 1]², row 0 at y = +1. Shape res·res·K. */
  predictGrid(res: number): { probs: Float32Array; classes: number }
  dispose(): void
}

export function createTrainer(tf: Tf, model: TF.Sequential, points: ReadonlyArray<readonly [number, number]>, labels: readonly number[], classes: number, learningRate: number): Trainer {
  const xs = tf.tensor2d(points.map((p) => [p[0], p[1]]), [points.length, 2])
  const binary = classes <= 2
  const ys = binary ? tf.tensor2d(labels.map((l) => [l]), [labels.length, 1]) : tf.oneHot(tf.tensor1d(labels as number[], 'int32'), classes).toFloat()
  const optimizer = tf.train.adam(learningRate)
  const lossFn = (): TF.Scalar => {
    const logits = model.apply(xs) as TF.Tensor
    return binary ? tf.losses.sigmoidCrossEntropy(ys, logits) : tf.losses.softmaxCrossEntropy(ys, logits)
  }
  const accuracy = (): number =>
    tf.tidy(() => {
      const logits = model.apply(xs) as TF.Tensor
      const pred = binary ? logits.greater(0).toInt().squeeze([1]) : logits.argMax(1)
      const truth = binary ? ys.toInt().squeeze([1]) : ys.argMax(1)
      return pred.equal(truth).mean().dataSync()[0]
    })
  return {
    step(n) {
      let loss = NaN
      for (let i = 0; i < n; i++) {
        const l = optimizer.minimize(lossFn, true) as TF.Scalar | null
        if (i === n - 1 && l) loss = l.dataSync()[0]
        l?.dispose()
      }
      return { loss, accuracy: accuracy() }
    },
    predictGrid(res) {
      const probs = tf.tidy(() => {
        const g: number[][] = []
        for (let r = 0; r < res; r++) {
          const y = 1 - (2 * (r + 0.5)) / res
          for (let c = 0; c < res; c++) g.push([-1 + (2 * (c + 0.5)) / res, y])
        }
        const logits = model.apply(tf.tensor2d(g)) as TF.Tensor
        if (binary) {
          const p1 = tf.sigmoid(logits)
          return tf.concat([tf.sub(1, p1), p1], 1)
        }
        return tf.softmax(logits)
      })
      const data = probs.dataSync() as Float32Array
      probs.dispose()
      return { probs: data, classes: Math.max(2, classes) }
    },
    dispose() {
      tf.dispose([xs, ys])
      optimizer.dispose()
    },
  }
}
