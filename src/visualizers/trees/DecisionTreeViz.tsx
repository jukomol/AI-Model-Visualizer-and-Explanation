import { useEffect, useMemo, useState } from 'react'
import { NativeSelect } from '@/components/ui/select'
import { ControlGroup, LabeledSlider, Segmented, StatTile, ToggleRow } from '@/components/viz/Controls'
import { ClassLegend, ClassMarker, Plot2D, type PlotScales } from '@/components/viz/Plot2D'
import { hexToRgb, paintField } from '@/components/viz/paintField'
import { VizFrame } from '@/components/viz/VizFrame'
import { CLASS_COLORS } from '@/lib/colormap'
import { generatePreset, PRESET_LABELS, type DatasetPreset } from '@/lib/datasets2d'
import { buildTree, countNodes, predictForest, predictProbaForest, predictTree, randomForest, treeRegions, type Criterion, type TreeNode } from '@/lib/decisionTree'
import { createRng } from '@/lib/random'
import { fmt, pct } from '@/lib/utils'
import { useChallengeReporter } from '@/hooks/useChallenge'
import { useThemeMode } from '@/hooks/useThemeMode'

const DOMAIN = { xMin: -1, xMax: 1, yMin: -1, yMax: 1 }
const UNLIMITED = 16

function TreeDiagram({ tree }: { tree: TreeNode }) {
  const mode = useThemeMode()
  const maxShow = 2
  const W = 640
  const rows = Math.min(maxShow, countNodes(tree).depth) + 1
  const H = rows * 64
  const nodes: React.ReactNode[] = []
  const walk = (n: TreeNode, x: number, span: number, level: number, parent?: [number, number]) => {
    const y = 26 + level * 64
    if (parent) nodes.push(<line key={`e${level}-${x}`} x1={parent[0]} y1={parent[1] + 16} x2={x} y2={y - 16} className="stroke-muted-foreground" strokeWidth={1} />)
    const leaf = !n.left || !n.right
    const truncated = !leaf && level >= maxShow
    const color = CLASS_COLORS[mode][n.prediction % 4]
    nodes.push(
      <g key={`n${level}-${x}`} transform={`translate(${x},${y})`}>
        <rect x={-54} y={-16} width={108} height={32} rx={6} fill="var(--viz-surface)" stroke={color} strokeWidth={leaf || truncated ? 2 : 1} />
        <text textAnchor="middle" y={-3} className="fill-foreground font-mono text-[9.5px]">
          {leaf ? `leaf → class ${n.prediction}` : truncated ? '… subtree' : `${n.feature === 0 ? 'x' : 'y'} ≤ ${n.threshold!.toFixed(2)}`}
        </text>
        <text textAnchor="middle" y={10} className="fill-muted-foreground font-mono text-[9px]">
          n={n.samples} [{n.counts.join(',')}] imp {n.impurity.toFixed(2)}
        </text>
      </g>,
    )
    if (!leaf && !truncated) {
      walk(n.left!, x - span / 2, span / 2, level + 1, [x, y])
      walk(n.right!, x + span / 2, span / 2, level + 1, [x, y])
    }
  }
  walk(tree, W / 2, W / 2, 0)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto w-full max-w-3xl" role="img" aria-label="Top levels of the decision tree">
      {nodes}
    </svg>
  )
}

