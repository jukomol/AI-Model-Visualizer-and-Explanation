/**
 * Long Short-Term Memory cell (Hochreiter & Schmidhuber, 1997; forget gate by
 * Gers, Schmidhuber & Cummins, 2000).
 *   i = σ(W_i x + U_i h + b_i)     input gate
 *   f = σ(W_f x + U_f h + b_f)     forget gate
 *   o = σ(W_o x + U_o h + b_o)     output gate
 *   g = tanh(W_g x + U_g h + b_g)  candidate
 *   c′ = f ⊙ c + i ⊙ g
 *   h′ = o ⊙ tanh(c′)
 */
import { sigmoid } from './regression'

export interface GateParams {
  W: number[][]
  U: number[][]
  b: number[]
}

export interface LstmParams {
  input: GateParams
  forget: GateParams
  output: GateParams
  candidate: GateParams
}

export interface LstmStep {
  i: number[]
  f: number[]
  o: number[]
  g: number[]
  c: number[]
  h: number[]
}

function affine(p: GateParams, x: readonly number[], h: readonly number[]): number[] {
  return p.b.map((b, j) => b + p.W[j].reduce((s, w, k) => s + w * x[k], 0) + p.U[j].reduce((s, u, k) => s + u * h[k], 0))
}

export function lstmStep(params: LstmParams, x: readonly number[], hPrev: readonly number[], cPrev: readonly number[]): LstmStep {
  const i = affine(params.input, x, hPrev).map(sigmoid)
  const f = affine(params.forget, x, hPrev).map(sigmoid)
  const o = affine(params.output, x, hPrev).map(sigmoid)
  const g = affine(params.candidate, x, hPrev).map(Math.tanh)
  const c = cPrev.map((cj, j) => f[j] * cj + i[j] * g[j])
  const h = c.map((cj, j) => o[j] * Math.tanh(cj))
  return { i, f, o, g, c, h }
}

/** Scalar (1-unit, 1-input) parameters, convenient for the interactive cell diagram. */
export function scalarLstm(p: Record<'input' | 'forget' | 'output' | 'candidate', { w: number; u: number; b: number }>): LstmParams {
  const gate = (g: { w: number; u: number; b: number }): GateParams => ({ W: [[g.w]], U: [[g.u]], b: [g.b] })
  return { input: gate(p.input), forget: gate(p.forget), output: gate(p.output), candidate: gate(p.candidate) }
}

export function runLstm(params: LstmParams, xs: readonly number[][], h0: number[], c0: number[]): LstmStep[] {
  const out: LstmStep[] = []
  let h = h0
  let c = c0
  for (const x of xs) {
    const s = lstmStep(params, x, h, c)
    out.push(s)
    h = s.h
    c = s.c
  }
  return out
}

/**
 * Along the cell-state "conveyor belt" the direct gradient path is
 * ∂c_T/∂c_t = Π_{k=t+1}^{T} f_k  (element-wise), which stays near 1 when the
 * forget gate is open — the reason LSTMs remember over long spans.
 */
export function cellStateGradient(steps: readonly LstmStep[]): number[] {
  const T = steps.length
  const out = new Array<number>(T + 1).fill(1)
  for (let t = T - 1; t >= 0; t--) out[t] = out[t + 1] * steps[t].f[0]
  return out
}
