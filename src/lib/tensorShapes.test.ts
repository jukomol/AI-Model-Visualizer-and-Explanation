import { describe, expect, it } from 'vitest'
import { inferLayer, inferShapes, spatialOutput, totalParams, type LayerSpec } from './tensorShapes'

describe('spatialOutput', () => {
  it('follows TensorFlow valid / same semantics', () => {
    expect(spatialOutput(64, 3, 1, 'valid')).toBe(62)
    expect(spatialOutput(28, 5, 1, 'same')).toBe(28)
    expect(spatialOutput(27, 3, 2, 'same')).toBe(14)
    expect(spatialOutput(27, 3, 2, 'valid')).toBe(13)
  })
})

describe('inferShapes', () => {
  const tiny: LayerSpec[] = [
    { id: 'c1', type: 'conv2d', filters: 8, kernelSize: 3, activation: 'relu' },
    { id: 'p1', type: 'maxPooling2d', poolSize: 2 },
    { id: 'c2', type: 'conv2d', filters: 16, kernelSize: 3, activation: 'relu' },
    { id: 'p2', type: 'maxPooling2d', poolSize: 2 },
    { id: 'd', type: 'dropout', rate: 0.25 },
    { id: 'f', type: 'flatten' },
    { id: 'fc', type: 'dense', units: 32, activation: 'relu' },
    { id: 'out', type: 'dense', units: 4 },
    { id: 'sm', type: 'softmax' },
  ]

  it('propagates shapes through a CNN', () => {
    const infos = inferShapes([28, 28, 1], tiny)
    expect(infos.map((i) => i.outputShape)).toEqual([
      [26, 26, 8],
      [13, 13, 8],
      [11, 11, 16],
      [5, 5, 16],
      [5, 5, 16],
      [400],
      [32],
      [4],
      [4],
    ])
  })

  it('counts parameters like Keras model.summary()', () => {
    const infos = inferShapes([28, 28, 1], tiny)
    expect(infos.map((i) => i.params)).toEqual([80, 0, 1168, 0, 0, 0, 12832, 132, 0])
    expect(totalParams(infos)).toBe(14212)
    expect(infos[0].paramFormula).toBe('(3·3·1 + 1)·8')
  })

  it('reproduces the blueprint example [64, 64, 32] → [62, 62, 64]', () => {
    const info = inferLayer({ id: 'x', type: 'conv2d', filters: 64, kernelSize: 3 }, [64, 64, 32])
    expect(info.outputShape).toEqual([62, 62, 64])
    expect(info.params).toBe((3 * 3 * 32 + 1) * 64)
  })

  it('rejects invalid architectures', () => {
    expect(() => inferShapes([28, 28, 1], [{ id: 'fc', type: 'dense', units: 10 }])).toThrow(/flatten/)
    expect(() => inferShapes([2, 2, 1], [{ id: 'c', type: 'conv2d', filters: 1, kernelSize: 5 }])).toThrow()
  })
})
