import type * as TF from '@tensorflow/tfjs'
import { Copy, Download, Eraser, Paintbrush, Shuffle } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { NativeSelect } from '@/components/ui/select'
import { toast } from '@/components/ui/toaster'
import { ControlGroup, LabeledSlider, PlayControls, Segmented, StatTile } from '@/components/viz/Controls'
import { LineChart } from '@/components/viz/LineChart'
import { ClassLegend, ClassMarker, Plot2D, type PlotScales } from '@/components/viz/Plot2D'
import { VizFrame } from '@/components/viz/VizFrame'
import { hexToRgb } from '@/components/viz/paintField'
import { CLASS_COLORS } from '@/lib/colormap'
import { PRESET_LABELS, generatePreset, type DatasetPreset, type LabeledPoint } from '@/lib/datasets2d'
import { createRng } from '@/lib/random'
import { buildClassifier, createTrainer, type ClassifierKind, type HiddenActivation, type Trainer } from '@/lib/tf/classifier'
import { fmt, pct } from '@/lib/utils'
import { useAnimationLoop } from '@/hooks/useAnimationLoop'
import { useChallengeReporter } from '@/hooks/useChallenge'
import { loadTf } from '@/hooks/useExplodedModel'
import { useThemeMode } from '@/hooks/useThemeMode'

const DOMAIN = { xMin: -1, xMax: 1, yMin: -1, yMax: 1 }
const GRID = 56
const STEPS_PER_TICK = 8

export interface DatasetPainterProps {
  /** Classifier trained on the painted data. */
  model?: ClassifierKind
  preset?: DatasetPreset
  allowModelSwitch?: boolean
  title?: string
}

