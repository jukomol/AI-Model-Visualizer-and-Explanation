export function VizSkeleton() {
  return (
    <div className="my-8 flex h-72 items-center justify-center rounded-xl border bg-card" role="status" aria-label="Loading visualizer">
      <div className="size-7 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  )
}
