import { useEffect, useMemo, useState } from 'react'
import { NativeSelect } from '@/components/ui/select'
import { ControlGroup, PlayControls, Segmented, ToggleRow } from '@/components/viz/Controls'
import { MatrixGrid } from '@/components/viz/MatrixGrid'
import { VizFrame } from '@/components/viz/VizFrame'
import { KERNELS, conv2d, pool2d, relu } from '@/lib/convolution'
import { PATTERNS } from '@/lib/patterns'
import { usePlayback } from '@/hooks/usePlayback'

export default function PoolingViz() {
  const [patternId, setPatternId] = useState('seven')
  const [mode, setMode] = useState<'max' | 'avg'>('max')
  const [size, setSize] = useState(2)
  const [showGrad, setShowGrad] = useState(false)
  // A real feature map: ReLU(Laplacian ∗ image), padded "same" so it stays 8×8.
  const fmap = useMemo(() => relu(conv2d(PATTERNS[patternId].grid, KERNELS.laplacian.kernel, { padding: 'same' })), [patternId])
  const { output, argmax } = useMemo(() => pool2d(fmap, size, size, mode), [fmap, size, mode])
  const outH = output.length
  const outW = output[0].length
  const { frame, running, toggle, reset, setFrame } = usePlayback(outH * outW, 3)
  useEffect(() => reset(), [fmap, size, mode, reset])
  const r = Math.floor(frame / outW)
  const c = frame % outW
  const hi = Math.max(...fmap.flat(), 1)
  const winners = showGrad && mode === 'max' ? argmax.flat() : [argmax[r][c]]
  return (
    <VizFrame
      title="Pooling: summarise each window"
      description="The input is a real feature map: the ReLU of a Laplacian edge filter applied to the image. Each P×P window becomes one number, its maximum or its average. With max pooling, back-propagation sends the gradient only to the winning (ringed) cell."
      controls={
        <>
          <ControlGroup title="Input">
            <NativeSelect aria-label="Source image" value={patternId} onChange={(e) => setPatternId(e.target.value)}>
              {Object.entries(PATTERNS).map(([id, p]) => (
                <option key={id} value={id}>
                  {p.name}
                </option>
              ))}
            </NativeSelect>
          </ControlGroup>
          <ControlGroup title="Pooling">
            <Segmented
              label="Operation"
              value={mode}
              onChange={setMode}
              options={[
                { value: 'max', label: 'Max' },
                { value: 'avg', label: 'Average' },
              ]}
            />
            <Segmented
              label="Window = stride"
              value={String(size)}
              onChange={(v) => setSize(Number(v))}
              options={[
                { value: '2', label: '2×2' },
                { value: '3', label: '3×3' },
                { value: '4', label: '4×4' },
              ]}
            />
            <ToggleRow label="Show all gradient routes" checked={showGrad} onChange={setShowGrad} hint="Max pooling only: rings every cell that receives a gradient." />
            <PlayControls running={running} onToggle={toggle} onStep={() => setFrame(frame + 1)} onReset={reset} playLabel="Slide" />
          </ControlGroup>
        </>
      }
    >
      <div className="flex flex-wrap items-start gap-8">
        <figure className="space-y-1">
          <figcaption className="text-xs font-medium text-muted-foreground">Feature map 8×8</figcaption>
          <MatrixGrid values={fmap} scale="sequential" range={[0, hi]} cell={34} highlight={[r * size, c * size, size, size]} marked={mode === 'max' ? winners : []} label="Input feature map with the pooling window" />
        </figure>
        <figure className="space-y-1">
          <figcaption className="text-xs font-medium text-muted-foreground">
            {mode === 'max' ? 'Max' : 'Average'}-pooled {outH}×{outW}
          </figcaption>
          <MatrixGrid
            values={output}
            scale="sequential"
            range={[0, hi]}
            cell={44}
            highlight={[r, c, 1, 1]}
            pending={(i, j) => i * outW + j > frame}
            onCellClick={(i, j) => setFrame(i * outW + j)}
            label="Pooled output"
          />
          <p className="max-w-[16rem] pt-2 text-xs text-muted-foreground">
            {size}×{size} pooling cuts the spatial size by {size}× per axis ({64 / (outH * outW) >= 1 ? `${(64 / (outH * outW)).toFixed(0)}×` : ''} fewer values) and has no weights to learn.
            {size === 3 && ' 8 is not divisible by 3, so the last row and column are dropped (valid pooling).'}
          </p>
        </figure>
      </div>
    </VizFrame>
  )
}
