import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from 'react'
import { ErrorBoundary } from '@/components/viz/ErrorBoundary'

function VizSkeleton() {
  return (
    <div className="my-8 flex h-72 items-center justify-center rounded-xl border bg-card" role="status" aria-label="Loading visualizer">
      <div className="size-7 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyComponent = ComponentType<any>

/** Wrap a lazily loaded visualizer so heavy dependencies (TF.js, three.js) load on demand. */
function withSuspense(Lazy: LazyExoticComponent<AnyComponent>, name: string): AnyComponent {
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

const loaders: Record<string, () => Promise<{ default: AnyComponent }>> = {}

export const visualizerComponents: Record<string, AnyComponent> = Object.fromEntries(
  Object.entries(loaders).map(([name, load]) => [name, withSuspense(lazy(load), name)]),
)
