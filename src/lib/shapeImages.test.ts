import { describe, expect, it } from 'vitest'
import { createRng } from './random'
import { SHAPE_CLASSES, generateShapeDataset, renderShape, shapeSdf, type ShapeParams } from './shapeImages'

const centred: ShapeParams = { cx: 0, cy: 0, radius: 0.5, rotation: 0, filled: true, thickness: 0.1, noise: 0 }

describe('shape SDFs', () => {
  it('are negative inside and positive outside', () => {
    for (const cls of SHAPE_CLASSES) {
      const sdf = shapeSdf(cls, centred)
      expect(sdf(0, 0)).toBeLessThan(0)
      expect(sdf(0.95, 0.95)).toBeGreaterThan(0)
    }
  })

  it('circle SDF is exact', () => {
    const sdf = shapeSdf('circle', centred)
    expect(sdf(0.8, 0)).toBeCloseTo(0.3, 12)
  })
})

describe('renderShape', () => {
  it('produces a size×size image in [0, 1]', () => {
    const img = renderShape('triangle', centred, 28)
    expect(img).toHaveLength(784)
    img.forEach((v) => {
      expect(v).toBeGreaterThanOrEqual(0)
      expect(v).toBeLessThanOrEqual(1)
    })
  })

  it('filled shapes cover more pixels than outlines', () => {
    const sum = (a: Float32Array) => a.reduce((s, v) => s + v, 0)
    const filled = sum(renderShape('square', centred))
    const outline = sum(renderShape('square', { ...centred, filled: false }))
    expect(filled).toBeGreaterThan(outline)
  })

  it('a filled circle covers ≈ πr² of the image', () => {
    const img = renderShape('circle', centred, 64)
    const frac = img.reduce((s, v) => s + v, 0) / img.length
    expect(frac).toBeCloseTo((Math.PI * 0.25) / 4, 2)
  })

  it('different classes render different images', () => {
    const a = renderShape('circle', centred)
    const b = renderShape('cross', centred)
    let diff = 0
    a.forEach((v, i) => (diff += Math.abs(v - b[i])))
    expect(diff).toBeGreaterThan(50)
  })
})

describe('generateShapeDataset', () => {
  it('is class balanced and deterministic', () => {
    const d = generateShapeDataset(200, createRng(1))
    expect(d.images).toHaveLength(200 * 784)
    const counts = [0, 0, 0, 0]
    d.labels.forEach((l) => counts[l]++)
    expect(counts).toEqual([50, 50, 50, 50])
    const again = generateShapeDataset(200, createRng(1))
    expect(Array.from(again.labels)).toEqual(Array.from(d.labels))
  })
})
