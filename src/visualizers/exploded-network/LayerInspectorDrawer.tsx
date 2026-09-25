import { ChevronLeft, ChevronRight, Cpu, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tex } from '@/components/math/Tex'
import { HeatmapCanvas } from '@/components/viz/HeatmapCanvas'
import { CLASS_COLORS, maxAbs, minMax } from '@/lib/colormap'
import { LAYER_TYPES, type ViewLayer } from '@/lib/models'
import { formatShape, spatialOutput } from '@/lib/tensorShapes'
import type { LayerActivation, LayerWeights } from '@/lib/tf/model'
import { cn, pct } from '@/lib/utils'
import { useThemeMode } from '@/hooks/useThemeMode'
import { channel, scaleFor } from './textures'

export interface LayerInspectorProps {
  layer: ViewLayer
  layers: ViewLayer[]
  activation: LayerActivation | null
  weights?: LayerWeights
  totalParams: number
  classes: string[]
  backend?: string
  trainedEpochs: number
  onClose: () => void
  onNavigate: (index: number) => void
}

function Section({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn('space-y-2 border-t px-4 py-4', className)}>
      <h4 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{title}</h4>
      {children}
    </section>
  )
}

function ShapeDerivation({ layer }: { layer: ViewLayer }) {
  const l = layer.info?.layer
  if (!l) return null
  const n = layer.inputShape[0]
  if (l.type === 'conv2d') {
    const k = l.kernelSize
    const s = l.strides ?? 1
    const out = spatialOutput(n, k, s, l.padding ?? 'valid')
    const tex =
      (l.padding ?? 'valid') === 'same'
        ? `H_{\\text{out}} = \\left\\lceil \\tfrac{${n}}{${s}} \\right\\rceil = ${out}\\ \\ (\\text{same padding})`
        : `H_{\\text{out}} = \\left\\lfloor \\tfrac{${n} - ${k}}{${s}} \\right\\rfloor + 1 = ${out}`
    return (
      <>
        <Tex display math={tex} className="my-1 text-sm" />
        <p className="text-xs text-muted-foreground">
          {l.filters} filters produce {l.filters} output channels; each filter spans all {layer.inputShape[2]} input channel
          {layer.inputShape[2] === 1 ? '' : 's'}.
        </p>
      </>
    )
  }
  if (l.type === 'maxPooling2d' || l.type === 'averagePooling2d') {
    const p = l.poolSize
    const s = l.strides ?? p
    return (
      <>
        <Tex display math={`H_{\\text{out}} = \\left\\lfloor \\tfrac{${n} - ${p}}{${s}} \\right\\rfloor + 1 = ${spatialOutput(n, p, s, 'valid')}`} className="my-1 text-sm" />
        <p className="text-xs text-muted-foreground">Channels pass through unchanged; each is pooled independently.</p>
      </>
    )
  }
  if (l.type === 'flatten') {
    return <Tex display math={`${layer.inputShape.join(' \\times ')} = ${layer.outputShape[0]}`} className="my-1 text-sm" />
  }
  return null
}

