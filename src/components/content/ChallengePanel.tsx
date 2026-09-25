import { CheckCircle2, Lock, RotateCcw, Target, Trophy, XCircle } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/toaster'
import { checkMetric, getNode, type CurriculumNode, type MetricChallenge, type QuizChallenge } from '@/lib/curriculum'
import { cn, fmt } from '@/lib/utils'
import { useLiveMetrics } from '@/hooks/useChallenge'
import { useProgressStore } from '@/store/useProgressStore'

function MetricBody({ challenge, locked }: { challenge: MetricChallenge; locked: boolean }) {
  const live = useLiveMetrics((s) => s.values[challenge.metric])
  const best = useProgressStore((s) => s.challengeBest[challenge.metric])
  const op = challenge.comparator === 'lte' ? '≤' : '≥'
  const passedLive = live !== undefined && checkMetric(challenge, live)
  return (
    <div className="grid gap-2 sm:grid-cols-3">
      <div className="rounded-lg border bg-background/60 px-3 py-2">
        <p className="text-xs text-muted-foreground">Target</p>
        <p className="font-mono text-sm font-semibold">
          {op} {fmt(challenge.threshold)} {challenge.unit}
        </p>
      </div>
      <div className="rounded-lg border bg-background/60 px-3 py-2">
        <p className="text-xs text-muted-foreground">Current</p>
        <p className={cn('font-mono text-sm font-semibold', passedLive && 'text-success')}>{live === undefined ? '—' : fmt(live)}</p>
      </div>
      <div className="rounded-lg border bg-background/60 px-3 py-2">
        <p className="text-xs text-muted-foreground">Your best</p>
        <p className="font-mono text-sm font-semibold">{best === undefined ? '—' : fmt(best)}</p>
      </div>
      <p className="text-xs text-muted-foreground sm:col-span-3">
        {locked
          ? 'Your results are recorded, but mastery unlocks once the prerequisites are mastered.'
          : 'Use the interactive visualizer above — the challenge is checked automatically as you experiment.'}
      </p>
    </div>
  )
}

function QuizBody({ node, challenge, locked, mastered }: { node: CurriculumNode; challenge: QuizChallenge; locked: boolean; mastered: boolean }) {
  const [choice, setChoice] = useState<number | null>(null)
  const [result, setResult] = useState<'correct' | 'wrong' | null>(mastered ? 'correct' : null)
  const markMastered = useProgressStore((s) => s.markMastered)
  const submit = () => {
    if (choice === null) return
    if (choice === challenge.answerIndex) {
      setResult('correct')
      if (!locked && !mastered) {
        markMastered(node.id)
        toast({ kind: 'success', title: `${node.title} mastered!`, description: 'New concepts may have unlocked on the roadmap.' })
      }
    } else setResult('wrong')
  }
  return (
    <fieldset className="space-y-3" disabled={result === 'correct'}>
      <legend className="sr-only">{challenge.prompt}</legend>
      <div className="space-y-2">
        {challenge.options.map((o, i) => (
          <label
            key={o}
            className={cn(
              'flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2 text-sm transition-colors hover:bg-accent',
              choice === i && 'border-primary bg-primary/5',
              result === 'correct' && i === challenge.answerIndex && 'border-success bg-success/10',
            )}
          >
            <input
              type="radio"
              name={`quiz-${node.id}`}
              className="mt-1 accent-[var(--primary)]"
              checked={choice === i || (result === 'correct' && i === challenge.answerIndex)}
              onChange={() => {
                setChoice(i)
                setResult(null)
              }}
            />
            <span>{o}</span>
          </label>
        ))}
      </div>
      {result !== 'correct' && (
        <Button onClick={submit} disabled={choice === null}>
          Check answer
        </Button>
      )}
      {result === 'wrong' && (
        <p className="flex items-center gap-2 text-sm text-destructive" role="alert">
          <XCircle className="size-4" aria-hidden /> Not quite — revisit the visualizer and try again.
        </p>
      )}
      {result === 'correct' && (
        <p className="rounded-lg bg-success/10 p-3 text-sm" role="status">
          <span className="font-semibold text-success">Correct. </span>
          {challenge.explanation}
          {locked && ' Master the prerequisites to unlock this node.'}
        </p>
      )}
    </fieldset>
  )
}

export function ChallengePanel({ node }: { node: CurriculumNode }) {
  const mastered = useProgressStore((s) => s.masteredNodes.includes(node.id))
  const masteredNodes = useProgressStore((s) => s.masteredNodes)
  const unmaster = useProgressStore((s) => s.unmaster)
  const missing = node.prerequisites.filter((p) => !masteredNodes.includes(p))
  const locked = missing.length > 0
  return (
    <section
      id="challenge"
      className={cn('scroll-mt-24 rounded-xl border-2 bg-card p-5', mastered ? 'border-success/50' : 'border-primary/40')}
      aria-labelledby="challenge-title"
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 id="challenge-title" className="flex items-center gap-2 text-lg font-semibold">
          {mastered ? <Trophy className="size-5 text-success" aria-hidden /> : <Target className="size-5 text-primary" aria-hidden />}
          Mastery challenge
        </h2>
        {mastered ? (
          <Badge variant="success">
            <CheckCircle2 /> Mastered
          </Badge>
        ) : locked ? (
          <Badge variant="outline">
            <Lock /> Locked
          </Badge>
        ) : (
          <Badge variant="secondary">In progress</Badge>
        )}
      </div>
      <p className="mb-4 text-sm leading-6">{node.challenge.prompt}</p>
      {locked && (
        <p className="mb-4 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
          Prerequisites to master first: {missing.map((id) => getNode(id)?.title ?? id).join(', ')}.
        </p>
      )}
      {node.challenge.type === 'metric' ? (
        <MetricBody challenge={node.challenge} locked={locked} />
      ) : (
        <QuizBody key={String(mastered)} node={node} challenge={node.challenge} locked={locked} mastered={mastered} />
      )}
      {mastered && (
        <Button variant="ghost" size="sm" className="mt-3" onClick={() => unmaster(node.id)}>
          <RotateCcw /> Reset this node
        </Button>
      )}
    </section>
  )
}
