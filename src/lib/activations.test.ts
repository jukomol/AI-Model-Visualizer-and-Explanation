import { describe, expect, it } from 'vitest'
import { activation, activationGrad, erf, simulateDeepNetwork, type ActivationId } from './activations'
import { createRng } from './random'

const ids: ActivationId[] = ['sigmoid', 'tanh', 'relu', 'leaky-relu', 'elu', 'gelu', 'silu', 'softplus']

describe('activation functions', () => {
  it.each(ids)('%s derivative matches finite differences', (id) => {
    for (const x of [-3.1, -0.7, 0.4, 2.3]) {
      const h = 1e-6
      expect(activationGrad(id, x)).toBeCloseTo((activation(id, x + h) - activation(id, x - h)) / (2 * h), 5)
    }
  })

  it('erf is accurate', () => {
    expect(erf(0)).toBe(0)
    expect(erf(1)).toBeCloseTo(0.8427007929, 6)
    expect(erf(-2)).toBeCloseTo(-0.995322265, 6)
  })

  it('has the textbook values', () => {
    expect(activation('sigmoid', 0)).toBe(0.5)
    expect(activation('gelu', 0)).toBe(0)
    expect(activation('gelu', 1)).toBeCloseTo(0.841344746, 6)
    expect(activation('softplus', 0)).toBeCloseTo(Math.LN2, 12)
    expect(activation('elu', -100)).toBeCloseTo(-1, 10)
    expect(activation('softplus', 1000)).toBe(1000)
  })

  it('sigmoid saturates: its derivative never exceeds 1/4', () => {
    for (let x = -6; x <= 6; x += 0.25) expect(activationGrad('sigmoid', x)).toBeLessThanOrEqual(0.25)
  })
})

describe('signal propagation through depth', () => {
  const ratio = (act: ActivationId, init: 'xavier' | 'he' | 'small') => {
    const s = simulateDeepNetwork(20, 32, act, init, createRng(5), 32)
    return s.gradientNorm[0] / s.gradientNorm[s.gradientNorm.length - 1]
  }

  it('sigmoid layers make gradients vanish', () => {
    expect(ratio('sigmoid', 'xavier')).toBeLessThan(1e-3)
  })

  it('ReLU with He initialisation keeps gradients in a healthy range', () => {
    const r = ratio('relu', 'he')
    expect(Math.abs(Math.log10(r))).toBeLessThan(1)
  })

  it('naive tiny initialisation collapses activations', () => {
    const s = simulateDeepNetwork(10, 32, 'tanh', 'small', createRng(1), 16)
    expect(s.activationStd[9]).toBeLessThan(1e-6)
  })

  it('reports no dead units for leaky ReLU', () => {
    const s = simulateDeepNetwork(8, 16, 'leaky-relu', 'he', createRng(2), 16)
    s.deadFraction.forEach((d) => expect(d).toBe(0))
  })
})

describe('activation-functions challenge', () => {
  it('sigmoid + Xavier fails, ReLU + He passes at depth 20', async () => {
    const { checkMetric, curriculum } = await import('./curriculum')
    const c = curriculum.nodes.find((n) => n.id === 'activation-functions')!.challenge as import('./curriculum').MetricChallenge
    const metric = (act: 'sigmoid' | 'relu', init: 'xavier' | 'he') => {
      const s = simulateDeepNetwork(20, 32, act, init, createRng(5), 32)
      return Math.abs(Math.log10(s.gradientNorm[0] / s.gradientNorm[19]))
    }
    expect(checkMetric(c, metric('sigmoid', 'xavier'))).toBe(false)
    expect(checkMetric(c, metric('relu', 'he'))).toBe(true)
  })
})
