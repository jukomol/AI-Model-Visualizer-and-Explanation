import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ControlGroup, LabeledSlider, Segmented, StatTile, ToggleRow } from '@/components/viz/Controls'
import { LineChart } from '@/components/viz/LineChart'
import { VizFrame } from '@/components/viz/VizFrame'
import { diverging, inkOn, rgbString } from '@/lib/colormap'
import { ACTIONS, argmax, cellXY, defaultWorld, greedySuccessRate, isTerminal, qLearning, step, valueIteration, type Action } from '@/lib/gridworld'
import { createRng } from '@/lib/random'
import { fmt, pct } from '@/lib/utils'
import { useAnimationLoop } from '@/hooks/useAnimationLoop'
import { useChallengeReporter } from '@/hooks/useChallenge'
import { useThemeMode } from '@/hooks/useThemeMode'

const CELL = 64
const ARROW: Record<Action, [number, number]> = { 0: [0, -1], 1: [1, 0], 2: [0, 1], 3: [-1, 0] }

export default function GridWorldViz() {
  const mode = useThemeMode()
  const report = useChallengeReporter()
  const [slip, setSlip] = useState(0)
  const world = useMemo(() => defaultWorld(slip), [slip])
  const n = world.width * world.height
  const [alpha, setAlpha] = useState(0.5)
  const [gamma, setGamma] = useState(0.95)
  const [epsilon, setEpsilon] = useState(0.3)
  const [explore, setExplore] = useState(false)
  const [chunk, setChunk] = useState(100)
  const [view, setView] = useState<'q' | 'vstar'>('q')
  const [Q, setQ] = useState<number[][]>(() => Array.from({ length: n }, () => [0, 0, 0, 0]))
  const [returns, setReturns] = useState<number[]>([])
  const [agent, setAgent] = useState<number | null>(null)
  const seedRef = useRef(1)
  const epsRef = useRef(epsilon)

  const reset = () => {
    setQ(Array.from({ length: n }, () => [0, 0, 0, 0]))
    setReturns([])
    setAgent(null)
    seedRef.current = 1
    epsRef.current = epsilon
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(reset, [world])

  const train = () => {
    const r = qLearning(
      world,
      { episodes: chunk, alpha, gamma, epsilon: epsRef.current, epsilonDecay: 0.995, maxSteps: 100, exploringStarts: explore, rng: createRng(seedRef.current++) },
      Q,
    )
    epsRef.current *= 0.995 ** chunk
    setQ(r.Q)
    setReturns((prev) => [...prev, ...r.returns])
  }

  const success = useMemo(() => greedySuccessRate(world, Q), [world, Q])
  useEffect(() => {
    if (returns.length > 0 && slip === 0) report('qlearning-success', success)
  }, [success, returns.length, slip, report])
  const vstar = useMemo(() => valueIteration(world, gamma).V, [world, gamma])

  // Animate one greedy episode from the start cell.
  const animRng = useRef(createRng(99))
  useAnimationLoop(
    agent !== null,
    () => {
      if (agent === null) return false
      if (isTerminal(world, agent)) {
        setAgent(null)
        return false
      }
      setAgent(step(world, agent, argmax(Q[agent]) as Action, animRng.current).next)
    },
    4,
  )

  const values = view === 'q' ? Q.map((q) => Math.max(...q)) : vstar
  const vmax = Math.max(1e-9, ...values.map(Math.abs))
  const smoothed = useMemo(() => {
    const out: { episode: number; return: number }[] = []
    const every = Math.max(1, Math.floor(returns.length / 150))
    for (let i = 0; i < returns.length; i += every) {
      const w = returns.slice(Math.max(0, i - 24), i + 1)
      out.push({ episode: i + 1, return: w.reduce((a, b) => a + b, 0) / w.length })
    }
    return out
  }, [returns])
  const recent = returns.slice(-50)

  return (
    <VizFrame
      title="Q-learning in a grid world"
      description="The agent starts bottom-left, pays −0.04 per step, earns +1 at the goal and −1 in the traps. It knows nothing about the map. It only updates Q(s, a) from the rewards it experiences, and the arrows show its current greedy choice in each cell."
      controls={
        <>
          <ControlGroup title="Learning">
            <LabeledSlider label="Learning rate α" value={alpha} min={0.05} max={1} step={0.05} onChange={setAlpha} format={(v) => v.toFixed(2)} />
            <LabeledSlider label="Discount γ" value={gamma} min={0.5} max={0.99} step={0.01} onChange={setGamma} format={(v) => v.toFixed(2)} />
            <LabeledSlider label="Exploration ε (start)" value={epsilon} min={0} max={1} step={0.05} onChange={(v) => { setEpsilon(v); epsRef.current = v }} format={(v) => v.toFixed(2)} />
            <ToggleRow label="Exploring starts" checked={explore} onChange={setExplore} hint="Begin each episode in a random cell instead of the corner." />
            <Segmented
              label="Slippery floor"
              value={String(slip)}
              onChange={(v) => setSlip(Number(v))}
              options={[
                { value: '0', label: 'none' },
                { value: '0.1', label: '10%' },
                { value: '0.2', label: '20%' },
              ]}
            />
          </ControlGroup>
          <ControlGroup title="Run">
            <Segmented
              label="Episodes per click"
              value={String(chunk)}
              onChange={(v) => setChunk(Number(v))}
              options={[
                { value: '10', label: '10' },
                { value: '100', label: '100' },
                { value: '500', label: '500' },
              ]}
            />
            <div className="flex flex-wrap gap-2">
              <Button size="sm" onClick={train}>
                Train {chunk} episodes
              </Button>
              <Button size="sm" variant="outline" onClick={() => setAgent(world.start)} disabled={agent !== null}>
                Watch greedy run
              </Button>
              <Button size="sm" variant="ghost" onClick={reset}>
                Reset Q
              </Button>
            </div>
          </ControlGroup>
        </>
      }
    >
      <div className="space-y-4">
        <Segmented
          value={view}
          onChange={setView}
          options={[
            { value: 'q', label: 'Learned: max_a Q(s, a)' },
            { value: 'vstar', label: 'Optimal V*(s) (value iteration)' },
          ]}
          className="max-w-md"
        />
        <svg viewBox={`0 0 ${world.width * CELL} ${world.height * CELL}`} className="mx-auto w-full max-w-2xl rounded-lg" role="img" aria-label="Grid world with state values and greedy actions">
          {Array.from({ length: n }, (_, s) => {
            const [x, y] = cellXY(world, s)
            const wall = world.walls.has(s)
            const term = world.terminals.get(s)
            const fill = wall ? null : term !== undefined ? diverging(term, mode) : diverging(values[s] / vmax, mode)
            const q = Q[s]
            const hasQ = q.some((v) => v !== 0)
            const a = argmax(q) as Action
            const vA = view === 'vstar' ? null : a
            return (
              <g key={s} transform={`translate(${x * CELL},${y * CELL})`}>
                <rect x={1} y={1} width={CELL - 2} height={CELL - 2} rx={6} fill={fill ? rgbString(fill) : 'var(--muted-foreground)'} opacity={wall ? 0.35 : 1} />
                {term !== undefined && (
                  <text x={CELL / 2} y={CELL / 2 + 6} textAnchor="middle" className="text-[16px] font-bold" fill={inkOn(fill!)}>
                    {term > 0 ? '+1' : '−1'}
                  </text>
                )}
                {!wall && term === undefined && (
                  <>
                    <text x={CELL / 2} y={CELL - 8} textAnchor="middle" className="font-mono text-[9px]" fill={inkOn(fill!)}>
                      {fmt(values[s], 2)}
                    </text>
                    {vA !== null && hasQ && (
                      <line
                        x1={CELL / 2 - ARROW[vA][0] * 10}
                        y1={CELL / 2 - 6 - ARROW[vA][1] * 10}
                        x2={CELL / 2 + ARROW[vA][0] * 12}
                        y2={CELL / 2 - 6 + ARROW[vA][1] * 12}
                        stroke={inkOn(fill!)}
                        strokeWidth={2.5}
                        style={{ color: inkOn(fill!) }}
                        markerEnd="url(#gw-arrow)"
                      />
                    )}
                    {s === world.start && (
                      <text x={6} y={14} className="text-[9px] font-semibold" fill={inkOn(fill!)}>
                        start
                      </text>
                    )}
                  </>
                )}
              </g>
            )
          })}
          <defs>
            <marker id="gw-arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 z" fill="currentColor" />
            </marker>
          </defs>
          {agent !== null && (() => {
            const [x, y] = cellXY(world, agent)
            return <circle cx={x * CELL + CELL / 2} cy={y * CELL + CELL / 2 - 6} r={12} className="fill-primary stroke-background" strokeWidth={3} />
          })()}
        </svg>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <StatTile label="Episodes" value={returns.length.toLocaleString()} sub={`ε now ${epsRef.current.toFixed(3)}`} />
          <StatTile label="Greedy success from all cells" value={pct(success)} tone={success >= 1 ? 'good' : undefined} />
          <StatTile label="Mean return (last 50)" value={recent.length ? fmt(recent.reduce((a, b) => a + b, 0) / recent.length, 3) : '—'} />
          <StatTile label="V*(start)" value={fmt(vstar[world.start], 3)} sub={`Q-learned ${fmt(Math.max(...Q[world.start]), 3)}`} />
        </div>
        {smoothed.length > 1 && (
          <LineChart ariaLabel="Episode return (moving average of 25)" data={smoothed} xKey="episode" xLabel="episode" series={[{ key: 'return', label: 'Return (25-episode average)' }]} yDomain={['auto', 'auto']} height={170} />
        )}
        <p className="text-xs text-muted-foreground">
          Colour shows the state value on a diverging scale (blue negative, red positive). {ACTIONS.length} actions per cell: up, right, down, left.
        </p>
      </div>
    </VizFrame>
  )
}
