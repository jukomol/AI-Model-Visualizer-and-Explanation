import { describe, expect, it } from 'vitest'
import { XOR_DATA, backward, bceLoss, datasetLoss, forward, initMlp, trainStep, type MlpParams } from './neural'
import { createRng } from './random'

function numericGrad(params: MlpParams, x: number[], y: number, l: number, j: number, i: number | 'b') {
  const h = 1e-6
  const bump = (d: number): MlpParams => ({
    hiddenActivation: params.hiddenActivation,
    layers: params.layers.map((layer, li) => ({
      W: layer.W.map((row, jj) => row.map((w, ii) => (li === l && jj === j && ii === i ? w + d : w))),
      b: layer.b.map((b, jj) => (li === l && jj === j && i === 'b' ? b + d : b)),
    })),
  })
  return (bceLoss(forward(bump(h), x).output, y) - bceLoss(forward(bump(-h), x).output, y)) / (2 * h)
}

describe('back-propagation', () => {
  for (const act of ['sigmoid', 'tanh'] as const) {
    it(`matches finite differences (${act} hidden units)`, () => {
      const params = initMlp([2, 3, 2, 1], createRng(7), act)
      const x = [0.4, -1.2]
      const y = 1
      const g = backward(params, forward(params, x), y)
      params.layers.forEach((layer, l) => {
        layer.W.forEach((row, j) => {
          row.forEach((_, i) => expect(g.dW[l][j][i]).toBeCloseTo(numericGrad(params, x, y, l, j, i), 6))
          expect(g.db[l][j]).toBeCloseTo(numericGrad(params, x, y, l, j, 'b'), 6)
        })
      })
    })
  }

  const train = (hidden: number, seed: number, steps = 3000) => {
    let params = initMlp([2, hidden, 1], createRng(seed), 'sigmoid')
    for (let i = 0; i < steps; i++) params = trainStep(params, XOR_DATA.xs, XOR_DATA.ys, 2)
    return params
  }

  it('learns XOR with a 2-2-1 network from a good initialisation', () => {
    const start = datasetLoss(initMlp([2, 2, 1], createRng(1), 'sigmoid'), XOR_DATA.xs, XOR_DATA.ys)
    const params = train(2, 1)
    const end = datasetLoss(params, XOR_DATA.xs, XOR_DATA.ys)
    expect(end).toBeLessThan(0.05)
    expect(end).toBeLessThan(start)
    XOR_DATA.xs.forEach((x, i) => expect(Math.round(forward(params, x).output)).toBe(XOR_DATA.ys[i]))
  })

  it('2-2-1 can get stuck in a local minimum that a wider 2-3-1 network escapes', () => {
    // Seed 3 leaves one XOR pattern at p ≈ 0.5: loss plateaus near ln(2)/2.
    expect(datasetLoss(train(2, 3), XOR_DATA.xs, XOR_DATA.ys)).toBeGreaterThan(0.3)
    expect(datasetLoss(train(3, 3), XOR_DATA.xs, XOR_DATA.ys)).toBeLessThan(0.05)
  })
})
