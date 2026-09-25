import katex from 'katex'
import { useMemo } from 'react'
import { cn } from '@/lib/utils'

export interface TexProps {
  /** LaTeX source. */
  children?: string
  math?: string
  display?: boolean
  className?: string
}

/**
 * Renders LaTeX with KaTeX. Input is author-controlled lesson content; KaTeX's
 * `trust` option stays off so commands like \href or \includegraphics are rejected.
 */
export function Tex({ children, math, display = false, className }: TexProps) {
  const src = math ?? children ?? ''
  const html = useMemo(
    () => katex.renderToString(src, { displayMode: display, throwOnError: false, strict: 'ignore', trust: false }),
    [src, display],
  )
  const Tag = display ? 'div' : 'span'
  return (
    <Tag
      className={cn(display && 'my-3 overflow-x-auto overflow-y-hidden py-1', className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
