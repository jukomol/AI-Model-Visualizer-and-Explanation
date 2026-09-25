import { describe, expect, it } from 'vitest'
import {
  buildHead,
  entropy,
  positionShiftMatrix,
  positionalEncoding,
  scaledDotProductAttention,
  tokenEmbedding,
  tokenize,
} from './attention'
import { matVec } from './linalg'

const opts = { causal: false, scale: true, temperature: 1 }

describe('tokenize and embeddings', () => {
  it('splits words and punctuation', () => {
    expect(tokenize('The cat sat, the end!')).toEqual(['the', 'cat', 'sat', ',', 'the', 'end', '!'])
  })

  it('gives identical tokens identical unit embeddings', () => {
    expect(tokenEmbedding('cat', 16)).toEqual(tokenEmbedding('cat', 16))
    expect(Math.hypot(...tokenEmbedding('dog', 16))).toBeCloseTo(1, 12)
  })
})

describe('positional encoding', () => {
  it('matches the definition at position 0 and 1', () => {
    expect(positionalEncoding(0, 4)).toEqual([0, 1, 0, 1])
    const pe = positionalEncoding(1, 4)
    expect(pe[0]).toBeCloseTo(Math.sin(1))
    expect(pe[1]).toBeCloseTo(Math.cos(1))
    expect(pe[2]).toBeCloseTo(Math.sin(1 / 100))
  })

  it('shifts linearly: R_δ PE(p) = PE(p + δ)', () => {
    const R = positionShiftMatrix(-1, 16)
    for (const p of [1, 4, 9]) {
      const shifted = matVec(R, positionalEncoding(p, 16))
      positionalEncoding(p - 1, 16).forEach((v, i) => expect(shifted[i]).toBeCloseTo(v, 10))
    }
  })
})

describe('scaled dot-product attention', () => {
  const tokens = tokenize('the quick brown fox jumps over the lazy dog')

  it('produces row-stochastic weights', () => {
    const { Q, K, V } = buildHead(tokens, 'random')
    const r = scaledDotProductAttention(Q, K, V, opts)
    r.weights.forEach((row) => expect(row.reduce((a, b) => a + b, 0)).toBeCloseTo(1, 10))
    expect(r.output).toHaveLength(tokens.length)
  })

  it('applies the causal mask', () => {
    const { Q, K, V } = buildHead(tokens, 'random')
    const r = scaledDotProductAttention(Q, K, V, { ...opts, causal: true })
    r.weights.forEach((row, i) => row.forEach((w, j) => (j > i ? expect(w).toBe(0) : undefined)))
    expect(r.weights[0][0]).toBeCloseTo(1)
  })

  it('previous-token head attends to position i − 1', () => {
    const { Q, K, V } = buildHead(tokens, 'previous-token')
    const r = scaledDotProductAttention(Q, K, V, opts)
    for (let i = 1; i < tokens.length; i++) {
      const argmax = r.weights[i].indexOf(Math.max(...r.weights[i]))
      expect(argmax).toBe(i - 1)
    }
  })

  it('similarity head links repeated tokens', () => {
    const { Q, K, V } = buildHead(tokens, 'similarity')
    const r = scaledDotProductAttention(Q, K, V, opts)
    // "the" appears at 0 and 6: they attend to each other as much as to themselves.
    expect(r.weights[6][0]).toBeCloseTo(r.weights[6][6], 10)
    expect(r.weights[6][0]).toBeGreaterThan(0.3)
  })

  it('omitting the 1/√d_k scaling sharpens (lowers the entropy of) the distribution', () => {
    const { Q, K, V } = buildHead(tokens, 'random')
    const scaled = scaledDotProductAttention(Q, K, V, opts)
    const unscaled = scaledDotProductAttention(Q, K, V, { ...opts, scale: false })
    const meanH = (w: number[][]) => w.reduce((s, row) => s + entropy(row), 0) / w.length
    expect(meanH(unscaled.weights)).toBeLessThan(meanH(scaled.weights))
  })

  it('entropy of a uniform distribution is ln n', () => {
    expect(entropy([0.25, 0.25, 0.25, 0.25])).toBeCloseTo(Math.log(4))
  })
})
