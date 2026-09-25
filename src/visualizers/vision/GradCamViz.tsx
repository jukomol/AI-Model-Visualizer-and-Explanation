import { Dumbbell } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ControlGroup, Segmented, StatTile } from '@/components/viz/Controls'
import { HeatmapCanvas } from '@/components/viz/HeatmapCanvas'
import { VizFrame } from '@/components/viz/VizFrame'
import { CATEGORICAL, diverging, sequential } from '@/lib/colormap'
import { SAMPLE_IMAGES } from '@/lib/sampleImages'
import { gradCam } from '@/lib/tf/model'
import { pct } from '@/lib/utils'
import { useExplodedModel } from '@/hooks/useExplodedModel'
import { useThemeMode } from '@/hooks/useThemeMode'
import { InputPanel } from '@/visualizers/exploded-network/InputPanel'

/** Input image with the class-activation map blended on top. */
function Overlay({ image, cam, size = 28 }: { image: Float32Array; cam: Float32Array | null; size?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const mode = useThemeMode()
  useEffect(() => {
    const ctx = ref.current?.getContext('2d')
    if (!ctx) return
    const img = ctx.createImageData(size, size)
    for (let i = 0; i < size * size; i++) {
      const g = image[i] * 255
      const heat = cam ? cam[i] : 0
      const [r, gg, b] = sequential(heat, mode === 'dark' ? 'light' : 'dark')
      const a = cam ? 0.25 + 0.6 * heat : 0
      img.data.set([g * (1 - a) + r * a, g * (1 - a) + gg * a, g * (1 - a) + b * a, 255], i * 4)
    }
    ctx.putImageData(img, 0, 0)
  }, [image, cam, size, mode])
  return <canvas ref={ref} width={size} height={size} className="pixelated w-full max-w-64 rounded-lg border" role="img" aria-label="Input image with Grad-CAM heatmap overlay" />
}

export default function GradCamViz() {
  const { session, state, spec } = useExplodedModel('tiny-cnn')
  const mode = useThemeMode()
  const [image, setImage] = useState<Float32Array>(SAMPLE_IMAGES[2].image)
  const [sampleId, setSampleId] = useState<string | null>(SAMPLE_IMAGES[2].id)
  const [target, setTarget] = useState<'pred' | '0' | '1' | '2' | '3'>('pred')
  const [layerName, setLayerName] = useState<'conv1' | 'conv2'>('conv2')
  const ready = state.status === 'ready' || state.status === 'training'

  const probs = useMemo(() => {
    if (!ready) return null
    const acts = session.activations(image)
    return acts ? acts[acts.length - 1].data : null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image, state.version, ready, session])
  const predicted = probs ? Array.from(probs).indexOf(Math.max(...probs)) : 0
  const cls = target === 'pred' ? predicted : Number(target)

  const cam = useMemo(() => {
    if (!ready || !session.tf || !session.model) return null
    return gradCam(session.tf, session.model, image, spec.input, layerName, cls)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image, cls, layerName, state.version, ready, session])

  const onDraw = useCallback((img: Float32Array) => {
    setSampleId(null)
    setImage(img)
  }, [])

  const trained = state.history.length
  const last = state.history[state.history.length - 1]
  const prog = state.progress
  const maxW = cam ? Math.max(...Array.from(cam.channelWeights).map(Math.abs), 1e-9) : 1

  return (
    <VizFrame
      title="Grad-CAM on TinyShapeNet"
      description="Which pixels made the network say this class? Grad-CAM averages the gradient of the class logit over each feature map of a conv layer. That gives one importance weight α per channel, and the ReLU of the weighted sum of maps is the heatmap. It is computed live with tf.grad on the network you trained."
      controls={
        <>
          <ControlGroup title="Network">
            <p className="text-sm">
              {trained === 0 ? 'Untrained: explanations of random weights are meaningless.' : `Trained for ${trained} epoch${trained === 1 ? '' : 's'}${last ? `, validation accuracy ${pct(last.valAcc)}` : ''}.`}
            </p>
            {state.status === 'training' && prog ? (
              <div className="space-y-1">
                <Progress value={(100 * (prog.epoch * prog.batchesPerEpoch + prog.batch)) / (prog.totalEpochs * prog.batchesPerEpoch)} label="Training progress" />
                <p className="text-xs text-muted-foreground">
                  Epoch {Math.min(prog.epoch + 1, prog.totalEpochs)} / {prog.totalEpochs}
                </p>
              </div>
            ) : (
              <Button size="sm" onClick={() => void session.train({ epochs: trained === 0 ? 6 : 2, learningRate: 0.003, batchSize: 32 })} disabled={state.status !== 'ready'}>
                <Dumbbell /> {trained === 0 ? 'Train 6 epochs' : 'Train 2 more'}
              </Button>
            )}
          </ControlGroup>
          <ControlGroup title="Explain">
            <Segmented
              label="Target class"
              value={target}
              onChange={setTarget}
              options={[{ value: 'pred' as const, label: 'predicted' }, ...spec.classes.map((c, i) => ({ value: String(i) as '0', label: c }))]}
            />
            <Segmented
              label="Conv layer"
              value={layerName}
              onChange={setLayerName}
              options={[
                { value: 'conv1', label: 'conv1 (26×26)' },
                { value: 'conv2', label: 'conv2 (11×11)' },
              ]}
            />
          </ControlGroup>
        </>
      }
    >
      <div className="grid gap-6 xl:grid-cols-2">
        <InputPanel selectedSample={sampleId} onSelectSample={(id, img) => { setSampleId(id); setImage(img) }} onDraw={onDraw} probabilities={probs} classes={spec.classes} />
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <figure className="space-y-1">
              <figcaption className="text-xs font-medium text-muted-foreground">Heatmap for “{spec.classes[cls]}” (upsampled)</figcaption>
              <Overlay image={image} cam={cam?.heatmap ?? null} />
            </figure>
            <figure className="space-y-1">
              <figcaption className="text-xs font-medium text-muted-foreground">
                Raw map at {layerName} ({cam ? `${cam.rawShape[0]}×${cam.rawShape[1]}` : '…'})
              </figcaption>
              {cam ? <HeatmapCanvas values={cam.raw} width={cam.rawShape[1]} height={cam.rawShape[0]} scale="sequential" range={[0, 1]} displayWidth="100%" label="Low-resolution Grad-CAM map" /> : <div className="aspect-square rounded-lg bg-muted" />}
            </figure>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Channel importance α_k = mean ∂y^c / ∂A^k</p>
            <div className="flex h-24 items-center gap-1 rounded-lg border bg-background/50 px-2" role="img" aria-label="Bar chart of channel importance weights">
              {cam &&
                Array.from(cam.channelWeights).map((w, k) => {
                  const h = (Math.abs(w) / maxW) * 44
                  const [r, g, b] = diverging(w / maxW, mode)
                  return (
                    <div key={k} className="flex h-full flex-1 flex-col items-center justify-center" title={`channel ${k}: ${w.toExponential(2)}`}>
                      <div className="flex h-1/2 w-full items-end">{w > 0 && <div className="w-full rounded-t-sm" style={{ height: h, background: `rgb(${r},${g},${b})` }} />}</div>
                      <div className="flex h-1/2 w-full items-start border-t border-border">{w < 0 && <div className="w-full rounded-b-sm" style={{ height: h, background: `rgb(${r},${g},${b})` }} />}</div>
                    </div>
                  )
                })}
            </div>
            <p className="text-xs text-muted-foreground">One bar per {layerName} channel: red channels push towards “{spec.classes[cls]}”, blue ones against it.</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <StatTile label="Prediction" value={probs ? spec.classes[predicted] : '—'} sub={probs ? pct(probs[predicted]) : undefined} />
            <StatTile label="Explaining" value={spec.classes[cls]} sub={probs ? `p = ${pct(probs[cls])}` : undefined} />
          </div>
          <div className="flex gap-2" aria-hidden>
            {spec.classes.map((c, i) => (
              <span key={c} className="h-1 flex-1 rounded" style={{ background: CATEGORICAL[mode][i], opacity: i === cls ? 1 : 0.25 }} />
            ))}
          </div>
        </div>
      </div>
    </VizFrame>
  )
}
