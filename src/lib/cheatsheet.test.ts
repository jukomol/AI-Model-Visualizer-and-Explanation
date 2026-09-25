import { describe, expect, it } from 'vitest'
import { generateCheatSheetMarkdown } from './cheatsheet'
import { curriculum } from './curriculum'

const base = { tracks: curriculum.tracks, nodes: curriculum.nodes, generatedAt: new Date('2026-01-02T00:00:00Z') }

describe('generateCheatSheetMarkdown', () => {
  it('includes only mastered concepts with formulas and papers', () => {
    const md = generateCheatSheetMarkdown({ ...base, mastered: new Set(['perceptron']) })
    expect(md).toContain('# ML/DL Study Sheet')
    expect(md).toContain('Generated 2026-01-02')
    expect(md).toContain('### ✅ The Perceptron')
    expect(md).toContain('Rosenblatt')
    expect(md).toContain('$\\mathbf w \\leftarrow')
    expect(md).toContain('[The perceptron: A probabilistic model')
    expect(md).not.toContain('Linear Regression')
    expect(md).toContain('## Foundations')
    expect(md).not.toContain('## Sequences')
  })

  it('can include every concept with progress markers', () => {
    const md = generateCheatSheetMarkdown({ ...base, mastered: new Set(['perceptron']), includeAll: true })
    expect(md).toContain('### ⬜ Linear Regression')
    expect(md).toContain('## Sequences & Modern Architectures')
  })

  it('explains an empty sheet', () => {
    expect(generateCheatSheetMarkdown({ ...base, mastered: new Set() })).toContain('No concepts mastered yet')
  })
})
