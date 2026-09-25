import { createContext, useContext } from 'react'
import { create } from 'zustand'

export interface ChallengeContextValue {
  nodeId: string
  report: (metric: string, value: number) => void
}

export const ChallengeContext = createContext<ChallengeContextValue | null>(null)

const noop = () => {}

/**
 * Visualizers call `report(metric, value)` whenever they compute a metric.
 * Inside a lesson the report is checked against that lesson's challenge;
 * elsewhere (e.g. the sandbox) it is a no-op.
 */
export function useChallengeReporter(): (metric: string, value: number) => void {
  return useContext(ChallengeContext)?.report ?? noop
}

/** Latest live metric values (not persisted) for the challenge panel readout. */
export const useLiveMetrics = create<{ values: Record<string, number>; set: (metric: string, value: number) => void }>((set) => ({
  values: {},
  set: (metric, value) => set((s) => (s.values[metric] === value ? s : { values: { ...s.values, [metric]: value } })),
}))
