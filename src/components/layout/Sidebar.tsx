import { CheckCircle2, Circle, Lock } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { curriculum, nodeStatus, topologicalOrder, type TrackId } from '@/lib/curriculum'
import { cn } from '@/lib/utils'
import { useProgressStore } from '@/store/useProgressStore'

export const TRACK_TEXT: Record<TrackId, string> = {
  foundations: 'text-track-foundations',
  cv: 'text-track-cv',
  modern: 'text-track-modern',
}

export const TRACK_BG: Record<TrackId, string> = {
  foundations: 'bg-track-foundations',
  cv: 'bg-track-cv',
  modern: 'bg-track-modern',
}

export const TRACK_BORDER: Record<TrackId, string> = {
  foundations: 'border-track-foundations',
  cv: 'border-track-cv',
  modern: 'border-track-modern',
}

const ordered = topologicalOrder(curriculum.nodes)

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const masteredList = useProgressStore((s) => s.masteredNodes)
  const mastered = new Set(masteredList)
  return (
    <nav aria-label="Curriculum" className="space-y-6 text-sm">
      {curriculum.tracks.map((track) => (
        <div key={track.id}>
          <p className={cn('mb-2 px-2 text-xs font-semibold tracking-wide uppercase', TRACK_TEXT[track.id])}>{track.title}</p>
          <ul className="space-y-0.5">
            {ordered
              .filter((n) => n.track === track.id)
              .map((n) => {
                const status = nodeStatus(n, mastered)
                const Icon = status === 'mastered' ? CheckCircle2 : status === 'locked' ? Lock : Circle
                return (
                  <li key={n.id}>
                    <NavLink
                      to={n.route}
                      onClick={onNavigate}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors',
                          isActive ? 'bg-accent font-medium text-foreground' : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground',
                        )
                      }
                    >
                      <Icon
                        className={cn('size-3.5 shrink-0', status === 'mastered' ? 'text-success' : status === 'locked' ? 'opacity-60' : TRACK_TEXT[n.track])}
                        aria-label={status}
                      />
                      <span className="truncate">{n.title}</span>
                    </NavLink>
                  </li>
                )
              })}
          </ul>
        </div>
      ))}
    </nav>
  )
}
