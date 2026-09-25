import { Eraser, Pencil } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { SAMPLE_IMAGES } from '@/lib/sampleImages'
import { CLASS_COLORS } from '@/lib/colormap'
import { cn, pct } from '@/lib/utils'
import { useCanvasDraw } from '@/hooks/useCanvasDraw'
import { useThemeMode } from '@/hooks/useThemeMode'

function Thumb({ image, size = 28 }: { image: Float32Array; size?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const ctx = ref.current?.getContext('2d')
    if (!ctx) return
    const img = ctx.createImageData(size, size)
    image.forEach((v, i) => {
      const g = Math.round(255 * v)
      img.data.set([g, g, g, 255], i * 4)
    })
    ctx.putImageData(img, 0, 0)
  }, [image, size])
  return <canvas ref={ref} width={size} height={size} className="pixelated block size-full rounded" />
}

export interface InputPanelProps {
  selectedSample: string | null
  onSelectSample: (id: string, image: Float32Array) => void
  onDraw: (image: Float32Array) => void
  probabilities: Float32Array | null
  classes: string[]
}

export function InputPanel({ selectedSample, onSelectSample, onDraw, probabilities, classes }: InputPanelProps) {
  const [drawMode, setDrawMode] = useState(false)
  const mode = useThemeMode()
  const { canvasRef, clear, handlers } = useCanvasDraw({ gridSize: 28, brushRadius: 1.6, onChange: onDraw })
  const truth = SAMPLE_IMAGES.find((s) => s.id === selectedSample)?.label
  const predicted = probabilities ? Array.from(probabilities).indexOf(Math.max(...probabilities)) : -1
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold">Input image</h4>
        <Button size="sm" variant={drawMode ? 'default' : 'outline'} onClick={() => setDrawMode((d) => !d)} aria-pressed={drawMode}>
          <Pencil /> {drawMode ? 'Drawing' : 'Draw your own'}
        </Button>
      </div>
      {drawMode ? (
        <div className="flex items-start gap-3">
          <canvas
            ref={canvasRef}
            width={28}
            height={28}
            {...handlers}
            className="pixelated size-40 touch-none rounded-lg border bg-black"
            aria-label="Drawing pad: drag to draw, shift-drag or right-drag to erase"
          />
          <div className="space-y-2 text-xs text-muted-foreground">
            <p>Draw a circle, square, triangle or cross. Every stroke re-runs the whole network.</p>
            <p>Hold Shift (or right-drag) to erase.</p>
            <Button size="sm" variant="outline" onClick={clear}>
              <Eraser /> Clear
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-8 gap-1.5" role="radiogroup" aria-label="Sample images">
          {SAMPLE_IMAGES.map((s) => (
            <button
              key={s.id}
              role="radio"
              aria-checked={selectedSample === s.id}
              aria-label={`${classes[s.label]} sample`}
              onClick={() => onSelectSample(s.id, s.image)}
              className={cn('aspect-square rounded-md border-2 p-0.5', selectedSample === s.id ? 'border-primary' : 'border-transparent hover:border-border')}
            >
              <Thumb image={s.image} />
            </button>
          ))}
        </div>
      )}
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">
          Softmax output
          {truth !== undefined && !drawMode && (
            <>
              {' '}
              · true class <span className="font-medium text-foreground">{classes[truth]}</span>
            </>
          )}
        </p>
        {classes.map((c, i) => {
          const p = probabilities?.[i] ?? 0
          return (
            <div key={c} className="flex items-center gap-2 text-xs">
              <span className={cn('w-16 font-mono', predicted === i && 'font-semibold text-foreground')}>{c}</span>
              <span className="h-3 flex-1 overflow-hidden rounded-sm bg-muted">
                <span className="block h-full rounded-sm transition-[width] duration-300" style={{ width: `${p * 100}%`, background: CLASS_COLORS[mode][i] }} />
              </span>
              <span className="tabular w-12 text-right font-mono">{probabilities ? pct(p) : '—'}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