export default function DatasetPainter({ model: initialModel = 'mlp', preset: initialPreset = 'spiral', allowModelSwitch = true, title = 'Dataset painter' }: DatasetPainterProps) {
  const mode = useThemeMode()
  const report = useChallengeReporter()
  const [preset, setPreset] = useState<DatasetPreset>(initialPreset)
  const [noise, setNoise] = useState(0.08)
  const [seed, setSeed] = useState(1)
  const [points, setPoints] = useState<LabeledPoint[]>(() => generatePreset(initialPreset, createRng(1)))
  const [edited, setEdited] = useState(false)
  const [brushClass, setBrushClass] = useState(0)
  const [kind, setKind] = useState<ClassifierKind>(initialModel)
  const [layers, setLayers] = useState(2)
  const [units, setUnits] = useState(16)
  const [activation, setActivation] = useState<HiddenActivation>('tanh')
  const [lr, setLr] = useState(initialModel === 'logistic' ? 0.05 : 0.03)
  const [running, setRunning] = useState(false)
  const [epoch, setEpoch] = useState(0)
  const [stats, setStats] = useState<{ loss: number; accuracy: number } | null>(null)
  const [history, setHistory] = useState<{ step: number; loss: number }[]>([])
  const [grid, setGrid] = useState<{ probs: Float32Array; classes: number } | null>(null)
  const [tfReady, setTfReady] = useState(false)
  const tfRef = useRef<typeof TF | null>(null)
  const trainerRef = useRef<{ trainer: Trainer; model: TF.Sequential } | null>(null)
  const stepCount = useRef(0)
  const painting = useRef(false)
  const lastPaint = useRef<[number, number] | null>(null)

  const classes = useMemo(() => Math.max(2, ...points.map((p) => p.label + 1)), [points])
  const metricKey = `${kind}-%s-${edited ? 'custom' : preset}`

  useEffect(() => {
    let alive = true
    void loadTf().then((tf) => {
      if (!alive) return
      tfRef.current = tf
      setTfReady(true)
    })
    return () => {
      alive = false
    }
  }, [])

  const disposeTrainer = useCallback(() => {
    trainerRef.current?.trainer.dispose()
    trainerRef.current?.model.dispose()
    trainerRef.current = null
  }, [])

  // Any change to data or architecture invalidates the trained model.
  useEffect(() => {
    disposeTrainer()
    stepCount.current = 0
    setEpoch(0)
    setStats(null)
    setHistory([])
    setGrid(null)
  }, [points, kind, layers, units, activation, lr, disposeTrainer])

  useEffect(() => disposeTrainer, [disposeTrainer])

  const ensureTrainer = useCallback(() => {
    const tf = tfRef.current
    if (!tf || points.length < 2) return null
    if (!trainerRef.current) {
      const model = buildClassifier(tf, { kind, hidden: Array(layers).fill(units), activation, classes, seed })
      const trainer = createTrainer(tf, model, points.map((p) => [p.x, p.y] as [number, number]), points.map((p) => p.label), classes, lr)
      trainerRef.current = { trainer, model }
    }
    return trainerRef.current.trainer
  }, [kind, layers, units, activation, classes, seed, points, lr])

  const trainTick = useCallback(() => {
    const t = ensureTrainer()
    if (!t) return false
    const s = t.step(STEPS_PER_TICK)
    stepCount.current += STEPS_PER_TICK
    const next = stepCount.current
    setEpoch(next)
    if (next % 40 === 0 || next === STEPS_PER_TICK) setHistory((h) => [...h, { step: next, loss: s.loss }].slice(-150))
    setStats(s)
    setGrid(t.predictGrid(GRID))
    report(metricKey.replace('%s', 'loss'), s.loss)
    report(metricKey.replace('%s', 'accuracy'), s.accuracy)
    return true
  }, [ensureTrainer, report, metricKey])

  useAnimationLoop(running, trainTick, 30)

  const regenerate = (p: DatasetPreset, n = noise, sd = seed) => {
    setRunning(false)
    setPreset(p)
    setEdited(false)
    setPoints(generatePreset(p, createRng(sd), n))
  }

  const addPoint = (x: number, y: number) => {
    if (Math.abs(x) > 1 || Math.abs(y) > 1) return
    setEdited(true)
    setPoints((pts) => [...pts, { x, y, label: brushClass }])
  }

  const removeNear = (x: number, y: number) => {
    setEdited(true)
    setPoints((pts) => pts.filter((p) => Math.hypot(p.x - x, p.y - y) > 0.06))
  }

  const background = useCallback(
    (ctx: CanvasRenderingContext2D, s: PlotScales) => {
      if (!grid) return
      const colors = CLASS_COLORS[mode].map(hexToRgb)
      const img = ctx.createImageData(GRID, GRID)
      for (let i = 0; i < GRID * GRID; i++) {
        let best = 0
        for (let k = 1; k < grid.classes; k++) if (grid.probs[i * grid.classes + k] > grid.probs[i * grid.classes + best]) best = k
        const conf = grid.probs[i * grid.classes + best]
        const c = colors[best % colors.length]
        img.data.set([c[0], c[1], c[2], Math.round(18 + 70 * Math.max(0, (conf - 1 / grid.classes) / (1 - 1 / grid.classes)))], i * 4)
      }
      const off = document.createElement('canvas')
      off.width = GRID
      off.height = GRID
      off.getContext('2d')!.putImageData(img, 0, 0)
      ctx.imageSmoothingEnabled = true
      ctx.drawImage(off, 0, 0, s.width, s.height)
    },
    [grid, mode],
  )

  const exportJson = () => JSON.stringify(points.map((p) => [Number(p.x.toFixed(4)), Number(p.y.toFixed(4)), p.label]))
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(exportJson())
      toast({ kind: 'success', title: `Copied ${points.length} points`, description: 'Format: [[x, y, label], …]' })
    } catch {
      window.prompt('Copy the dataset:', exportJson())
    }
  }
  const download = () => {
    const url = URL.createObjectURL(new Blob([exportJson()], { type: 'application/json' }))
    const a = document.createElement('a')
    a.href = url
    a.download = `dataset-${edited ? 'custom' : preset}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const classLabels = Array.from({ length: Math.max(classes, brushClass + 1) }, (_, i) => `Class ${i}`)
  const counts = classLabels.map((_, k) => points.filter((p) => p.label === k).length)

  return (
    <VizFrame
      title={title}
      description={
        <>
          Click or drag to paint points of the selected class; Shift- or right-drag erases. Then train a{' '}
          {kind === 'logistic' ? 'logistic-regression' : 'multilayer-perceptron'} classifier with TensorFlow.js and watch the decision regions
          form. Shading strength shows the model’s confidence.
        </>
      }
      controls={
        <>
          <ControlGroup title="Data">
            <NativeSelect aria-label="Preset dataset" value={preset} onChange={(e) => regenerate(e.target.value as DatasetPreset)}>
              {(Object.keys(PRESET_LABELS) as DatasetPreset[]).map((p) => (
                <option key={p} value={p}>
                  {PRESET_LABELS[p]}
                </option>
              ))}
            </NativeSelect>
            <LabeledSlider label="Noise" value={noise} min={0} max={0.3} step={0.01} onChange={(v) => { setNoise(v); regenerate(preset, v) }} format={(v) => v.toFixed(2)} />
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" onClick={() => { const s = seed + 1; setSeed(s); regenerate(preset, noise, s) }}>
                <Shuffle /> Resample
              </Button>
              <Button size="sm" variant="ghost" onClick={() => { setEdited(true); setPoints([]) }}>
                <Eraser /> Clear
              </Button>
            </div>
            <Segmented
              label="Brush class"
              value={String(brushClass)}
              onChange={(v) => setBrushClass(Number(v))}
              options={[0, 1, 2, 3].map((k) => ({
                value: String(k),
                label: (
                  <span className="inline-flex items-center gap-1">
                    <svg width={10} height={10} aria-hidden>
                      <ClassMarker x={5} y={5} cls={k} r={3.5} ring={false} />
                    </svg>
                    {k}
                  </span>
                ),
              }))}
            />
          </ControlGroup>
          <ControlGroup title="Model">
            {allowModelSwitch && (
              <Segmented
                value={kind}
                onChange={(v) => { setRunning(false); setKind(v) }}
                options={[
                  { value: 'logistic', label: 'Logistic' },
                  { value: 'mlp', label: 'MLP' },
                ]}
              />
            )}
            {kind === 'mlp' && (
              <>
                <LabeledSlider label="Hidden layers" value={layers} min={1} max={4} step={1} onChange={setLayers} />
                <LabeledSlider label="Units per layer" value={units} min={2} max={32} step={1} onChange={setUnits} />
                <Segmented
                  label="Activation"
                  value={activation}
                  onChange={setActivation}
                  options={[
                    { value: 'relu', label: 'ReLU' },
                    { value: 'tanh', label: 'tanh' },
                    { value: 'sigmoid', label: 'sigmoid' },
                  ]}
                />
              </>
            )}
            <LabeledSlider label="Learning rate (Adam)" value={lr} min={0.001} max={0.3} step={0.001} log onChange={setLr} format={(v) => v.toPrecision(2)} />
            <PlayControls
              running={running}
              onToggle={() => setRunning((r) => !r)}
              onStep={() => trainTick()}
              onReset={() => {
                setRunning(false)
                disposeTrainer()
                stepCount.current = 0
                setSeed((s) => s + 1)
                setEpoch(0)
                setStats(null)
                setHistory([])
                setGrid(null)
              }}
              playLabel="Train"
              disabled={!tfReady || points.length < 2}
            />
          </ControlGroup>
        </>
      }
      footer={
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span>
            {points.length} points ({counts.map((c, k) => `${c} × class ${k}`).join(', ')}) · export as <code>[x, y, label]</code>
          </span>
          <span className="flex gap-2">
            <Button size="sm" variant="outline" onClick={copy}>
              <Copy /> Copy JSON
            </Button>
            <Button size="sm" variant="outline" onClick={download}>
              <Download /> Download
            </Button>
          </span>
        </div>
      }
    >
      <div className="space-y-3">
        <Plot2D
          domain={DOMAIN}
          ariaLabel="Scatter plot of the painted dataset with the classifier's decision regions"
          background={background}
          backgroundKey={grid}
          onPointerDown={([x, y], e) => {
            painting.current = true
            if (e.shiftKey || e.button === 2) removeNear(x, y)
            else addPoint(x, y)
            lastPaint.current = [x, y]
          }}
          onPointerMove={([x, y], e) => {
            if (!painting.current) return
            const last = lastPaint.current
            if (e.shiftKey || e.buttons === 2) removeNear(x, y)
            else if (!last || Math.hypot(x - last[0], y - last[1]) > 0.05) {
              addPoint(x + (Math.random() - 0.5) * 0.03, y + (Math.random() - 0.5) * 0.03)
              lastPaint.current = [x, y]
            }
          }}
          onPointerUp={() => (painting.current = false)}
        >
          {(s) => (
            <g onContextMenu={(e) => e.preventDefault()}>
              {points.map((p, i) => (
                <ClassMarker key={i} x={s.sx(p.x)} y={s.sy(p.y)} cls={p.label} r={4} />
              ))}
            </g>
          )}
        </Plot2D>
        <div className="flex items-center justify-between gap-2">
          <ClassLegend labels={classLabels} />
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Paintbrush className="size-3.5" aria-hidden /> painting class {brushClass}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <StatTile label="Adam steps" value={epoch.toLocaleString()} />
          <StatTile label="Training loss" value={stats ? fmt(stats.loss, 3) : '—'} />
          <StatTile label="Training accuracy" value={stats ? pct(stats.accuracy) : '—'} />
        </div>
        {history.length > 1 && (
          <LineChart ariaLabel="Training loss over Adam steps" data={history} xKey="step" xLabel="step" series={[{ key: 'loss', label: 'Training loss' }]} height={150} logY />
        )}
      </div>
    </VizFrame>
  )
}
