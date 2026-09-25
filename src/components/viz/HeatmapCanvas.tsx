import { useEffect, useRef } from 'react'
import { toRgba, type ScaleKind } from '@/lib/colormap'
import { cn } from '@/lib/utils'
import { useThemeMode } from '@/hooks/useThemeMode'

export interface HeatmapCanvasProps {
  values: ArrayLike<number>
  width: number
  height: number
  scale?: ScaleKind
  range?: [number, number]
  /** CSS pixel size of the rendered element (the canvas itself is width×height). */
  displayWidth?: number | string
  /** Optional explicit CSS height (stretches non-uniformly, useful for weight matrices). */
  displayHeight?: number | string
  className?: string
  label?: string
  onClick?: () => void
  selected?: boolean
}

/** Pixel-exact heatmap: one canvas pixel per value, scaled up with nearest-neighbour sampling. */
export function HeatmapCanvas({ values, width, height, scale = 'sequential', range, displayWidth = 96, displayHeight, className, label, onClick, selected }: HeatmapCanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null)
  const mode = useThemeMode()
  useEffect(() => {
    const c = ref.current
    const ctx = c?.getContext('2d')
    if (!c || !ctx || values.length < width * height) return
    const img = ctx.createImageData(width, height)
    img.data.set(toRgba(Array.prototype.slice.call(values, 0, width * height) as number[], scale, mode, range))
    ctx.putImageData(img, 0, 0)
  }, [values, width, height, scale, range, mode])
  const canvas = (
    <canvas
      ref={ref}
      width={width}
      height={height}
      role="img"
      aria-label={label}
      className={cn('pixelated block rounded-sm border border-border/60', selected && 'outline-2 outline-offset-1 outline-primary', className)}
      style={displayHeight !== undefined ? { width: displayWidth, height: displayHeight } : { width: displayWidth, aspectRatio: `${width} / ${height}` }}
    />
  )
  if (!onClick) return canvas
  return (
    <button onClick={onClick} className="rounded-sm" aria-label={label} aria-pressed={selected}>
      {canvas}
    </button>
  )
}
