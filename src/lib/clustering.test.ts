import { describe, expect, it } from 'vitest'
import {
  assignClusters,
  clipToBisector,
  inertia,
  initCentroids,
  kMeans,
  polygonArea,
  silhouetteScore,
  updateCentroids,
  voronoiCells,
  type Point,
} from './clustering'
import { createRng } from './random'

const blobs = (() => {
  const rng = createRng(5)
  const centers = [
    [-2, -2],
    [2, 2],
    [-2, 2],
    [2, -2],
  ]
  const pts: number[][] = []
  const labels: number[] = []
  centers.forEach((c, k) => {
    for (let i = 0; i < 40; i++) {
      pts.push([c[0] + rng.normal(0, 0.3), c[1] + rng.normal(0, 0.3)])
      labels.push(k)
    }
  })
  return { pts, labels }
})()

describe('k-means building blocks', () => {
  it('assigns points to the nearest centroid', () => {
    expect(assignClusters([[0, 0], [10, 10], [4, 4]], [[0, 0], [10, 10]])).toEqual([0, 1, 0])
  })

  it('moves centroids to cluster means and keeps empty clusters in place', () => {
    const c = updateCentroids([[0, 0], [2, 0], [10, 10]], [0, 0, 1], [[0, 0], [9, 9], [5, 5]])
    expect(c).toEqual([[1, 0], [10, 10], [5, 5]])
  })

  it('computes inertia', () => {
    expect(inertia([[0, 0], [2, 0]], [[1, 0]], [0, 0])).toBe(2)
  })

  it('k-means++ spreads initial centroids across blobs', () => {
    const init = initCentroids(blobs.pts, 4, createRng(11), 'kmeans++')
    const quadrants = new Set(init.map(([x, y]) => `${Math.sign(x)},${Math.sign(y)}`))
    expect(quadrants.size).toBe(4)
  })
})

describe('kMeans', () => {
  it('recovers well-separated blobs and inertia never increases', () => {
    const init = initCentroids(blobs.pts, 4, createRng(2), 'kmeans++')
    const { history, converged } = kMeans(blobs.pts, init)
    expect(converged).toBe(true)
    for (let i = 1; i < history.length; i++) {
      expect(history[i].inertia).toBeLessThanOrEqual(history[i - 1].inertia + 1e-9)
    }
    const final = history[history.length - 1]
    // Each true blob maps to exactly one cluster.
    for (let k = 0; k < 4; k++) {
      const ids = new Set(final.assignments.filter((_, i) => blobs.labels[i] === k))
      expect(ids.size).toBe(1)
    }
  })
})

describe('silhouetteScore', () => {
  it('is high for the true partition and lower for a bad one', () => {
    const good = silhouetteScore(blobs.pts, blobs.labels)
    expect(good).toBeGreaterThan(0.7)
    const bad = silhouetteScore(
      blobs.pts,
      blobs.pts.map((_, i) => i % 4),
    )
    expect(bad).toBeLessThan(0.1)
  })

  it('returns 0 for a single cluster', () => {
    expect(silhouetteScore(blobs.pts, blobs.pts.map(() => 0))).toBe(0)
  })
})

describe('Voronoi partition', () => {
  const bbox = { xMin: -1, xMax: 1, yMin: -1, yMax: 1 }

  it('clips a square by a bisector', () => {
    const square: Point[] = [[-1, -1], [1, -1], [1, 1], [-1, 1]]
    const half = clipToBisector(square, [-0.5, 0], [0.5, 0])
    expect(polygonArea(half)).toBeCloseTo(2)
    half.forEach(([x]) => expect(x).toBeLessThanOrEqual(1e-12))
  })

  it('cells tile the bounding box', () => {
    const rng = createRng(9)
    const sites: Point[] = Array.from({ length: 7 }, () => [rng.uniform(-1, 1), rng.uniform(-1, 1)])
    const cells = voronoiCells(sites, bbox)
    const total = cells.reduce((s, c) => s + polygonArea(c), 0)
    expect(total).toBeCloseTo(4, 8)
  })

  it('every cell vertex is closest (or tied) to its own site', () => {
    const sites: Point[] = [[-0.5, -0.5], [0.5, 0.2], [0, 0.8], [0.7, -0.6]]
    const cells = voronoiCells(sites, bbox)
    cells.forEach((cell, i) => {
      cell.forEach((v) => {
        const own = (v[0] - sites[i][0]) ** 2 + (v[1] - sites[i][1]) ** 2
        sites.forEach((s) => {
          expect(own).toBeLessThanOrEqual((v[0] - s[0]) ** 2 + (v[1] - s[1]) ** 2 + 1e-9)
        })
      })
    })
  })

  it('gives the whole box to a single site', () => {
    expect(polygonArea(voronoiCells([[0.3, 0.3]], bbox)[0])).toBeCloseTo(4)
  })
})
