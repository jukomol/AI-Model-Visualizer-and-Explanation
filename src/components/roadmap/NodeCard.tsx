import { ArrowRight, BookOpen, Clock, Target } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { curriculum, getNode, nodeStatus, type CurriculumNode } from '@/lib/curriculum'
import { cn } from '@/lib/utils'
import { TRACK_TEXT } from '@/components/layout/Sidebar'
import { STATUS_ICON } from './TechTree'

export function NodeCard({ node, mastered }: { node: CurriculumNode; mastered: ReadonlySet<string> }) {
  const status = nodeStatus(node, mastered)
  const Icon = STATUS_ICON[status]
  const track = curriculum.tracks.find((t) => t.id === node.track)
  const unlocks = curriculum.nodes.filter((n) => n.prerequisites.includes(node.id))
  return (
    <article className="animate-fade-in space-y-4 rounded-xl border bg-card p-5 shadow-sm" aria-live="polite">
      <div className="space-y-1">
        <p className={cn('text-xs font-semibold tracking-wide uppercase', TRACK_TEXT[node.track])}>{track?.title}</p>
        <h2 className="text-xl font-semibold tracking-tight">{node.title}</h2>
        <div className="flex flex-wrap gap-2 pt-1">
          <Badge variant={status === 'mastered' ? 'success' : status === 'locked' ? 'outline' : 'secondary'}>
            <Icon /> {status === 'mastered' ? 'Mastered' : status === 'locked' ? 'Locked' : 'Ready to learn'}
          </Badge>
          <Badge variant="outline">
            <Clock /> {node.estimatedMinutes} min
          </Badge>
          <Badge variant="outline">
            <Target /> {node.challenge.type === 'metric' ? 'Interactive challenge' : 'Concept check'}
          </Badge>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{node.summary}</p>
      {node.prerequisites.length > 0 && (
        <div className="text-sm">
          <p className="font-medium">Prerequisites</p>
          <ul className="mt-1 flex flex-wrap gap-1.5">
            {node.prerequisites.map((p) => (
              <li key={p}>
                <Badge variant={mastered.has(p) ? 'success' : 'outline'}>{getNode(p)?.title}</Badge>
              </li>
            ))}
          </ul>
        </div>
      )}
      {unlocks.length > 0 && (
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Unlocks: </span>
          {unlocks.map((u) => u.title).join(', ')}
        </p>
      )}
      <div className="text-sm">
        <p className="flex items-center gap-1.5 font-medium">
          <BookOpen className="size-4" aria-hidden /> Milestone papers
        </p>
        <ul className="mt-1 space-y-1 text-muted-foreground">
          {node.papers.map((p) => (
            <li key={p.title}>
              {p.url ? (
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="hover:text-foreground hover:underline">
                  {p.authors.split(',')[0]} ({p.year}) — {p.title}
                </a>
              ) : (
                <span>
                  {p.authors.split(',')[0]} ({p.year}) — {p.title}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <Button asChild className="w-full">
        <Link to={node.route}>
          {status === 'locked' ? 'Preview lesson' : status === 'mastered' ? 'Review lesson' : 'Start lesson'} <ArrowRight />
        </Link>
      </Button>
    </article>
  )
}
