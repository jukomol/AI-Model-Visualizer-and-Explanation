/**
 * Curriculum graph logic: typed access to curriculum.json, unlock rules,
 * validation and the tech-tree layout.
 */
import curriculumJson from '@/data/curriculum.json'

export type TrackId = 'foundations' | 'cv' | 'modern'

export interface Paper {
  authors: string
  year: number
  title: string
  venue: string
  url?: string
  note?: string
}

export interface KeyFormula {
  label: string
  tex: string
}

export interface MetricChallenge {
  type: 'metric'
  prompt: string
  metric: string
  comparator: 'lte' | 'gte'
  threshold: number
  unit?: string
}

export interface QuizChallenge {
  type: 'quiz'
  prompt: string
  options: string[]
  answerIndex: number
  explanation: string
}

export type Challenge = MetricChallenge | QuizChallenge

export interface CurriculumNode {
  id: string
  track: TrackId
  title: string
  summary: string
  prerequisites: string[]
  estimatedMinutes: number
  objectives: string[]
  keyFormulas: KeyFormula[]
  papers: Paper[]
  challenge: Challenge
  visualizers: string[]
  route: string
}

export interface Track {
  id: TrackId
  title: string
  description: string
}

export interface Curriculum {
  version: number
  tracks: Track[]
  nodes: CurriculumNode[]
}

export const curriculum = curriculumJson as Curriculum

const byId = new Map(curriculum.nodes.map((n) => [n.id, n]))

export function getNode(id: string | null | undefined): CurriculumNode | undefined {
  return id ? byId.get(id) : undefined
}

export function isKnownNode(id: string): boolean {
  return byId.has(id)
}

export type NodeStatus = 'locked' | 'available' | 'mastered'

export function nodeStatus(node: Pick<CurriculumNode, 'id' | 'prerequisites'>, mastered: ReadonlySet<string>): NodeStatus {
  if (mastered.has(node.id)) return 'mastered'
  return node.prerequisites.every((p) => mastered.has(p)) ? 'available' : 'locked'
}

export function checkMetric(challenge: MetricChallenge, value: number): boolean {
  if (!Number.isFinite(value)) return false
  return challenge.comparator === 'lte' ? value <= challenge.threshold : value >= challenge.threshold
}

/** Validation errors for a curriculum (empty when valid). */
export function validateCurriculum(c: Curriculum): string[] {
  const errors: string[] = []
  const ids = new Set<string>()
  const trackIds = new Set(c.tracks.map((t) => t.id))
  for (const n of c.nodes) {
    if (ids.has(n.id)) errors.push(`duplicate node id "${n.id}"`)
    ids.add(n.id)
    if (!trackIds.has(n.track)) errors.push(`${n.id}: unknown track "${n.track}"`)
    if (n.challenge.type === 'quiz' && (n.challenge.answerIndex < 0 || n.challenge.answerIndex >= n.challenge.options.length)) {
      errors.push(`${n.id}: quiz answerIndex out of range`)
    }
  }
  for (const n of c.nodes) {
    for (const p of n.prerequisites) if (!ids.has(p)) errors.push(`${n.id}: unknown prerequisite "${p}"`)
  }
  try {
    topologicalOrder(c.nodes)
  } catch (e) {
    errors.push((e as Error).message)
  }
  return errors
}

/** Kahn's algorithm; throws on cycles. Ties keep JSON order. */
export function topologicalOrder<T extends Pick<CurriculumNode, 'id' | 'prerequisites'>>(nodes: readonly T[]): T[] {
  const indeg = new Map(nodes.map((n) => [n.id, n.prerequisites.filter((p) => nodes.some((m) => m.id === p)).length]))
  const out: T[] = []
  const ready = nodes.filter((n) => indeg.get(n.id) === 0)
  while (ready.length > 0) {
    const n = ready.shift()!
    out.push(n)
    for (const m of nodes) {
      if (!m.prerequisites.includes(n.id)) continue
      const d = (indeg.get(m.id) ?? 0) - 1
      indeg.set(m.id, d)
      if (d === 0) ready.push(m)
    }
  }
  if (out.length !== nodes.length) throw new Error('curriculum contains a prerequisite cycle')
  return out
}

/** Longest-path depth from any root. */
export function depthLevels(nodes: readonly Pick<CurriculumNode, 'id' | 'prerequisites'>[]): Map<string, number> {
  const level = new Map<string, number>()
  for (const n of topologicalOrder(nodes)) {
    level.set(n.id, n.prerequisites.reduce((m, p) => Math.max(m, (level.get(p) ?? -1) + 1), 0))
  }
  return level
}

export interface TreeLayoutNode {
  id: string
  track: TrackId
  row: number
  lane: number
  slot: number
}

/**
 * Tech-tree layout: one lane (column) per track, `slotsPerLane` nodes side by
 * side per row. Nodes are placed in topological order at the first row below
 * all of their prerequisites that still has a free slot in their lane.
 */
export function computeTreeLayout(c: Curriculum, slotsPerLane = 2): TreeLayoutNode[] {
  const laneOf = new Map(c.tracks.map((t, i) => [t.id, i]))
  const rowOf = new Map<string, number>()
  const occupancy = new Map<string, number>() // `${lane}:${row}` → used slots
  const out: TreeLayoutNode[] = []
  for (const n of topologicalOrder(c.nodes)) {
    const lane = laneOf.get(n.track) ?? 0
    let row = n.prerequisites.reduce((m, p) => Math.max(m, (rowOf.get(p) ?? -1) + 1), 0)
    while ((occupancy.get(`${lane}:${row}`) ?? 0) >= slotsPerLane) row++
    const slot = occupancy.get(`${lane}:${row}`) ?? 0
    occupancy.set(`${lane}:${row}`, slot + 1)
    rowOf.set(n.id, row)
    out.push({ id: n.id, track: n.track, row, lane, slot })
  }
  return out
}

/** The first available, not-yet-mastered node in curriculum order. */
export function nextRecommended(mastered: ReadonlySet<string>): CurriculumNode | undefined {
  return topologicalOrder(curriculum.nodes).find((n) => nodeStatus(n, mastered) === 'available')
}

export function trackProgress(mastered: ReadonlySet<string>): Record<TrackId, { mastered: number; total: number }> {
  const out = { foundations: { mastered: 0, total: 0 }, cv: { mastered: 0, total: 0 }, modern: { mastered: 0, total: 0 } }
  for (const n of curriculum.nodes) {
    out[n.track].total++
    if (mastered.has(n.id)) out[n.track].mastered++
  }
  return out
}

/** Neighbours in reading order (topological), for prev / next navigation. */
export function adjacentNodes(id: string): { prev?: CurriculumNode; next?: CurriculumNode } {
  const order = topologicalOrder(curriculum.nodes)
  const i = order.findIndex((n) => n.id === id)
  return { prev: i > 0 ? order[i - 1] : undefined, next: i >= 0 && i < order.length - 1 ? order[i + 1] : undefined }
}
