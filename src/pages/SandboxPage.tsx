import { FlaskConical, LayoutGrid, Paintbrush, Terminal } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { NativeSelect } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { VISUALIZERS, visualizerComponents } from '@/visualizers/registry'

const DatasetPainter = visualizerComponents.DatasetPainter
const CodeSandbox = visualizerComponents.CodeSandbox

export default function SandboxPage() {
  const [params, setParams] = useSearchParams()
  const tool = params.get('tool') ?? 'painter'
  const viz = params.get('viz') ?? VISUALIZERS[0].name
  const Selected = visualizerComponents[viz] ?? visualizerComponents[VISUALIZERS[0].name]
  const set = (patch: Record<string, string>) => setParams({ tool, viz, ...patch }, { replace: true })
  return (
    <div className="mx-auto max-w-[90rem] px-4 py-8 sm:px-6">
      <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight">
        <FlaskConical className="size-7 text-primary" aria-hidden /> Sandbox
      </h1>
      <p className="mt-1 max-w-3xl text-muted-foreground">
        Free play without a lesson attached. Paint datasets, run TensorFlow.js snippets against live tensors, or open any visualizer from the curriculum.
      </p>
      <Tabs value={tool} onValueChange={(v) => set({ tool: v })} className="mt-6">
        <TabsList>
          <TabsTrigger value="painter">
            <Paintbrush /> Dataset painter
          </TabsTrigger>
          <TabsTrigger value="code">
            <Terminal /> Tensor sandbox
          </TabsTrigger>
          <TabsTrigger value="gallery">
            <LayoutGrid /> All visualizers
          </TabsTrigger>
        </TabsList>
        <TabsContent value="painter">{tool === 'painter' && <DatasetPainter />}</TabsContent>
        <TabsContent value="code">{tool === 'code' && CodeSandbox && <CodeSandbox />}</TabsContent>
        <TabsContent value="gallery">
          <div className="max-w-md">
            <NativeSelect aria-label="Visualizer" value={viz} onChange={(e) => set({ viz: e.target.value })}>
              {VISUALIZERS.map((v) => (
                <option key={v.name} value={v.name}>
                  {v.title}
                </option>
              ))}
            </NativeSelect>
          </div>
          {tool === 'gallery' && <Selected key={viz} />}
        </TabsContent>
      </Tabs>
    </div>
  )
}
