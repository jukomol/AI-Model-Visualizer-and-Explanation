import { describe, expect, it } from 'vitest'
import { KERNELS, conv2d, convOutputSize, convWindow, pool2d, resolvePadding } from './convolution'

const ramp = (n: number) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i * n + j))

describe('convOutputSize', () => {
  it('matches the standard formula', () => {
    expect(convOutputSize(7, 3)).toBe(5)
    expect(convOutputSize(28, 3)).toBe(26)
    expect(convOutputSize(28, 5, 1, 2)).toBe(28)
    expect(convOutputSize(26, 2, 2)).toBe(13)
    expect(convOutputSize(11, 2, 2)).toBe(5)
    expect(convOutputSize(64, 3)).toBe(62)
  })

  it('resolves padding modes', () => {
    expect(resolvePadding('valid', 3)).toBe(0)
    expect(resolvePadding('same', 3)).toBe(1)
    expect(resolvePadding('same', 5)).toBe(2)
    expect(resolvePadding(4, 3)).toBe(4)
  })
})

describe('conv2d', () => {
  it('leaves the input unchanged with the identity kernel and same padding', () => {
    const x = ramp(5)
    expect(conv2d(x, KERNELS.identity.kernel, { padding: 'same' })).toEqual(x)
  })

  it('computes a hand-checked cross-correlation', () => {
    const x = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]
    const k = [
      [1, 0],
      [0, -1],
    ]
    // Top-left: 1·1 + 5·(−1) = −4, and every window has the same difference.
    expect(conv2d(x, k)).toEqual([
      [-4, -4],
      [-4, -4],
    ])
  })

  it('does not flip the kernel (cross-correlation convention)', () => {
    const x = [[0, 0, 0], [0, 1, 0], [0, 0, 0]]
    const k = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    // A unit impulse reveals the kernel rotated by 180°.
    expect(conv2d(x, k, { padding: 'same' })).toEqual([
      [9, 8, 7],
      [6, 5, 4],
      [3, 2, 1],
    ])
  })

  it('gives zero Laplacian response on a linear ramp', () => {
    const out = conv2d(ramp(6), KERNELS.laplacian.kernel)
    out.flat().forEach((v) => expect(v).toBeCloseTo(0, 12))
  })

  it('Sobel X responds to a vertical edge and not to flat regions', () => {
    const edge = Array.from({ length: 5 }, () => [0, 0, 1, 1, 1])
    const out = conv2d(edge, KERNELS.sobelX.kernel)
    expect(out[0]).toEqual([4, 4, 0])
  })

  it('supports stride', () => {
    const out = conv2d(ramp(5), [[1]], { stride: 2 })
    expect(out).toEqual([
      [0, 2, 4],
      [10, 12, 14],
      [20, 22, 24],
    ])
  })

  it('exposes every product in a window', () => {
    const x = ramp(4)
    const w = convWindow(x, KERNELS.sobelX.kernel, 1, 1)
    expect(w.patch).toEqual([
      [5, 6, 7],
      [9, 10, 11],
      [13, 14, 15],
    ])
    expect(w.sum).toBe(w.products.flat().reduce((a, b) => a + b, 0))
    expect(w.sum).toBe(8)
  })

  it('pads with zeros', () => {
    const w = convWindow([[1]], KERNELS.boxBlur.kernel, 0, 0, { padding: 'same' })
    expect(w.patch.flat().filter((v) => v === 0)).toHaveLength(8)
    expect(w.sum).toBeCloseTo(1 / 9)
  })
})

describe('pool2d', () => {
  const x = [
    [1, 3, 2, 0],
    [4, 2, 1, 5],
    [0, 1, 7, 2],
    [2, 6, 3, 1],
  ]

  it('max-pools 2×2 windows with stride 2', () => {
    const { output, argmax } = pool2d(x, 2, 2, 'max')
    expect(output).toEqual([
      [4, 5],
      [6, 7],
    ])
    expect(argmax[0][0]).toEqual([1, 0])
    expect(argmax[1][1]).toEqual([2, 2])
  })

  it('average-pools', () => {
    expect(pool2d(x, 2, 2, 'avg').output).toEqual([
      [2.5, 2],
      [2.25, 3.25],
    ])
  })

  it('floors odd sizes like TensorFlow valid pooling', () => {
    expect(pool2d(ramp(5), 2).output).toHaveLength(2)
  })
})
