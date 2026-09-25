import type { Domain, PlotScales } from './Plot2D'

export type RGBA = [number, number, number, number]

/**
 * Evaluate `color(x, y)` on a res×res grid over the domain and draw it
 * scaled to the plot with smoothing — a seam-free background field.
 */
export function paintField(ctx: CanvasRenderingContext2D, s: PlotScales, domain: Domain, res: number, color: (x: number, y: number) => RGBA | null) {
  const img = ctx.createImageData(res, res)
  for (let r = 0; r < res; r++) {
    const y = domain.yMax - ((r + 0.5) / res) * (domain.yMax - domain.yMin)
    for (let c = 0; c < res; c++) {
      const x = domain.xMin + ((c + 0.5) / res) * (domain.xMax - domain.xMin)
      const rgba = color(x, y)
      if (rgba) img.data.set(rgba, (r * res + c) * 4)
    }
  }
  const off = document.createElement('canvas')
  off.width = res
  off.height = res
  off.getContext('2d')!.putImageData(img, 0, 0)
  ctx.imageSmoothingEnabled = true
  ctx.drawImage(off, 0, 0, s.width, s.height)
}

export function hexToRgb(h: string): [number, number, number] {
  const n = parseInt(h.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
