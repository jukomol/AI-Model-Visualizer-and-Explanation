import { lazy } from 'react'
import { withSuspense, type AnyComponent } from '@/components/viz/withSuspense'

const loaders: Record<string, () => Promise<{ default: AnyComponent }>> = {
  ExplodedNetworkViewer: () => import('./exploded-network/ExplodedNetworkViewer'),
}

export const visualizerComponents: Record<string, AnyComponent> = Object.fromEntries(
  Object.entries(loaders).map(([name, load]) => [name, withSuspense(lazy(load), name)]),
)
