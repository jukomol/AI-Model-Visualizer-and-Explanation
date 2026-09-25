import { ExternalLink } from 'lucide-react'
import type { MDXComponents } from 'mdx/types'
import { Link } from 'react-router-dom'
import { Callout } from './Callout'
import { Tex } from '@/components/math/Tex'
import { visualizerComponents } from '@/visualizers/registry'

function Anchor({ href = '', children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href.startsWith('#/')) return <Link to={href.slice(1)}>{children}</Link>
  if (href.startsWith('/')) return <Link to={href}>{children}</Link>
  const external = /^https?:\/\//.test(href)
  return (
    <a href={href} {...props} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
      {external && <ExternalLink className="ml-0.5 inline size-3 align-baseline opacity-60" aria-label="(opens in a new tab)" />}
    </a>
  )
}

/** Components available to every MDX lesson without an import statement. */
export const mdxComponents: MDXComponents = {
  a: Anchor,
  Callout,
  Tex,
  ...visualizerComponents,
}
