/**
 * A shared, lazily-created TensorFlow.js session per architecture in
 * models.json. The session owns the model, the shapes dataset and the training
 * history, so the trained network persists while you move between the
 * exploded viewer, the Grad-CAM lesson and the quantisation lesson.
 */
import type * as TF from '@tensorflow/tfjs'
import { useEffect, useSyncExternalStore } from 'react'
import { getModelSpec, type ModelSpec } from '@/lib/models'
import { createRng } from '@/lib/random'
import { generateShapeDataset } from '@/lib/shapeImages'
import {
  buildActivationModel,
  buildTfModel,
  computeActivations,
  datasetTensors,
  readWeights,
  trainTfModel,
  type EpochLog,
  type LayerActivation,
  type LayerWeights,
} from '@/lib/tf/model'

type Tf = typeof TF

export const TRAIN_SIZE = 1200
export const VAL_SIZE = 300

export interface SessionState {
  status: 'idle' | 'loading' | 'ready' | 'training' | 'error'
  error?: string
  backend?: string
  history: EpochLog[]
  /** Increments whenever weights change (training, reset). */
  version: number
  progress: { epoch: number; batch: number; batchesPerEpoch: number; totalEpochs: number } | null
  seed: number
}

export interface TrainParams {
  epochs: number
  learningRate: number
  batchSize: number
}

let tfPromise: Promise<Tf> | null = null

/** Loads TF.js on first use and waits for the best available backend (WebGL, else CPU). */
export function loadTf(): Promise<Tf> {
  tfPromise ??= import('@tensorflow/tfjs').then(async (tf) => {
    await tf.ready()
    return tf
  })
  return tfPromise
}

class ModelSession {
  readonly spec: ModelSpec
  state: SessionState = { status: 'idle', history: [], version: 0, progress: null, seed: 1 }
  tf: Tf | null = null
  model: TF.Sequential | null = null
  private activationModel: TF.LayersModel | null = null
  private listeners = new Set<() => void>()
  private stopRequested = false
  private data: { train: { xs: TF.Tensor; ys: TF.Tensor }; val: { xs: TF.Tensor; ys: TF.Tensor } } | null = null

  constructor(spec: ModelSpec) {
    this.spec = spec
  }

  subscribe = (fn: () => void) => {
    this.listeners.add(fn)
    return () => this.listeners.delete(fn)
  }

  getSnapshot = () => this.state

  private set(patch: Partial<SessionState>) {
    this.state = { ...this.state, ...patch }
    this.listeners.forEach((l) => l())
  }

  async init() {
    if (this.state.status !== 'idle') return
    this.set({ status: 'loading' })
    try {
      const tf = await loadTf()
      this.tf = tf
      this.build(this.state.seed)
      this.set({ status: 'ready', backend: tf.getBackend(), version: this.state.version + 1 })
    } catch (e) {
      this.set({ status: 'error', error: (e as Error).message })
    }
  }

  private build(seed: number) {
    const tf = this.tf!
    this.model?.dispose()
    this.model = buildTfModel(tf, this.spec, seed)
    this.activationModel = buildActivationModel(tf, this.model)
  }

  private ensureData() {
    if (this.data || !this.tf) return this.data!
    const classes = this.spec.classes.length
    this.data = {
      train: datasetTensors(this.tf, generateShapeDataset(TRAIN_SIZE, createRng(1001)), classes),
      val: datasetTensors(this.tf, generateShapeDataset(VAL_SIZE, createRng(2002)), classes),
    }
    return this.data
  }

  /** Every layer's output for one image (index-aligned with the model's layers). */
  activations(image: Float32Array): LayerActivation[] | null {
    if (!this.tf || !this.activationModel) return null
    return computeActivations(this.tf, this.activationModel, image, this.spec.input)
  }

  weights(): Record<string, LayerWeights> {
    return this.model ? readWeights(this.model) : {}
  }

  async train(params: TrainParams, onEpoch?: (log: EpochLog) => void) {
    if (!this.tf || !this.model || this.state.status === 'training') return
    const { train, val } = this.ensureData()
    this.stopRequested = false
    const batchesPerEpoch = Math.ceil(TRAIN_SIZE / params.batchSize)
    const startEpoch = this.state.history.length
    this.set({ status: 'training', progress: { epoch: startEpoch, batch: 0, batchesPerEpoch, totalEpochs: startEpoch + params.epochs } })
    try {
      await trainTfModel(this.tf, this.model, train, val, {
        ...params,
        initialEpoch: startEpoch,
        shouldStop: () => this.stopRequested,
        onBatchEnd: (batch) => {
          if (batch % 4 === 0 && this.state.progress) this.set({ progress: { ...this.state.progress, batch: batch + 1 } })
        },
        onEpochEnd: (log) => {
          this.set({
            history: [...this.state.history, log],
            version: this.state.version + 1,
            progress: this.state.progress && { ...this.state.progress, epoch: log.epoch, batch: 0 },
          })
          onEpoch?.(log)
        },
      })
    } catch (e) {
      this.set({ status: 'error', error: (e as Error).message })
      return
    }
    this.set({ status: 'ready', progress: null })
  }

  stop() {
    this.stopRequested = true
  }

  reset() {
    if (!this.tf || this.state.status === 'training') return
    const seed = this.state.seed + 1
    this.build(seed)
    this.set({ seed, history: [], version: this.state.version + 1, status: 'ready' })
  }
}

const sessions = new Map<string, ModelSession>()

export function getSession(modelId: string): ModelSession {
  let s = sessions.get(modelId)
  if (!s) {
    s = new ModelSession(getModelSpec(modelId))
    sessions.set(modelId, s)
  }
  return s
}

/** Subscribe to a model session, initialising TF.js and the model on first use. */
export function useExplodedModel(modelId: string) {
  const session = getSession(modelId)
  const state = useSyncExternalStore(session.subscribe, session.getSnapshot)
  useEffect(() => {
    void session.init()
  }, [session])
  return { session, state, spec: session.spec }
}
