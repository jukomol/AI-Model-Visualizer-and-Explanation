import { describe, expect, it } from 'vitest'
import { MAX_VISIBLE_CHANNELS, layerGeometry, layoutLayers, networkLength } from './explodedLayout'

const geoms = [[28, 28, 1], [26, 26, 8], [13, 13, 8], [400], [32], [4]].map(layerGeometry)

describe('exploded layout', () => {
  it('classifies tensors as volumes or vectors and caps visible channels', () => {
    expect(layerGeometry([26, 26, 8]).kind).toBe('volume')
    expect(layerGeometry([400]).kind).toBe('vector')
    expect(layerGeometry([5, 5, 64]).count).toBe(MAX_VISIBLE_CHANNELS)
    expect(layerGeometry([5, 5, 64]).total).toBe(64)
  })

  it('places layers left-to-right without overlap and centred on the origin', () => {
    for (const e of [0, 0.5, 1]) {
      const placed = layoutLayers(geoms, e)
      for (let i = 1; i < placed.length; i++) {
        const prevEnd = placed[i - 1].x + placed[i - 1].thickness / 2
        const start = placed[i].x - placed[i].thickness / 2
        expect(start).toBeGreaterThan(prevEnd)
      }
      const first = placed[0]
      const last = placed[placed.length - 1]
      expect(first.x - first.thickness / 2 + (last.x + last.thickness / 2)).toBeCloseTo(0, 10)
    }
  })

  it('exploding increases total length and channel spacing monotonically', () => {
    let prev = -1
    let prevGap = -1
    for (const e of [0, 0.25, 0.5, 0.75, 1]) {
      const placed = layoutLayers(geoms, e)
      const len = networkLength(placed)
      expect(len).toBeGreaterThan(prev)
      expect(placed[1].channelGap).toBeGreaterThan(prevGap)
      prev = len
      prevGap = placed[1].channelGap
    }
  })
})
