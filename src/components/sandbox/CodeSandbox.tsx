import { AlertTriangle, Cpu, Loader2, Play, RotateCcw, Square } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { NativeSelect } from '@/components/ui/select'
import { VizFrame } from '@/components/viz/VizFrame'
import { fmt } from '@/lib/utils'
import { EXAMPLES } from './examples'
import type { SandboxResponse } from './sandbox.worker'

const TIMEOUT_MS = 8000

function createWorker() {
  return new Worker(new URL('./sandbox.worker.ts', import.meta.url), { type: 'module' })
}

export default function CodeSandbox() {
  const [exampleId, setExampleId] = useState('shapes')
  const [code, setCode] = useState(EXAMPLES.shapes.code)
  const [result, setResult] = useState<SandboxResponse | null>(null)
  const [status, setStatus] = useState<'idle' | 'running' | 'timeout'>('idle')
  const worker = useRef<Worker | null>(null)
  const timer = useRef(0)
  const seq = useRef(0)

  const boot = useCallback(() => {
    worker.current?.terminate()
    const w = createWorker()
    w.onmessage = (e: MessageEvent<SandboxResponse>) => {
      if (e.data.id !== seq.current) return
      window.clearTimeout(timer.current)
      setResult(e.data)
      setStatus('idle')
    }
    worker.current = w
  }, [])

  useEffect(() => {
    boot()
    return () => {
      window.clearTimeout(timer.current)
      worker.current?.terminate()
    }
  }, [boot])

  const run = () => {
    if (!worker.current) boot()
    seq.current++
    setStatus('running')
    worker.current!.postMessage({ id: seq.current, code })
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      setStatus('timeout')
      boot()
    }, TIMEOUT_MS)
  }

  const stop = () => {
    window.clearTimeout(timer.current)
    setStatus('idle')
    boot()
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      run()
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const t = e.currentTarget
      const { selectionStart: s, selectionEnd: end } = t
      const next = `${code.slice(0, s)}  ${code.slice(end)}`
      setCode(next)
      requestAnimationFrame(() => t.setSelectionRange(s + 2, s + 2))
    }
  }

  return (
    <VizFrame
      title="Tensor sandbox"
      description={
        <>
          Write TensorFlow.js code and inspect the tensors it produces. <code>tf</code>, <code>print(…)</code> and <code>show(tensor, label)</code> are in scope, and top-level <code>await</code> works.
          Code runs in a Web Worker with no page access and is stopped after {TIMEOUT_MS / 1000} s. Ctrl/⌘ + Enter runs it.
        </>
      }
      stacked
    >
      <div className="grid gap-4 xl:grid-cols-2">
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <div className="min-w-56 flex-1">
              <NativeSelect
                aria-label="Example snippet"
                value={exampleId}
                onChange={(e) => {
                  setExampleId(e.target.value)
                  setCode(EXAMPLES[e.target.value].code)
                }}
              >
                {Object.entries(EXAMPLES).map(([id, ex]) => (
                  <option key={id} value={id}>
                    {ex.title}
                  </option>
                ))}
              </NativeSelect>
            </div>
            {status === 'running' ? (
              <Button onClick={stop} variant="destructive">
                <Square /> Stop
              </Button>
            ) : (
              <Button onClick={run}>
                <Play /> Run
              </Button>
            )}
            <Button variant="ghost" onClick={() => setCode(EXAMPLES[exampleId].code)} aria-label="Restore the example code">
              <RotateCcw />
            </Button>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            aria-label="TensorFlow.js code"
            className="h-[26rem] w-full resize-y rounded-lg border bg-muted/50 p-3 font-mono text-[13px] leading-5 focus-visible:outline-2 focus-visible:outline-ring"
          />
        </div>
        <div className="flex min-h-[26rem] flex-col rounded-lg border bg-background/60">
          <div className="flex flex-wrap items-center gap-2 border-b px-3 py-2 text-xs text-muted-foreground">
            {status === 'running' && (
              <span className="flex items-center gap-1">
                <Loader2 className="size-3.5 animate-spin" /> running…
              </span>
            )}
            {status === 'timeout' && (
              <span className="flex items-center gap-1 text-destructive">
                <AlertTriangle className="size-3.5" /> stopped after {TIMEOUT_MS / 1000} s (worker restarted)
              </span>
            )}
            {result && status === 'idle' && (
              <>
                <Badge variant="outline">
                  <Cpu /> {result.backend}
                </Badge>
                <span>{fmt(result.ms, 1)} ms</span>
                <span>
                  live tensors {result.tensorsBefore} → {result.tensorsAfter}
                  {result.tensorsAfter > result.tensorsBefore && ` (+${result.tensorsAfter - result.tensorsBefore} not disposed)`}
                </span>
              </>
            )}
            {!result && status === 'idle' && <span>Output appears here.</span>}
          </div>
          <div className="flex-1 space-y-2 overflow-auto p-3 font-mono text-[12.5px]" aria-live="polite">
            {result?.lines.map((l, i) =>
              l.kind === 'log' ? (
                <pre key={i} className="whitespace-pre-wrap">
                  {l.text}
                </pre>
              ) : l.kind === 'error' ? (
                <pre key={i} className="whitespace-pre-wrap text-destructive">
                  {l.text}
                </pre>
              ) : (
                <div key={i} className="rounded-md border bg-card p-2">
                  <div className="mb-1 flex flex-wrap items-center gap-2 font-sans text-xs">
                    <span className="font-semibold">{l.label}</span>
                    <Badge variant="secondary">shape [{l.shape.join(', ')}]</Badge>
                    <Badge variant="outline">{l.dtype}</Badge>
                    {l.stats && (
                      <span className="text-muted-foreground">
                        min {fmt(l.stats.min, 4)} · max {fmt(l.stats.max, 4)} · mean {fmt(l.stats.mean, 4)}
                      </span>
                    )}
                  </div>
                  <pre className="max-h-48 overflow-auto whitespace-pre">{l.values}</pre>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </VizFrame>
  )
}
