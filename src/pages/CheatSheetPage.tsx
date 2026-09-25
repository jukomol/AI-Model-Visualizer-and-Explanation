import { Download, FileText, Printer } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Tex } from '@/components/math/Tex'
import { ToggleRow } from '@/components/viz/Controls'
import { generateCheatSheetMarkdown, selectCheatSheetNodes } from '@/lib/cheatsheet'
import { curriculum } from '@/lib/curriculum'
import { cn } from '@/lib/utils'
import { TRACK_TEXT } from '@/components/layout/Sidebar'
import { useProgressStore } from '@/store/useProgressStore'

export default function CheatSheetPage() {
  const masteredList = useProgressStore((s) => s.masteredNodes)
  const [includeAll, setIncludeAll] = useState(masteredList.length === 0)
  const mastered = useMemo(() => new Set(masteredList), [masteredList])
  const options = { tracks: curriculum.tracks, nodes: curriculum.nodes, mastered, includeAll }
  const nodes = selectCheatSheetNodes(options)
  const download = () => {
    const appUrl = window.location.href.split('#')[0]
    const md = generateCheatSheetMarkdown({ ...options, appUrl })
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ml-study-sheet-${new Date().toISOString().slice(0, 10)}.md`
    a.click()
    URL.revokeObjectURL(url)
  }
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="no-print mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight">
            <FileText className="size-7 text-primary" aria-hidden /> Cheat-sheet exporter
          </h1>
          <p className="mt-1 text-muted-foreground">
            Everything you have mastered, condensed into one study sheet of summaries, key formulas and milestone papers.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={download}>
            <Download /> Markdown
          </Button>
          <Button variant="outline" onClick={() => window.print()}>
            <Printer /> Print / Save as PDF
          </Button>
        </div>
      </div>
      <div className="no-print mb-6 max-w-sm rounded-lg border bg-card p-4">
        <ToggleRow
          label="Include concepts not yet mastered"
          checked={includeAll}
          onChange={setIncludeAll}
          hint={`${masteredList.length} of ${curriculum.nodes.length} mastered.`}
        />
      </div>
      <article className="print-sheet space-y-8 rounded-xl border bg-card p-6 shadow-sm sm:p-8">
        <header>
          <h2 className="text-2xl font-bold">ML/DL Study Sheet</h2>
          <p className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString()} · {masteredList.length} of {curriculum.nodes.length} concepts mastered
          </p>
        </header>
        {nodes.length === 0 && (
          <p className="text-muted-foreground">
            Nothing mastered yet. Pass a lesson challenge on the <Link to="/roadmap" className="text-primary underline">roadmap</Link>, or
            include all concepts above.
          </p>
        )}
        {curriculum.tracks.map((t) => {
          const inTrack = nodes.filter((n) => n.track === t.id)
          if (inTrack.length === 0) return null
          return (
            <section key={t.id} className="space-y-6">
              <h3 className={cn('border-b pb-1 text-sm font-semibold tracking-wide uppercase', TRACK_TEXT[t.id])}>{t.title}</h3>
              {inTrack.map((n) => (
                <div key={n.id} className="break-inside-avoid space-y-2">
                  <h4 className="text-lg font-semibold">
                    {mastered.has(n.id) ? '✅' : '⬜'} {n.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">{n.summary}</p>
                  <dl className="grid gap-x-6 gap-y-1 text-sm sm:grid-cols-[12rem_minmax(0,1fr)]">
                    {n.keyFormulas.map((f) => (
                      <div key={f.label} className="contents">
                        <dt className="font-medium sm:pt-2">{f.label}</dt>
                        <dd className="overflow-x-auto">
                          <Tex display math={f.tex} className="my-1" />
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <ul className="list-disc space-y-0.5 pl-5 text-xs text-muted-foreground">
                    {n.papers.map((p) => (
                      <li key={p.title}>
                        {p.authors} ({p.year}). <span className="italic">{p.title}</span>. {p.venue}.
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )
        })}
      </article>
    </div>
  )
}