function ConvKernels({ w, mode }: { w: NonNullable<LayerWeights['kernel']>; mode: 'light' | 'dark' }) {
  const [kh, kw, cin, cout] = w.shape
  const [cSel, setCSel] = useState(0)
  const range: [number, number] = useMemo(() => {
    const m = maxAbs(w.data)
    return [-m, m]
  }, [w.data])
  const kernels = useMemo(
    () =>
      Array.from({ length: Math.min(cout, 32) }, (_, k) => {
        const out = new Float32Array(kh * kw)
        for (let u = 0; u < kh; u++) for (let v = 0; v < kw; v++) out[u * kw + v] = w.data[((u * kw + v) * cin + cSel) * cout + k]
        return out
      }),
    [w.data, kh, kw, cin, cout, cSel],
  )
  void mode
  return (
    <div className="space-y-2">
      {cin > 1 && (
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          Input channel
          <input
            type="range"
            min={0}
            max={cin - 1}
            value={cSel}
            onChange={(e) => setCSel(Number(e.target.value))}
            className="flex-1 accent-[var(--primary)]"
            aria-label="Input channel of the kernels shown"
          />
          <span className="tabular w-6 font-mono">{cSel}</span>
        </label>
      )}
      <div className="grid grid-cols-8 gap-1.5">
        {kernels.map((k, i) => (
          <HeatmapCanvas key={i} values={k} width={kw} height={kh} scale="diverging" range={range} displayWidth="100%" label={`Filter ${i} kernel`} />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        {kh}×{kw} slice of each filter for input channel {cSel}. Blue marks negative weights, red positive, gray near zero (range ±{range[1].toFixed(3)}).
      </p>
    </div>
  )
}

function DenseWeights({ w, layer, layers }: { w: NonNullable<LayerWeights['kernel']>; layer: ViewLayer; layers: ViewLayer[] }) {
  const [nIn, nOut] = w.shape
  const prev = layers[layer.index - 1]
  const beforeFlatten = prev?.type === 'flatten' ? layers[prev.index - 1] : undefined
  const templates = beforeFlatten && beforeFlatten.type === 'input' && beforeFlatten.outputShape[2] === 1
  const m = maxAbs(w.data)
  const transposed = useMemo(() => {
    const out = new Float32Array(nIn * nOut)
    for (let i = 0; i < nIn; i++) for (let j = 0; j < nOut; j++) out[j * nIn + i] = w.data[i * nOut + j]
    return out
  }, [w.data, nIn, nOut])
  if (templates) {
    const [h, wd] = beforeFlatten.outputShape
    return (
      <div className="space-y-2">
        <div className="grid grid-cols-8 gap-1.5">
          {Array.from({ length: Math.min(nOut, 16) }, (_, j) => (
            <HeatmapCanvas key={j} values={transposed.subarray(j * nIn, (j + 1) * nIn)} width={wd} height={h} scale="diverging" range={[-m, m]} displayWidth="100%" label={`Unit ${j} weight template`} />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">Each unit’s {nIn} incoming weights reshaped to the {h}×{wd} image: the pattern that unit responds to.</p>
      </div>
    )
  }
  return (
    <div className="space-y-2">
      <HeatmapCanvas values={transposed} width={nIn} height={nOut} scale="diverging" range={[-m, m]} displayWidth="100%" displayHeight={Math.min(220, Math.max(48, nOut * 5))} label="Dense weight matrix" />
      <p className="text-xs text-muted-foreground">
        W<sup>⊤</sup> ∈ ℝ<sup>{nOut}×{nIn}</sup>: one row per output unit, one column per input. Diverging scale ±{m.toFixed(3)}.
      </p>
    </div>
  )
}

function FeatureMaps({ act, isInput }: { act: LayerActivation; isInput: boolean }) {
  const [h, w, c] = act.shape
  const s = scaleFor(act, isInput)
  return (
    <div className="space-y-2">
      <div className={cn('grid gap-1.5', c === 1 ? 'grid-cols-2' : 'grid-cols-4')}>
        {Array.from({ length: c }, (_, i) => (
          <figure key={i} className="space-y-0.5">
            <HeatmapCanvas values={channel(act, i)} width={w} height={h} scale={s.kind} range={s.range} displayWidth="100%" label={`Channel ${i} feature map`} />
            <figcaption className="text-center font-mono text-[10px] text-muted-foreground">ch {i}</figcaption>
          </figure>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        {isInput ? 'The current input image.' : `${c} channel${c === 1 ? '' : 's'} of ${h}×${w}. Shared colour scale ${s.range[0].toFixed(2)} … ${s.range[1].toFixed(2)}.`}
      </p>
    </div>
  )
}

function UnitBars({ act, classes, isSoftmax }: { act: LayerActivation; classes: string[]; isSoftmax: boolean }) {
  const mode = useThemeMode()
  const values = Array.from(act.data)
  if (values.length > 64) {
    const [lo, hi] = minMax(values)
    const s = lo < 0 ? 'diverging' : 'sequential'
    return (
      <div className="space-y-2">
        <HeatmapCanvas values={values} width={values.length} height={1} scale={s} displayWidth="100%" displayHeight={28} label="Unit activations" />
        <p className="text-xs text-muted-foreground">
          {values.length} values, range {lo.toFixed(2)} … {hi.toFixed(2)}.
        </p>
      </div>
    )
  }
  const m = maxAbs(values) || 1
  return (
    <ul className="space-y-1">
      {values.map((v, i) => (
        <li key={i} className="flex items-center gap-2 text-xs">
          <span className="w-16 shrink-0 truncate font-mono text-muted-foreground">{isSoftmax || values.length === classes.length ? classes[i] : `u${i}`}</span>
          <span className="relative h-3 flex-1 rounded-sm bg-muted">
            <span
              className="absolute top-0 h-3 rounded-sm"
              style={{
                left: v < 0 ? `${50 - (50 * -v) / m}%` : values.some((x) => x < 0) ? '50%' : 0,
                width: values.some((x) => x < 0) ? `${(50 * Math.abs(v)) / m}%` : `${(100 * v) / m}%`,
                background: isSoftmax ? CLASS_COLORS[mode][i % 4] : 'var(--primary)',
              }}
            />
          </span>
          <span className="tabular w-14 text-right font-mono">{isSoftmax ? pct(v) : v.toFixed(3)}</span>
        </li>
      ))}
    </ul>
  )
}

export function LayerInspectorDrawer(p: LayerInspectorProps) {
  const mode = useThemeMode()
  const info = LAYER_TYPES[p.layer.type]
  const params = p.layer.info?.params ?? 0
  const isVolume = p.layer.outputShape.length === 3
  return (
    <aside
      className="absolute inset-y-0 right-0 z-20 flex w-full max-w-[25rem] animate-slide-in-right flex-col border-l bg-card/95 shadow-2xl backdrop-blur"
      aria-label={`Layer inspector: ${p.layer.name}`}
    >
      <header className="flex items-start gap-2 px-4 py-3">
        <div className="min-w-0 flex-1">
          <Badge variant="secondary">{info.label}</Badge>
          <h3 className="mt-1 truncate text-base font-semibold">{p.layer.name}</h3>
          <p className="font-mono text-xs text-muted-foreground">
            {formatShape(p.layer.inputShape)} → {formatShape(p.layer.outputShape)}
          </p>
        </div>
        <Button size="icon" variant="ghost" disabled={p.layer.index === 0} onClick={() => p.onNavigate(p.layer.index - 1)} aria-label="Previous layer">
          <ChevronLeft />
        </Button>
        <Button size="icon" variant="ghost" disabled={p.layer.index === p.layers.length - 1} onClick={() => p.onNavigate(p.layer.index + 1)} aria-label="Next layer">
          <ChevronRight />
        </Button>
        <Button size="icon" variant="ghost" onClick={p.onClose} aria-label="Close inspector">
          <X />
        </Button>
      </header>
      <div className="flex-1 overflow-y-auto text-sm">
        <Section title="Functional purpose" className="border-t-0 pt-0">
          <p>{info.purpose}</p>
          <p className="text-muted-foreground">{info.details}</p>
        </Section>
        <Section title="Tensor dimensions">
          <div className="flex items-center gap-2 font-mono text-sm">
            <span className="rounded bg-muted px-2 py-1">{formatShape(p.layer.inputShape)}</span>
            <span aria-hidden>→</span>
            <span className="rounded bg-primary/15 px-2 py-1 font-semibold">{formatShape(p.layer.outputShape)}</span>
          </div>
          <ShapeDerivation layer={p.layer} />
        </Section>
        <Section title="Parameters">
          <p>
            <span className="text-lg font-semibold">{params.toLocaleString()}</span>{' '}
            <span className="text-muted-foreground">
              {params > 0 ? `= ${p.layer.info?.paramFormula} · ${pct(params / p.totalParams)} of the model` : '— nothing to learn'}
            </span>
          </p>
        </Section>
        <Section title="Forward pass">
          <Tex display math={info.math} className="my-1 text-[0.85rem]" />
        </Section>
        {p.weights?.kernel && (
          <Section title={p.trainedEpochs > 0 ? `Learned weights · after ${p.trainedEpochs} epoch${p.trainedEpochs === 1 ? '' : 's'}` : 'Weights · random initialisation'}>
            {p.layer.type === 'conv2d' ? <ConvKernels w={p.weights.kernel} mode={mode} /> : <DenseWeights w={p.weights.kernel} layer={p.layer} layers={p.layers} />}
            {p.weights.bias && (
              <p className="text-xs text-muted-foreground">
                Bias b ∈ ℝ<sup>{p.weights.bias.shape[0]}</sup>, range {minMax(p.weights.bias.data)[0].toFixed(3)} … {minMax(p.weights.bias.data)[1].toFixed(3)}.
              </p>
            )}
          </Section>
        )}
        <Section title="Live activations">
          {p.activation ? (
            isVolume ? (
              <FeatureMaps act={p.activation} isInput={p.layer.type === 'input'} />
            ) : (
              <UnitBars act={p.activation} classes={p.classes} isSoftmax={p.layer.type === 'softmax'} />
            )
          ) : (
            <p className="text-muted-foreground">Loading TensorFlow.js…</p>
          )}
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Cpu className="size-3.5" aria-hidden /> Computed live with TensorFlow.js ({p.backend ?? '…'} backend) from the current input.
          </p>
        </Section>
      </div>
    </aside>
  )
}
