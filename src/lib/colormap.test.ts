import { describe, expect, it } from 'vitest'
import { diverging, minMax, toRgba, viridis } from './colormap'

describe('colour maps', () => {
  it('viridis endpoints match matplotlib', () => {
    expect(viridis(0)).toEqual([68, 1, 84])
    expect(viridis(1)).toEqual([253, 231, 37])
    expect(viridis(-5)).toEqual([68, 1, 84])
    expect(viridis(Number.NaN)).toEqual([68, 1, 84])
  })

  it('diverging map is white-ish at zero and blue/red at the extremes', () => {
    expect(diverging(0)).toEqual([247, 247, 247])
    expect(diverging(-1)[2]).toBeGreaterThan(diverging(-1)[0])
    expect(diverging(1)[0]).toBeGreaterThan(diverging(1)[2])
  })

  it('converts a field into RGBA pixels', () => {
    const px = toRgba([0, 0.5, 1])
    expect(px).toHaveLength(12)
    expect(Array.from(px.slice(0, 4))).toEqual([68, 1, 84, 255])
    expect(Array.from(px.slice(8, 12))).toEqual([253, 231, 37, 255])
    expect(minMax([3, -1, 2])).toEqual([-1, 3])
  })

  it('handles constant fields without dividing by zero', () => {
    expect(Array.from(toRgba([2, 2]).slice(0, 3))).toEqual([68, 1, 84])
    expect(Array.from(toRgba([0, 0], 'diverging').slice(0, 3))).toEqual([247, 247, 247])
  })
})
