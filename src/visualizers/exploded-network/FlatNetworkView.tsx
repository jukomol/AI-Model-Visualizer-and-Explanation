import { HeatmapCanvas } from '@/components/viz/HeatmapCanvas'
import type { ViewLayer } from '@/lib/models'
import { formatShape } from '@/lib/tensorShapes'
import type { LayerActivation } from '@/lib/tf/model'
import { cn } from '@/lib/utils'
import { channel, scaleFor } from './textures'

/** 2-D fallback / alternative: a horizontally scrolling strip of layer cards. */
export function FlatNetworkView({
  layers,
  activations,
  selected,
  onSelect,
  explosion,
}: {
  layers: ViewLayer[]
  activations: (LayerActivation | null)[] | null
  selected: number | null
  onSelect: (i: number | null) => void
  explosion: number
}) {
  return (
    <div className="flex h-full items-center overflow-x-auto px-4" style={{ gap: `${0.5 + explosion * 2.5}rem` }}>
      {layers.map((l, i) => {
        const act = activations?.[i] ?? null
        const s = act ? scaleFor(act, l.type === 'input') : null
        return (
          <button
            key={l.id}
            onClick={() => onSelect(selected === i ? null : i)}
            aria-pressed={selected === i}
            className={cn(
              'flex w-32 shrink-0 flex-col items-center gap-2 rounded-lg border bg-card p-2 text-center transition-opacity',
              selected === i && 'ring-2 ring-primary',
              selected !== null && selected !== i && 'opacity-40',
            )}
          >
            {act && s && act.shape.length === 3 ? (
              <div className="grid w-full grid-cols-2 gap-0.5">
                {Array.from({ length: Math.min(4, act.shape[2]) }, (_, c) => (
                  <HeatmapCanvas key={c} values={channel(act, c)} width={act.shape[1]} height={act.shape[0]} scale={s.kind} range={s.range} displayWidth="100%" />
                ))}
              </div>
            ) : act && s ? (
              <HeatmapCanvas values={act.data} width={act.data.length} height={1} scale={s.kind} range={s.range} displayWidth="100%" displayHeight={20} />
            ) : (
              <div className="h-12 w-full rounded bg-muted" />
            )}
            <span className="text-xs font-semibold">{l.name}</span>
            <span className="font-mono text-[10px] text-muted-foreground">{formatShape(l.outputShape)}</span>
          </button>
        )
      })}
    </div>
  )
}
