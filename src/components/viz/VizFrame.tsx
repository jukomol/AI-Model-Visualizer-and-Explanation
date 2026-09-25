import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface VizFrameProps {
  title: string
  description?: ReactNode
  /** Controls rendered in a side column on wide screens and above the stage on narrow ones. */
  controls?: ReactNode
  children: ReactNode
  footer?: ReactNode
  className?: string
  /** Put controls below the stage instead of beside it. */
  stacked?: boolean
}

/** Consistent chrome for every interactive visualizer embedded in lessons. */
export function VizFrame({ title, description, controls, children, footer, className, stacked }: VizFrameProps) {
  return (
    <section
      className={cn('not-prose my-8 overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm', className)}
      aria-label={title}
    >
      <header className="border-b bg-muted/40 px-4 py-3 sm:px-5">
        <h3 className="text-base font-semibold tracking-tight">{title}</h3>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </header>
      <div className={cn('grid gap-5 p-4 sm:p-5', controls && !stacked && 'lg:grid-cols-[minmax(0,1fr)_17rem]')}>
        <div className="min-w-0">{children}</div>
        {controls && <div className="flex min-w-0 flex-col gap-4">{controls}</div>}
      </div>
      {footer && <footer className="border-t bg-muted/30 px-4 py-3 text-sm text-muted-foreground sm:px-5">{footer}</footer>}
    </section>
  )
}
