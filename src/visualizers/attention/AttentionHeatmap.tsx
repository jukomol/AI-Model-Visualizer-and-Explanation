import { HeatmapRect } from '@visx/heatmap'
import { scaleLinear } from '@visx/scale'
import { useMemo, useState } from 'react'
import { ControlGroup, LabeledSlider, Segmented, StatTile, ToggleRow } from '@/components/viz/Controls'
import { VizFrame } from '@/components/viz/VizFrame'
import { Tex } from '@/components/math/Tex'
import { HEAD_DESCRIPTIONS, buildHead, entropy, scaledDotProductAttention, tokenize, type HeadKind } from '@/lib/attention'
import { CATEGORICAL, diverging, rgbString, sequential } from '@/lib/colormap'
import { fmt, pct } from '@/lib/utils'
import { useThemeMode } from '@/hooks/useThemeMode'

const CELL = 34

export default function AttentionHeatmap() {
  const mode = useThemeMode()
  const [text, setText] = useState('the cat sat on the mat because the cat was tired')
  const [head, setHead] = useState<HeadKind>('previous-token')
  const [causal, setCausal] = useState(false)
  const [scale, setScale] = useState(true)
  const [temperature, setTemperature] = useState(1)
  const [show, setShow] = useState<'weights' | 'scores'>('weights')
  const [query, setQuery] = useState(6)
  const tokens = useMemo(() => tokenize(text, 14), [text])
  const result = useMemo(() => {
    if (tokens.length === 0) return null
    const { Q, K, V } = buildHead(tokens, head)
    return scaledDotProductAttention(Q, K, V, { causal, scale, temperature })
  }, [tokens, head, causal, scale, temperature])
  const q = Math.min(query, tokens.length - 1)
  const n = tokens.length
  const matrix = show === 'weights' ? result?.weights : result?.scores
  const maxScore = result ? Math.max(...result.scores.flat().map(Math.abs)) : 1
  // visx heatmap expects column-major bins: one column per key.
  const bins = useMemo(
    () =>
      matrix
        ? Array.from({ length: n }, (_, j) => ({
            bin: j,
            bins: Array.from({ length: n }, (_, i) => ({ bin: i, count: matrix[i][j] })),
          }))
        : [],
    [matrix, n],
  )
  const xScale = scaleLinear<number>({ domain: [0, n], range: [0, n * CELL] })
  const yScale = scaleLinear<number>({ domain: [0, n], range: [0, n * CELL] })
  const color = (v: number) => (show === 'weights' ? rgbString(sequential(v, mode)) : rgbString(diverging(v / (maxScore || 1), mode)))
  const meanEntropy = result ? result.weights.reduce((s, r) => s + entropy(r), 0) / n : 0
  const top = result ? result.weights[q].map((w, j) => ({ j, w })).sort((a, b) => b.w - a.w).slice(0, 3) : []
  const colors = CATEGORICAL[mode]

  return (
    <VizFrame
      title="Scaled dot-product attention"
      description="Every token (row = query) distributes one unit of attention over the tokens (columns = keys). Each head below is constructed analytically, so you can see why it attends where it does. Click a row to inspect one query."
      controls={
        <>
          <ControlGroup title="Head">
            <Segmented
              value={head}
              onChange={setHead}
              options={[
                { value: 'previous-token', label: 'Previous token' },
                { value: 'similarity', label: 'Same token' },
                { value: 'random', label: 'Untrained' },
              ]}
            />
            <p className="text-xs text-muted-foreground">{HEAD_DESCRIPTIONS[head]}</p>
          </ControlGroup>
          <ControlGroup title="Computation">
            <ToggleRow label="Causal mask (decoder)" checked={causal} onChange={setCausal} hint="Queries may only attend to earlier tokens." />
            <ToggleRow label="Scale by 1/√d_k" checked={scale} onChange={setScale} />
            <LabeledSlider label="Temperature" value={temperature} min={0.2} max={4} step={0.05} onChange={setTemperature} format={(v) => v.toFixed(2)} />
            <Segmented
              value={show}
              onChange={setShow}
              options={[
                { value: 'weights', label: 'softmax weights' },
                { value: 'scores', label: 'raw scores QKᵀ' },
              ]}
            />
          </ControlGroup>
        </>
      }
    >
      <div className="space-y-4">
        <label className="block space-y-1 text-sm">
          <span className="font-medium">Input sentence (up to 14 tokens)</span>
          <input value={text} onChange={(e) => setText(e.target.value)} className="h-9 w-full rounded-md border bg-background px-3 text-sm" aria-label="Input sentence" />
        </label>
        <Tex display math={String.raw`\operatorname{Attention}(Q,K,V)=\operatorname{softmax}\!\Big(\tfrac{QK^\top}{${scale ? '\\sqrt{d_k}' : '1'}\cdot T}${causal ? ' + M' : ''}\Big)V,\quad d_k=${result?.dk ?? 32},\ T=${temperature.toFixed(2)}`} className="text-sm" />
        {result && (
          <div className="overflow-x-auto">
            <svg width={n * CELL + 90} height={n * CELL + 90} role="img" aria-label="Attention matrix heatmap: rows are queries, columns are keys">
              <g transform="translate(86, 4)">
                <HeatmapRect data={bins} xScale={(d) => xScale(d) ?? 0} yScale={(d) => yScale(d) ?? 0} binWidth={CELL} binHeight={CELL} gap={2}>
                  {(heatmap) =>
                    heatmap.map((col) =>
                      col.map((b) => {
                        const v = b.count as number
                        const masked = causal && b.column > b.row
                        return (
                          <g key={`${b.row}-${b.column}`} onClick={() => setQuery(b.row)} className="cursor-pointer">
                            <rect x={b.x} y={b.y} width={b.width} height={b.height} rx={3} fill={masked ? 'transparent' : color(v)} className={masked ? 'stroke-border' : undefined} opacity={b.row === q ? 1 : 0.9} />
                            <title>{`query “${tokens[b.row]}” → key “${tokens[b.column]}”: ${show === 'weights' ? pct(v) : fmt(v, 3)}`}</title>
                          </g>
                        )
                      }),
                    )
                  }
                </HeatmapRect>
                <rect x={-2} y={q * CELL - 1} width={n * CELL + 2} height={CELL + 1} fill="none" className="stroke-primary" strokeWidth={2} rx={4} />
                {tokens.map((t, i) => (
                  <text key={`r${i}`} x={-6} y={i * CELL + CELL / 2 + 4} textAnchor="end" className={i === q ? 'fill-foreground text-[12px] font-semibold' : 'fill-muted-foreground text-[12px]'}>
                    {t}
                  </text>
                ))}
                {tokens.map((t, j) => (
                  <text key={`c${j}`} transform={`translate(${j * CELL + CELL / 2 + 4}, ${n * CELL + 8}) rotate(50)`} className="fill-muted-foreground text-[12px]">
                    {t}
                  </text>
                ))}
              </g>
            </svg>
          </div>
        )}
        {result && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <p className="text-sm font-medium">
                Query “{tokens[q]}” (position {q}) attends to:
              </p>
              <ul className="space-y-1">
                {result.weights[q].map((w, j) => (
                  <li key={j} className="flex items-center gap-2 text-xs">
                    <span className="w-20 truncate font-mono">
                      {j}:{tokens[j]}
                    </span>
                    <span className="h-3 flex-1 rounded-sm bg-muted">
                      <span className="block h-full rounded-sm" style={{ width: `${w * 100}%`, background: colors[0] }} />
                    </span>
                    <span className="tabular w-12 text-right font-mono">{pct(w)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid content-start gap-2">
              <StatTile label="Top keys for this query" value={top.map((t) => tokens[t.j]).join(', ')} sub={top.map((t) => pct(t.w)).join(' · ')} />
              <StatTile label="Mean attention entropy" value={`${fmt(meanEntropy, 3)} nats`} sub={`uniform would be ln ${n} = ${fmt(Math.log(n), 3)}`} />
            </div>
          </div>
        )}
      </div>
    </VizFrame>
  )
}
