import { Sigma } from 'lucide-react'
import { Tex } from '@/components/math/Tex'
import type { KeyFormula } from '@/lib/curriculum'

export function KeyFormulas({ formulas }: { formulas: readonly KeyFormula[] }) {
  return (
    <section className="rounded-xl border bg-card p-5" aria-labelledby="key-formulas">
      <h2 id="key-formulas" className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
        <Sigma className="size-4" aria-hidden /> Key formulas
      </h2>
      <dl className="space-y-3">
        {formulas.map((f) => (
          <div key={f.label}>
            <dt className="text-sm font-medium">{f.label}</dt>
            <dd className="overflow-x-auto">
              <Tex display math={f.tex} className="my-1" />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
