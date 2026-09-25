import { describe, expect, it } from 'vitest'
import { cellStateGradient, lstmStep, runLstm, scalarLstm } from './lstm'
import { sigmoid } from './regression'

const zero = { w: 0, u: 0, b: 0 }

describe('LSTM cell', () => {
  it('computes gates and state updates by the published equations', () => {
    const p = scalarLstm({
      input: { w: 1, u: 0.5, b: 0 },
      forget: { w: -1, u: 0, b: 1 },
      output: { w: 0.5, u: 0.5, b: 0 },
      candidate: { w: 2, u: -1, b: 0.1 },
    })
    const x = 0.7
    const h = 0.2
    const c = -0.4
    const s = lstmStep(p, [x], [h], [c])
    const i = sigmoid(x + 0.5 * h)
    const f = sigmoid(-x + 1)
    const o = sigmoid(0.5 * x + 0.5 * h)
    const g = Math.tanh(2 * x - h + 0.1)
    expect(s.i[0]).toBeCloseTo(i, 12)
    expect(s.f[0]).toBeCloseTo(f, 12)
    expect(s.o[0]).toBeCloseTo(o, 12)
    expect(s.g[0]).toBeCloseTo(g, 12)
    expect(s.c[0]).toBeCloseTo(f * c + i * g, 12)
    expect(s.h[0]).toBeCloseTo(o * Math.tanh(f * c + i * g), 12)
  })

  it('preserves the cell state when the forget gate is open and the input gate closed', () => {
    const p = scalarLstm({ input: { ...zero, b: -30 }, forget: { ...zero, b: 30 }, output: zero, candidate: { w: 1, u: 0, b: 0 } })
    const steps = runLstm(p, Array.from({ length: 50 }, (_, t) => [Math.sin(t)]), [0], [0.9])
    expect(steps[49].c[0]).toBeCloseTo(0.9, 6)
    expect(cellStateGradient(steps)[0]).toBeCloseTo(1, 6)
  })

  it('forgets geometrically when the forget gate is half closed', () => {
    const p = scalarLstm({ input: { ...zero, b: -30 }, forget: zero, output: zero, candidate: zero })
    const steps = runLstm(p, Array.from({ length: 10 }, () => [0]), [0], [1])
    expect(steps[9].c[0]).toBeCloseTo(0.5 ** 10, 8)
    expect(cellStateGradient(steps)[0]).toBeCloseTo(0.5 ** 10, 8)
  })
})
