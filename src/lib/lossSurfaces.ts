/**
 * Two-parameter loss surfaces with analytic gradients, used to visualise how
 * optimisers navigate curvature, valleys and multiple minima.
 */

export interface LossSurface {
  id: string
  name: string
  description: string
  f: (x: number, y: number) => number
  grad: (x: number, y: number) => [number, number]
  domain: { xMin: number; xMax: number; yMin: number; yMax: number }
  start: [number, number]
  /** Known global minima (for reference markers and tests). */
  minima: Array<[number, number]>
  /** Monotone transform for display so steep walls do not flatten the view. */
  display: (z: number) => number
}

export const SURFACES: Record<string, LossSurface> = {
  bowl: {
    id: 'bowl',
    name: 'Elongated bowl',
    description: 'An ill-conditioned quadratic ½(x² + 10y²). Plain SGD zig-zags across the steep axis.',
    f: (x, y) => 0.5 * (x * x + 10 * y * y),
    grad: (x, y) => [x, 10 * y],
    domain: { xMin: -3, xMax: 3, yMin: -1.5, yMax: 1.5 },
    start: [-2.7, 1.2],
    minima: [[0, 0]],
    display: (z) => Math.sqrt(z),
  },
  rosenbrock: {
    id: 'rosenbrock',
    name: 'Rosenbrock valley',
    description: '(1 − x)² + 100(y − x²)²: a narrow curved valley whose floor is almost flat.',
    f: (x, y) => (1 - x) ** 2 + 100 * (y - x * x) ** 2,
    grad: (x, y) => [-2 * (1 - x) - 400 * x * (y - x * x), 200 * (y - x * x)],
    domain: { xMin: -2, xMax: 2, yMin: -1, yMax: 3 },
    start: [-1.5, 2.5],
    minima: [[1, 1]],
    display: (z) => Math.log1p(z),
  },
  himmelblau: {
    id: 'himmelblau',
    name: "Himmelblau's function",
    description: '(x² + y − 11)² + (x + y² − 7)²: four global minima — where you start decides where you end.',
    f: (x, y) => (x * x + y - 11) ** 2 + (x + y * y - 7) ** 2,
    grad: (x, y) => [
      4 * x * (x * x + y - 11) + 2 * (x + y * y - 7),
      2 * (x * x + y - 11) + 4 * y * (x + y * y - 7),
    ],
    domain: { xMin: -5, xMax: 5, yMin: -5, yMax: 5 },
    start: [-0.5, -0.5],
    minima: [
      [3, 2],
      [-2.805118, 3.131312],
      [-3.77931, -3.283186],
      [3.584428, -1.848126],
    ],
    display: (z) => Math.log1p(z),
  },
  saddle: {
    id: 'saddle',
    name: 'Saddle + quartic walls',
    description: 'x²·0.5 − y² + y⁴/4: a saddle point at the origin with minima at y = ±√2.',
    f: (x, y) => 0.5 * x * x - y * y + (y ** 4) / 4 + 1,
    grad: (x, y) => [x, -2 * y + y ** 3],
    domain: { xMin: -2, xMax: 2, yMin: -2.2, yMax: 2.2 },
    start: [-1.8, 0.001],
    minima: [
      [0, Math.SQRT2],
      [0, -Math.SQRT2],
    ],
    display: (z) => z,
  },
}

/** Central finite-difference gradient, used to verify analytic gradients. */
export function numericGradient(f: (x: number, y: number) => number, x: number, y: number, h = 1e-5): [number, number] {
  return [(f(x + h, y) - f(x - h, y)) / (2 * h), (f(x, y + h) - f(x, y - h)) / (2 * h)]
}
