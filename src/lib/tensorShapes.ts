/**
 * Static shape inference and parameter counting for the layer specs in
 * models.json — the same arithmetic TensorFlow.js performs when it builds a
 * model, written out explicitly for the Layer Inspector.
 */

export type TensorShape = number[]
export type Activation = 'relu' | 'tanh' | 'sigmoid' | 'linear'

interface BaseLayer {
  id: string
  name?: string
}

export type LayerSpec = BaseLayer &
  (
    | { type: 'conv2d'; filters: number; kernelSize: number; strides?: number; padding?: 'valid' | 'same'; activation?: Activation }
    | { type: 'maxPooling2d' | 'averagePooling2d'; poolSize: number; strides?: number }
    | { type: 'dropout'; rate: number }
    | { type: 'flatten' }
    | { type: 'dense'; units: number; activation?: Activation }
    | { type: 'softmax' }
  )

export type LayerType = LayerSpec['type'] | 'input'

export interface LayerShapeInfo {
  layer: LayerSpec
  inputShape: TensorShape
  outputShape: TensorShape
  params: number
  /** Human-readable derivation of `params`, e.g. "(3·3·1 + 1)·8". */
  paramFormula: string
}

/** Output length for TensorFlow padding semantics. */
export function spatialOutput(n: number, k: number, stride: number, padding: 'valid' | 'same'): number {
  return padding === 'same' ? Math.ceil(n / stride) : Math.floor((n - k) / stride) + 1
}

export function inferLayer(layer: LayerSpec, input: TensorShape): LayerShapeInfo {
  switch (layer.type) {
    case 'conv2d': {
      if (input.length !== 3) throw new Error(`${layer.id}: conv2d expects [H, W, C], got [${input}]`)
      const [h, w, c] = input
      const s = layer.strides ?? 1
      const pad = layer.padding ?? 'valid'
      const out = [spatialOutput(h, layer.kernelSize, s, pad), spatialOutput(w, layer.kernelSize, s, pad), layer.filters]
      if (out[0] <= 0 || out[1] <= 0) throw new Error(`${layer.id}: kernel larger than input`)
      const k = layer.kernelSize
      return {
        layer,
        inputShape: input,
        outputShape: out,
        params: (k * k * c + 1) * layer.filters,
        paramFormula: `(${k}·${k}·${c} + 1)·${layer.filters}`,
      }
    }
    case 'maxPooling2d':
    case 'averagePooling2d': {
      if (input.length !== 3) throw new Error(`${layer.id}: pooling expects [H, W, C], got [${input}]`)
      const [h, w, c] = input
      const s = layer.strides ?? layer.poolSize
      const out = [spatialOutput(h, layer.poolSize, s, 'valid'), spatialOutput(w, layer.poolSize, s, 'valid'), c]
      return { layer, inputShape: input, outputShape: out, params: 0, paramFormula: '0 (no weights)' }
    }
    case 'dropout':
    case 'softmax':
      return { layer, inputShape: input, outputShape: input.slice(), params: 0, paramFormula: '0 (no weights)' }
    case 'flatten':
      return {
        layer,
        inputShape: input,
        outputShape: [input.reduce((a, b) => a * b, 1)],
        params: 0,
        paramFormula: '0 (reshape only)',
      }
    case 'dense': {
      if (input.length !== 1) throw new Error(`${layer.id}: dense expects a vector, got [${input}] — add a flatten layer`)
      return {
        layer,
        inputShape: input,
        outputShape: [layer.units],
        params: (input[0] + 1) * layer.units,
        paramFormula: `(${input[0]} + 1)·${layer.units}`,
      }
    }
  }
}

export function inferShapes(inputShape: TensorShape, layers: readonly LayerSpec[]): LayerShapeInfo[] {
  const out: LayerShapeInfo[] = []
  let shape = inputShape
  for (const layer of layers) {
    const info = inferLayer(layer, shape)
    out.push(info)
    shape = info.outputShape
  }
  return out
}

export function totalParams(infos: readonly LayerShapeInfo[]): number {
  return infos.reduce((s, i) => s + i.params, 0)
}

export function formatShape(shape: TensorShape): string {
  return `[${shape.join(', ')}]`
}
