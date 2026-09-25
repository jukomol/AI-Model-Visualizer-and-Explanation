/**
 * Procedurally rendered grayscale shape images (circle, square, triangle,
 * cross) — a small but genuine image-classification dataset that trains in a
 * few seconds in the browser. Shapes are rasterised from signed distance
 * functions with anti-aliasing, random pose, size, stroke and pixel noise.
 */
import type { Rng } from './random'

export const SHAPE_CLASSES = ['circle', 'square', 'triangle', 'cross'] as const
export type ShapeClass = (typeof SHAPE_CLASSES)[number]

export interface ShapeParams {
  cx: number
  cy: number
  radius: number
  rotation: number
  filled: boolean
  thickness: number
  noise: number
}

type Sdf = (x: number, y: number) => number

function sdBox(x: number, y: number, hx: number, hy: number): number {
  const dx = Math.abs(x) - hx
  const dy = Math.abs(y) - hy
  const ox = Math.max(dx, 0)
  const oy = Math.max(dy, 0)
  return Math.hypot(ox, oy) + Math.min(Math.max(dx, dy), 0)
}

/** Exact SDF of an equilateral triangle with circumradius-like size r (Inigo Quilez). */
function sdTriangle(px: number, py: number, r: number): number {
  const k = Math.sqrt(3)
  let x = Math.abs(px) - r
  let y = py + r / k
  if (x + k * y > 0) {
    const nx = (x - k * y) / 2
    const ny = (-k * x - y) / 2
    x = nx
    y = ny
  }
  x -= Math.min(Math.max(x, -2 * r), 0)
  return -Math.hypot(x, y) * Math.sign(y)
}

export function shapeSdf(cls: ShapeClass, p: ShapeParams): Sdf {
  const c = Math.cos(-p.rotation)
  const s = Math.sin(-p.rotation)
  const local = (x: number, y: number): [number, number] => {
    const dx = x - p.cx
    const dy = y - p.cy
    return [c * dx - s * dy, s * dx + c * dy]
  }
  switch (cls) {
    case 'circle':
      return (x, y) => Math.hypot(x - p.cx, y - p.cy) - p.radius
    case 'square':
      return (x, y) => {
        const [u, v] = local(x, y)
        return sdBox(u, v, p.radius * 0.8, p.radius * 0.8)
      }
    case 'triangle':
      return (x, y) => {
        const [u, v] = local(x, y)
        return sdTriangle(u, v, p.radius * 0.95)
      }
    case 'cross':
      return (x, y) => {
        const [u, v] = local(x, y)
        const arm = p.radius * 0.26
        return Math.min(sdBox(u, v, p.radius, arm), sdBox(u, v, arm, p.radius))
      }
  }
}

/** Rasterise into a size×size Float32Array with values in [0, 1] (row-major). */
export function renderShape(cls: ShapeClass, params: ShapeParams, size = 28, rng?: Rng): Float32Array {
  const sdf = shapeSdf(cls, params)
  const px = 2 / size
  const img = new Float32Array(size * size)
  for (let r = 0; r < size; r++) {
    for (let col = 0; col < size; col++) {
      const x = ((col + 0.5) / size) * 2 - 1
      const y = ((r + 0.5) / size) * 2 - 1
      const d = sdf(x, y)
      const edge = params.filled ? d : Math.abs(d) - params.thickness / 2
      let v = Math.min(1, Math.max(0, 0.5 - edge / px))
      if (rng && params.noise > 0) v += rng.normal(0, params.noise)
      img[r * size + col] = Math.min(1, Math.max(0, v))
    }
  }
  return img
}

export function randomShapeParams(rng: Rng): ShapeParams {
  return {
    cx: rng.uniform(-0.22, 0.22),
    cy: rng.uniform(-0.22, 0.22),
    radius: rng.uniform(0.38, 0.62),
    rotation: rng.uniform(0, 2 * Math.PI),
    filled: rng.next() < 0.5,
    thickness: rng.uniform(0.09, 0.16),
    noise: rng.uniform(0, 0.08),
  }
}

export interface ShapeDataset {
  size: number
  count: number
  /** count × size × size, row-major, values in [0, 1]. */
  images: Float32Array
  labels: Int32Array
}

/** Class-balanced dataset (labels cycle through the classes, then are shuffled). */
export function generateShapeDataset(count: number, rng: Rng, size = 28): ShapeDataset {
  const order = rng.shuffle(Array.from({ length: count }, (_, i) => i % SHAPE_CLASSES.length))
  const images = new Float32Array(count * size * size)
  const labels = new Int32Array(count)
  order.forEach((label, i) => {
    images.set(renderShape(SHAPE_CLASSES[label], randomShapeParams(rng), size, rng), i * size * size)
    labels[i] = label
  })
  return { size, count, images, labels }
}
