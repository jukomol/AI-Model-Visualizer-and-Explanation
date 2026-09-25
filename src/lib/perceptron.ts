/**
 * Rosenblatt's perceptron learning rule (1958).
 *   ŷ = sign(w·x + b);  on a mistake:  w ← w + η y x,  b ← b + η y
 */

export interface PerceptronState {
  w: [number, number]
  b: number
}

export interface PerceptronUpdate {
  epoch: number
  index: number
  mistake: boolean
  before: PerceptronState
  after: PerceptronState
}

export function predictPerceptron(state: PerceptronState, x: readonly number[]): 1 | -1 {
  return state.w[0] * x[0] + state.w[1] * x[1] + state.b >= 0 ? 1 : -1
}

export function perceptronStep(state: PerceptronState, x: readonly number[], y: 1 | -1, lr = 1): { state: PerceptronState; mistake: boolean } {
  const margin = y * (state.w[0] * x[0] + state.w[1] * x[1] + state.b)
  if (margin > 0) return { state, mistake: false }
  return {
    state: { w: [state.w[0] + lr * y * x[0], state.w[1] + lr * y * x[1]], b: state.b + lr * y },
    mistake: true,
  }
}

export interface PerceptronRun {
  updates: PerceptronUpdate[]
  final: PerceptronState
  /** Epoch (1-based) of the first mistake-free pass, or null if never reached. */
  convergedAtEpoch: number | null
  mistakesPerEpoch: number[]
}

export function trainPerceptron(
  points: readonly (readonly number[])[],
  labels: readonly (1 | -1)[],
  maxEpochs = 50,
  lr = 1,
  init: PerceptronState = { w: [0, 0], b: 0 },
): PerceptronRun {
  let state = init
  const updates: PerceptronUpdate[] = []
  const mistakesPerEpoch: number[] = []
  for (let epoch = 1; epoch <= maxEpochs; epoch++) {
    let mistakes = 0
    points.forEach((x, index) => {
      const before = state
      const r = perceptronStep(state, x, labels[index], lr)
      state = r.state
      if (r.mistake) mistakes++
      updates.push({ epoch, index, mistake: r.mistake, before, after: state })
    })
    mistakesPerEpoch.push(mistakes)
    if (mistakes === 0) return { updates, final: state, convergedAtEpoch: epoch, mistakesPerEpoch }
  }
  return { updates, final: state, convergedAtEpoch: null, mistakesPerEpoch }
}
