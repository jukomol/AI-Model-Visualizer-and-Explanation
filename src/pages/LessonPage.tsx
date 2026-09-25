import { MDXProvider } from '@mdx-js/react'
import type { MDXComponents } from 'mdx/types'
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, ListChecks, Lock, PanelLeft, X } from 'lucide-react'
import { lazy, Suspense, useEffect, useState, type ComponentType, type LazyExoticComponent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChallengePanel } from '@/components/content/ChallengePanel'
import { ChallengeProvider } from '@/components/content/ChallengeProvider'
import { KeyFormulas } from '@/components/content/KeyFormulas'
import { mdxComponents } from '@/components/content/mdxComponents'
import { PaperList } from '@/components/content/PaperList'
import { PageSpinner } from '@/components/layout/AppLayout'
import { Sidebar, TRACK_TEXT } from '@/components/layout/Sidebar'
import { adjacentNodes, curriculum, getNode, nodeStatus, type CurriculumNode } from '@/lib/curriculum'
import { cn } from '@/lib/utils'
import { useProgressStore } from '@/store/useProgressStore'
import NotFoundPage from './NotFoundPage'

type LessonModule = { default: ComponentType<{ components?: MDXComponents }> }

const lessonModules = import.meta.glob<LessonModule>('../content/**/*.mdx')
const lessonCache = new Map<string, LazyExoticComponent<ComponentType<{ components?: MDXComponents }>>>()

function lessonFor(node: CurriculumNode) {
  const key = `../content/${node.track}/${node.id}.mdx`
  const loader = lessonModules[key]
  if (!loader) return null
  if (!lessonCache.has(key)) lessonCache.set(key, lazy(loader))
  return lessonCache.get(key)!
}

export default function LessonPage() {
  const { nodeId } = useParams()
  const node = getNode(nodeId)
  const setActiveNode = useProgressStore((s) => s.setActiveNode)
  const masteredList = useProgressStore((s) => s.masteredNodes)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  useEffect(() => {
    if (node) setActiveNode(node.id)
    if (node) document.title = `${node.title} · ML Visualizer`
    return () => {
      document.title = 'ML/DL Interactive Visualizer'
    }
  }, [node, setActiveNode])
  if (!node) return <NotFoundPage />
  const Lesson = lessonFor(node)
  const status = nodeStatus(node, new Set(masteredList))
  const { prev, next } = adjacentNodes(node.id)
  const track = curriculum.tracks.find((t) => t.id === node.track)
  return (
    <div className="mx-auto grid max-w-[90rem] gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[15rem_minmax(0,1fr)]">
      <aside className="hidden lg:block">
        <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2">
          <Sidebar />
        </div>
      </aside>
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)}>
          <div
            className="h-full w-72 animate-slide-in-right overflow-y-auto border-r bg-background p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="font-semibold">Contents</p>
              <Button size="icon" variant="ghost" onClick={() => setSidebarOpen(false)} aria-label="Close contents">
                <X />
              </Button>
            </div>
            <Sidebar onNavigate={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}
      <article className="min-w-0 max-w-4xl">
        <Button variant="outline" size="sm" className="mb-4 lg:hidden" onClick={() => setSidebarOpen(true)}>
          <PanelLeft /> Contents
        </Button>
        <header className="space-y-3">
          <p className={cn('text-xs font-semibold tracking-wide uppercase', TRACK_TEXT[node.track])}>{track?.title}</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{node.title}</h1>
          <p className="text-lg text-muted-foreground">{node.summary}</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">
              <Clock /> {node.estimatedMinutes} min
            </Badge>
            {status === 'mastered' && (
              <Badge variant="success">
                <CheckCircle2 /> Mastered
              </Badge>
            )}
            {status === 'locked' && (
              <Badge variant="outline">
                <Lock /> Preview — prerequisites not yet mastered
              </Badge>
            )}
            <a href="#challenge" className="text-sm text-primary hover:underline">
              Jump to the challenge →
            </a>
          </div>
        </header>
        <section className="mt-6 rounded-xl border bg-card p-5" aria-labelledby="objectives">
          <h2 id="objectives" className="mb-2 flex items-center gap-2 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
            <ListChecks className="size-4" aria-hidden /> By the end you will be able to
          </h2>
          <ul className="list-disc space-y-1 pl-5 text-sm">
            {node.objectives.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </section>
        <ChallengeProvider nodeId={node.id}>
          <div className="lesson-prose mt-8">
            {Lesson ? (
              <MDXProvider components={mdxComponents}>
                <Suspense fallback={<PageSpinner />}>
                  <Lesson />
                </Suspense>
              </MDXProvider>
            ) : (
              <p className="text-muted-foreground">This lesson’s text is still being written.</p>
            )}
          </div>
          <div className="mt-12 space-y-6">
            <ChallengePanel node={node} />
            <div className="grid gap-6 xl:grid-cols-2">
              <KeyFormulas formulas={node.keyFormulas} />
              <PaperList papers={node.papers} />
            </div>
          </div>
        </ChallengeProvider>
        <nav className="mt-12 flex flex-wrap justify-between gap-3 border-t pt-6" aria-label="Lesson navigation">
          {prev ? (
            <Button asChild variant="outline">
              <Link to={prev.route}>
                <ArrowLeft /> {prev.title}
              </Link>
            </Button>
          ) : (
            <span />
          )}
          {next && (
            <Button asChild>
              <Link to={next.route}>
                {next.title} <ArrowRight />
              </Link>
            </Button>
          )}
        </nav>
      </article>
    </div>
  )
}
