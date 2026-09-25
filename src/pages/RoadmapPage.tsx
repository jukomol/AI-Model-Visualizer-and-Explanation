import { List, Network } from 'lucide-react'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { NodeCard } from '@/components/roadmap/NodeCard'
import { RoadmapList, TechTree } from '@/components/roadmap/TechTree'
import { getNode, nextRecommended } from '@/lib/curriculum'
import { useProgressStore } from '@/store/useProgressStore'

export default function RoadmapPage() {
  const masteredList = useProgressStore((s) => s.masteredNodes)
  const activeNode = useProgressStore((s) => s.activeNode)
  const mastered = new Set(masteredList)
  const recommended = nextRecommended(mastered)
  const [selected, setSelected] = useState<string | null>(activeNode ?? recommended?.id ?? 'linear-regression')
  const [view, setView] = useState(() => (typeof window !== 'undefined' && window.innerWidth < 900 ? 'list' : 'tree'))
  const node = getNode(selected)
  return (
    <div className="mx-auto max-w-[90rem] px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Curriculum tech tree</h1>
          <p className="mt-1 max-w-2xl text-muted-foreground">
            Concepts unlock as you master their prerequisites. Pass a lesson’s challenge to master it. Locked lessons stay
            readable, so feel free to peek ahead.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span>
            <span className="font-semibold text-success">●</span> Mastered
          </span>
          <span>
            <span className="font-semibold text-primary">●</span> Ready
          </span>
          <span>
            <span className="font-semibold">🔒</span> Locked
          </span>
        </div>
      </div>
      <Tabs value={view} onValueChange={setView}>
        <TabsList>
          <TabsTrigger value="tree">
            <Network /> Tree
          </TabsTrigger>
          <TabsTrigger value="list">
            <List /> List
          </TabsTrigger>
        </TabsList>
        <div className="mt-4 grid gap-6 2xl:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="min-w-0">
            <TabsContent value="tree" className="mt-0">
              <TechTree mastered={mastered} selected={selected} recommended={recommended?.id} onSelect={setSelected} />
            </TabsContent>
            <TabsContent value="list" className="mt-0">
              <RoadmapList mastered={mastered} selected={selected} onSelect={setSelected} />
            </TabsContent>
          </div>
          <aside className="max-w-2xl 2xl:sticky 2xl:top-20 2xl:max-w-none 2xl:self-start">{node && <NodeCard node={node} mastered={mastered} />}</aside>
        </div>
      </Tabs>
    </div>
  )
}
