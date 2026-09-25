/**
 * Bounding-box geometry for object detection: IoU and Non-Maximum Suppression.
 * Boxes use corner format (x1, y1) = top-left, (x2, y2) = bottom-right.
 */

export interface Box {
  x1: number
  y1: number
  x2: number
  y2: number
}

export interface ScoredBox extends Box {
  id: number
  score: number
  /** Optional class label; NMS is applied per label when present. */
  label?: string
}

export function boxArea(b: Box): number {
  return Math.max(0, b.x2 - b.x1) * Math.max(0, b.y2 - b.y1)
}

/** The overlapping rectangle of two boxes, or null when they do not overlap. */
export function intersection(a: Box, b: Box): Box | null {
  const x1 = Math.max(a.x1, b.x1)
  const y1 = Math.max(a.y1, b.y1)
  const x2 = Math.min(a.x2, b.x2)
  const y2 = Math.min(a.y2, b.y2)
  if (x2 <= x1 || y2 <= y1) return null
  return { x1, y1, x2, y2 }
}

/** Intersection over Union (Jaccard index) of two axis-aligned boxes. */
export function iou(a: Box, b: Box): number {
  const inter = intersection(a, b)
  if (!inter) return 0
  const i = boxArea(inter)
  const u = boxArea(a) + boxArea(b) - i
  return u <= 0 ? 0 : i / u
}

export interface SuppressionRecord {
  box: ScoredBox
  /** The kept box responsible for the suppression. */
  by: ScoredBox
  iou: number
}

export interface NmsStep {
  /** Box selected (highest remaining score) at this step. */
  selected: ScoredBox
  /** Boxes removed because they overlap `selected` above the threshold. */
  suppressed: SuppressionRecord[]
  /** Candidates still waiting after this step. */
  remaining: ScoredBox[]
}

export interface NmsResult {
  kept: ScoredBox[]
  suppressed: SuppressionRecord[]
  /** Boxes discarded before NMS because their score was below `scoreThreshold`. */
  belowScore: ScoredBox[]
  steps: NmsStep[]
}

/**
 * Greedy Non-Maximum Suppression.
 *  1. Drop boxes whose score < scoreThreshold.
 *  2. Repeatedly select the highest-scoring box and remove every remaining box
 *     (of the same label) whose IoU with it exceeds `iouThreshold`.
 */
export function nonMaxSuppression(
  boxes: readonly ScoredBox[],
  iouThreshold: number,
  scoreThreshold = 0,
): NmsResult {
  const belowScore = boxes.filter((b) => b.score < scoreThreshold)
  let candidates = boxes
    .filter((b) => b.score >= scoreThreshold)
    .slice()
    .sort((a, b) => b.score - a.score || a.id - b.id)
  const kept: ScoredBox[] = []
  const suppressed: SuppressionRecord[] = []
  const steps: NmsStep[] = []
  while (candidates.length > 0) {
    const [selected, ...rest] = candidates
    kept.push(selected)
    const stepSuppressed: SuppressionRecord[] = []
    const survivors: ScoredBox[] = []
    for (const b of rest) {
      const sameClass = selected.label === undefined || b.label === undefined || selected.label === b.label
      const overlap = iou(selected, b)
      if (sameClass && overlap > iouThreshold) stepSuppressed.push({ box: b, by: selected, iou: overlap })
      else survivors.push(b)
    }
    suppressed.push(...stepSuppressed)
    steps.push({ selected, suppressed: stepSuppressed, remaining: survivors })
    candidates = survivors
  }
  return { kept, suppressed, belowScore, steps }
}

/**
 * Gaussian Soft-NMS (Bodla et al., 2017): instead of deleting overlapping
 * boxes, decay their score by exp(-IoU² / σ). Boxes whose decayed score falls
 * below `scoreThreshold` are dropped.
 */
export function softNms(boxes: readonly ScoredBox[], sigma = 0.5, scoreThreshold = 0.001): ScoredBox[] {
  let pool = boxes.map((b) => ({ ...b }))
  const out: ScoredBox[] = []
  while (pool.length > 0) {
    let best = 0
    for (let i = 1; i < pool.length; i++) if (pool[i].score > pool[best].score) best = i
    const selected = pool[best]
    out.push(selected)
    pool = pool
      .filter((_, i) => i !== best)
      .map((b) => {
        const sameClass = selected.label === undefined || b.label === undefined || selected.label === b.label
        if (!sameClass) return b
        const o = iou(selected, b)
        return { ...b, score: b.score * Math.exp(-(o * o) / sigma) }
      })
      .filter((b) => b.score >= scoreThreshold)
  }
  return out
}

/**
 * Greedy matching of predictions to ground-truth boxes (IoU ≥ matchIou).
 * Returns true-positive, false-positive and missed counts — the building
 * blocks of detection precision / recall.
 */
export function matchDetections(
  predictions: readonly Box[],
  groundTruth: readonly Box[],
  matchIou = 0.5,
): { truePositives: number; falsePositives: number; missed: number } {
  const used = new Set<number>()
  let tp = 0
  for (const p of predictions) {
    let bestIdx = -1
    let bestIou = matchIou
    groundTruth.forEach((g, i) => {
      if (used.has(i)) return
      const o = iou(p, g)
      if (o >= bestIou) {
        bestIou = o
        bestIdx = i
      }
    })
    if (bestIdx >= 0) {
      used.add(bestIdx)
      tp++
    }
  }
  return { truePositives: tp, falsePositives: predictions.length - tp, missed: groundTruth.length - tp }
}
