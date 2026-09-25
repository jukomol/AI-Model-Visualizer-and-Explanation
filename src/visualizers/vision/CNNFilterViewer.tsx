import { useEffect, useMemo, useState } from 'react'
import { NativeSelect } from '@/components/ui/select'
import { ControlGroup, PlayControls, Segmented } from '@/components/viz/Controls'
import { MatrixGrid } from '@/components/viz/MatrixGrid'
import { VizFrame } from '@/components/viz/VizFrame'
import { Tex } from '@/components/math/Tex'
import { KERNELS, conv2d, convOutputSize, convWindow, resolvePadding } from '@/lib/convolution'
import { PATTERNS } from '@/lib/patterns'
import { fmt } from '@/lib/utils'
import { usePlayback } from '@/hooks/usePlayback'

function fmtK(v: number): string {
  return Math.abs(v - Math.round(v)) < 1e-9 ? String(Math.round(v)) : v.toFixed(3)
}

export default function CNNFilterViewer() {
  const [patternId, setPatternId] = useState('seven')
  const [kernelId, setKernelId] = useState('sobelX')
  const [kernel, setKernel] = useState(KERNELS.sobelX.kernel.map((r) => r.slice()))
  const [stride, setStride] = useState(1)
  const [padding, setPadding] = useState<'valid' | 'same'>('valid')
  const input = PATTERNS[patternId].grid
  const pad = resolvePadding(padding, 3)
  const outH = convOutputSize(input.length, 3, stride, pad)
  const outW = convOutputSize(input[0].length, 3, stride, pad)
  const output = useMemo(() => conv2d(input, kernel, { stride, padding }), [input, kernel, stride, padding])
  const total = outH * outW
  const { frame, running, toggle, reset, setFrame, toEnd } = usePlayback(total, 4)
  useEffect(() => reset(), [patternId, kernel, stride, padding, reset])
  const row = Math.floor(frame / outW)
  const col = frame % outW
  const win = convWindow(input, kernel, row, col, { stride, padding })
  const range = Math.max(...output.flat().map(Math.abs), 1)

  const selectKernel = (id: string) => {
    setKernelId(id)
    setKernel(KERNELS[id].kernel.map((r) => r.slice()))
  }

  const terms = win.patch.flatMap((r, u) => r.map((x, v) => `${fmtK(kernel[u][v])}\\cdot${x}`))
  return (
    <VizFrame
      title="Convolution, one dot product at a time"
      description="The 3×3 kernel slides over the input. At every position it multiplies the 9 overlapping pixels by its 9 weights and sums them into one output value. Click any output cell to jump there, or edit the kernel weights."
      controls={
        <>
          <ControlGroup title="Input & kernel">
            <NativeSelect aria-label="Input image" value={patternId} onChange={(e) => setPatternId(e.target.value)}>
              {Object.entries(PATTERNS).map(([id, p]) => (
                <option key={id} value={id}>
                  {p.name}
                </option>
              ))}
            </NativeSelect>
            <NativeSelect aria-label="Kernel preset" value={kernelId} onChange={(e) => selectKernel(e.target.value)}>
              {Object.entries(KERNELS).map(([id, k]) => (
                <option key={id} value={id}>
                  {k.name}
                </option>
              ))}
              {kernelId === 'custom' && <option value="custom">Custom</option>}
            </NativeSelect>
            <p className="text-xs text-muted-foreground">{kernelId === 'custom' ? 'Your own kernel.' : KERNELS[kernelId].description}</p>
          </ControlGroup>
          <ControlGroup title="Geometry">
            <Segmented
              label="Stride"
              value={String(stride)}
              onChange={(v) => setStride(Number(v))}
              options={[
                { value: '1', label: '1' },
                { value: '2', label: '2' },
              ]}
            />
            <Segmented
              label="Padding"
              value={padding}
              onChange={setPadding}
              options={[
                { value: 'valid', label: 'valid (0)' },
                { value: 'same', label: 'same (1)' },
              ]}
            />
            <Tex math={`n_{\\text{out}} = \\lfloor (${input.length} + 2\\cdot${pad} - 3)/${stride} \\rfloor + 1 = ${outH}`} className="text-sm" />
            <PlayControls running={running} onToggle={toggle} onStep={() => setFrame(frame + 1)} onReset={reset} playLabel="Slide" />
            <button className="text-xs text-primary underline" onClick={toEnd}>
              Jump to the last position
            </button>
          </ControlGroup>
        </>
      }
    >
      <div className="space-y-5">
        <div className="flex flex-wrap items-start gap-6">
          <figure className="space-y-1">
            <figcaption className="text-xs font-medium text-muted-foreground">Input {input.length}×{input[0].length}{pad ? ' + zero padding' : ''}</figcaption>
            <MatrixGrid values={input} scale="grayscale" range={[0, 9]} cell={28} padding={pad} highlight={[win.inputRow, win.inputCol, 3, 3]} label="Input image with the current receptive field" />
          </figure>
          <figure className="space-y-1">
            <figcaption className="text-xs font-medium text-muted-foreground">Kernel K (editable)</figcaption>
            <div className="grid grid-cols-3 gap-1">
              {kernel.map((r, u) =>
                r.map((v, w) => (
                  <input
                    key={`${u}-${w}`}
                    type="number"
                    step={0.5}
                    value={Number(v.toFixed(3))}
                    onChange={(e) => {
                      const next = kernel.map((rr) => rr.slice())
                      next[u][w] = Number(e.target.value) || 0
                      setKernel(next)
                      setKernelId('custom')
                    }}
                    aria-label={`Kernel weight row ${u + 1} column ${w + 1}`}
                    className="h-9 w-16 rounded-md border bg-background px-1 text-center font-mono text-xs"
                  />
                )),
              )}
            </div>
          </figure>
          <figure className="space-y-1">
            <figcaption className="text-xs font-medium text-muted-foreground">
              Output {outH}×{outW} (diverging: blue &lt; 0 &lt; red)
            </figcaption>
            <MatrixGrid
              values={output}
              scale="diverging"
              range={[-range, range]}
              cell={outW > 6 ? 34 : 40}
              digits={1}
              highlight={[row, col, 1, 1]}
              pending={(r, c) => r * outW + c > frame}
              onCellClick={(r, c) => setFrame(r * outW + c)}
              label="Output feature map filling in as the kernel slides"
            />
          </figure>
        </div>
        <div className="rounded-lg border bg-muted/40 p-3">
          <p className="mb-1 text-xs font-medium text-muted-foreground">
            Output[{row}, {col}] = Σ K ⊙ patch
          </p>
          <Tex display math={`${terms.join(' + ').replace(/\+ -/g, '- ')} = ${fmtK(Number(fmt(win.sum, 4)))}`} className="text-sm" />
        </div>
      </div>
    </VizFrame>
  )
}
