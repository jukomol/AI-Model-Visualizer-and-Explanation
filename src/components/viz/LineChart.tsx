import { CartesianGrid, Legend, Line, LineChart as RLineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { CATEGORICAL } from '@/lib/colormap'
import { fmt } from '@/lib/utils'
import { useThemeMode } from '@/hooks/useThemeMode'

export interface Series {
  key: string
  label: string
  /** Categorical slot index (0-based); colour follows the entity, never its rank. */
  slot?: number
}

export interface LineChartProps {
  data: ReadonlyArray<Record<string, number | null | undefined>>
  xKey: string
  series: readonly Series[]
  height?: number
  xLabel?: string
  yLabel?: string
  logY?: boolean
  yDomain?: [number | 'auto', number | 'auto']
  reference?: { y: number; label: string }
  ariaLabel: string
}

/** Thin 2 px lines, hairline grid, legend for ≥ 2 series and a hover tooltip. */
export function LineChart({ data, xKey, series, height = 200, xLabel, yLabel, logY, yDomain, reference, ariaLabel }: LineChartProps) {
  const mode = useThemeMode()
  const ink = mode === 'dark' ? { grid: '#232c3c', axis: '#33405a', text: '#9aa3b5' } : { grid: '#e1e0d9', axis: '#c3c2b7', text: '#5b6070' }
  return (
    <div role="img" aria-label={ariaLabel} style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RLineChart data={data as Record<string, number>[]} margin={{ top: 8, right: 12, bottom: xLabel ? 18 : 4, left: 0 }}>
          <CartesianGrid stroke={ink.grid} strokeWidth={1} vertical={false} />
          <XAxis
            dataKey={xKey}
            stroke={ink.axis}
            tick={{ fill: ink.text, fontSize: 11 }}
            tickLine={false}
            label={xLabel ? { value: xLabel, position: 'insideBottom', offset: -10, fill: ink.text, fontSize: 11 } : undefined}
          />
          <YAxis
            stroke={ink.axis}
            tick={{ fill: ink.text, fontSize: 11 }}
            tickLine={false}
            width={48}
            scale={logY ? 'log' : 'auto'}
            domain={yDomain ?? (logY ? ['auto', 'auto'] : [0, 'auto'])}
            allowDataOverflow={logY}
            tickFormatter={(v: number) => fmt(v, 2)}
            label={yLabel ? { value: yLabel, angle: -90, position: 'insideLeft', fill: ink.text, fontSize: 11, dx: 10 } : undefined}
          />
          <Tooltip
            contentStyle={{
              background: mode === 'dark' ? '#161e2c' : '#ffffff',
              border: `1px solid ${mode === 'dark' ? '#253046' : '#e1e2e8'}`,
              borderRadius: 8,
              fontSize: 12,
            }}
            labelStyle={{ color: ink.text }}
            formatter={(v: number, name: string) => [fmt(Number(v), 4), name]}
            labelFormatter={(l) => (xLabel ? `${xLabel} ${l}` : String(l))}
          />
          {series.length > 1 && <Legend iconType="plainline" wrapperStyle={{ fontSize: 12, color: ink.text }} />}
          {reference && <ReferenceLine y={reference.y} stroke={ink.text} strokeWidth={1} label={{ value: reference.label, fill: ink.text, fontSize: 11, position: 'insideTopRight' }} />}
          {series.map((s, i) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.label}
              stroke={CATEGORICAL[mode][s.slot ?? i]}
              strokeWidth={2}
              dot={data.length <= 30 ? { r: 3, strokeWidth: 0, fill: CATEGORICAL[mode][s.slot ?? i] } : false}
              activeDot={{ r: 5, stroke: mode === 'dark' ? '#131a26' : '#ffffff', strokeWidth: 2 }}
              isAnimationActive={false}
              connectNulls
            />
          ))}
        </RLineChart>
      </ResponsiveContainer>
    </div>
  )
}
