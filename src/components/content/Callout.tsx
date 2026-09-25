import { AlertTriangle, Lightbulb, Info, Sigma } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const STYLES = {
  info: { icon: Info, cls: 'border-primary/30 bg-primary/5', iconCls: 'text-primary', label: 'Note' },
  insight: { icon: Lightbulb, cls: 'border-track-modern/40 bg-track-modern/5', iconCls: 'text-track-modern', label: 'Key idea' },
  warning: { icon: AlertTriangle, cls: 'border-destructive/40 bg-destructive/5', iconCls: 'text-destructive', label: 'Pitfall' },
  math: { icon: Sigma, cls: 'border-track-cv/40 bg-track-cv/5', iconCls: 'text-track-cv', label: 'Derivation' },
} as const

export function Callout({ type = 'info', title, children }: { type?: keyof typeof STYLES; title?: string; children: ReactNode }) {
  const s = STYLES[type]
  const Icon = s.icon
  return (
    <aside className={cn('my-6 flex gap-3 rounded-lg border p-4', s.cls)}>
      <Icon className={cn('mt-0.5 size-5 shrink-0', s.iconCls)} aria-hidden />
      <div className="min-w-0 flex-1 space-y-2 text-[0.97rem] [&>p]:max-w-none">
        <p className="font-semibold text-foreground">{title ?? s.label}</p>
        {children}
      </div>
    </aside>
  )
}
