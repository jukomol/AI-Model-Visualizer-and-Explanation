/**
 * K-Means clustering, Voronoi partitions and cluster-quality metrics.
 */
import type { Rng } from './random'

export type Point = [number, number]

export function sqDist(a: readonly number[], b: readonly number[]): number {
  let s = 0
  for (let i = 0; i < a.length; i++) s += (a[i] - b[i]) ** 2
  return s
}

/** Index of the nearest centroid for each point. */
export function assignClusters(points: readonly number[][], centroids: readonly number[][]): number[] {
  return points.map((p) => {
    let best = 0
    let bestD = Infinity
    centroids.forEach((c, k) => {
      const d = sqDist(p, c)
      if (d < bestD) {
        bestD = d
        best = k
      }
    })
    return best
  })
}

/** Mean of the points in each cluster; empty clusters keep their previous centroid. */
export function updateCentroids(
  points: readonly number[][],
  assignments: readonly number[],
  previous: readonly number[][],
): number[][] {
  const k = previous.length
  const d = previous[0]?.length ?? 0
  const sums = Array.from({ length: k }, () => new Array<number>(d).fill(0))
  const counts = new Array<number>(k).fill(0)
  points.forEach((p, i) => {
    const c = assignments[i]
    counts[c]++
    for (let j = 0; j < d; j++) sums[c][j] += p[j]
  })
  return sums.map((s, c) => (counts[c] === 0 ? previous[c].slice() : s.map((v) => v / counts[c])))
}

/** Within-cluster sum of squares (WCSS), the objective K-Means minimises. */
export function inertia(points: readonly number[][], centroids: readonly number[][], assignments: readonly number[]): number {
  return points.reduce((s, p, i) => s + sqDist(p, centroids[assignments[i]]), 0)
}

export type KMeansInit = 'random' | 'kmeans++'

/**
 * Initial centroids. `random` picks k distinct data points; `kmeans++`
 * (Arthur & Vassilvitskii, 2007) samples each new centroid with probability
 * proportional to its squared distance from the nearest existing centroid.
 */
export function initCentroids(points: readonly number[][], k: number, rng: Rng, method: KMeansInit = 'kmeans++'): number[][] {
  if (points.length === 0) return []
  if (method === 'random') {
    return rng
      .shuffle(points.map((_, i) => i))
      .slice(0, Math.min(k, points.length))
      .map((i) => points[i].slice())
  }
  const centroids: number[][] = [points[rng.int(points.length)].slice()]
  while (centroids.length < Math.min(k, points.length)) {
    const d2 = points.map((p) => Math.min(...centroids.map((c) => sqDist(p, c))))
    const total = d2.reduce((a, b) => a + b, 0)
    if (total === 0) break
    let r = rng.next() * total
    let idx = 0
    for (; idx < d2.length - 1; idx++) {
      r -= d2[idx]
      if (r <= 0) break
    }
    centroids.push(points[idx].slice())
  }
  return centroids
}

export interface KMeansIteration {
  centroids: number[][]
  assignments: number[]
  inertia: number
}

export interface KMeansResult {
  history: KMeansIteration[]
  converged: boolean
}

/** Lloyd's algorithm: alternate assignment and update steps until assignments stop changing. */
export function kMeans(
  points: readonly number[][],
  initial: readonly number[][],
  maxIterations = 100,
): KMeansResult {
  let centroids = initial.map((c) => c.slice())
  let assignments = assignClusters(points, centroids)
  const history: KMeansIteration[] = [{ centroids, assignments, inertia: inertia(points, centroids, assignments) }]
  for (let it = 0; it < maxIterations; it++) {
    centroids = updateCentroids(points, assignments, centroids)
    const next = assignClusters(points, centroids)
    const changed = next.some((a, i) => a !== assignments[i])
    assignments = next
    history.push({ centroids, assignments, inertia: inertia(points, centroids, assignments) })
    if (!changed) return { history, converged: true }
  }
  return { history, converged: false }
}

/**
 * Mean silhouette coefficient (Rousseeuw, 1987):
 *   s(i) = (b(i) − a(i)) / max(a(i), b(i))
 * where a is the mean intra-cluster distance and b the mean distance to the
 * nearest other cluster. Ranges from −1 (wrong) to +1 (dense, well separated).
 */
export function silhouetteScore(points: readonly number[][], assignments: readonly number[]): number {
  const clusters = new Set(assignments)
  if (clusters.size < 2 || points.length < 3) return 0
  const dist = (i: number, j: number) => Math.sqrt(sqDist(points[i], points[j]))
  let total = 0
  for (let i = 0; i < points.length; i++) {
    const sums = new Map<number, { sum: number; n: number }>()
    for (let j = 0; j < points.length; j++) {
      if (i === j) continue
      const c = assignments[j]
      const e = sums.get(c) ?? { sum: 0, n: 0 }
      e.sum += dist(i, j)
      e.n++
      sums.set(c, e)
    }
    const own = sums.get(assignments[i])
    if (!own || own.n === 0) continue // singleton cluster → s(i) = 0
    const a = own.sum / own.n
    let b = Infinity
    for (const [c, e] of sums) if (c !== assignments[i]) b = Math.min(b, e.sum / e.n)
    total += (b - a) / Math.max(a, b)
  }
  return total / points.length
}

export interface BBox {
  xMin: number
  xMax: number
  yMin: number
  yMax: number
}

/**
 * Sutherland–Hodgman clip of a convex polygon against the half-plane of points
 * at least as close to `a` as to `b` (the perpendicular bisector of a–b).
 */
export function clipToBisector(polygon: readonly Point[], a: Point, b: Point): Point[] {
  const nx = b[0] - a[0]
  const ny = b[1] - a[1]
  const mx = (a[0] + b[0]) / 2
  const my = (a[1] + b[1]) / 2
  const side = (p: Point) => (p[0] - mx) * nx + (p[1] - my) * ny // ≤ 0 → closer to a
  const out: Point[] = []
  for (let i = 0; i < polygon.length; i++) {
    const cur = polygon[i]
    const prev = polygon[(i + polygon.length - 1) % polygon.length]
    const sc = side(cur)
    const sp = side(prev)
    if (sc <= 0) {
      if (sp > 0) out.push(lerpPoint(prev, cur, sp / (sp - sc)))
      out.push(cur)
    } else if (sp <= 0) {
      out.push(lerpPoint(prev, cur, sp / (sp - sc)))
    }
  }
  return out
}

function lerpPoint(p: Point, q: Point, t: number): Point {
  return [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]
}

/**
 * Exact Voronoi cells of `sites` inside a bounding box. Each cell is the box
 * intersected with every bisector half-plane — O(k²), ideal for small k.
 */
export function voronoiCells(sites: readonly Point[], bbox: BBox): Point[][] {
  const box: Point[] = [
    [bbox.xMin, bbox.yMin],
    [bbox.xMax, bbox.yMin],
    [bbox.xMax, bbox.yMax],
    [bbox.xMin, bbox.yMax],
  ]
  return sites.map((s, i) => {
    let cell: Point[] = box
    sites.forEach((t, j) => {
      if (i === j || (t[0] === s[0] && t[1] === s[1])) return
      if (cell.length > 0) cell = clipToBisector(cell, s, t)
    })
    return cell
  })
}

/** Shoelace formula for the area of a simple polygon. */
export function polygonArea(poly: readonly Point[]): number {
  let s = 0
  for (let i = 0; i < poly.length; i++) {
    const [x1, y1] = poly[i]
    const [x2, y2] = poly[(i + 1) % poly.length]
    s += x1 * y2 - x2 * y1
  }
  return Math.abs(s) / 2
}
