import { useMemo, type ReactNode } from 'react'
import { toast } from '@/components/ui/toaster'
import { getNode } from '@/lib/curriculum'
import { ChallengeContext, useLiveMetrics } from '@/hooks/useChallenge'
import { useProgressStore } from '@/store/useProgressStore'

/** Routes metric reports from embedded visualizers to the current lesson's challenge. */
export function ChallengeProvider({ nodeId, children }: { nodeId: string; children: ReactNode }) {
  const value = useMemo(
    () => ({
      nodeId,
      report: (metric: string, v: number) => {
        const node = getNode(nodeId)
        if (!node || node.challenge.type !== 'metric' || node.challenge.metric !== metric) return
        useLiveMetrics.getState().set(metric, v)
        if (useProgressStore.getState().recordMetric(nodeId, metric, v)) {
          toast({ kind: 'success', title: `Challenge passed — ${node.title} mastered!`, description: 'New concepts may have unlocked on the roadmap.' })
        }
      },
    }),
    [nodeId],
  )
  return <ChallengeContext.Provider value={value}>{children}</ChallengeContext.Provider>
}
