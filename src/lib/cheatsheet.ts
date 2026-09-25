/**
 * Markdown study-sheet generator for mastered curriculum nodes.
 */
import type { CurriculumNode, Track } from './curriculum'

export interface CheatSheetOptions {
  tracks: readonly Track[]
  nodes: readonly CurriculumNode[]
  mastered: ReadonlySet<string>
  /** Include every node, marking unmastered ones, instead of mastered only. */
  includeAll?: boolean
  generatedAt?: Date
  appUrl?: string
}

function formatPaper(p: CurriculumNode['papers'][number]): string {
  const title = p.url ? `[${p.title}](${p.url})` : p.title
  return `${p.authors} (${p.year}). *${title}*. ${p.venue}.`
}

export function selectCheatSheetNodes(options: CheatSheetOptions): CurriculumNode[] {
  return options.nodes.filter((n) => options.includeAll || options.mastered.has(n.id))
}

export function generateCheatSheetMarkdown(options: CheatSheetOptions): string {
  const selected = selectCheatSheetNodes(options)
  const date = (options.generatedAt ?? new Date()).toISOString().slice(0, 10)
  const lines: string[] = [
    '# ML/DL Study Sheet',
    '',
    `_Generated ${date} — ${options.mastered.size} of ${options.nodes.length} concepts mastered._`,
  ]
  if (options.appUrl) lines.push('', `Continue learning: ${options.appUrl}`)
  if (selected.length === 0) {
    lines.push('', 'No concepts mastered yet — complete a lesson challenge to add it to your sheet.')
    return lines.join('\n') + '\n'
  }
  for (const track of options.tracks) {
    const inTrack = selected.filter((n) => n.track === track.id)
    if (inTrack.length === 0) continue
    lines.push('', `## ${track.title}`)
    for (const n of inTrack) {
      const badge = options.mastered.has(n.id) ? '✅' : '⬜'
      lines.push('', `### ${badge} ${n.title}`, '', n.summary, '')
      if (n.objectives.length > 0) {
        lines.push('**You can now:**', '')
        n.objectives.forEach((o) => lines.push(`- ${o}`))
        lines.push('')
      }
      lines.push('**Key formulas**', '')
      n.keyFormulas.forEach((f) => lines.push(`- ${f.label}: $${f.tex}$`))
      lines.push('', '**Papers**', '')
      n.papers.forEach((p) => lines.push(`- ${formatPaper(p)}`))
    }
  }
  return lines.join('\n') + '\n'
}
