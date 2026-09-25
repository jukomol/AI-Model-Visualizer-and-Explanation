import { Suspense, type ComponentType, type LazyExoticComponent } from 'react'
import { ErrorBoundary } from './ErrorBoundary'
import { VizSkeleton } from './VizSkeleton'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyComponent = ComponentType<any>

/** Wrap a lazily loaded visualizer so heavy dependencies (TF.js, three.js) load on demand. */
export function withSuspense(Lazy: LazyExoticComponent<AnyComponent>, name: string): AnyComponent {
  function Wrapped(props: Record<string, unknown>) {
    return (
      <ErrorBoundary name={name}>
        <Suspense fallback={<VizSkeleton />}>
          <Lazy {...props} />
        </Suspense>
      </ErrorBoundary>
    )
  }
  Wrapped.displayName = `Lazy(${name})`
  return Wrapped
}

