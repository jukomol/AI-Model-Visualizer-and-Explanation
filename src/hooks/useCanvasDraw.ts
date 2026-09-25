import { useCallback, useEffect, useRef } from 'react'

export interface CanvasDrawOptions {
  /** Logical grid resolution (e.g. 28 for a 28×28 image). */
  gridSize: number
  brushRadius: number
  /** Called with the updated row-major intensity grid after every stroke segment. */
  onChange: (grid: Float32Array) => void
  initial?: Float32Array
}

/**
 * Pointer-driven painting onto a low-resolution intensity grid (used for the
 * CNN input pad). Brush strokes are anti-aliased with a soft radial falloff.
 */
export function useCanvasDraw({ gridSize, brushRadius, onChange, initial }: CanvasDrawOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const grid = useRef(new Float32Array(gridSize * gridSize))
  const drawing = useRef(false)
  const erase = useRef(false)
  const last = useRef<[number, number] | null>(null)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  const paint = useCallback(() => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return
    const img = ctx.createImageData(gridSize, gridSize)
    grid.current.forEach((v, i) => {
      const g = Math.round(255 * v)
      img.data[i * 4] = g
      img.data[i * 4 + 1] = g
      img.data[i * 4 + 2] = g
      img.data[i * 4 + 3] = 255
    })
    ctx.putImageData(img, 0, 0)
  }, [gridSize])

  useEffect(() => {
    if (initial && initial.length === gridSize * gridSize) {
      grid.current = new Float32Array(initial)
      paint()
    }
  }, [initial, gridSize, paint])

  const stamp = useCallback(
    (gx: number, gy: number) => {
      const r = brushRadius
      for (let y = Math.floor(gy - r - 1); y <= Math.ceil(gy + r + 1); y++) {
        for (let x = Math.floor(gx - r - 1); x <= Math.ceil(gx + r + 1); x++) {
          if (x < 0 || y < 0 || x >= gridSize || y >= gridSize) continue
          const d = Math.hypot(x + 0.5 - gx, y + 0.5 - gy)
          const a = Math.min(1, Math.max(0, r + 0.5 - d))
          const i = y * gridSize + x
          grid.current[i] = erase.current ? Math.max(0, grid.current[i] - a) : Math.max(grid.current[i], a)
        }
      }
    },
    [brushRadius, gridSize],
  )

  const toGrid = (e: React.PointerEvent<HTMLCanvasElement>): [number, number] => {
    const rect = e.currentTarget.getBoundingClientRect()
    return [((e.clientX - rect.left) / rect.width) * gridSize, ((e.clientY - rect.top) / rect.height) * gridSize]
  }

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    drawing.current = true
    erase.current = e.button === 2 || e.shiftKey
    const p = toGrid(e)
    last.current = p
    stamp(p[0], p[1])
    paint()
    onChangeRef.current(new Float32Array(grid.current))
  }

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return
    const p = toGrid(e)
    const prev = last.current ?? p
    const steps = Math.max(1, Math.ceil(Math.hypot(p[0] - prev[0], p[1] - prev[1]) / 0.35))
    for (let s = 1; s <= steps; s++) stamp(prev[0] + ((p[0] - prev[0]) * s) / steps, prev[1] + ((p[1] - prev[1]) * s) / steps)
    last.current = p
    paint()
    onChangeRef.current(new Float32Array(grid.current))
  }

  const onPointerUp = () => {
    drawing.current = false
    last.current = null
  }

  const clear = useCallback(() => {
    grid.current = new Float32Array(gridSize * gridSize)
    paint()
    onChangeRef.current(new Float32Array(grid.current))
  }, [gridSize, paint])

  return {
    canvasRef,
    clear,
    handlers: { onPointerDown, onPointerMove, onPointerUp, onPointerLeave: onPointerUp, onContextMenu: (e: React.MouseEvent) => e.preventDefault() },
  }
}
