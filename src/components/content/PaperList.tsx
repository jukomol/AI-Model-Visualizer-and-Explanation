import { BookOpen, ExternalLink } from 'lucide-react'
import type { Paper } from '@/lib/curriculum'

export function PaperList({ papers }: { papers: readonly Paper[] }) {
  return (
    <section className="rounded-xl border bg-card p-5" aria-labelledby="papers">
      <h2 id="papers" className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
        <BookOpen className="size-4" aria-hidden /> Milestone papers
      </h2>
      <ol className="space-y-3">
        {papers
          .slice()
          .sort((a, b) => a.year - b.year)
          .map((p) => (
            <li key={p.title} className="flex gap-3 text-sm">
              <span className="tabular mt-0.5 w-11 shrink-0 font-mono text-xs font-semibold text-primary">{p.year}</span>
              <div className="min-w-0">
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="group font-medium hover:text-primary">
                    {p.title}
                    <ExternalLink className="ml-1 inline size-3 opacity-60 group-hover:opacity-100" aria-label="(opens in a new tab)" />
                  </a>
                ) : (
                  <span className="font-medium">{p.title}</span>
                )}
                <p className="text-muted-foreground">
                  {p.authors} · <span className="italic">{p.venue}</span>
                </p>
                {p.note && <p className="text-xs text-muted-foreground">{p.note}</p>}
              </div>
            </li>
          ))}
      </ol>
    </section>
  )
}
