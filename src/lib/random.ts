/**
 * Deterministic pseudo-random number generation.
 *
 * Every visualizer that needs randomness (weight initialisation, synthetic
 * datasets, noise) takes a seed so that lessons are reproducible and shared
 * bookmarks render exactly the same state for every learner.
 */

/** Mulberry32: a tiny, fast 32-bit PRNG with good statistical quality. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** FNV-1a string hash, used to derive seeds from token strings. */
export function hashString(s: string): number {
  let h = 0x811c9dc5
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

export interface Rng {
  /** Uniform sample in [0, 1). */
  next(): number
  /** Uniform sample in [a, b). */
  uniform(a: number, b: number): number
  /** Gaussian sample via the Box–Muller transform. */
  normal(mean?: number, std?: number): number
  /** Uniform integer in [0, n). */
  int(n: number): number
  /** Fisher–Yates shuffle (returns a new array). */
  shuffle<T>(items: readonly T[]): T[]
}

export function createRng(seed = 42): Rng {
  const next = mulberry32(seed)
  let spare: number | null = null
  const rng: Rng = {
    next,
    uniform: (a, b) => a + (b - a) * next(),
    normal: (mean = 0, std = 1) => {
      if (spare !== null) {
        const v = spare
        spare = null
        return mean + std * v
      }
      let u = 0
      while (u === 0) u = next()
      const v = next()
      const r = Math.sqrt(-2 * Math.log(u))
      spare = r * Math.sin(2 * Math.PI * v)
      return mean + std * r * Math.cos(2 * Math.PI * v)
    },
    int: (n) => Math.floor(next() * n),
    shuffle: (items) => {
      const out = items.slice()
      for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(next() * (i + 1))
        ;[out[i], out[j]] = [out[j], out[i]]
      }
      return out
    },
  }
  return rng
}
