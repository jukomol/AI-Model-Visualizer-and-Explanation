import { diverging, inkOn, rgbString, sequential, type RGB } from '@/lib/colormap'
import { cn } from '@/lib/utils'
import { useThemeMode } from '@/hooks/useThemeMode'

export interface MatrixGridProps {
  values: number[][]
  scale: 'grayscale' | 'sequential' | 'diverging'
  /** Absolute value mapped to the ends of the scale (defaults to the data range). */
  range?: [number, number]
  cell?: number
  digits?: number
  showValues?: boolean
  /** Rectangle [row, col, height, width] drawn as the active window. */
  highlight?: [number, number, number, number] | null
  /** Individual cells to ring (e.g. the arg-max of a pooling window). */
  marked?: Array<[number, number]>
  /** Cells that are not yet computed (drawn empty). */
  pending?: (r: number, c: number) => boolean
  onCellClick?: (r: number, c: number) => void
  label: string
  /** Rows/cols of zero padding drawn as dashed-free muted cells around the matrix. */
  padding?: number
}

function colorFor(v: number, scale: MatrixGridProps['scale'], range: [number, number], mode: 'light' | 'dark'): RGB {
  if (scale === 'diverging') return diverging(v / (Math.max(Math.abs(range[0]), Math.abs(range[1])) || 1), mode)
  const t = (v - range[0]) / (range[1] - range[0] || 1)
  if (scale === 'grayscale') {
    const g = Math.round(255 * Math.min(1, Math.max(0, t)))
    return [g, g, g]
  }
  return sequential(t, mode)
}

/** A matrix of coloured, optionally labelled cells for step-by-step tensor walkthroughs. */
export function MatrixGrid({ values, scale, range, cell = 30, digits = 1, showValues = true, highlight, marked, pending, onCellClick, label, padding = 0 }: MatrixGridProps) {
  const mode = useThemeMode()
  const flat = values.flat()
  const r = range ?? [Math.min(...flat), Math.max(...flat)]
  const rows = values.length + 2 * padding
  const cols = (values[0]?.length ?? 0) + 2 * padding
  return (
    <svg width={cols * cell} height={rows * cell} viewBox={`0 0 ${cols * cell} ${rows * cell}`} role="img" aria-label={label} className="max-w-full">
      {Array.from({ length: rows }, (_, i) =>
        Array.from({ length: cols }, (_, j) => {
          const vi = i - padding
          const vj = j - padding
          const inside = vi >= 0 && vj >= 0 && vi < values.length && vj < values[0].length
          const isPending = inside && pending?.(vi, vj)
          const v = inside ? values[vi][vj] : 0
          const c = inside && !isPending ? colorFor(v, scale, r, mode) : null
          return (
            <g key={`${i}-${j}`} onClick={inside && onCellClick ? () => onCellClick(vi, vj) : undefined} className={cn(inside && onCellClick && 'cursor-pointer')}>
              <rect x={j * cell + 1} y={i * cell + 1} width={cell - 2} height={cell - 2} rx={3} fill={c ? rgbString(c) : 'transparent'} className={c ? undefined : 'stroke-border'} strokeWidth={c ? 0 : 1} />
              {showValues && c && (
                <text x={j * cell + cell / 2} y={i * cell + cell / 2 + 4} textAnchor="middle" fontSize={Math.min(12, cell * 0.36)} fill={inkOn(c)} className="font-mono">
                  {Number.isInteger(v) ? v : v.toFixed(digits)}
                </text>
              )}
              {showValues && !inside && (
                <text x={j * cell + cell / 2} y={i * cell + cell / 2 + 4} textAnchor="middle" fontSize={Math.min(11, cell * 0.34)} className="fill-muted-foreground font-mono">
                  0
                </text>
              )}
            </g>
          )
        }),
      )}
      {marked?.map(([mr, mc]) => (
        <rect key={`m${mr}-${mc}`} x={(mc + padding) * cell + 2} y={(mr + padding) * cell + 2} width={cell - 4} height={cell - 4} rx={3} fill="none" className="stroke-success" strokeWidth={2.5} />
      ))}
      {highlight && (
        <rect
          x={(highlight[1] + padding) * cell}
          y={(highlight[0] + padding) * cell}
          width={highlight[3] * cell}
          height={highlight[2] * cell}
          rx={4}
          fill="none"
          className="stroke-primary"
          strokeWidth={3}
        />
      )}
    </svg>
  )
}
