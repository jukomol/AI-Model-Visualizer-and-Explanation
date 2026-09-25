import { describe, expect, it } from 'vitest'
import { CATEGORICAL, diverging, minMax, sequential, toRgba } from './colormap'

describe('colour scales', () => {
  it('sequential recedes toward the surface at zero in both modes', () => {
    const lum = ([r, g, b]: number[]) => 0.2126 * r + 0.7152 * g + 0.0722 * b
    expect(lum(sequential(0, 'light'))).toBeGreaterThan(lum(sequential(1, 'light')))
    expect(lum(sequential(0, 'dark'))).toBeLessThan(lum(sequential(1, 'dark')))
    expect(sequential(-5, 'light')).toEqual(sequential(0, 'light'))
    expect(sequential(Number.NaN, 'dark')).toEqual(sequential(0, 'dark'))
  })

  it('diverging midpoint is neutral gray and poles are blue / red', () => {
    for (const mode of ['light', 'dark'] as const) {
      const [r, g, b] = diverging(0, mode)
      expect(Math.max(r, g, b) - Math.min(r, g, b)).toBeLessThan(10)
      const neg = diverging(-1, mode)
      const pos = diverging(1, mode)
      expect(neg[2]).toBeGreaterThan(neg[0])
      expect(pos[0]).toBeGreaterThan(pos[2])
    }
  })

  it('converts fields into RGBA pixels', () => {
    const px = toRgba([0, 0.5, 1], 'grayscale')
    expect(Array.from(px.slice(0, 4))).toEqual([0, 0, 0, 255])
    expect(Array.from(px.slice(8, 12))).toEqual([255, 255, 255, 255])
    expect(minMax([3, -1, 2])).toEqual([-1, 3])
  })

  it('handles constant fields without dividing by zero', () => {
    expect(Array.from(toRgba([2, 2], 'sequential', 'light').slice(0, 3))).toEqual(sequential(0, 'light'))
    expect(Array.from(toRgba([0, 0], 'diverging', 'dark').slice(0, 3))).toEqual(diverging(0, 'dark'))
  })

  it('defines eight categorical slots per mode', () => {
    expect(CATEGORICAL.light).toHaveLength(8)
    expect(CATEGORICAL.dark).toHaveLength(8)
  })
})
