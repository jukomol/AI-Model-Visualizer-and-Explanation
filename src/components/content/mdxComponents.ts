import type { MDXComponents } from 'mdx/types'
import { Callout } from './Callout'
import { MdxAnchor } from './MdxAnchor'
import { Tex } from '@/components/math/Tex'
import { visualizerComponents } from '@/visualizers/registry'

/** Components available to every MDX lesson without an import statement. */
export const mdxComponents: MDXComponents = {
  a: MdxAnchor,
  Callout,
  Tex,
  ...visualizerComponents,
}
