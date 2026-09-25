import { CheckCircle2, Circle, Lock } from 'lucide-react'
import { useMemo } from 'react'
import { computeTreeLayout, curriculum, getNode, nodeStatus, type NodeStatus } from '@/lib/curriculum'
import { cn } from '@/lib/utils'
import { TRACK_BG, TRACK_BORDER, TRACK_TEXT } from '@/components/layout/Sidebar'

const NODE_W = 150
const NODE_H = 60
const SLOT_W = 162
const LANE_GAP = 24
const ROW_H = 100
const HEADER_H = 56
const LANE_W = SLOT_W * 2

export const STATUS_ICON: Record<NodeStatus, typeof Lock> = {
  locked: Lock,
  available: Circle,
  mastered: CheckCircle2,
}

export interface TechTreeProps {
  mastered: ReadonlySet<string>
  selected: string | null
  recommended?: string
  onSelect: (id: string) => void
}

export function TechTree({ mastered, selected, recommended, onSelect }: TechTreeProps) {
  const layout = useMemo(() => computeTreeLayout(curriculum), [])
  const positions = useMemo(() => {
    const perCell = new Map<string, number>()
    layout.forEach((l) => perCell.set(`${l.lane}:${l.row}`, (perCell.get(`${l.lane}:${l.row}`) ?? 0) + 1))
    return new Map(
      layout.map((l) => {
        const count = perCell.get(`${l.lane}:${l.row}`) ?? 1
        const laneX = l.lane * (LANE_W + LANE_GAP)
        const x = count === 1 ? laneX + (LANE_W - NODE_W) / 2 : laneX + l.slot * SLOT_W + (SLOT_W - NODE_W) / 2
        const y = HEADER_H + l.row * ROW_H + (ROW_H - NODE_H) / 2
        return [l.id, { x, y }]
      }),
    )
  }, [layout])
  const rows = Math.max(...layout.map((l) => l.row)) + 1
  const width = curriculum.tracks.length * LANE_W + (curriculum.tracks.length - 1) * LANE_GAP
  const height = HEADER_H + rows * ROW_H

  const edges = curriculum.nodes.flatMap((n) =>
    n.prerequisites.map((p) => {
      const a = positions.get(p)!
      const b = positions.get(n.id)!
      const x1 = a.x + NODE_W / 2
      const y1 = a.y + NODE_H
      const x2 = b.x + NODE_W / 2
      const y2 = b.y
      const my = (y1 + y2) / 2
      return {
        key: `${p}->${n.id}`,
        d: `M ${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`,
        done: mastered.has(p),
        highlight: selected === n.id || selected === p,
      }
    }),
  )

  return (
    <div className="overflow-x-auto pb-2">
      <div className="relative mx-auto" style={{ width, height }}>
        {curriculum.tracks.map((t, i) => (
          <div
            key={t.id}
            className="absolute top-0 rounded-xl border border-dashed border-border/0 bg-muted/30"
            style={{ left: i * (LANE_W + LANE_GAP), width: LANE_W, height }}
          >
            <div className="flex h-12 items-center gap-2 px-4">
              <span className={cn('size-2.5 rounded-full', TRACK_BG[t.id])} aria-hidden />
              <span className={cn('text-xs font-semibold tracking-wide uppercase', TRACK_TEXT[t.id])}>{t.title}</span>
            </div>
          </div>
        ))}
        <svg className="pointer-events-none absolute inset-0" width={width} height={height} aria-hidden>
          {edges.map((e) => (
            <path
              key={e.key}
              d={e.d}
              fill="none"
              strokeWidth={e.highlight ? 2.5 : 1.5}
              className={cn(e.done ? 'stroke-success/70' : 'stroke-muted-foreground/35', e.highlight && 'stroke-primary')}
            />
          ))}
        </svg>
        {curriculum.nodes.map((n) => {
          const pos = positions.get(n.id)!
          const status = nodeStatus(n, mastered)
          const Icon = STATUS_ICON[status]
          return (
            <button
              key={n.id}
              onClick={() => onSelect(n.id)}
              aria-pressed={selected === n.id}
              aria-label={`${n.title} (${status})`}
              className={cn(
                'absolute flex items-center gap-2 rounded-lg border-2 bg-card px-3 text-left text-sm shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md',
                status === 'mastered' && 'border-success/60',
                status === 'available' && TRACK_BORDER[n.track],
                status === 'locked' && 'border-border opacity-70',
                selected === n.id && 'ring-2 ring-primary ring-offset-2 ring-offset-background',
              )}
              style={{ left: pos.x, top: pos.y, width: NODE_W, height: NODE_H }}
            >
              <Icon
                className={cn('size-4 shrink-0', status === 'mastered' ? 'text-success' : status === 'locked' ? 'text-muted-foreground' : TRACK_TEXT[n.track])}
                aria-hidden
              />
              <span className="line-clamp-2 leading-tight font-medium">{n.title}</span>
              {recommended === n.id && (
                <span className="absolute -top-2.5 right-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
                  Next up
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function RoadmapList({ mastered, onSelect, selected }: Omit<TechTreeProps, 'recommended'>) {
  return (
    <div className="space-y-6">
      {curriculum.tracks.map((t) => (
        <div key={t.id}>
          <h3 className={cn('mb-2 text-xs font-semibold tracking-wide uppercase', TRACK_TEXT[t.id])}>{t.title}</h3>
          <ul className="space-y-2">
            {curriculum.nodes
              .filter((n) => n.track === t.id)
              .map((n) => {
                const status = nodeStatus(n, mastered)
                const Icon = STATUS_ICON[status]
                return (
                  <li key={n.id}>
                    <button
                      onClick={() => onSelect(n.id)}
                      aria-pressed={selected === n.id}
                      className={cn(
                        'flex w-full items-start gap-3 rounded-lg border bg-card p-3 text-left hover:bg-accent',
                        selected === n.id && 'ring-2 ring-primary',
                      )}
                    >
                      <Icon className={cn('mt-0.5 size-4 shrink-0', status === 'mastered' ? 'text-success' : TRACK_TEXT[n.track])} aria-label={status} />
                      <span>
                        <span className="block font-medium">{n.title}</span>
                        <span className="block text-sm text-muted-foreground">{n.summary}</span>
                        {n.prerequisites.length > 0 && (
                          <span className="mt-1 block text-xs text-muted-foreground">
                            Requires: {n.prerequisites.map((p) => getNode(p)?.title).join(', ')}
                          </span>
                        )}
                      </span>
                    </button>
                  </li>
                )
              })}
          </ul>
        </div>
      ))}
    </div>
  )
}
