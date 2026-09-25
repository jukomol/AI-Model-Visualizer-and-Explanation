import LZString from 'lz-string'
import { describe, expect, it } from 'vitest'
import { decodeState, encodeState, generateBookmarkUrl, hydrateFromUrl, stripBookmarkParam, type BookmarkState } from './bookmark'

const state: BookmarkState = {
  masteredNodes: ['linear-regression', 'gradient-descent', 'perceptron'],
  activeNode: 'svm',
  challengeBest: { 'linreg-mse-anscombe1': 1.27 },
}

describe('bookmark compression', () => {
  it('round-trips through encode / decode', () => {
    expect(decodeState(encodeState(state))).toEqual(state)
  })

  it('produces URL-safe output that is shorter than the raw JSON', () => {
    const big: BookmarkState = { ...state, masteredNodes: Array.from({ length: 19 }, (_, i) => `node-number-${i}`) }
    const enc = encodeState(big)
    expect(enc).toMatch(/^[A-Za-z0-9+\-$]*$/)
    expect(enc.length).toBeLessThan(JSON.stringify(big).length)
  })

  it('rejects garbage, wrong versions and wrong shapes', () => {
    expect(decodeState('not-a-bookmark')).toBeNull()
    expect(decodeState('')).toBeNull()
    expect(decodeState(LZString.compressToEncodedURIComponent('{"v":99,"m":[]}'))).toBeNull()
    expect(decodeState(LZString.compressToEncodedURIComponent('{"v":1,"m":"oops"}'))).toBeNull()
    expect(decodeState(LZString.compressToEncodedURIComponent('[1,2,3]'))).toBeNull()
  })

  it('sanitises tampered payloads', () => {
    const tampered = LZString.compressToEncodedURIComponent(
      JSON.stringify({ v: 1, m: ['perceptron', '<script>', 42, 'perceptron', 'unknown-node'], a: '../../etc', c: { ok: 1, bad: 'x', 'x y': 3 } }),
    )
    const decoded = decodeState(tampered, (id) => id !== 'unknown-node')
    expect(decoded).toEqual({ masteredNodes: ['perceptron'], activeNode: null, challengeBest: { ok: 1 } })
  })
})

describe('bookmark URLs', () => {
  it('places ?save= before the hash so hash routes keep working', () => {
    const url = generateBookmarkUrl(state, 'https://user.github.io/repo/#/learn/svm')
    const parsed = new URL(url)
    expect(parsed.hash).toBe('#/learn/svm')
    expect(parsed.searchParams.get('save')).toBeTruthy()
    expect(hydrateFromUrl(url)).toEqual(state)
  })

  it('also reads a save parameter inside the hash query', () => {
    const url = `https://user.github.io/repo/#/roadmap?save=${encodeState(state)}`
    expect(hydrateFromUrl(url)).toEqual(state)
  })

  it('returns null when there is nothing to hydrate', () => {
    expect(hydrateFromUrl('https://user.github.io/repo/#/')).toBeNull()
    expect(hydrateFromUrl('not a url')).toBeNull()
  })

  it('strips the parameter from both locations', () => {
    const enc = encodeState(state)
    expect(stripBookmarkParam(`https://x.dev/app/?save=${enc}&keep=1#/a`)).toBe('https://x.dev/app/?keep=1#/a')
    expect(stripBookmarkParam(`https://x.dev/app/#/a?save=${enc}`)).toBe('https://x.dev/app/#/a')
  })
})
