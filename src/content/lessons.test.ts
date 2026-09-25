/**
 * Every curriculum node must have an MDX lesson that compiles with the same
 * remark/rehype pipeline as the app, embeds the visualizers the curriculum
 * lists for it, and only uses registered components.
 */
import { compile } from '@mdx-js/mdx'
import { existsSync, readFileSync } from 'node:fs'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { describe, expect, it } from 'vitest'
import { curriculum } from '@/lib/curriculum'

const registry = readFileSync('src/visualizers/registry.ts', 'utf8')
const registered = new Set([...registry.matchAll(/name: '(\w+)'/g)].map((m) => m[1]))
const builtIns = new Set(['Callout', 'Tex'])

describe('MDX lessons', () => {
  it.each(curriculum.nodes.map((n) => [n.id, n] as const))('%s', async (_id, node) => {
    const path = `src/content/${node.track}/${node.id}.mdx`
    expect(existsSync(path), `${path} is missing`).toBe(true)
    const source = readFileSync(path, 'utf8')
    await compile(source, {
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [[rehypeKatex, { strict: 'ignore', throwOnError: true }]],
      providerImportSource: '@mdx-js/react',
    })
    const used = new Set([...source.matchAll(/<([A-Z]\w+)/g)].map((m) => m[1]))
    for (const c of used) expect(registered.has(c) || builtIns.has(c), `${node.id}: unknown component <${c}>`).toBe(true)
    for (const v of node.visualizers) expect(used.has(v), `${node.id}: lesson does not embed <${v} />`).toBe(true)
    expect(source.split('\n').length, `${node.id}: lesson is too short`).toBeGreaterThan(40)
  })
})
