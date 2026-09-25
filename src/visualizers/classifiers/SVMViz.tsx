import { useMemo, useRef, useState } from 'react'
import { ControlGroup, LabeledSlider, Segmented, StatTile, ToggleRow } from '@/components/viz/Controls'
import { ClassLegend, ClassMarker, Plot2D, type PlotScales } from '@/components/viz/Plot2D'
import { hexToRgb, paintField } from '@/components/viz/paintField'
import { VizFrame } from '@/components/viz/VizFrame'
import { CLASS_COLORS } from '@/lib/colormap'
import { boundarySegment, trainPerceptron } from '@/lib/perceptron'
import { createRng } from '@/lib/random'
import { hingeLoss, marginWidth, svmDecision, trainLinearSvm } from '@/lib/svm'
import { fmt, pct } from '@/lib/utils'
import { useThemeMode } from '@/hooks/useThemeMode'

const DOMAIN = { xMin: -1, xMax: 1, yMin: -1, yMax: 1 }

function makePoints(overlap: boolean, seed: number) {
  const rng = createRng(seed)
  const pts: { x: [number, number]; y: 1 | -1 }[] = []
  for (let i = 0; i < 28; i++) {
    const y: 1 | -1 = i % 2 === 0 ? 1 : -1
    const sep = overlap ? 0.28 : 0.45
    pts.push({ x: [Math.max(-0.95, Math.min(0.95, rng.normal(y * sep, 0.2))), Math.max(-0.95, Math.min(0.95, rng.normal(y * sep * 0.6, 0.25)))], y })
  }
  return pts
}

export default function SVMViz() {
  const mode = useThemeMode()
  const [overlap, setOverlap] = useState(false)
  const [seed, setSeed] = useState(2)
  const [points, setPoints] = useState(() => makePoints(false, 2))
  const [logC, setLogC] = useState(1)
  const [showPerceptron, setShowPerceptron] = useState(false)
  const drag = useRef<number | null>(null)
  const C = 10 ** logC

  const model = useMemo(() => trainLinearSvm(points.map((p) => p.x), points.map((p) => p.y), createRng(7), { C }), [points, C])
  const perceptron = useMemo(() => (showPerceptron ? trainPerceptron(points.map((p) => p.x), points.map((p) => p.y), 100, 1).final : null), [points, showPerceptron])
  const acc = points.filter((p) => Math.sign(svmDecision(model, p.x)) === p.y).length / points.length
  const violations = points.filter((p) => p.y * svmDecision(model, p.x) < 1 - 1e-6).length

  const reset = (o: boolean, s: number) => setPoints(makePoints(o, s))

  const band = (ctx: CanvasRenderingContext2D, s: PlotScales) => {
    const [neg, pos] = CLASS_COLORS[mode].map(hexToRgb)
    paintField(ctx, s, DOMAIN, 90, (x, y) => {
      const v = svmDecision(model, [x, y])
      const c = v >= 0 ? pos : neg
      return [c[0], c[1], c[2], Math.abs(v) < 1 ? 60 : 22]
    })
  }

  const center = boundarySegment(model)
  const plus = boundarySegment(model, 1)
  const minus = boundarySegment(model, -1)
  const pSeg = perceptron ? boundarySegment(perceptron) : null

  return (
    <VizFrame
      title="Maximum-margin classifier"
      description="Drag any point. The SVM (trained with Platt's SMO on the dual problem) keeps the widest possible band between the classes. Only the ringed support vectors (α > 0) fix its position; move any other point and nothing changes."
      controls={
        <>
          <ControlGroup title="Data">
            <Segmented
              value={overlap ? 'overlap' : 'separable'}
              onChange={(v) => {
                setOverlap(v === 'overlap')
                reset(v === 'overlap', seed)
              }}
              options={[
                { value: 'separable', label: 'Separable' },
                { value: 'overlap', label: 'Overlapping' },
              ]}
            />
            <button
              className="text-xs text-primary underline"
              onClick={() => {
                setSeed(seed + 1)
                reset(overlap, seed + 1)
              }}
            >
              Resample points
            </button>
          </ControlGroup>
          <ControlGroup title="Soft margin">
            <LabeledSlider label="C (penalty on violations)" value={logC} min={-2} max={3} step={0.05} onChange={setLogC} format={(v) => fmt(10 ** v, 3)} hint="Small C: a wide margin that tolerates violations. Large C: a hard margin." />
            <ToggleRow label="Compare with a perceptron" checked={showPerceptron} onChange={setShowPerceptron} hint="Any separating line satisfies the perceptron. The SVM picks the widest one." />
          </ControlGroup>
        </>
      }
    >
      <div className="space-y-3">
        <Plot2D
          domain={DOMAIN}
          maxHeight={440}
          ariaLabel="SVM decision boundary, margins and support vectors"
          background={band}
          backgroundKey={`${model.w.join()}-${model.b}-${mode}`}
          onPointerDown={([x, y]) => {
            let best = -1
            let bd = 0.06
            points.forEach((p, i) => {
              const d = Math.hypot(p.x[0] - x, p.x[1] - y)
              if (d < bd) {
                bd = d
                best = i
              }
            })
            drag.current = best >= 0 ? best : null
          }}
          onPointerMove={([x, y]) => {
            const i = drag.current
            if (i === null) return
            setPoints((pts) => pts.map((p, j) => (j === i ? { ...p, x: [Math.max(-0.98, Math.min(0.98, x)), Math.max(-0.98, Math.min(0.98, y))] } : p)))
          }}
          onPointerUp={() => (drag.current = null)}
        >
          {(s) => (
            <>
              {plus && <line x1={s.sx(plus[0])} y1={s.sy(plus[1])} x2={s.sx(plus[2])} y2={s.sy(plus[3])} className="stroke-muted-foreground" strokeWidth={1} />}
              {minus && <line x1={s.sx(minus[0])} y1={s.sy(minus[1])} x2={s.sx(minus[2])} y2={s.sy(minus[3])} className="stroke-muted-foreground" strokeWidth={1} />}
              {center && <line x1={s.sx(center[0])} y1={s.sy(center[1])} x2={s.sx(center[2])} y2={s.sy(center[3])} className="stroke-foreground" strokeWidth={2} />}
              {pSeg && <line x1={s.sx(pSeg[0])} y1={s.sy(pSeg[1])} x2={s.sx(pSeg[2])} y2={s.sy(pSeg[3])} className="stroke-primary" strokeWidth={2} strokeOpacity={0.7} />}
              {points.map((p, i) => (
                <g key={i} className="cursor-grab">
                  {model.supportVectors.includes(i) && <circle cx={s.sx(p.x[0])} cy={s.sy(p.x[1])} r={10} fill="none" className="stroke-foreground" strokeWidth={1.5} />}
                  <ClassMarker x={s.sx(p.x[0])} y={s.sy(p.x[1])} cls={p.y === -1 ? 0 : 1} r={5} />
                </g>
              ))}
            </>
          )}
        </Plot2D>
        <ClassLegend labels={['y = −1', 'y = +1']} />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <StatTile label="Margin width 2/‖w‖" value={fmt(marginWidth(model), 3)} />
          <StatTile label="Support vectors" value={model.supportVectors.length} sub="ringed points" />
          <StatTile label="Inside / beyond margin" value={violations} sub={`hinge loss ${fmt(hingeLoss(model, points.map((p) => p.x), points.map((p) => p.y)), 3)}`} />
          <StatTile label="Training accuracy" value={pct(acc)} />
        </div>
      </div>
    </VizFrame>
  )
}
