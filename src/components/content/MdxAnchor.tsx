import { ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

/** In-app links use the router; external links open in a new tab. */
export function MdxAnchor({ href = '', children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
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
