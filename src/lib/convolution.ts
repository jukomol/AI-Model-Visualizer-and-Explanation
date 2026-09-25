/**
 * 2-D convolution and pooling on single-channel matrices.
 *
 * Like every deep-learning framework, "convolution" here is technically
 * cross-correlation: the kernel is *not* flipped.
 *   Y[i, j] = Σ_u Σ_v K[u, v] · X[i·s + u − p, j·s + v − p]
 */

export type Grid = number[][]
export type Padding = 'valid' | 'same' | number

/** Output length along one axis: ⌊(n + 2p − k) / s⌋ + 1. */
export function convOutputSize(n: number, k: number, stride = 1, pad = 0): number {
  return Math.floor((n + 2 * pad - k) / stride) + 1
}

/** Resolve a padding mode to the number of zero rows/cols added on each side. */
export function resolvePadding(padding: Padding, kernelSize: number): number {
  if (padding === 'valid') return 0
  if (padding === 'same') return Math.floor((kernelSize - 1) / 2)
  return padding
}

export interface ConvOptions {
  stride?: number
  padding?: Padding
}

export interface ConvWindow {
  /** Output coordinates. */
  row: number
  col: number
  /** Top-left input coordinate of the receptive field (may be negative with padding). */
  inputRow: number
  inputCol: number
  /** The k×k input patch (zeros where padded). */
  patch: Grid
  /** Element-wise products K ⊙ patch. */
  products: Grid
  /** Σ products — the output value. */
  sum: number
}

function at(x: Grid, r: number, c: number): number {
  return r >= 0 && r < x.length && c >= 0 && c < x[0].length ? x[r][c] : 0
}

/** Compute a single output position with every intermediate product exposed. */
export function convWindow(input: Grid, kernel: Grid, row: number, col: number, options: ConvOptions = {}): ConvWindow {
  const stride = options.stride ?? 1
  const kh = kernel.length
  const kw = kernel[0].length
  const pad = resolvePadding(options.padding ?? 'valid', kh)
  const inputRow = row * stride - pad
  const inputCol = col * stride - pad
  const patch: Grid = []
  const products: Grid = []
  let sum = 0
  for (let u = 0; u < kh; u++) {
    patch.push([])
    products.push([])
    for (let v = 0; v < kw; v++) {
      const x = at(input, inputRow + u, inputCol + v)
      const p = kernel[u][v] * x
      patch[u].push(x)
      products[u].push(p)
      sum += p
    }
  }
  return { row, col, inputRow, inputCol, patch, products, sum }
}

export function conv2d(input: Grid, kernel: Grid, options: ConvOptions = {}): Grid {
  const stride = options.stride ?? 1
  const kh = kernel.length
  const kw = kernel[0].length
  const pad = resolvePadding(options.padding ?? 'valid', kh)
  const outH = convOutputSize(input.length, kh, stride, pad)
  const outW = convOutputSize(input[0].length, kw, stride, pad)
  if (outH <= 0 || outW <= 0) throw new Error('conv2d: kernel larger than padded input')
  const out: Grid = []
  for (let i = 0; i < outH; i++) {
    out.push([])
    for (let j = 0; j < outW; j++) out[i].push(convWindow(input, kernel, i, j, { stride, padding: pad }).sum)
  }
  return out
}

export type PoolMode = 'max' | 'avg'

export interface PoolResult {
  output: Grid
  /** For max pooling: the input coordinate that won each window. */
  argmax: Array<Array<[number, number]>>
}

export function pool2d(input: Grid, size: number, stride = size, mode: PoolMode = 'max'): PoolResult {
  const outH = convOutputSize(input.length, size, stride)
  const outW = convOutputSize(input[0].length, size, stride)
  if (outH <= 0 || outW <= 0) throw new Error('pool2d: window larger than input')
  const output: Grid = []
  const argmax: Array<Array<[number, number]>> = []
  for (let i = 0; i < outH; i++) {
    output.push([])
    argmax.push([])
    for (let j = 0; j < outW; j++) {
      let best = -Infinity
      let bestPos: [number, number] = [i * stride, j * stride]
      let sum = 0
      for (let u = 0; u < size; u++) {
        for (let v = 0; v < size; v++) {
          const r = i * stride + u
          const c = j * stride + v
          const x = input[r][c]
          sum += x
          if (x > best) {
            best = x
            bestPos = [r, c]
          }
        }
      }
      output[i].push(mode === 'max' ? best : sum / (size * size))
      argmax[i].push(bestPos)
    }
  }
  return { output, argmax }
}

export function relu(g: Grid): Grid {
  return g.map((row) => row.map((v) => Math.max(0, v)))
}

/** Classic hand-designed 3×3 kernels used in the convolution lesson. */
export const KERNELS: Record<string, { name: string; kernel: Grid; description: string }> = {
  identity: {
    name: 'Identity',
    kernel: [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ],
    description: 'Copies the centre pixel — the output equals the input.',
  },
  sobelX: {
    name: 'Sobel X (vertical edges)',
    kernel: [
      [-1, 0, 1],
      [-2, 0, 2],
      [-1, 0, 1],
    ],
    description: 'Horizontal intensity gradient: responds to vertical edges.',
  },
  sobelY: {
    name: 'Sobel Y (horizontal edges)',
    kernel: [
      [-1, -2, -1],
      [0, 0, 0],
      [1, 2, 1],
    ],
    description: 'Vertical intensity gradient: responds to horizontal edges.',
  },
  laplacian: {
    name: 'Laplacian (all edges)',
    kernel: [
      [0, 1, 0],
      [1, -4, 1],
      [0, 1, 0],
    ],
    description: 'Second derivative: zero on flat regions and linear ramps, large at edges.',
  },
  sharpen: {
    name: 'Sharpen',
    kernel: [
      [0, -1, 0],
      [-1, 5, -1],
      [0, -1, 0],
    ],
    description: 'Identity minus the Laplacian: boosts local contrast.',
  },
  boxBlur: {
    name: 'Box blur',
    kernel: [
      [1 / 9, 1 / 9, 1 / 9],
      [1 / 9, 1 / 9, 1 / 9],
      [1 / 9, 1 / 9, 1 / 9],
    ],
    description: 'Uniform average of the 3×3 neighbourhood.',
  },
  gaussian: {
    name: 'Gaussian blur',
    kernel: [
      [1 / 16, 2 / 16, 1 / 16],
      [2 / 16, 4 / 16, 2 / 16],
      [1 / 16, 2 / 16, 1 / 16],
    ],
    description: 'Binomial approximation of a Gaussian: smooths while preserving structure.',
  },
}
