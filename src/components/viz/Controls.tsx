import { Pause, Play, RotateCcw, StepForward } from 'lucide-react'
import { useId, type ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

export interface LabeledSliderProps {
  label: ReactNode
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
  format?: (v: number) => string
  /** Map slider position to value on a log scale (min must be > 0). */
  log?: boolean
  hint?: ReactNode
  disabled?: boolean
}

export function LabeledSlider({ label, value, min, max, step, onChange, format, log, hint, disabled }: LabeledSliderProps) {
  const id = useId()
  const toPos = (v: number) => (log ? Math.log10(v) : v)
  const fromPos = (p: number) => (log ? Number((10 ** p).toPrecision(3)) : p)
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-2 text-sm">
        <label htmlFor={id} className="font-medium">
          {label}
        </label>
        <span className="tabular font-mono text-xs text-muted-foreground">{format ? format(value) : value}</span>
      </div>
      <Slider
        id={id}
        min={toPos(min)}
        max={toPos(max)}
        step={log ? (toPos(max) - toPos(min)) / 200 : step}
        value={[toPos(value)]}
        onValueChange={([p]) => onChange(fromPos(p))}
        disabled={disabled}
        aria-label={typeof label === 'string' ? label : undefined}
      />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

export interface SegmentedProps<T extends string> {
  label?: string
  value: T
  options: ReadonlyArray<{ value: T; label: ReactNode }>
  onChange: (v: T) => void
  className?: string
}

export function Segmented<T extends string>({ label, value, options, onChange, className }: SegmentedProps<T>) {
  return (
    <div className={cn('space-y-1.5', className)}>
      {label && <p className="text-sm font-medium">{label}</p>}
      <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-1 rounded-lg bg-muted p-1">
        {options.map((o) => (
          <button
            key={o.value}
            role="radio"
            aria-checked={value === o.value}
            onClick={() => onChange(o.value)}
            className={cn(
              'flex-1 rounded-md px-2 py-1 text-xs font-medium whitespace-nowrap transition-colors',
              value === o.value ? 'bg-background text-foreground shadow' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export function ToggleRow({ label, checked, onChange, hint }: { label: ReactNode; checked: boolean; onChange: (v: boolean) => void; hint?: ReactNode }) {
  const id = useId()
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        <Switch id={id} checked={checked} onCheckedChange={onChange} />
      </div>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

export function StatTile({ label, value, sub, tone }: { label: string; value: ReactNode; sub?: ReactNode; tone?: 'good' | 'bad' }) {
  return (
    <div className="rounded-lg border bg-background/60 px-3 py-2">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={cn('text-lg font-semibold', tone === 'good' && 'text-success', tone === 'bad' && 'text-destructive')}>{value}</p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  )
}

export interface PlayControlsProps {
  running: boolean
  onToggle: () => void
  onStep?: () => void
  onReset: () => void
  playLabel?: string
  disabled?: boolean
}

export function PlayControls({ running, onToggle, onStep, onReset, playLabel = 'Run', disabled }: PlayControlsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" onClick={onToggle} disabled={disabled} aria-pressed={running}>
        {running ? <Pause /> : <Play />}
        {running ? 'Pause' : playLabel}
      </Button>
      {onStep && (
        <Button size="sm" variant="outline" onClick={onStep} disabled={running || disabled}>
          <StepForward />
          Step
        </Button>
      )}
      <Button size="sm" variant="ghost" onClick={onReset}>
        <RotateCcw />
        Reset
      </Button>
    </div>
  )
}

export function ControlGroup({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="space-y-3 rounded-lg border bg-background/50 p-3">
      {title && <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{title}</p>}
      {children}
    </div>
  )
}
