import { useEffect, useMemo, useState } from 'react'
import { ControlGroup, LabeledSlider, PlayControls, Segmented, StatTile } from '@/components/viz/Controls'
import { VizFrame } from '@/components/viz/VizFrame'
import { CATEGORICAL } from '@/lib/colormap'
import { OBJECTS, simulateDetections } from '@/lib/detections'
import { matchDetections, nonMaxSuppression, softNms, type ScoredBox } from '@/lib/geometry'
import { cn, fmt } from '@/lib/utils'
import { useChallengeReporter } from '@/hooks/useChallenge'
import { usePlayback } from '@/hooks/usePlayback'
import { useThemeMode } from '@/hooks/useThemeMode'

const WIDTH = 640
const HEIGHT = 380

export default function NMSVisualizer() {
  const mode = useThemeMode()
  const report = useChallengeReporter()
  const [seed, setSeed] = useState(5)
  const [iouT, setIouT] = useState(0.9)
  const [scoreT, setScoreT] = useState(0.05)
  const [algo, setAlgo] = useState<'hard' | 'soft'>('hard')
  const [classAware, setClassAware] = useState<'aware' | 'agnostic'>('aware')
  const boxes = useMemo(() => simulateDetections(seed), [seed])
  const input = useMemo(() => (classAware === 'aware' ? boxes : boxes.map(({ label: _label, ...b }) => b as ScoredBox)), [boxes, classAware])
  const result = useMemo(() => nonMaxSuppression(input, iouT, scoreT), [input, iouT, scoreT])
  const soft = useMemo(() => softNms(input, 0.5, scoreT), [input, scoreT])
  const { frame, running, toggle, reset, toEnd, setFrame } = usePlayback(result.steps.length + 1, 1.5)
  useEffect(() => toEnd(), [result, toEnd])

  const kept = algo === 'hard' ? result.kept : soft
  const shownSteps = result.steps.slice(0, frame)
  const keptSoFar = new Set(shownSteps.map((s) => s.selected.id))
  const suppressedSoFar = new Map(shownSteps.flatMap((s) => s.suppressed.map((r) => [r.box.id, r] as const)))
  const active = shownSteps[shownSteps.length - 1]
  const match = matchDetections(kept, OBJECTS, 0.5)
  const exact = match.truePositives === OBJECTS.length && match.falsePositives === 0 ? 1 : 0
  useEffect(() => {
    if (algo === 'hard' && frame >= result.steps.length) report('nms-exact', exact)
  }, [exact, algo, frame, result.steps.length, report])

  const colors = CATEGORICAL[mode]
  const colorOf = (label?: string) => colors[Math.max(0, OBJECTS.findIndex((o) => o.name === label))]
  const softScore = new Map(soft.map((b) => [b.id, b.score]))

  return (
    <VizFrame
      title="Non-maximum suppression"
      description="A detector proposed 22 overlapping boxes. Greedy NMS repeatedly keeps the highest-scoring box and deletes every remaining box that overlaps it by more than the IoU threshold. Step through it, then tune the thresholds until exactly one box survives per object."
      controls={
        <>
          <ControlGroup title="Thresholds">
            <LabeledSlider label="IoU threshold τ" value={iouT} min={0} max={1} step={0.01} onChange={setIouT} format={(v) => v.toFixed(2)} hint="Suppress boxes whose IoU with a kept box exceeds τ." />
            <LabeledSlider label="Score threshold" value={scoreT} min={0} max={0.9} step={0.01} onChange={setScoreT} format={(v) => v.toFixed(2)} hint="Discard low-confidence proposals first." />
          </ControlGroup>
          <ControlGroup title="Algorithm">
            <Segmented
              value={algo}
              onChange={setAlgo}
              options={[
                { value: 'hard', label: 'Greedy NMS' },
                { value: 'soft', label: 'Soft-NMS' },
              ]}
            />
            <Segmented
              value={classAware}
              onChange={setClassAware}
              options={[
                { value: 'aware', label: 'Per class' },
                { value: 'agnostic', label: 'Class-agnostic' },
              ]}
            />
            {algo === 'hard' && <PlayControls running={running} onToggle={toggle} onStep={() => setFrame(frame + 1)} onReset={reset} playLabel="Step through" />}
            <button className="text-xs text-primary underline" onClick={() => setSeed((s) => s + 1)}>
              New detector output
            </button>
          </ControlGroup>
        </>
      }
    >
      <div className="space-y-3">
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="mx-auto w-full max-w-3xl rounded-lg bg-viz-surface" role="img" aria-label="Image with candidate and kept bounding boxes">
          {OBJECTS.map((o) => (
            <g key={o.name}>
              <rect x={o.x1} y={o.y1} width={o.x2 - o.x1} height={o.y2 - o.y1} rx={18} className="fill-muted" />
              <text x={(o.x1 + o.x2) / 2} y={(o.y1 + o.y2) / 2} textAnchor="middle" className="fill-muted-foreground text-[15px] font-semibold">
                {o.name}
              </text>
            </g>
          ))}
          {input.map((b) => {
            const below = b.score < scoreT
            const isKept = algo === 'hard' ? keptSoFar.has(b.id) : softScore.has(b.id)
            const sup = suppressedSoFar.get(b.id)
            const pendingBox = algo === 'hard' && !isKept && !sup && !below
            const isActive = active?.selected.id === b.id
            if (below) return null
            const color = colorOf(boxes[b.id].label)
            const opacity = isKept ? 1 : sup ? 0.18 : pendingBox ? 0.45 : 0.15
            return (
              <g key={b.id} opacity={opacity}>
                <rect x={b.x1} y={b.y1} width={b.x2 - b.x1} height={b.y2 - b.y1} fill="none" stroke={color} strokeWidth={isActive ? 4 : isKept ? 3 : 1.5} />
                {(isActive || (isKept && kept.length <= 8)) && (
                  <g>
                    <rect x={b.x1} y={b.y1 - 16} width={70} height={16} fill={color} />
                    <text x={b.x1 + 4} y={b.y1 - 4} className="text-[10px] font-semibold" fill="#fff">
                      {boxes[b.id].label} {(algo === 'soft' ? softScore.get(b.id) ?? b.score : b.score).toFixed(2)}
                    </text>
                  </g>
                )}
              </g>
            )
          })}
          {algo === 'hard' &&
            active?.suppressed.map((r) => (
              <text key={`iou${r.box.id}`} x={(r.box.x1 + r.box.x2) / 2} y={r.box.y2 + 14} textAnchor="middle" className="fill-destructive font-mono text-[11px]" paintOrder="stroke" stroke="var(--viz-surface)" strokeWidth={3}>
                IoU {r.iou.toFixed(2)} &gt; {iouT.toFixed(2)}
              </text>
            ))}
        </svg>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <StatTile label="Proposals ≥ score threshold" value={input.length - result.belowScore.length} />
          <StatTile label="Kept boxes" value={kept.length} />
          <StatTile label="Objects found (IoU ≥ 0.5)" value={`${match.truePositives} / ${OBJECTS.length}`} />
          <StatTile label="Duplicates / false positives" value={match.falsePositives} tone={exact ? 'good' : match.falsePositives > 0 ? 'bad' : undefined} />
        </div>
        {algo === 'hard' && (
          <ol className="max-h-40 space-y-1 overflow-y-auto text-xs">
            {result.steps.map((s, i) => (
              <li key={i} className={cn('rounded px-2 py-1', i === frame - 1 ? 'bg-primary/10' : i >= frame && 'opacity-40')}>
                <span className="font-semibold">Step {i + 1}:</span> keep {s.selected.label ?? 'box'} #{s.selected.id} (score {fmt(s.selected.score, 2)}), suppress {s.suppressed.length}
                {s.suppressed.length > 0 && ` (IoU ${s.suppressed.map((r) => r.iou.toFixed(2)).join(', ')})`}
              </li>
            ))}
          </ol>
        )}
      </div>
    </VizFrame>
  )
}
