/**
 * A simulated object detector for the NMS lesson: several jittered proposals
 * per ground-truth object (better-aligned boxes score higher, as with a real
 * detector) plus a few low-confidence background false positives.
 */
import { iou, type Box, type ScoredBox } from './geometry'
import { createRng } from './random'

export const OBJECTS: Array<Box & { name: string }> = [
  { name: 'cat', x1: 60, y1: 120, x2: 230, y2: 330 },
  { name: 'dog', x1: 270, y1: 70, x2: 470, y2: 320 },
  { name: 'bird', x1: 500, y1: 60, x2: 600, y2: 170 },
]

export function simulateDetections(seed: number): ScoredBox[] {
  const rng = createRng(seed)
  const out: ScoredBox[] = []
  let id = 0
  OBJECTS.forEach((o) => {
    const w = o.x2 - o.x1
    const h = o.y2 - o.y1
    for (let k = 0; k < 6; k++) {
      const j = k === 0 ? 0.03 : 0.12
      const dx = rng.normal(0, j * w)
      const dy = rng.normal(0, j * h)
      const sw = 1 + rng.normal(0, j)
      const sh = 1 + rng.normal(0, j)
      const cx = (o.x1 + o.x2) / 2 + dx
      const cy = (o.y1 + o.y2) / 2 + dy
      const box = { x1: cx - (w * sw) / 2, y1: cy - (h * sh) / 2, x2: cx + (w * sw) / 2, y2: cy + (h * sh) / 2 }
      // Better-aligned proposals tend to score higher, as with a real detector.
      const score = Math.min(0.99, Math.max(0.05, 0.35 + 0.6 * iou(box, o) + rng.normal(0, 0.06)))
      out.push({ id: id++, ...box, score, label: o.name })
    }
  })
  for (let k = 0; k < 4; k++) {
    const x = rng.uniform(20, 540)
    const y = rng.uniform(20, 280)
    out.push({ id: id++, x1: x, y1: y, x2: x + rng.uniform(40, 90), y2: y + rng.uniform(40, 90), score: rng.uniform(0.08, 0.42), label: OBJECTS[k % 3].name })
  }
  return out
}

