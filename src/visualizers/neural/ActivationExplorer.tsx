import { useEffect, useMemo, useState } from 'react'
import { NativeSelect } from '@/components/ui/select'
import { Tex } from '@/components/math/Tex'
import { ControlGroup, LabeledSlider, Segmented, StatTile } from '@/components/viz/Controls'
import { LineChart } from '@/components/viz/LineChart'
import { VizFrame } from '@/components/viz/VizFrame'
import { ACTIVATION_LABELS, ACTIVATION_TEX, INIT_LABELS, activation, activationGrad, simulateDeepNetwork, type ActivationId, type InitScheme } from '@/lib/activations'
import { CATEGORICAL } from '@/lib/colormap'
import { linspace } from '@/lib/linalg'
import { createRng } from '@/lib/random'
import { useChallengeReporter } from '@/hooks/useChallenge'
import { useThemeMode } from '@/hooks/useThemeMode'

const ALL: ActivationId[] = ['sigmoid', 'tanh', 'relu', 'leaky-relu', 'elu', 'gelu', 'silu', 'softplus']
const SLOT: Record<ActivationId, number> = { sigmoid: 0, tanh: 1, relu: 2, 'leaky-relu': 3, elu: 4, gelu: 6, silu: 7, softplus: 5 }

export default function ActivationExplorer() {
  const mode = useThemeMode()
  const report = useChallengeReporter()
  const [tab, setTab] = useState<'shapes' | 'depth'>('shapes')
  const [shown, setShown] = useState<Set<ActivationId>>(new Set(['sigmoid', 'tanh', 'relu', 'gelu']))
  const [focus, setFocus] = useState<ActivationId>('gelu')
  const [act, setAct] = useState<ActivationId>('sigmoid')
  const [init, setInit] = useState<InitScheme>('xavier')
  const [depth, setDepth] = useState(20)
  const [seed, setSeed] = useState(5)

  const shapeData = useMemo(
    () =>
      linspace(-4, 4, 161).map((x) => {
        const row: Record<string, number> = { x: Number(x.toFixed(2)) }
        for (const id of shown) {
          row[id] = activation(id, x)
          row[`${id}_g`] = activationGrad(id, x)
        }
        return row
      }),
    [shown],
  )
  const sim = useMemo(() => simulateDeepNetwork(depth, 32, act, init, createRng(seed), 32), [depth, act, init, seed])
  const ratio = sim.gradientNorm[0] / sim.gradientNorm[depth - 1]
  const logRatio = Math.abs(Math.log10(ratio))
  useEffect(() => {
    if (depth >= 20) report('depth-gradient-log-ratio', logRatio)
  }, [depth, logRatio, report])
  const depthData = sim.gradientNorm.map((g, l) => ({ layer: l + 1, gradient: g, activation: Math.max(1e-30, sim.activationStd[l]) }))
  const dead = sim.deadFraction.reduce((a, b) => a + b, 0) / depth
  const colors = CATEGORICAL[mode]

  return (
    <VizFrame
      title="Activation functions"
      description={
        tab === 'shapes'
          ? 'Every hidden unit applies a non-linearity φ. Its derivative φ′ multiplies every gradient that flows backwards through the unit, so flat regions (saturation) starve learning.'
          : 'A 20-layer, 32-unit random network: 32 random inputs pushed forward, a random gradient pushed back. Plotted per layer are the typical activation size and the gradient size that reaches it.'
      }
      controls={
        tab === 'shapes' ? (
          <ControlGroup title="Show">
            {ALL.map((id) => (
              <label key={id} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="accent-[var(--primary)]"
                  checked={shown.has(id)}
                  onChange={(e) => {
                    const next = new Set(shown)
                    if (e.target.checked) next.add(id)
                    else next.delete(id)
                    setShown(next)
                    if (e.target.checked) setFocus(id)
                  }}
                />
                <span className="inline-block h-0.5 w-4 rounded" style={{ background: colors[SLOT[id]] }} aria-hidden />
                {ACTIVATION_LABELS[id]}
              </label>
            ))}
            <NativeSelect aria-label="Formula to display" value={focus} onChange={(e) => setFocus(e.target.value as ActivationId)}>
              {ALL.map((id) => (
                <option key={id} value={id}>
                  Formula: {ACTIVATION_LABELS[id]}
                </option>
              ))}
            </NativeSelect>
          </ControlGroup>
        ) : (
          <ControlGroup title="Deep network">
            <NativeSelect aria-label="Activation" value={act} onChange={(e) => setAct(e.target.value as ActivationId)}>
              {ALL.map((id) => (
                <option key={id} value={id}>
                  {ACTIVATION_LABELS[id]}
                </option>
              ))}
            </NativeSelect>
            <Segmented
              label="Initialisation"
              value={init}
              onChange={setInit}
              options={(['xavier', 'he', 'small'] as const).map((i) => ({ value: i, label: i === 'small' ? 'Naive' : i === 'he' ? 'He' : 'Xavier' }))}
            />
            <p className="text-xs text-muted-foreground">{INIT_LABELS[init]}</p>
            <LabeledSlider label="Depth" value={depth} min={2} max={40} step={1} onChange={setDepth} />
            <button className="text-xs text-primary underline" onClick={() => setSeed((s) => s + 1)}>
              New random network
            </button>
          </ControlGroup>
        )
      }
    >
      <div className="space-y-4">
        <Segmented
          value={tab}
          onChange={setTab}
          options={[
            { value: 'shapes', label: 'Shapes & derivatives' },
            { value: 'depth', label: 'Gradients through depth' },
          ]}
          className="max-w-md"
        />
        {tab === 'shapes' ? (
          <>
            <div className="grid gap-4 lg:grid-cols-2">
              <figure>
                <figcaption className="mb-1 text-xs font-medium text-muted-foreground">φ(x)</figcaption>
                <LineChart ariaLabel="Activation functions" data={shapeData} xKey="x" xLabel="pre-activation x" series={[...shown].map((id) => ({ key: id, label: ACTIVATION_LABELS[id], slot: SLOT[id] }))} yDomain={['auto', 'auto']} height={240} />
              </figure>
              <figure>
                <figcaption className="mb-1 text-xs font-medium text-muted-foreground">φ′(x): the factor every back-propagated gradient is multiplied by</figcaption>
                <LineChart ariaLabel="Derivatives of the activation functions" data={shapeData} xKey="x" xLabel="pre-activation x" series={[...shown].map((id) => ({ key: `${id}_g`, label: ACTIVATION_LABELS[id], slot: SLOT[id] }))} yDomain={['auto', 'auto']} height={240} />
              </figure>
            </div>
            <div className="rounded-lg border bg-muted/40 p-3">
              <Tex display math={ACTIVATION_TEX[focus]} />
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <StatTile label="Gradient ratio layer 1 / layer L" value={ratio.toExponential(2)} tone={logRatio <= 1 ? 'good' : 'bad'} sub={`|log₁₀| = ${logRatio.toFixed(2)}`} />
              <StatTile label="Final activation std" value={sim.activationStd[depth - 1].toExponential(2)} />
              <StatTile label="Dead units (mean)" value={`${(dead * 100).toFixed(1)}%`} sub="zero gradient for every input" />
              <StatTile label="Verdict" value={logRatio <= 1 ? 'trainable' : ratio < 1 ? 'vanishing' : 'exploding'} />
            </div>
            <LineChart
              ariaLabel="Gradient norm and activation standard deviation per layer"
              data={depthData}
              xKey="layer"
              xLabel="layer (1 = closest to the input)"
              series={[
                { key: 'gradient', label: '‖∂L/∂aₗ‖ gradient reaching the layer', slot: 0 },
                { key: 'activation', label: 'std of activations aₗ', slot: 1 },
              ]}
              logY
              yDomain={['auto', 'auto']}
              height={250}
            />
          </>
        )}
      </div>
    </VizFrame>
  )
}
