import { describe, expect, it } from 'vitest'
import { argmax, defaultWorld, greedySuccessRate, qLearning, valueIteration, type GridWorld } from './gridworld'
import { createRng } from './random'

describe('value iteration', () => {
  it('matches the closed form on a corridor', () => {
    // 1×4 corridor, goal (+1) at the right end, no step cost.
    const w: GridWorld = { width: 4, height: 1, walls: new Set(), terminals: new Map([[3, 1]]), start: 0, stepReward: 0, slip: 0 }
    const { V } = valueIteration(w, 0.9)
    expect(V[2]).toBeCloseTo(1, 8)
    expect(V[1]).toBeCloseTo(0.9, 8)
    expect(V[0]).toBeCloseTo(0.81, 8)
  })

  it('values in the default world are highest next to the goal', () => {
    const w = defaultWorld()
    const { V } = valueIteration(w, 0.95)
    const nextToGoal = 5 // (5, 0)
    expect(V[nextToGoal]).toBeGreaterThan(V[w.start])
    expect(V[w.start]).toBeGreaterThan(0)
  })
})

describe('Q-learning', () => {
  const opts = { alpha: 0.5, gamma: 0.95, epsilon: 0.3, epsilonDecay: 0.995, maxSteps: 100 }

  it('learns a greedy policy that reaches the goal from every cell (Q-learning challenge)', () => {
    const w = defaultWorld()
    const r = qLearning(w, { ...opts, episodes: 800, exploringStarts: true, rng: createRng(1) })
    expect(greedySuccessRate(w, r.Q)).toBe(1)
    // Always starting in the same corner leaves far-away cells unlearned.
    const fixed = qLearning(w, { ...opts, episodes: 800, rng: createRng(1) })
    expect(greedySuccessRate(w, fixed.Q)).toBeLessThan(1)
    // Returns improve with experience.
    const avg = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length
    expect(avg(r.returns.slice(-50))).toBeGreaterThan(avg(r.returns.slice(0, 50)))
  })

  it('is incomplete after only a few episodes', () => {
    const w = defaultWorld()
    const r = qLearning(w, { ...opts, episodes: 20, exploringStarts: true, rng: createRng(1) })
    expect(greedySuccessRate(w, r.Q)).toBeLessThan(1)
  })

  it('greedy Q agrees with value iteration at the start state', () => {
    const w = defaultWorld()
    const r = qLearning(w, { ...opts, episodes: 2000, epsilon: 0.5, rng: createRng(2) })
    const { V } = valueIteration(w, 0.95)
    expect(Math.max(...r.Q[w.start])).toBeCloseTo(V[w.start], 1)
    expect(argmax([0, 3, 1, 2])).toBe(1)
  })

  it('can continue training from an existing table', () => {
    const w = defaultWorld()
    const a = qLearning(w, { ...opts, episodes: 100, rng: createRng(3) })
    const b = qLearning(w, { ...opts, episodes: 100, rng: createRng(4) }, a.Q)
    expect(b.Q).not.toBe(a.Q)
    expect(b.returns).toHaveLength(100)
  })
})
