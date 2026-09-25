/**
 * Geometry for the exploded network view: every tensor becomes either a stack
 * of 2-D channel planes ("volume") or a column of units ("vector"), laid out
 * along the x-axis. The explosion factor e ∈ [0, 1] widens both the gaps
 * between layers and the gaps between channels inside a layer.
 */
import type { TensorShape } from './tensorShapes'

export const MAX_VISIBLE_CHANNELS = 16
export const MAX_VISIBLE_UNITS = 64

export interface LayerGeometry {
  kind: 'volume' | 'vector'
  /** Edge length of each (square) channel plane, or the height of a vector column. */
  size: number
  /** Number of planes / units actually drawn. */
  count: number
  /** Total channels / units in the tensor. */
  total: number
}

export function layerGeometry(shape: TensorShape): LayerGeometry {
  if (shape.length === 3) {
    const [h, , c] = shape
    return { kind: 'volume', size: 0.6 + h * 0.1, count: Math.min(c, MAX_VISIBLE_CHANNELS), total: c }
  }
  const units = shape[0]
  const count = Math.min(units, MAX_VISIBLE_UNITS)
  return { kind: 'vector', size: Math.min(4.2, 0.4 + count * 0.12), count, total: units }
}

export interface PlacedLayer {
  /** Centre of the layer along the flow axis. */
  x: number
  /** Extent along the flow axis. */
  thickness: number
  /** Spacing between consecutive channel planes (volumes only). */
  channelGap: number
}

export const PLANE_THICKNESS = 0.02
export const VECTOR_THICKNESS = 0.28

export function channelGap(explosion: number): number {
  return 0.05 + 0.22 * explosion
}

export function layerGap(explosion: number): number {
  return 0.7 + 3.3 * explosion
}

export function layoutLayers(geoms: readonly LayerGeometry[], explosion: number): PlacedLayer[] {
  const e = Math.min(1, Math.max(0, explosion))
  const cg = channelGap(e)
  const gap = layerGap(e)
  const thick = geoms.map((g) => (g.kind === 'volume' ? (g.count - 1) * cg + PLANE_THICKNESS : VECTOR_THICKNESS))
  const placed: PlacedLayer[] = []
  let cursor = 0
  geoms.forEach((_, i) => {
    placed.push({ x: cursor + thick[i] / 2, thickness: thick[i], channelGap: cg })
    cursor += thick[i] + gap
  })
  const total = cursor - gap
  return placed.map((p) => ({ ...p, x: p.x - total / 2 }))
}

/** Total length of the laid-out network along the flow axis. */
export function networkLength(placed: readonly PlacedLayer[]): number {
  if (placed.length === 0) return 0
  const first = placed[0]
  const last = placed[placed.length - 1]
  return last.x + last.thickness / 2 - (first.x - first.thickness / 2)
}
