import { ArrowRight, Boxes, BrainCircuit, Cpu, FileDown, Link2, Map as MapIcon, MousePointerClick, Target } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Logo } from '@/components/layout/TopNav'
import { TRACK_BG, TRACK_TEXT } from '@/lib/trackStyles'
import { curriculum, nextRecommended, trackProgress } from '@/lib/curriculum'
import { cn } from '@/lib/utils'
import { useProgressStore } from '@/store/useProgressStore'

const FEATURES = [
  { icon: Boxes, title: 'Exploded network views', text: 'Pull a real CNN apart in 3-D, click any layer and inspect its tensor shapes, kernels and live feature maps.' },
  { icon: MousePointerClick, title: 'Paint your own data', text: 'Draw spirals, rings and clusters, then watch classifiers and clustering algorithms respond in real time.' },
  { icon: Cpu, title: 'Runs in your browser', text: 'TensorFlow.js trains networks on your GPU through WebGL. There is no server, and your data never leaves your device.' },
  { icon: Target, title: 'Challenge & mastery', text: 'Each concept unlocks once you pass its challenge, such as tuning a learning rate until the validation loss drops below a target.' },
  { icon: Link2, title: 'Bookmark & share', text: 'Progress auto-saves locally. Share your whole session as a single compressed link.' },
  { icon: FileDown, title: 'Cheat-sheet export', text: 'Turn everything you have mastered into a Markdown or PDF study sheet with formulas and papers.' },
]

export function HomePage() {
  const masteredList = useProgressStore((s) => s.masteredNodes)
  const mastered = new Set(masteredList)
  const next = nextRecommended(mastered)
  const progress = trackProgress(mastered)
  return (
    <div className="mx-auto max-w-[90rem] px-4 sm:px-6">
      <section className="grid items-center gap-10 py-14 md:grid-cols-[1.2fr_1fr] md:py-20">
        <div className="space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground">
            <BrainCircuit className="size-3.5 text-primary" aria-hidden /> An open-source interactive textbook
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            See machine learning <span className="text-primary">work</span>, one tensor at a time.
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            Start with least squares and work up to transformers, diffusion and INT8 quantisation. Every lesson pairs the
            maths with a visualizer you can poke, train and break, and all of it runs in your browser.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to={next?.route ?? '/roadmap'}>
                {masteredList.length === 0 ? 'Start learning' : `Continue: ${next?.title ?? 'Roadmap'}`} <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/network">
                <Boxes /> Explode a CNN
              </Link>
            </Button>
          </div>
        </div>
        <div className="relative">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <Logo className="size-10" />
              <div>
                <p className="font-semibold">Your progress</p>
                <p className="text-sm text-muted-foreground">
                  {masteredList.length} of {curriculum.nodes.length} concepts mastered
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {curriculum.tracks.map((t) => {
                const p = progress[t.id]
                return (
                  <div key={t.id} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-2 font-medium">
                        <span className={cn('size-2.5 rounded-full', TRACK_BG[t.id])} aria-hidden />
                        {t.title}
                      </span>
                      <span className="tabular text-muted-foreground">
                        {p.mastered}/{p.total}
                      </span>
                    </div>
                    <Progress value={(100 * p.mastered) / p.total} label={`${t.title} progress`} />
                  </div>
                )
              })}
            </div>
            <Button asChild variant="secondary" className="mt-6 w-full">
              <Link to="/roadmap">
                <MapIcon /> Open the tech tree
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 pb-12 md:grid-cols-3" aria-label="Tracks">
        {curriculum.tracks.map((t) => (
          <Link key={t.id} to="/roadmap" className="group rounded-xl border bg-card p-5 transition-colors hover:bg-accent/50">
            <p className={cn('text-xs font-semibold tracking-wide uppercase', TRACK_TEXT[t.id])}>{t.title}</p>
            <p className="mt-2 text-sm text-muted-foreground">{t.description}</p>
            <p className="mt-3 text-sm">
              {curriculum.nodes
                .filter((n) => n.track === t.id)
                .map((n) => n.title)
                .join(' · ')}
            </p>
          </Link>
        ))}
      </section>

      <section className="pb-8" aria-labelledby="features">
        <h2 id="features" className="mb-6 text-2xl font-semibold tracking-tight">
          Built for learning by doing
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-xl border bg-card p-5">
              <Icon className="size-5 text-primary" aria-hidden />
              <p className="mt-3 font-medium">{title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
