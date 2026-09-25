import { describe, expect, it } from 'vitest'
import { createRng, hashString, mulberry32 } from './random'

describe('mulberry32', () => {
  it('is deterministic for a given seed', () => {
    const a = mulberry32(7)
    const b = mulberry32(7)
    for (let i = 0; i < 100; i++) expect(a()).toBe(b())
  })

  it('produces values in [0, 1) with roughly uniform mean', () => {
    const r = mulberry32(123)
    let sum = 0
    for (let i = 0; i < 20000; i++) {
      const v = r()
      expect(v).toBeGreaterThanOrEqual(0)
      expect(v).toBeLessThan(1)
      sum += v
    }
    expect(sum / 20000).toBeCloseTo(0.5, 1)
  })
})

describe('createRng', () => {
  it('draws Gaussian samples with the requested mean and std', () => {
    const rng = createRng(1)
    const xs = Array.from({ length: 20000 }, () => rng.normal(2, 3))
    const mu = xs.reduce((a, b) => a + b, 0) / xs.length
    const sd = Math.sqrt(xs.reduce((a, b) => a + (b - mu) ** 2, 0) / xs.length)
    expect(mu).toBeCloseTo(2, 1)
    expect(sd).toBeGreaterThan(2.9)
    expect(sd).toBeLessThan(3.1)
  })

  it('shuffles without losing elements', () => {
    const rng = createRng(3)
    const items = Array.from({ length: 50 }, (_, i) => i)
    const out = rng.shuffle(items)
    expect(out).not.toEqual(items)
    expect(out.slice().sort((a, b) => a - b)).toEqual(items)
  })
})

describe('hashString', () => {
  it('is stable and distinguishes strings', () => {
    expect(hashString('attention')).toBe(hashString('attention'))
    expect(hashString('attention')).not.toBe(hashString('Attention'))
  })
})
