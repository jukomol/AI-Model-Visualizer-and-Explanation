import type * as TF from '@tensorflow/tfjs'
import { Copy, Download, Eraser, Paintbrush, Shuffle } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { NativeSelect } from '@/components/ui/select'
import { toast } from '@/components/ui/toaster'
import { ControlGroup, LabeledSlider, PlayControls, Segmented, StatTile, ToggleRow } from '@/components/viz/Controls'
import { LineChart } from '@/components/viz/LineChart'
import { ClassLegend, ClassMarker, Plot2D, type PlotScales } from '@/components/viz/Plot2D'
import { VizFrame } from '@/components/viz/VizFrame'
import { hexToRgb } from '@/components/viz/paintField'
import { DEFAULT_CLASSIC_PARAMS, accuracyOf, crossValidatedAccuracy, fitClassic, probabilityGrid, type ClassicParams, type SummaryItem } from '@/lib/classicClassifiers'
import { CLASS_COLORS } from '@/lib/colormap'
import { PRESET_LABELS, generatePreset, type DatasetPreset, type LabeledPoint } from '@/lib/datasets2d'
import { createRng } from '@/lib/random'
import { buildClassifier, createTrainer, type HiddenActivation, type Trainer } from '@/lib/tf/classifier'
import { fmt, pct } from '@/lib/utils'
import { useAnimationLoop } from '@/hooks/useAnimationLoop'
import { useChallengeReporter } from '@/hooks/useChallenge'
import { loadTf } from '@/hooks/useExplodedModel'
import { useThemeMode } from '@/hooks/useThemeMode'
import { CLASSIC_MODELS, NEURAL_MODELS, PAINTER_MODELS, fallbackModel, isClassic, unsupportedReason, type PainterModel } from './painterModels'

const DOMAIN = { xMin: -1, xMax: 1, yMin: -1, yMax: 1 }
const GRID = 56
const STEPS_PER_TICK = 8
const CV_FOLDS = 5

interface ClassicFit {
  summary: SummaryItem
  trainAccuracy: number
  /** Null while the cross-validation is still running. */
  cvAccuracy: number | null
  supportVectors: Set<number>
}

export interface DatasetPainterProps {
  /** Classifier trained on the painted data. */
  model?: PainterModel
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
  const [kind, setKind] = useState<PainterModel>(() => (allowModelSwitch && unsupportedReason(initialModel, initialPreset) ? fallbackModel(initialModel) : initialModel))
  // Models that cannot fit a preset are disabled while the data comes from that
  // preset; clearing the canvas to paint from scratch re-enables all of them.
  const [fromPreset, setFromPreset] = useState(true)
  const [switchNote, setSwitchNote] = useState<string | null>(null)
  const [layers, setLayers] = useState(2)
  const [units, setUnits] = useState(16)
  const [activation, setActivation] = useState<HiddenActivation>('tanh')
  const [lr, setLr] = useState(initialModel === 'logistic' ? 0.05 : 0.03)
  const [running, setRunning] = useState(false)
  const [epoch, setEpoch] = useState(0)
  const [stats, setStats] = useState<{ loss: number; accuracy: number } | null>(null)
  const [history, setHistory] = useState<{ step: number; loss: number }[]>([])
  const [grid, setGrid] = useState<{ probs: Float32Array; classes: number } | null>(null)
  const [classicParams, setClassicParams] = useState<ClassicParams>(DEFAULT_CLASSIC_PARAMS)
  const [classicFit, setClassicFit] = useState<ClassicFit | null>(null)
  const [tfReady, setTfReady] = useState(false)
  const tfRef = useRef<typeof TF | null>(null)
  const trainerRef = useRef<{ trainer: Trainer; model: TF.Sequential } | null>(null)
  const stepCount = useRef(0)
  const painting = useRef(false)
  const lastPaint = useRef<[number, number] | null>(null)

