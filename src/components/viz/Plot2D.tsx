import { useEffect, useMemo, useRef, type ReactNode } from 'react'
import { CLASS_COLORS, CLASS_SHAPES, type ClassShape } from '@/lib/colormap'
import { cn } from '@/lib/utils'
import { useElementSize } from '@/hooks/useElementSize'
import { useThemeMode } from '@/hooks/useThemeMode'

export interface Domain {
  xMin: number
  xMax: number
  yMin: number
  yMax: number
}

export interface PlotScales {
  width: number
  height: number
  /** Data → pixel. */
  sx: (x: number) => number
  sy: (y: number) => number
  /** Pixel → data. */
  ix: (px: number) => number
  iy: (py: number) => number
}

export interface Plot2DProps {
  domain: Domain
  /** Height as a fraction of width. */
  aspect?: number
  maxHeight?: number
  children?: (s: PlotScales) => ReactNode
  /** Optional per-pixel background (e.g. a decision boundary), drawn under the SVG. */
  background?: (ctx: CanvasRenderingContext2D, s: PlotScales) => void
  backgroundKey?: unknown
  onPointerDown?: (data: [number, number], e: React.PointerEvent<SVGSVGElement>) => void
  onPointerMove?: (data: [number, number], e: React.PointerEvent<SVGSVGElement>) => void
  onPointerUp?: () => void
  className?: string
  ariaLabel: string
  gridStep?: number
  showAxes?: boolean
}

/** A responsive 2-D coordinate system: canvas background layer + SVG mark layer. */
export function Plot2D({
  domain,
  aspect = 1,
  maxHeight = 520,
  children,
  background,
  backgroundKey,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  className,
  ariaLabel,
  gridStep,
  showAxes = true,
}: Plot2DProps) {
  const [ref, size] = useElementSize()
  const width = size.width
  const height = Math.min(maxHeight, width * aspect)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const scales = useMemo<PlotScales>(() => {
    const w = Math.max(1, width)
    const h = Math.max(1, height)
    return {
      width: w,
      height: h,
      sx: (x) => ((x - domain.xMin) / (domain.xMax - domain.xMin)) * w,
      sy: (y) => h - ((y - domain.yMin) / (domain.yMax - domain.yMin)) * h,
      ix: (px) => domain.xMin + (px / w) * (domain.xMax - domain.xMin),
      iy: (py) => domain.yMin + ((h - py) / h) * (domain.yMax - domain.yMin),
    }
  }, [width, height, domain.xMin, domain.xMax, domain.yMin, domain.yMax])

  useEffect(() => {
    const c = canvasRef.current
    const ctx = c?.getContext('2d')
    if (!c || !ctx || !background || width === 0) return
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    c.width = Math.round(scales.width * dpr)
    c.height = Math.round(scales.height * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, scales.width, scales.height)
    background(ctx, scales)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scales, backgroundKey])

  const ticks = useMemo(() => {
    const step = gridStep ?? niceStep(domain.xMax - domain.xMin)
    const xs: number[] = []
    const ys: number[] = []
    for (let v = Math.ceil(domain.xMin / step) * step; v <= domain.xMax + 1e-9; v += step) xs.push(Number(v.toFixed(6)))
    for (let v = Math.ceil(domain.yMin / step) * step; v <= domain.yMax + 1e-9; v += step) ys.push(Number(v.toFixed(6)))
    return { xs, ys }
  }, [domain, gridStep])

  const toData = (e: React.PointerEvent<SVGSVGElement>): [number, number] => {
    const r = e.currentTarget.getBoundingClientRect()
    return [scales.ix(e.clientX - r.left), scales.iy(e.clientY - r.top)]
  }

  return (
    <div ref={ref} className={cn('relative w-full', className)} style={{ height: height || undefined }}>
      {width > 0 && (
        <>
          <div className="absolute inset-0 rounded-lg bg-viz-surface" />
          {background && <canvas ref={canvasRef} className="absolute inset-0 rounded-lg" style={{ width: scales.width, height: scales.height }} />}
          <svg
            role="img"
            aria-label={ariaLabel}
            width={scales.width}
            height={scales.height}
            className="absolute inset-0 touch-none overflow-visible rounded-lg"
            onPointerDown={onPointerDown ? (e) => onPointerDown(toData(e), e) : undefined}
            onPointerMove={onPointerMove ? (e) => onPointerMove(toData(e), e) : undefined}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
          >
            {showAxes && (
              <g aria-hidden>
                {ticks.xs.map((x) => (
                  <line key={`x${x}`} x1={scales.sx(x)} x2={scales.sx(x)} y1={0} y2={scales.height} className={x === 0 ? 'stroke-viz-axis' : 'stroke-viz-grid'} strokeWidth={1} />
                ))}
                {ticks.ys.map((y) => (
                  <line key={`y${y}`} y1={scales.sy(y)} y2={scales.sy(y)} x1={0} x2={scales.width} className={y === 0 ? 'stroke-viz-axis' : 'stroke-viz-grid'} strokeWidth={1} />
                ))}
                {ticks.xs.map((x) => (
                  <text key={`tx${x}`} x={scales.sx(x) + 3} y={scales.height - 4} className="fill-muted-foreground text-[10px] tabular">
                    {x}
                  </text>
                ))}
                {ticks.ys.map((y) => (
                  <text key={`ty${y}`} x={4} y={scales.sy(y) - 3} className="fill-muted-foreground text-[10px] tabular">
                    {y}
                  </text>
                ))}
              </g>
            )}
            {children?.(scales)}
          </svg>
        </>
      )}
    </div>
  )
}

function niceStep(span: number): number {
  const raw = span / 6
  const p = 10 ** Math.floor(Math.log10(raw))
  const m = raw / p
  return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * p
}

/** Class marker: colour + shape so identity never depends on colour alone. */
export function ClassMarker({ x, y, cls, r = 4.5, faded, ring = true }: { x: number; y: number; cls: number; r?: number; faded?: boolean; ring?: boolean }) {
  const mode = useThemeMode()
  const color = CLASS_COLORS[mode][cls % CLASS_COLORS[mode].length]
  const shape: ClassShape = CLASS_SHAPES[cls % CLASS_SHAPES.length]
  const common = {
    fill: color,
    stroke: ring ? 'var(--viz-surface)' : 'none',
    strokeWidth: ring ? 2 : 0,
    opacity: faded ? 0.35 : 1,
    paintOrder: 'stroke' as const,
  }
  if (shape === 'square') return <rect x={x - r} y={y - r} width={2 * r} height={2 * r} rx={1} {...common} />
  if (shape === 'triangle') {
    const h = r * 1.25
    return <polygon points={`${x},${y - h} ${x + h},${y + h * 0.8} ${x - h},${y + h * 0.8}`} {...common} />
  }
  if (shape === 'diamond') {
    const h = r * 1.25
    return <polygon points={`${x},${y - h} ${x + h},${y} ${x},${y + h} ${x - h},${y}`} {...common} />
  }
  return <circle cx={x} cy={y} r={r} {...common} />
}

export function ClassLegend({ labels }: { labels: readonly string[] }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
      {labels.map((l, i) => (
        <span key={l} className="inline-flex items-center gap-1.5">
          <svg width={12} height={12} aria-hidden>
            <ClassMarker x={6} y={6} cls={i} r={4} ring={false} />
          </svg>
          {l}
        </span>
      ))}
    </div>
  )
}
