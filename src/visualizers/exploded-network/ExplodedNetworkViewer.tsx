import { Box, Layers, MousePointerClick, Square } from 'lucide-react'
import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { NativeSelect } from '@/components/ui/select'
import { LabeledSlider, Segmented, ToggleRow } from '@/components/viz/Controls'
import { ErrorBoundary } from '@/components/viz/ErrorBoundary'
import { MODELS, viewLayers } from '@/lib/models'
import { SAMPLE_IMAGES } from '@/lib/sampleImages'
import { totalParams } from '@/lib/tensorShapes'
import type { LayerActivation } from '@/lib/tf/model'
import { cn } from '@/lib/utils'
import { useChallengeReporter } from '@/hooks/useChallenge'
import { useExplodedModel } from '@/hooks/useExplodedModel'
import { useThemeMode } from '@/hooks/useThemeMode'
import { FlatNetworkView } from './FlatNetworkView'
import { InputPanel } from './InputPanel'
import { LayerInspectorDrawer } from './LayerInspectorDrawer'
import { TrainingPanel } from './TrainingPanel'

const NetworkScene = lazy(() => import('./NetworkScene'))

function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

export interface ExplodedNetworkViewerProps {
  modelId?: string
  /** Allow switching architectures. */
  pickModel?: boolean
  height?: number
}

export default function ExplodedNetworkViewer({ modelId: initialModel = 'tiny-cnn', pickModel = true, height = 520 }: ExplodedNetworkViewerProps) {
  const [modelId, setModelId] = useState(initialModel)
  const { session, state, spec } = useExplodedModel(modelId)
  const mode = useThemeMode()
  const report = useChallengeReporter()
  const layers = useMemo(() => viewLayers(spec), [spec])
  const params = useMemo(() => totalParams(layers.flatMap((l) => (l.info ? [l.info] : []))), [layers])
  const [explosion, setExplosion] = useState(0.6)
  const [selected, setSelected] = useState<number | null>(null)
  const [labels, setLabels] = useState(true)
  const [view, setView] = useState<'3d' | '2d'>(() => (hasWebGL() ? '3d' : '2d'))
  const [sampleId, setSampleId] = useState<string | null>(SAMPLE_IMAGES[0].id)
  const [image, setImage] = useState<Float32Array>(SAMPLE_IMAGES[0].image)
  const [activations, setActivations] = useState<(LayerActivation | null)[] | null>(null)
  const raf = useRef(0)

  // Re-run the forward pass whenever the input or the weights change (throttled to one per frame).
  useEffect(() => {
    if (state.status === 'idle' || state.status === 'loading' || state.status === 'error') return
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      const acts = session.activations(image)
      if (acts) setActivations([{ shape: spec.input, data: image }, ...acts])
    })
    return () => cancelAnimationFrame(raf.current)
  }, [image, state.version, state.status, session, spec.input])

  const weights = useMemo(() => (state.status === 'idle' || state.status === 'loading' ? {} : session.weights()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.version, state.status, session])

  const onDraw = useCallback((img: Float32Array) => {
    setSampleId(null)
    setImage(img)
  }, [])

  const selectedLayer = selected !== null ? layers[selected] : null
  const probs = activations?.[activations.length - 1]?.data ?? null

  return (
    <section className="not-prose my-8 overflow-hidden rounded-xl border bg-card shadow-sm" aria-label="Exploded neural network viewer">
      <div className="flex flex-wrap items-end gap-4 border-b bg-muted/40 px-4 py-3">
        <div className="min-w-0 flex-1">
          <h3 className="flex items-center gap-2 text-base font-semibold">
            <Layers className="size-4 text-primary" aria-hidden /> {spec.name}
          </h3>
          <p className="text-xs text-muted-foreground">
            {layers.length - 1} layers · {params.toLocaleString()} parameters ·{' '}
            {state.status === 'loading' ? 'loading TensorFlow.js…' : state.status === 'error' ? `error: ${state.error}` : `TF.js ${state.backend ?? ''} backend`}
          </p>
        </div>
        {pickModel && (
          <div className="w-52">
            <NativeSelect
              aria-label="Architecture"
              value={modelId}
              onChange={(e) => {
                setModelId(e.target.value)
                setSelected(null)
                setActivations(null)
              }}
            >
              {MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </NativeSelect>
          </div>
        )}
        <div className="w-48">
          <LabeledSlider label="Explosion" value={explosion} min={0} max={1} step={0.01} onChange={setExplosion} format={(v) => `${Math.round(v * 100)}%`} />
        </div>
        <Segmented
          value={view}
          onChange={setView}
          options={[
            { value: '3d', label: <span className="inline-flex items-center gap-1"><Box className="size-3" />3-D</span> },
            { value: '2d', label: <span className="inline-flex items-center gap-1"><Square className="size-3" />2-D</span> },
          ]}
        />
        <div className="w-32">
          <ToggleRow label="Labels" checked={labels} onChange={setLabels} />
        </div>
      </div>
      <div className="relative" style={{ height }}>
        {view === '3d' ? (
          <ErrorBoundary name="3-D network" fallback={<FlatNetworkView layers={layers} activations={activations} selected={selected} onSelect={setSelected} explosion={explosion} />}>
            <Suspense fallback={<div className="flex h-full items-center justify-center text-sm text-muted-foreground">Loading 3-D engine…</div>}>
              <NetworkScene
                layers={layers}
                activations={activations}
                classes={spec.classes}
                explosion={explosion}
                selected={selected}
                onSelect={setSelected}
                showLabels={labels}
                mode={mode}
              />
            </Suspense>
          </ErrorBoundary>
        ) : (
          <FlatNetworkView layers={layers} activations={activations} selected={selected} onSelect={setSelected} explosion={explosion} />
        )}
        {selected === null && (
          <p className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-1.5 rounded-md bg-background/80 px-2 py-1 text-xs text-muted-foreground">
            <MousePointerClick className="size-3.5" aria-hidden /> Click a layer to inspect it{view === '3d' ? ' · drag to orbit · scroll to zoom' : ''}
          </p>
        )}
        {selectedLayer && (
          <LayerInspectorDrawer
            layer={selectedLayer}
            layers={layers}
            activation={activations?.[selectedLayer.index] ?? null}
            weights={weights[selectedLayer.id]}
            totalParams={params}
            classes={spec.classes}
            backend={state.backend}
            trainedEpochs={state.history.length}
            onClose={() => setSelected(null)}
            onNavigate={setSelected}
          />
        )}
      </div>
      <div className={cn('grid gap-6 border-t p-4 sm:p-5 lg:grid-cols-2')}>
        <InputPanel
          selectedSample={sampleId}
          onSelectSample={(id, img) => {
            setSampleId(id)
            setImage(img)
          }}
          onDraw={onDraw}
          probabilities={probs}
          classes={spec.classes}
        />
        <TrainingPanel
          key={modelId}
          spec={spec}
          state={state}
          onTrain={(p) =>
            void session.train(p, (log) => {
              if (modelId === 'tiny-cnn') report('cnn-val-loss', log.valLoss)
            })
          }
          onStop={() => session.stop()}
          onReset={() => session.reset()}
        />
      </div>
    </section>
  )
}