  const classes = useMemo(() => Math.max(2, ...points.map((p) => p.label + 1)), [points])
  const metricKey = `${kind}-%s-${edited ? 'custom' : preset}`
  const classic = isClassic(kind)
  const info = PAINTER_MODELS[kind]
  const blockedReason = (m: PainterModel, p: DatasetPreset = preset) => (allowModelSwitch && fromPreset ? unsupportedReason(m, p) : null)
  const blocked = (Object.keys(PAINTER_MODELS) as PainterModel[]).flatMap((m) => {
    const reason = blockedReason(m)
    return reason ? [{ m, reason }] : []
  })
  const setParam = <K extends keyof ClassicParams>(key: K, value: ClassicParams[K]) => setClassicParams((p) => ({ ...p, [key]: value }))

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
    // Classic models refit straight away; keeping their old regions avoids a flash.
    if (!isClassic(kind)) setGrid(null)
  }, [points, kind, layers, units, activation, lr, disposeTrainer])

  // Classic models are fitted in closed form (or by a fast solver) on every edit,
  // debounced so that painting strokes and slider drags stay responsive.
  useEffect(() => {
    if (!isClassic(kind)) {
      setClassicFit(null)
      return
    }
    let cancelled = false
    let cvTimer: ReturnType<typeof setTimeout> | undefined
    const fitTimer = setTimeout(() => {
      if (points.length < 2) {
        setGrid(null)
        setClassicFit(null)
        return
      }
      const xs = points.map((p) => [p.x, p.y] as [number, number])
      const ys = points.map((p) => p.label)
      const model = fitClassic(kind, xs, ys, classes, classicParams, seed)
      setGrid({ probs: probabilityGrid(model, GRID), classes })
      setClassicFit({ summary: model.summary, trainAccuracy: accuracyOf(model, xs, ys), cvAccuracy: null, supportVectors: new Set(model.supportVectors) })
      // Cross-validation refits the model k times; run it after the new regions paint.
      cvTimer = setTimeout(() => {
        if (cancelled) return
        const cv = points.length >= 2 * CV_FOLDS ? crossValidatedAccuracy(kind, xs, ys, classes, classicParams, CV_FOLDS, seed) : NaN
        setClassicFit((f) => f && { ...f, cvAccuracy: cv })
      }, 30)
    }, 60)
    return () => {
      cancelled = true
      clearTimeout(fitTimer)
      clearTimeout(cvTimer)
    }
  }, [kind, points, classes, classicParams, seed])

  useEffect(() => disposeTrainer, [disposeTrainer])

  const ensureTrainer = useCallback(() => {
    const tf = tfRef.current
    if (!tf || points.length < 2 || isClassic(kind)) return null
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
    setFromPreset(true)
    if (allowModelSwitch && unsupportedReason(kind, p)) {
      const next = fallbackModel(kind)
      setKind(next)
      setSwitchNote(`${PAINTER_MODELS[kind].label} cannot fit ${PRESET_LABELS[p].toLowerCase()} (${unsupportedReason(kind, p)}), so the painter switched to ${PAINTER_MODELS[next].label.toLowerCase()}.`)
    } else if (p !== preset) setSwitchNote(null)
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
          Click or drag to paint points of the selected class; Shift- or right-drag erases. Then pick a classifier:{' '}
          {classic
            ? 'classic models refit instantly on every edit, so you can watch the decision regions react as you paint.'
            : 'neural models train step by step with TensorFlow.js, so you can watch the decision regions form.'}{' '}
          Shading strength shows the model’s confidence.
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
              <Button size="sm" variant="ghost" onClick={() => { setEdited(true); setFromPreset(false); setSwitchNote(null); setPoints([]) }}>
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
              <NativeSelect aria-label="Classifier" value={kind} onChange={(e) => { setRunning(false); setSwitchNote(null); setKind(e.target.value as PainterModel) }}>
                <optgroup label="Neural (trained with TensorFlow.js)">
                  {NEURAL_MODELS.map((k) => (
                    <option key={k} value={k} disabled={!!blockedReason(k)}>
                      {PAINTER_MODELS[k].label}
                      {blockedReason(k) ? ' (can’t fit this data)' : ''}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Classic (fitted instantly)">
                  {CLASSIC_MODELS.map((k) => (
                    <option key={k} value={k} disabled={!!blockedReason(k)}>
                      {PAINTER_MODELS[k].label}
                      {blockedReason(k) ? ' (can’t fit this data)' : ''}
                    </option>
                  ))}
                </optgroup>
              </NativeSelect>
            )}
            {switchNote && (
              <p role="status" className="rounded-md border border-border bg-muted/60 px-2.5 py-2 text-xs leading-relaxed">
                {switchNote}
              </p>
            )}
            {blocked.length > 0 && (
              <details className="text-xs text-muted-foreground">
                <summary className="cursor-pointer select-none">
                  {blocked.length} model{blocked.length > 1 ? 's' : ''} disabled for this preset
                </summary>
                <ul className="mt-1.5 space-y-1 pl-1">
                  {blocked.map(({ m, reason }) => (
                    <li key={m}>
                      <span className="font-medium text-foreground">{PAINTER_MODELS[m].label}</span>: {reason}.
                    </li>
                  ))}
                </ul>
                <p className="mt-1.5">Clear the canvas and paint your own data to try any model.</p>
              </details>
            )}
            {kind === 'knn' && (
              <>
                <LabeledSlider label="Neighbours k" value={classicParams.k} min={1} max={30} step={1} onChange={(v) => setParam('k', v)} hint="k = 1 memorises every point; larger k smooths the boundary." />
                <ToggleRow label="Distance-weighted votes" checked={classicParams.distanceWeighted} onChange={(v) => setParam('distanceWeighted', v)} />
              </>
            )}
            {(kind === 'lda' || kind === 'qda') && (
              <LabeledSlider label="Covariance ridge λ" value={classicParams.reg} min={0.0001} max={1} step={0.0001} log onChange={(v) => setParam('reg', v)} format={(v) => v.toPrecision(2)} hint="Adds λI to each covariance; large λ pulls the Gaussians towards circles." />
            )}
            {kind === 'svm' && (
              <>
                <Segmented
                  label="Kernel"
                  value={classicParams.kernel}
                  onChange={(v) => setParam('kernel', v)}
                  options={[
                    { value: 'rbf', label: 'RBF' },
                    { value: 'poly', label: 'Polynomial' },
                    { value: 'linear', label: 'Linear' },
                  ]}
                />
                <LabeledSlider label="C (penalty on margin violations)" value={classicParams.C} min={0.01} max={100} step={0.01} log onChange={(v) => setParam('C', v)} format={(v) => v.toPrecision(2)} />
                {classicParams.kernel !== 'linear' && (
                  <LabeledSlider label="γ (kernel scale)" value={classicParams.gamma} min={0.1} max={100} step={0.1} log onChange={(v) => setParam('gamma', v)} format={(v) => v.toPrecision(2)} />
                )}
                {classicParams.kernel === 'poly' && <LabeledSlider label="Degree" value={classicParams.degree} min={2} max={6} step={1} onChange={(v) => setParam('degree', v)} />}
              </>
            )}
            {(kind === 'tree' || kind === 'forest') && (
              <>
                {kind === 'forest' && <LabeledSlider label="Trees" value={classicParams.trees} min={1} max={100} step={1} onChange={(v) => setParam('trees', v)} />}
                <LabeledSlider label="Max depth" value={classicParams.maxDepth} min={1} max={15} step={1} onChange={(v) => setParam('maxDepth', v)} />
                <LabeledSlider label="Min samples to split" value={classicParams.minSamplesSplit} min={2} max={40} step={1} onChange={(v) => setParam('minSamplesSplit', v)} />
                <Segmented
                  label="Split criterion"
                  value={classicParams.criterion}
                  onChange={(v) => setParam('criterion', v)}
                  options={[
                    { value: 'gini', label: 'Gini' },
                    { value: 'entropy', label: 'Entropy' },
                  ]}
                />
              </>
            )}
            {kind === 'adaboost' && (
              <>
                <LabeledSlider label="Boosting rounds" value={classicParams.rounds} min={1} max={200} step={1} onChange={(v) => setParam('rounds', v)} />
                <LabeledSlider label="Weak-learner depth" value={classicParams.weakDepth} min={1} max={3} step={1} onChange={(v) => setParam('weakDepth', v)} hint="Depth 1 = decision stumps." />
              </>
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
            {classic ? (
              (kind === 'forest' || kind === 'svm') && (
                <Button size="sm" variant="outline" onClick={() => setSeed((s) => s + 1)}>
                  <Shuffle /> {kind === 'forest' ? 'New bootstrap samples' : 'Re-run SMO with a new seed'}
                </Button>
              )
            ) : (
              <>
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
              </>
            )}
          </ControlGroup>
          <ControlGroup title={`About ${info.label.toLowerCase()}`}>
            <div className="space-y-1.5 text-xs leading-relaxed text-muted-foreground">
              <p>{info.how}</p>
              <p>
                <span className="font-medium text-foreground">Works well: </span>
                {info.goodAt}
              </p>
              <p>
                <span className="font-medium text-foreground">Struggles: </span>
                {info.weakAt}
              </p>
            </div>
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
              {classicFit &&
                points.map((p, i) =>
                  classicFit.supportVectors.has(i) ? <circle key={`sv${i}`} cx={s.sx(p.x)} cy={s.sy(p.y)} r={8} fill="none" stroke="var(--foreground)" strokeWidth={1.5} opacity={0.75} /> : null,
                )}
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
        {classic ? (
          <div className="grid grid-cols-3 gap-2">
            <StatTile label={classicFit?.summary.label ?? 'Model size'} value={classicFit?.summary.value ?? '—'} />
            <StatTile label="Training accuracy" value={classicFit ? pct(classicFit.trainAccuracy) : '—'} />
            <StatTile
              label={`${CV_FOLDS}-fold CV accuracy`}
              value={classicFit?.cvAccuracy == null ? '…' : Number.isNaN(classicFit.cvAccuracy) ? '—' : pct(classicFit.cvAccuracy)}
              sub={classicFit && Number.isNaN(classicFit.cvAccuracy ?? 0) ? `needs ≥ ${2 * CV_FOLDS} points` : 'held-out estimate'}
            />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            <StatTile label="Adam steps" value={epoch.toLocaleString()} />
            <StatTile label="Training loss" value={stats ? fmt(stats.loss, 3) : '—'} />
            <StatTile label="Training accuracy" value={stats ? pct(stats.accuracy) : '—'} />
          </div>
        )}
        {kind === 'svm' && classicFit && <p className="text-xs text-muted-foreground">Ringed points are support vectors: move any other point and the boundary does not change.</p>}
        {!classic && history.length > 1 && (
          <LineChart ariaLabel="Training loss over Adam steps" data={history} xKey="step" xLabel="step" series={[{ key: 'loss', label: 'Training loss' }]} height={150} logY />
        )}
      </div>
    </VizFrame>
  )
}