export default function DecisionTreeViz() {
  const mode = useThemeMode()
  const report = useChallengeReporter()
  const [preset, setPreset] = useState<DatasetPreset>('moons')
  const [model, setModel] = useState<'tree' | 'forest'>('tree')
  const [depth, setDepth] = useState(UNLIMITED)
  const [minSplit, setMinSplit] = useState(2)
  const [criterion, setCriterion] = useState<Criterion>('gini')
  const [trees, setTrees] = useState(30)
  const [showTest, setShowTest] = useState(true)
  const noise = preset === 'moons' ? 0.25 : 0.12
  const train = useMemo(() => generatePreset(preset, createRng(4), noise), [preset, noise])
  const test = useMemo(() => generatePreset(preset, createRng(5), noise), [preset, noise])
  const classes = Math.max(...train.map((p) => p.label)) + 1
  const X = useMemo(() => train.map((p) => [p.x, p.y] as [number, number]), [train])
  const y = useMemo(() => train.map((p) => p.label), [train])
  const maxDepth = depth >= UNLIMITED ? 50 : depth
  const tree = useMemo(() => buildTree(X, y, { maxDepth, minSamplesSplit: minSplit, criterion, classes }), [X, y, maxDepth, minSplit, criterion, classes])
  const forest = useMemo(
    () => (model === 'forest' ? randomForest(X, y, { trees, maxDepth, minSamplesSplit: minSplit, criterion, classes, rng: createRng(1) }) : null),
    [model, X, y, trees, maxDepth, minSplit, criterion, classes],
  )
  const predict = (x: readonly number[]) => (forest ? predictForest(forest, x) : predictTree(tree, x))
  const trainAcc = train.filter((p) => predict([p.x, p.y]) === p.label).length / train.length
  const testAcc = test.filter((p) => predict([p.x, p.y]) === p.label).length / test.length
  useEffect(() => {
    if (preset === 'moons') report('tree-test-accuracy', testAcc)
  }, [preset, testAcc, report])
  const stats = countNodes(tree)
  const regions = useMemo(() => (forest ? [] : treeRegions(tree, DOMAIN)), [tree, forest])
  const colors = CLASS_COLORS[mode]

  const forestBg = (ctx: CanvasRenderingContext2D, s: PlotScales) => {
    if (!forest) return
    const rgb = colors.map(hexToRgb)
    paintField(ctx, s, DOMAIN, 70, (x, yy) => {
      const p = predictProbaForest(forest, [x, yy])
      const k = p.indexOf(Math.max(...p))
      const c = rgb[k % rgb.length]
      return [c[0], c[1], c[2], Math.round(20 + 100 * (p[k] - 1 / classes) / (1 - 1 / classes))]
    })
  }

  return (
    <VizFrame
      title="Decision trees & random forests"
      description="A tree recursively splits the plane with the axis-aligned cut that most reduces impurity. Filled markers are training points, hollow ones held-out test points. Watch a fully grown tree carve out single noisy points, then prune it or average a forest."
      controls={
        <>
          <ControlGroup title="Data">
            <NativeSelect aria-label="Dataset" value={preset} onChange={(e) => setPreset(e.target.value as DatasetPreset)}>
              {(['moons', 'xor', 'circles', 'spiral', 'blobs'] as const).map((p) => (
                <option key={p} value={p}>
                  {PRESET_LABELS[p]}
                  {p === 'moons' ? ' (noisy)' : ''}
                </option>
              ))}
            </NativeSelect>
            <ToggleRow label="Show test points" checked={showTest} onChange={setShowTest} />
          </ControlGroup>
          <ControlGroup title="Model">
            <Segmented
              value={model}
              onChange={setModel}
              options={[
                { value: 'tree', label: 'Single tree' },
                { value: 'forest', label: 'Random forest' },
              ]}
            />
            <LabeledSlider label="Max depth" value={depth} min={1} max={UNLIMITED} step={1} onChange={setDepth} format={(v) => (v >= UNLIMITED ? 'unlimited' : String(v))} />
            <LabeledSlider label="Min samples to split" value={minSplit} min={2} max={40} step={1} onChange={setMinSplit} />
            <Segmented
              label="Impurity"
              value={criterion}
              onChange={setCriterion}
              options={[
                { value: 'gini', label: 'Gini' },
                { value: 'entropy', label: 'Entropy' },
              ]}
            />
            {model === 'forest' && <LabeledSlider label="Trees" value={trees} min={1} max={80} step={1} onChange={setTrees} hint="Each tree sees a bootstrap resample and a random feature per split." />}
          </ControlGroup>
        </>
      }
    >
      <div className="space-y-4">
        <Plot2D domain={DOMAIN} maxHeight={430} ariaLabel="Decision regions with training and test points" background={forest ? forestBg : undefined} backgroundKey={`${forest?.length}-${maxDepth}-${minSplit}-${criterion}-${mode}-${preset}`}>
          {(s) => (
            <>
              {regions.map((r, i) => (
                <rect
                  key={i}
                  x={s.sx(r.xMin)}
                  y={s.sy(r.yMax)}
                  width={s.sx(r.xMax) - s.sx(r.xMin)}
                  height={s.sy(r.yMin) - s.sy(r.yMax)}
                  fill={colors[r.prediction % 4]}
                  fillOpacity={0.08 + 0.18 * r.purity}
                  stroke="var(--viz-axis)"
                  strokeWidth={1}
                />
              ))}
              {train.map((p, i) => (
                <ClassMarker key={`tr${i}`} x={s.sx(p.x)} y={s.sy(p.y)} cls={p.label} r={3.5} />
              ))}
              {showTest &&
                test.map((p, i) => <circle key={`te${i}`} cx={s.sx(p.x)} cy={s.sy(p.y)} r={4} fill="none" stroke={colors[p.label % 4]} strokeWidth={1.5} />)}
            </>
          )}
        </Plot2D>
        <ClassLegend labels={Array.from({ length: classes }, (_, k) => `Class ${k}`)} />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <StatTile label="Training accuracy" value={pct(trainAcc)} />
          <StatTile label="Test accuracy" value={pct(testAcc)} tone={preset === 'moons' ? (testAcc >= 0.8 ? 'good' : 'bad') : undefined} />
          <StatTile label={model === 'forest' ? 'Trees' : 'Leaves'} value={model === 'forest' ? trees : stats.leaves} sub={model === 'tree' ? `depth ${stats.depth}` : undefined} />
          <StatTile label="Root impurity" value={fmt(tree.impurity, 3)} sub={criterion === 'gini' ? 'Gini' : 'bits'} />
        </div>
        {model === 'tree' && (
          <figure className="space-y-1">
            <figcaption className="text-xs font-medium text-muted-foreground">Top of the tree (split rule, samples, class counts, impurity)</figcaption>
            <TreeDiagram tree={tree} />
          </figure>
        )}
      </div>
    </VizFrame>
  )
}
