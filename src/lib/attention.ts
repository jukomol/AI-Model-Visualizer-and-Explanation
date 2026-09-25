/**
 * Scaled dot-product attention (Vaswani et al., 2017) with three
 * analytically-constructed heads, so every attention pattern shown in the
 * visualizer has a mechanistic explanation rather than coming from a black box.
 *
 *   Attention(Q, K, V) = softmax(Q Kᵀ / √d_k + M) V
 */
import { dot, softmax, type Matrix } from './linalg'
import { createRng, hashString } from './random'

export function tokenize(text: string, maxTokens = 12): string[] {
  return (text.toLowerCase().match(/[a-z0-9']+|[.,!?;:]/g) ?? []).slice(0, maxTokens)
}

/** Sinusoidal positional encoding: PE(p, 2k) = sin(p/10000^{2k/d}), PE(p, 2k+1) = cos(…). */
export function positionalEncoding(pos: number, d: number): number[] {
  const out = new Array<number>(d)
  for (let k = 0; k < d / 2; k++) {
    const w = 1 / 10000 ** ((2 * k) / d)
    out[2 * k] = Math.sin(pos * w)
    out[2 * k + 1] = Math.cos(pos * w)
  }
  return out
}

/**
 * Block-diagonal rotation R_δ with R_δ · PE(p) = PE(p + δ) — the linear
 * "relative position" property highlighted in the Transformer paper.
 */
export function positionShiftMatrix(offset: number, d: number): Matrix {
  const R: Matrix = Array.from({ length: d }, () => new Array<number>(d).fill(0))
  for (let k = 0; k < d / 2; k++) {
    const a = offset / 10000 ** ((2 * k) / d)
    const c = Math.cos(a)
    const s = Math.sin(a)
    // [sin(x+a); cos(x+a)] = [[cos a, sin a], [−sin a, cos a]] [sin x; cos x]
    R[2 * k][2 * k] = c
    R[2 * k][2 * k + 1] = s
    R[2 * k + 1][2 * k] = -s
    R[2 * k + 1][2 * k + 1] = c
  }
  return R
}

/** Deterministic pseudo-embedding: identical tokens share a vector. */
export function tokenEmbedding(token: string, d: number): number[] {
  const rng = createRng(hashString(token))
  const v = Array.from({ length: d }, () => rng.normal())
  const n = Math.hypot(...v)
  return v.map((x) => x / n)
}

export type HeadKind = 'previous-token' | 'similarity' | 'random'

export const HEAD_DESCRIPTIONS: Record<HeadKind, string> = {
  'previous-token':
    'Queries are positional encodings rotated by −1 position (q_i = R₋₁·PE(i)), keys are PE(j). Their dot product peaks when j = i − 1, so each token looks at its predecessor.',
  similarity:
    'Queries and keys share one projection (W_Q = W_K) of the token embeddings, so q_i·k_j is largest for identical or similar tokens.',
  random:
    'Randomly initialised W_Q and W_K, as in an untrained Transformer: the pattern has no meaning yet.',
}

export interface AttentionOptions {
  causal: boolean
  /** Divide scores by √d_k (as in the paper). */
  scale: boolean
  temperature: number
}

export interface AttentionResult {
  queries: Matrix
  keys: Matrix
  values: Matrix
  /** Raw scores Q Kᵀ (after scaling / temperature, before masking). */
  scores: Matrix
  /** Row-stochastic attention weights. */
  weights: Matrix
  output: Matrix
  dk: number
}

export function scaledDotProductAttention(Q: Matrix, K: Matrix, V: Matrix, options: AttentionOptions): AttentionResult {
  const dk = K[0]?.length ?? 1
  const factor = (options.scale ? 1 / Math.sqrt(dk) : 1) / Math.max(1e-6, options.temperature)
  const scores = Q.map((q) => K.map((k) => dot(q, k) * factor))
  const weights = scores.map((row, i) => softmax(row.map((s, j) => (options.causal && j > i ? -Infinity : s))))
  const output = weights.map((w) => V[0].map((_, c) => w.reduce((s, wj, j) => s + wj * V[j][c], 0)))
  return { queries: Q, keys: K, values: V, scores, weights, output, dk }
}

/**
 * Builds Q, K, V for one of the illustrative heads.
 * `gain` scales the dot products so the softmax is neither flat nor one-hot.
 */
export function buildHead(tokens: readonly string[], kind: HeadKind, d = 32, seed = 7, gain = 4): { Q: Matrix; K: Matrix; V: Matrix } {
  const emb = tokens.map((t) => tokenEmbedding(t, d))
  const pe = tokens.map((_, p) => positionalEncoding(p, d))
  const V = emb
  if (kind === 'previous-token') {
    const R = positionShiftMatrix(-1, d)
    const Q = pe.map((p) => R.map((row) => dot(row, p) * gain))
    const K = pe.map((p) => p.map((v) => v * gain))
    return { Q, K, V }
  }
  if (kind === 'similarity') {
    const Q = emb.map((e) => e.map((v) => v * gain * Math.sqrt(d)))
    return { Q, K: Q.map((q) => q.slice()), V }
  }
  const rng = createRng(seed)
  const Wq = Array.from({ length: d }, () => Array.from({ length: d }, () => rng.normal(0, 1 / Math.sqrt(d))))
  const Wk = Array.from({ length: d }, () => Array.from({ length: d }, () => rng.normal(0, 1 / Math.sqrt(d))))
  const x = emb.map((e, p) => e.map((v, i) => v + 0.5 * pe[p][i]))
  const proj = (W: Matrix) => x.map((row) => W.map((w) => dot(w, row) * gain))
  return { Q: proj(Wq), K: proj(Wk), V }
}

/** Shannon entropy (nats) of a probability row — how spread out attention is. */
export function entropy(p: readonly number[]): number {
  return -p.reduce((s, v) => (v > 0 ? s + v * Math.log(v) : s), 0)
}
