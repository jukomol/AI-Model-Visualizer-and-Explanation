/**
 * A small deterministic (optionally slippery) grid world for reinforcement
 * learning: value iteration (Bellman, 1957) and tabular Q-learning
 * (Watkins & Dayan, 1992).
 */
import type { Rng } from './random'

export type Action = 0 | 1 | 2 | 3
export const ACTIONS: Action[] = [0, 1, 2, 3]
export const ACTION_NAMES = ['up', 'right', 'down', 'left'] as const
const DELTA: Record<Action, [number, number]> = { 0: [0, -1], 1: [1, 0], 2: [0, 1], 3: [-1, 0] }

export interface GridWorld {
  width: number
  height: number
  walls: ReadonlySet<number>
  terminals: ReadonlyMap<number, number>
  start: number
  stepReward: number
  /** Probability that the agent slips to a random perpendicular direction. */
  slip: number
}

export const cellIndex = (w: GridWorld, x: number, y: number) => y * w.width + x
export const cellXY = (w: GridWorld, s: number): [number, number] => [s % w.width, Math.floor(s / w.width)]

export function defaultWorld(slip = 0): GridWorld {
  const width = 7
  const height = 5
  const at = (x: number, y: number) => y * width + x
  return {
    width,
    height,
    walls: new Set([at(2, 1), at(2, 2), at(2, 3), at(4, 1), at(4, 3)]),
    terminals: new Map([
      [at(6, 0), 1],
      [at(6, 2), -1],
      [at(3, 4), -1],
    ]),
    start: at(0, 4),
    stepReward: -0.04,
    slip,
  }
}

function move(w: GridWorld, s: number, a: Action): number {
  const [x, y] = cellXY(w, s)
  const [dx, dy] = DELTA[a]
  const nx = x + dx
  const ny = y + dy
  if (nx < 0 || ny < 0 || nx >= w.width || ny >= w.height) return s
  const n = cellIndex(w, nx, ny)
  return w.walls.has(n) ? s : n
}

/** Outcome distribution of taking action a in state s. */
export function transitions(w: GridWorld, s: number, a: Action): Array<{ p: number; next: number }> {
  if (w.slip === 0) return [{ p: 1, next: move(w, s, a) }]
  const perp = [((a + 1) % 4) as Action, ((a + 3) % 4) as Action]
  return [
    { p: 1 - w.slip, next: move(w, s, a) },
    { p: w.slip / 2, next: move(w, s, perp[0]) },
    { p: w.slip / 2, next: move(w, s, perp[1]) },
  ]
}

export function reward(w: GridWorld, next: number): number {
  return w.terminals.get(next) ?? w.stepReward
}

export function isTerminal(w: GridWorld, s: number): boolean {
  return w.terminals.has(s)
}

export function step(w: GridWorld, s: number, a: Action, rng: Rng): { next: number; reward: number; done: boolean } {
  let r = rng.next()
  let next = s
  for (const t of transitions(w, s, a)) {
    r -= t.p
    next = t.next
    if (r <= 0) break
  }
  return { next, reward: reward(w, next), done: isTerminal(w, next) }
}

/** Value iteration: V(s) ← max_a Σ p(s′|s,a)[r(s′) + γ V(s′)]. */
export function valueIteration(w: GridWorld, gamma: number, tol = 1e-9, maxIter = 10_000): { V: number[]; iterations: number } {
  const n = w.width * w.height
  let V = new Array<number>(n).fill(0)
  for (let it = 1; it <= maxIter; it++) {
    let delta = 0
    const next = V.slice()
    for (let s = 0; s < n; s++) {
      if (w.walls.has(s) || isTerminal(w, s)) continue
      next[s] = Math.max(...ACTIONS.map((a) => transitions(w, s, a).reduce((acc, t) => acc + t.p * (reward(w, t.next) + (isTerminal(w, t.next) ? 0 : gamma * V[t.next])), 0)))
      delta = Math.max(delta, Math.abs(next[s] - V[s]))
    }
    V = next
    if (delta < tol) return { V, iterations: it }
  }
  return { V, iterations: maxIter }
}

export interface QLearningOptions {
  episodes: number
  alpha: number
  gamma: number
  epsilon: number
  /** Multiply ε by this after every episode. */
  epsilonDecay: number
  maxSteps: number
  rng: Rng
  /** Start each episode in a random free cell ("exploring starts") instead of `start`. */
  exploringStarts?: boolean
}

export interface QLearningResult {
  Q: number[][]
  returns: number[]
  lengths: number[]
}

export function argmax(values: readonly number[]): number {
  let best = 0
  for (let i = 1; i < values.length; i++) if (values[i] > values[best]) best = i
  return best
}

/**
 * Tabular Q-learning with ε-greedy exploration:
 *   Q(s,a) ← Q(s,a) + α [r + γ max_a′ Q(s′,a′) − Q(s,a)]
 * Continues from `init` when given, so training can proceed in chunks.
 */
export function qLearning(w: GridWorld, o: QLearningOptions, init?: number[][]): QLearningResult {
  const n = w.width * w.height
  const Q = init ? init.map((r) => r.slice()) : Array.from({ length: n }, () => [0, 0, 0, 0])
  const returns: number[] = []
  const lengths: number[] = []
  let eps = o.epsilon
  const free = Array.from({ length: n }, (_, s) => s).filter((s) => !w.walls.has(s) && !isTerminal(w, s))
  for (let ep = 0; ep < o.episodes; ep++) {
    let s = o.exploringStarts ? free[o.rng.int(free.length)] : w.start
    let total = 0
    let t = 0
    for (; t < o.maxSteps; t++) {
      const a = (o.rng.next() < eps ? o.rng.int(4) : argmax(Q[s])) as Action
      const { next, reward: r, done } = step(w, s, a, o.rng)
      const target = r + (done ? 0 : o.gamma * Math.max(...Q[next]))
      Q[s][a] += o.alpha * (target - Q[s][a])
      total += r
      s = next
      if (done) break
    }
    returns.push(total)
    lengths.push(t + 1)
    eps *= o.epsilonDecay
  }
  return { Q, returns, lengths }
}

/** Fraction of non-terminal, non-wall cells from which the greedy policy reaches the +1 goal. */
export function greedySuccessRate(w: GridWorld, Q: readonly (readonly number[])[], maxSteps = 60): number {
  let ok = 0
  let total = 0
  for (let s0 = 0; s0 < w.width * w.height; s0++) {
    if (w.walls.has(s0) || isTerminal(w, s0)) continue
    total++
    let s = s0
    for (let t = 0; t < maxSteps && !isTerminal(w, s); t++) s = move(w, s, argmax(Q[s]) as Action)
    if ((w.terminals.get(s) ?? 0) > 0) ok++
  }
  return ok / total
}
