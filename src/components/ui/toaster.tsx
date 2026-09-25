import { CheckCircle2, Info, X } from 'lucide-react'
import { useEffect } from 'react'
import { create } from 'zustand'
import { cn } from '@/lib/utils'

export interface Toast {
  id: number
  title: string
  description?: string
  kind?: 'success' | 'info'
}

interface ToastStore {
  toasts: Toast[]
  push: (t: Omit<Toast, 'id'>) => void
  dismiss: (id: number) => void
}

let nextId = 1

// eslint-disable-next-line react-refresh/only-export-components
export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  push: (t) => set((s) => ({ toasts: [...s.toasts.slice(-3), { ...t, id: nextId++ }] })),
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))

// eslint-disable-next-line react-refresh/only-export-components
export function toast(t: Omit<Toast, 'id'>) {
  useToastStore.getState().push(t)
}

function ToastItem({ t }: { t: Toast }) {
  const dismiss = useToastStore((s) => s.dismiss)
  useEffect(() => {
    const h = window.setTimeout(() => dismiss(t.id), 5000)
    return () => window.clearTimeout(h)
  }, [t.id, dismiss])
  const Icon = t.kind === 'success' ? CheckCircle2 : Info
  return (
    <div
      role="status"
      className={cn(
        'pointer-events-auto flex w-80 animate-slide-up items-start gap-3 rounded-lg border bg-popover p-4 text-popover-foreground shadow-lg',
      )}
    >
      <Icon className={cn('mt-0.5 size-5 shrink-0', t.kind === 'success' ? 'text-success' : 'text-primary')} aria-hidden />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{t.title}</p>
        {t.description && <p className="mt-1 text-sm text-muted-foreground">{t.description}</p>}
      </div>
      <button className="rounded p-0.5 text-muted-foreground hover:text-foreground" onClick={() => dismiss(t.id)} aria-label="Dismiss">
        <X className="size-4" />
      </button>
    </div>
  )
}

export function Toaster() {
  const toasts = useToastStore((s) => s.toasts)
  return (
    <div aria-live="polite" className="pointer-events-none fixed right-4 bottom-4 z-[100] flex flex-col gap-2">
      {toasts.map((t) => (
        <ToastItem key={t.id} t={t} />
      ))}
    </div>
  )
}
