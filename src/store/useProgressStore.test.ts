// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest'
import { initialProgress, useProgressStore } from './useProgressStore'

beforeEach(() => {
  localStorage.clear()
  useProgressStore.setState({ ...initialProgress })
})

describe('useProgressStore', () => {
  it('marks nodes mastered once and ignores unknown ids', () => {
    const s = useProgressStore.getState()
    s.markMastered('perceptron')
    s.markMastered('perceptron')
    s.markMastered('not-a-node')
    expect(useProgressStore.getState().masteredNodes).toEqual(['perceptron'])
  })

  it('records the best metric and masters the node when the challenge passes', () => {
    const { recordMetric } = useProgressStore.getState()
    expect(recordMetric('linear-regression', 'linreg-mse-anscombe1', 5)).toBe(false)
    expect(recordMetric('linear-regression', 'linreg-mse-anscombe1', 7)).toBe(false)
    expect(useProgressStore.getState().challengeBest['linreg-mse-anscombe1']).toBe(5)
    expect(recordMetric('linear-regression', 'linreg-mse-anscombe1', 1.28)).toBe(true)
    expect(useProgressStore.getState().masteredNodes).toContain('linear-regression')
    // Already mastered: not "newly" passed.
    expect(recordMetric('linear-regression', 'linreg-mse-anscombe1', 1.26)).toBe(false)
  })

  it('does not master a node whose prerequisites are unmet', () => {
    const { recordMetric } = useProgressStore.getState()
    expect(recordMetric('gradient-descent', 'gd-rosenbrock-loss', 0.001)).toBe(false)
    expect(useProgressStore.getState().challengeBest['gd-rosenbrock-loss']).toBe(0.001)
    useProgressStore.getState().markMastered('linear-regression')
    expect(recordMetric('gradient-descent', 'gd-rosenbrock-loss', 0.001)).toBe(true)
  })

  it('ignores metrics that do not belong to the node', () => {
    expect(useProgressStore.getState().recordMetric('linear-regression', 'mlp-accuracy-spiral', 1)).toBe(false)
    expect(useProgressStore.getState().masteredNodes).toEqual([])
  })

  it('persists to localStorage', () => {
    useProgressStore.getState().markMastered('k-means')
    const raw = JSON.parse(localStorage.getItem('mlviz-progress') ?? '{}')
    expect(raw.state.masteredNodes).toEqual(['k-means'])
    expect(raw.version).toBe(1)
  })

  it('applies bookmarks by replacing or merging', () => {
    const s = useProgressStore.getState()
    s.markMastered('k-means')
    s.recordMetric('linear-regression', 'linreg-mse-anscombe1', 2)
    const bookmark = { masteredNodes: ['perceptron', 'bogus'], activeNode: 'svm', challengeBest: { 'linreg-mse-anscombe1': 1.5 } }
    useProgressStore.getState().applyBookmark(bookmark, 'merge')
    let st = useProgressStore.getState()
    expect(st.masteredNodes.sort()).toEqual(['k-means', 'perceptron'])
    expect(st.challengeBest['linreg-mse-anscombe1']).toBe(1.5)
    useProgressStore.getState().applyBookmark(bookmark, 'replace')
    st = useProgressStore.getState()
    expect(st.masteredNodes).toEqual(['perceptron'])
    expect(st.activeNode).toBe('svm')
  })

  it('resets progress but keeps the theme', () => {
    const s = useProgressStore.getState()
    s.toggleTheme()
    s.markMastered('pca')
    s.resetProgress()
    expect(useProgressStore.getState().masteredNodes).toEqual([])
    expect(useProgressStore.getState().theme).toBe('light')
  })
})
