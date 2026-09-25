/**
 * Typed access to models.json: architecture metadata for the exploded view.
 */
import modelsJson from '@/data/models.json'
import { inferShapes, type LayerShapeInfo, type LayerSpec, type LayerType, type TensorShape } from './tensorShapes'

export interface LayerTypeInfo {
  label: string
  purpose: string
  details: string
  math: string
}

export interface ModelSpec {
  id: string
  name: string
  description: string
  input: TensorShape
  classes: string[]
  defaults: { learningRate: number; epochs: number; batchSize: number }
  layers: Array<LayerSpec & { name: string }>
}

interface ModelsFile {
  version: number
  layerTypes: Record<LayerType, LayerTypeInfo>
  models: ModelSpec[]
}

const data = modelsJson as unknown as ModelsFile

export const LAYER_TYPES = data.layerTypes
export const MODELS = data.models

export function getModelSpec(id: string): ModelSpec {
  const m = MODELS.find((x) => x.id === id)
  if (!m) throw new Error(`Unknown model "${id}"`)
  return m
}

/** A layer of the exploded view, including the virtual input layer. */
export interface ViewLayer {
  index: number
  id: string
  name: string
  type: LayerType
  info: LayerShapeInfo | null
  inputShape: TensorShape
  outputShape: TensorShape
}

export function viewLayers(spec: ModelSpec): ViewLayer[] {
  const infos = inferShapes(spec.input, spec.layers)
  return [
    { index: 0, id: 'input', name: `Input ${spec.input.join('×')}`, type: 'input', info: null, inputShape: spec.input, outputShape: spec.input },
    ...spec.layers.map((l, i) => ({
      index: i + 1,
      id: l.id,
      name: l.name,
      type: l.type,
      info: infos[i],
      inputShape: infos[i].inputShape,
      outputShape: infos[i].outputShape,
    })),
  ]
}
