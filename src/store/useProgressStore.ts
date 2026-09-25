/**
 * Learner progress, persisted to localStorage via zustand's persist middleware.
 */
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { BookmarkState } from '@/lib/bookmark'
import { checkMetric, curriculum, getNode, isKnownNode, type MetricChallenge } from '@/lib/curriculum'

export type Theme = 'dark' | 'light'

export interface ProgressState {
  masteredNodes: string[]
  activeNode: string | null
  /** Best value seen per challenge metric (lower or higher is better per challenge). */
  challengeBest: Record<string, number>
  theme: Theme
}

export interface ProgressActions {
  setActiveNode: (id: string | null) => void
  markMastered: (id: string) => void
  unmaster: (id: string) => void
  /** Record a metric; returns true when this report newly passes a node's challenge. */
  recordMetric: (nodeId: string, metric: string, value: number) => boolean
  toggleTheme: () => void
  resetProgress: () => void
  /** Replace or merge progress from a shared bookmark. */
  applyBookmark: (bookmark: BookmarkState, mode: 'replace' | 'merge') => void
}

export const initialProgress: ProgressState = {
  masteredNodes: [],
  activeNode: null,
  challengeBest: {},
  theme: 'dark',
}

const metricChallenges = new Map(
  curriculum.nodes.flatMap((n) => (n.challenge.type === 'metric' ? [[n.challenge.metric, n.challenge] as const] : [])),
)

function better(challenge: MetricChallenge, a: number | undefined, b: number): number {
  if (a === undefined || !Number.isFinite(a)) return b
  return challenge.comparator === 'lte' ? Math.min(a, b) : Math.max(a, b)
}

export const useProgressStore = create<ProgressState & ProgressActions>()(
  persist(
    (set, get) => ({
      ...initialProgress,
      setActiveNode: (id) => set({ activeNode: id && isKnownNode(id) ? id : null }),
      markMastered: (id) => {
        if (!isKnownNode(id) || get().masteredNodes.includes(id)) return
        set({ masteredNodes: [...get().masteredNodes, id] })
      },
      unmaster: (id) => set({ masteredNodes: get().masteredNodes.filter((m) => m !== id) }),
      recordMetric: (nodeId, metric, value) => {
        const node = getNode(nodeId)
        if (!node || node.challenge.type !== 'metric' || node.challenge.metric !== metric || !Number.isFinite(value)) return false
        const challenge = node.challenge
        const prev = get().challengeBest[metric]
        const best = better(challenge, prev, value)
        if (best !== prev) set({ challengeBest: { ...get().challengeBest, [metric]: best } })
        const unlocked = node.prerequisites.every((p) => get().masteredNodes.includes(p))
        if (unlocked && checkMetric(challenge, value) && !get().masteredNodes.includes(nodeId)) {
          set({ masteredNodes: [...get().masteredNodes, nodeId] })
          return true
        }
        return false
      },
      toggleTheme: () => set({ theme: get().theme === 'dark' ? 'light' : 'dark' }),
      resetProgress: () => set({ masteredNodes: [], activeNode: null, challengeBest: {} }),
      applyBookmark: (bookmark, mode) => {
        const valid = bookmark.masteredNodes.filter(isKnownNode)
        if (mode === 'replace') {
          set({ masteredNodes: valid, activeNode: bookmark.activeNode, challengeBest: { ...bookmark.challengeBest } })
          return
        }
        const mergedBest = { ...get().challengeBest }
        for (const [k, v] of Object.entries(bookmark.challengeBest)) {
          const challenge = metricChallenges.get(k)
          if (challenge) mergedBest[k] = better(challenge, mergedBest[k], v)
        }
        set({
          masteredNodes: Array.from(new Set([...get().masteredNodes, ...valid])),
          activeNode: get().activeNode ?? bookmark.activeNode,
          challengeBest: mergedBest,
        })
      },
    }),
    {
      name: 'mlviz-progress',
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: ({ masteredNodes, activeNode, challengeBest, theme }) => ({ masteredNodes, activeNode, challengeBest, theme }),
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<ProgressState>
        return {
          ...current,
          masteredNodes: Array.isArray(p.masteredNodes) ? p.masteredNodes.filter((id) => typeof id === 'string' && isKnownNode(id)) : [],
          activeNode: typeof p.activeNode === 'string' && isKnownNode(p.activeNode) ? p.activeNode : null,
          challengeBest: p.challengeBest && typeof p.challengeBest === 'object' ? p.challengeBest : {},
          theme: p.theme === 'light' ? 'light' : 'dark',
        }
      },
    },
  ),
)

export function bookmarkFromState(s: ProgressState): BookmarkState {
  return { masteredNodes: s.masteredNodes, activeNode: s.activeNode, challengeBest: s.challengeBest }
}
