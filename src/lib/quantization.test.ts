import { describe, expect, it } from 'vitest'
import { calibrateRange, memoryBytes, quantParams, quantize, sampleLayerWeights, sqnrDb } from './quantization'
import { createRng } from './random'

describe('affine INT8 quantisation', () => {
  const values = [-1.5, -0.2, 0, 0.3, 2.5]

  it('maps the calibrated range onto [−128, 127] and represents zero exactly', () => {
    const p = quantParams([-1.5, 2.5], 8, false)
    expect(p.qmin).toBe(-128)
    expect(p.qmax).toBe(127)
    expect(p.scale).toBeCloseTo(4 / 255, 12)
    const r = quantize(values, p)
    expect(r.dequantized[2]).toBe(0)
    expect(r.q[0]).toBe(-128)
    expect(r.q[4]).toBe(127)
  })

  it('rounding error is at most half a step inside the range', () => {
    const p = quantParams([-1.5, 2.5], 8, false)
    const r = quantize(values, p)
    values.forEach((v, i) => expect(Math.abs(v - r.dequantized[i])).toBeLessThanOrEqual(p.scale / 2 + 1e-7))
  })

  it('symmetric mode uses zero-point 0 and a restricted range', () => {
    const p = quantParams([-0.5, 2], 8, true)
    expect(p.zeroPoint).toBe(0)
    expect(p.qmin).toBe(-127)
    expect(p.scale).toBeCloseTo(2 / 127, 12)
  })

  it('clips values outside the range and counts them', () => {
    const r = quantize([-5, 0, 5], quantParams([-1, 1], 8, true))
    expect(r.clippedCount).toBe(2)
    expect(r.dequantized[0]).toBeCloseTo(-1, 6)
  })
})

describe('calibration and error metrics', () => {
  const w = sampleLayerWeights(20000, createRng(3))

  it('each extra bit adds ≈ 6 dB of SQNR', () => {
    const range = calibrateRange(w, 'minmax')
    const s6 = sqnrDb(w, quantize(w, quantParams(range, 6, true)).dequantized)
    const s8 = sqnrDb(w, quantize(w, quantParams(range, 8, true)).dequantized)
    expect(s8 - s6).toBeGreaterThan(10)
    expect(s8 - s6).toBeLessThan(14)
  })

  it('percentile clipping beats min/max at 4 bits when outliers are present', () => {
    const mm = sqnrDb(w, quantize(w, quantParams(calibrateRange(w, 'minmax'), 4, true)).dequantized)
    const pc = sqnrDb(w, quantize(w, quantParams(calibrateRange(w, 'percentile', 99.9), 4, true)).dequantized)
    expect(pc).toBeGreaterThan(mm)
  })

  it('computes memory footprint', () => {
    expect(memoryBytes(1000, 32)).toBe(4000)
    expect(memoryBytes(1000, 8)).toBe(1000)
    expect(memoryBytes(3, 4)).toBe(2)
  })
})
