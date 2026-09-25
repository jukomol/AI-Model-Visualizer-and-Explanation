/**
 * Shareable session bookmarks: the learner's progress is serialised to JSON,
 * compressed with lz-string into a URL-safe string and stored in the
 * `?save=` query parameter.
 */
import LZString from 'lz-string'

export const BOOKMARK_PARAM = 'save'
export const BOOKMARK_VERSION = 1

export interface BookmarkState {
  masteredNodes: string[]
  activeNode: string | null
  /** Best metric value achieved per challenge metric. */
  challengeBest: Record<string, number>
}

interface WireFormat {
  v: number
  m: string[]
  a: string | null
  c?: Record<string, number>
}

export function encodeState(state: BookmarkState): string {
  const wire: WireFormat = { v: BOOKMARK_VERSION, m: state.masteredNodes, a: state.activeNode }
  if (Object.keys(state.challengeBest).length > 0) wire.c = state.challengeBest
  return LZString.compressToEncodedURIComponent(JSON.stringify(wire))
}

const ID_PATTERN = /^[a-z0-9-]{1,64}$/

/** Decode and validate; returns null for anything malformed or tampered with. */
export function decodeState(encoded: string, isValidNode: (id: string) => boolean = () => true): BookmarkState | null {
  let json: string | null
  try {
    json = LZString.decompressFromEncodedURIComponent(encoded)
  } catch {
    return null
  }
  if (!json) return null
  let wire: unknown
  try {
    wire = JSON.parse(json)
  } catch {
    return null
  }
  if (typeof wire !== 'object' || wire === null) return null
  const w = wire as Partial<WireFormat>
  if (w.v !== BOOKMARK_VERSION || !Array.isArray(w.m)) return null
  const masteredNodes = Array.from(
    new Set(w.m.filter((id): id is string => typeof id === 'string' && ID_PATTERN.test(id) && isValidNode(id))),
  )
  const activeNode = typeof w.a === 'string' && ID_PATTERN.test(w.a) && isValidNode(w.a) ? w.a : null
  const challengeBest: Record<string, number> = {}
  if (w.c && typeof w.c === 'object') {
    for (const [k, v] of Object.entries(w.c)) {
      if (ID_PATTERN.test(k) && typeof v === 'number' && Number.isFinite(v)) challengeBest[k] = v
    }
  }
  return { masteredNodes, activeNode, challengeBest }
}

/**
 * Build a shareable URL. The `save` parameter goes in the real query string
 * (before the `#`), so it survives hash-based routing on GitHub Pages.
 */
export function generateBookmarkUrl(state: BookmarkState, baseUrl: string = window.location.href): string {
  const url = new URL(baseUrl)
  url.searchParams.set(BOOKMARK_PARAM, encodeState(state))
  return url.toString()
}

/** Read `?save=` from either the query string or a query inside the hash route. */
export function hydrateFromUrl(
  href: string = window.location.href,
  isValidNode: (id: string) => boolean = () => true,
): BookmarkState | null {
  let url: URL
  try {
    url = new URL(href)
  } catch {
    return null
  }
  let encoded = url.searchParams.get(BOOKMARK_PARAM)
  if (!encoded && url.hash.includes('?')) {
    encoded = new URLSearchParams(url.hash.slice(url.hash.indexOf('?') + 1)).get(BOOKMARK_PARAM)
  }
  return encoded ? decodeState(encoded, isValidNode) : null
}

/** The same URL with the bookmark parameter removed (from query and hash). */
export function stripBookmarkParam(href: string): string {
  const url = new URL(href)
  url.searchParams.delete(BOOKMARK_PARAM)
  if (url.hash.includes('?')) {
    const [path, query] = [url.hash.slice(0, url.hash.indexOf('?')), url.hash.slice(url.hash.indexOf('?') + 1)]
    const params = new URLSearchParams(query)
    params.delete(BOOKMARK_PARAM)
    const rest = params.toString()
    url.hash = rest ? `${path}?${rest}` : path
  }
  return url.toString()
}
