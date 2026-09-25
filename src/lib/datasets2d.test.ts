import { describe, expect, it } from 'vitest'
import { generatePreset, spirals, type DatasetPreset } from './datasets2d'
import { trainPerceptron } from './perceptron'
import { createRng } from './random'

const presets: DatasetPreset[] = ['blobs', 'linear', 'xor', 'circles', 'moons', 'spiral']

describe('2-D dataset generators', () => {
  it.each(presets)('%s stays within [−1, 1]² with valid labels', (preset) => {
    const pts = generatePreset(preset, createRng(1))
    expect(pts.length).toBeGreaterThan(50)
    pts.forEach((p) => {
      expect(Math.abs(p.x)).toBeLessThanOrEqual(1)
      expect(Math.abs(p.y)).toBeLessThanOrEqual(1)
      expect(Number.isInteger(p.label)).toBe(true)
    })
  })

  it('is deterministic for a seed', () => {
    expect(generatePreset('moons', createRng(9))).toEqual(generatePreset('moons', createRng(9)))
  })

  it('the linear preset (low noise) is separable by a perceptron; XOR is not', () => {
    const toRun = (preset: DatasetPreset) => {
      const pts = generatePreset(preset, createRng(2), 0)
      return trainPerceptron(
        pts.map((p) => [p.x, p.y]),
        pts.map((p) => (p.label === 0 ? -1 : 1)),
        300,
      )
    }
    expect(toRun('linear').convergedAtEpoch).not.toBeNull()
    expect(toRun('xor').convergedAtEpoch).toBeNull()
  })

  it('spiral arms are rotations of each other', () => {
    const pts = spirals(50, 0, createRng(1))
    const a = pts.filter((p) => p.label === 0)
    const b = pts.filter((p) => p.label === 1)
    a.forEach((p, i) => {
      expect(b[i].x).toBeCloseTo(-p.x, 10)
      expect(b[i].y).toBeCloseTo(-p.y, 10)
    })
  })
})
