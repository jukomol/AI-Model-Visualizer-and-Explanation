import * as THREE from 'three'
import { minMax, toRgba, type Mode, type ScaleKind } from '@/lib/colormap'
import type { LayerActivation } from '@/lib/tf/model'

/** Row-major H×W values → RGBA DataTexture (rows flipped so row 0 renders at the top). */
export function valuesToTexture(values: ArrayLike<number>, w: number, h: number, kind: ScaleKind, mode: Mode, range: [number, number]): THREE.DataTexture {
  const rgba = toRgba(values, kind, mode, range)
  const flipped = new Uint8Array(w * h * 4)
  for (let r = 0; r < h; r++) flipped.set(rgba.subarray((h - 1 - r) * w * 4, (h - r) * w * 4), r * w * 4)
  const tex = new THREE.DataTexture(flipped, w, h, THREE.RGBAFormat)
  tex.magFilter = THREE.NearestFilter
  tex.minFilter = THREE.NearestFilter
  tex.colorSpace = THREE.SRGBColorSpace
  tex.needsUpdate = true
  return tex
}

/** Extract channel c of a channels-last [H, W, C] tensor. */
export function channel(act: LayerActivation, c: number): Float32Array {
  const [h, w, C] = act.shape
  const out = new Float32Array(h * w)
  for (let i = 0; i < h * w; i++) out[i] = act.data[i * C + c]
  return out
}

export interface LayerScale {
  kind: ScaleKind
  range: [number, number]
}

/** Grayscale for the input image, diverging when values go negative, sequential otherwise. */
export function scaleFor(act: LayerActivation, isInput: boolean): LayerScale {
  const [lo, hi] = minMax(act.data)
  if (isInput) return { kind: 'grayscale', range: [0, 1] }
  if (lo < -1e-6) {
    const m = Math.max(Math.abs(lo), Math.abs(hi)) || 1
    return { kind: 'diverging', range: [-m, m] }
  }
  return { kind: 'sequential', range: [0, hi || 1] }
}
