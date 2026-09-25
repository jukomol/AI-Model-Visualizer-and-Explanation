import { Dumbbell, RotateCcw, Square } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { LabeledSlider, Segmented, StatTile } from '@/components/viz/Controls'
import { LineChart } from '@/components/viz/LineChart'
import type { ModelSpec } from '@/lib/models'
import { fmt, pct } from '@/lib/utils'
import { TRAIN_SIZE, VAL_SIZE, type SessionState, type TrainParams } from '@/hooks/useExplodedModel'

export interface TrainingPanelProps {
  spec: ModelSpec
  state: SessionState
  onTrain: (p: TrainParams) => void
  onStop: () => void
  onReset: () => void
}

export function TrainingPanel({ spec, state, onTrain, onStop, onReset }: TrainingPanelProps) {
  const [lr, setLr] = useState(spec.defaults.learningRate)
  const [epochs, setEpochs] = useState(3)
  const [batch, setBatch] = useState(String(spec.defaults.batchSize))
  const training = state.status === 'training'
  const last = state.history[state.history.length - 1]
  const prog = state.progress
  const done = prog ? ((prog.epoch - (prog.totalEpochs - epochs)) * prog.batchesPerEpoch + prog.batch) / (epochs * prog.batchesPerEpoch) : 0
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold">Train in your browser</h4>
        <span className="text-xs text-muted-foreground">
          {TRAIN_SIZE.toLocaleString()} train / {VAL_SIZE} validation images
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <LabeledSlider label="Learning rate (Adam)" value={lr} min={0.0001} max={0.1} step={0.0001} log onChange={setLr} format={(v) => v.toPrecision(2)} disabled={training} />
        <LabeledSlider label="Epochs per run" value={epochs} min={1} max={15} step={1} onChange={setEpochs} disabled={training} />
      </div>
      <Segmented
        label="Batch size"
        value={batch}
        onChange={setBatch}
        options={[
          { value: '16', label: '16' },
          { value: '32', label: '32' },
          { value: '64', label: '64' },
        ]}
      />
      <div className="flex flex-wrap gap-2">
        {training ? (
          <Button size="sm" variant="destructive" onClick={onStop}>
            <Square /> Stop
          </Button>
        ) : (
          <Button size="sm" onClick={() => onTrain({ epochs, learningRate: lr, batchSize: Number(batch) })} disabled={state.status !== 'ready'}>
            <Dumbbell /> {state.history.length > 0 ? `Train ${epochs} more` : `Train ${epochs} epoch${epochs === 1 ? '' : 's'}`}
          </Button>
        )}
        <Button size="sm" variant="ghost" onClick={onReset} disabled={training || state.status !== 'ready'}>
          <RotateCcw /> Re-initialise
        </Button>
      </div>
      {training && prog && (
        <div className="space-y-1">
          <Progress value={100 * Math.min(1, done)} label="Training progress" />
          <p className="text-xs text-muted-foreground">
            Epoch {Math.min(prog.epoch + 1, prog.totalEpochs)} of {prog.totalEpochs} · batch {prog.batch}/{prog.batchesPerEpoch}
          </p>
        </div>
      )}
      <div className="grid grid-cols-2 gap-2">
        <StatTile label="Validation loss" value={last ? fmt(last.valLoss, 3) : '—'} sub={last ? `train ${fmt(last.loss, 3)}` : 'untrained'} />
        <StatTile label="Validation accuracy" value={last ? pct(last.valAcc) : '—'} sub={last ? `train ${pct(last.acc)}` : 'chance ≈ 25%'} />
      </div>
      {state.history.length > 0 && (
        <LineChart
          ariaLabel="Training and validation loss per epoch"
          data={state.history.map((h) => ({ epoch: h.epoch, loss: h.loss, valLoss: h.valLoss }))}
          xKey="epoch"
          xLabel="epoch"
          series={[
            { key: 'loss', label: 'Training loss', slot: 0 },
            { key: 'valLoss', label: 'Validation loss', slot: 1 },
          ]}
          height={170}
        />
      )}
    </div>
  )
}
