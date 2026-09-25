/**
 * Synthetic 2-D classification / clustering datasets in the square [−1, 1]².
 * Each generator is a direct implementation of its geometric definition.
 */
import type { Rng } from './random'

export interface LabeledPoint {
  x: number
  y: number
  label: number
}

export type DatasetPreset = 'blobs' | 'linear' | 'xor' | 'circles' | 'moons' | 'spiral'

export const PRESET_LABELS: Record<DatasetPreset, string> = {
  linear: 'Linearly separable',
  blobs: 'Four clusters',
  xor: 'XOR quadrants',
  circles: 'Concentric circles',
  moons: 'Two moons',
  spiral: 'Two spirals',
}

const clip = (v: number) => Math.max(-1, Math.min(1, v))

export function gaussianBlobs(
  centers: ReadonlyArray<readonly [number, number]>,
  perCluster: number,
  std: number,
  rng: Rng,
): LabeledPoint[] {
  const out: LabeledPoint[] = []
  centers.forEach(([cx, cy], label) => {
    for (let i = 0; i < perCluster; i++) out.push({ x: clip(rng.normal(cx, std)), y: clip(rng.normal(cy, std)), label })
  })
  return out
}

/** Archimedean spirals r = t, θ = t·turns·2π + class·π, with Gaussian jitter. */
export function spirals(perClass: number, noise: number, rng: Rng, classes = 2, turns = 1.5): LabeledPoint[] {
  const out: LabeledPoint[] = []
  for (let c = 0; c < classes; c++) {
    for (let i = 0; i < perClass; i++) {
      const t = 0.08 + (0.92 * i) / perClass
      const theta = t * turns * 2 * Math.PI + (c * 2 * Math.PI) / classes
      out.push({
        x: clip(t * Math.cos(theta) * 0.95 + rng.normal(0, noise)),
        y: clip(t * Math.sin(theta) * 0.95 + rng.normal(0, noise)),
        label: c,
      })
    }
  }
  return out
}

export function concentricCircles(perClass: number, noise: number, rng: Rng, inner = 0.35, outer = 0.8): LabeledPoint[] {
  const out: LabeledPoint[] = []
  ;[inner, outer].forEach((r, label) => {
    for (let i = 0; i < perClass; i++) {
      const a = rng.uniform(0, 2 * Math.PI)
      out.push({ x: clip(r * Math.cos(a) + rng.normal(0, noise)), y: clip(r * Math.sin(a) + rng.normal(0, noise)), label })
    }
  })
  return out
}

export function xorQuadrants(n: number, noise: number, rng: Rng): LabeledPoint[] {
  return Array.from({ length: n }, () => {
    let x = rng.uniform(-0.9, 0.9)
    let y = rng.uniform(-0.9, 0.9)
    // Keep a small gap around the axes so the ideal boundary is unambiguous.
    if (Math.abs(x) < 0.08) x += Math.sign(x || 1) * 0.08
    if (Math.abs(y) < 0.08) y += Math.sign(y || 1) * 0.08
    const label = x * y > 0 ? 0 : 1
    return { x: clip(x + rng.normal(0, noise)), y: clip(y + rng.normal(0, noise)), label }
  })
}

/** Two interleaving half circles (as in scikit-learn's make_moons), rescaled to [−1, 1]². */
export function moons(perClass: number, noise: number, rng: Rng): LabeledPoint[] {
  const out: LabeledPoint[] = []
  for (let i = 0; i < perClass; i++) {
    const a = (Math.PI * i) / (perClass - 1)
    out.push({ x: clip((Math.cos(a) - 0.5) * 0.6 + rng.normal(0, noise)), y: clip(Math.sin(a) * 0.6 - 0.15 + rng.normal(0, noise)), label: 0 })
    out.push({ x: clip((1 - Math.cos(a) - 0.5) * 0.6 + rng.normal(0, noise)), y: clip((0.5 - Math.sin(a)) * 0.6 - 0.15 + rng.normal(0, noise)), label: 1 })
  }
  return out
}

export function generatePreset(preset: DatasetPreset, rng: Rng, noise = 0.08): LabeledPoint[] {
  switch (preset) {
    case 'linear':
      return gaussianBlobs([[-0.45, -0.35], [0.45, 0.35]], 60, 0.17 + noise / 2, rng)
    case 'blobs':
      return gaussianBlobs([[-0.5, -0.5], [0.5, 0.5], [-0.5, 0.5], [0.5, -0.5]], 40, 0.1 + noise / 2, rng)
    case 'xor':
      return xorQuadrants(160, noise / 3, rng)
    case 'circles':
      return concentricCircles(80, noise / 1.5, rng)
    case 'moons':
      return moons(80, noise, rng)
    case 'spiral':
      return spirals(100, noise / 3, rng)
  }
}
