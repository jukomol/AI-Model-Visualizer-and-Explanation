import { describe, expect, it } from 'vitest'
import { spectralNorm } from './linalg'
import { createRng } from './random'
import { runRnn, scaledOrthogonal } from './rnn'

describe('scaledOrthogonal', () => {
  it('has every singular value equal to the gain', () => {
    const W = scaledOrthogonal(6, 0.8, createRng(1))
    expect(spectralNorm(W)).toBeCloseTo(0.8, 6)
    // WᵀW = gain² I
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        const d = W.reduce((s, row) => s + row[i] * row[j], 0)
        expect(d).toBeCloseTo(i === j ? 0.64 : 0, 8)
      }
    }
  })
})

describe('back-propagation through time', () => {
  const base = { hidden: 8, steps: 30, inputScale: 0.5, seed: 3 }

  it('linear RNN gradients scale exactly like gain^(T − t)', () => {
    for (const gain of [0.8, 1, 1.2]) {
      const { gradientNorms } = runRnn({ ...base, recurrentGain: gain, activation: 'linear' })
      const T = base.steps
      gradientNorms.forEach((g, t) => expect(g / gradientNorms[T]).toBeCloseTo(gain ** (T - t), 6))
    }
  })

  it('vanishes for gain < 1 and explodes for gain > 1', () => {
    const vanish = runRnn({ ...base, recurrentGain: 0.7, activation: 'linear' }).gradientNorms
    const explode = runRnn({ ...base, recurrentGain: 1.3, activation: 'linear' }).gradientNorms
    expect(vanish[0] / vanish[base.steps]).toBeLessThan(1e-3)
    expect(explode[0] / explode[base.steps]).toBeGreaterThan(1e3)
  })

  it('tanh saturation can only shrink gradients relative to the linear case', () => {
    const lin = runRnn({ ...base, recurrentGain: 1.1, activation: 'linear' }).gradientNorms
    const tanh = runRnn({ ...base, recurrentGain: 1.1, activation: 'tanh' }).gradientNorms
    expect(tanh[0]).toBeLessThan(lin[0])
    runRnn({ ...base, recurrentGain: 1.1, activation: 'tanh' }).states.flat().forEach((h) => expect(Math.abs(h)).toBeLessThan(1))
  })
})
