/**
 * Learning-rate schedules: multipliers applied to the base learning rate η₀
 * as a function of the step t ∈ [0, T).
 */

export type ScheduleId = 'constant' | 'step' | 'exponential' | 'cosine' | 'warmup-cosine' | 'one-cycle' | 'inverse-sqrt'

export const SCHEDULE_LABELS: Record<ScheduleId, string> = {
  constant: 'Constant',
  step: 'Step decay (÷10 at 50% and 75%)',
  exponential: 'Exponential decay',
  cosine: 'Cosine annealing',
  'warmup-cosine': 'Linear warm-up + cosine',
  'one-cycle': 'One-cycle',
  'inverse-sqrt': 'Warm-up + inverse √t (Transformer)',
}

export const SCHEDULE_FORMULAS: Record<ScheduleId, string> = {
  constant: String.raw`\eta_t = \eta_0`,
  step: String.raw`\eta_t = \eta_0 \cdot 0.1^{\,[t \ge T/2] + [t \ge 3T/4]}`,
  exponential: String.raw`\eta_t = \eta_0 \cdot 0.01^{\,t/T}`,
  cosine: String.raw`\eta_t = \tfrac{\eta_0}{2}\big(1 + \cos(\pi t / T)\big)`,
  'warmup-cosine': String.raw`\eta_t = \eta_0 \cdot \begin{cases} t / t_w & t < t_w \\ \tfrac12\big(1 + \cos(\pi \tfrac{t - t_w}{T - t_w})\big) & t \ge t_w\end{cases}`,
  'one-cycle': String.raw`\eta_t:\ \tfrac{\eta_0}{25} \nearrow \eta_0 \text{ over } 0.3T,\ \text{then cosine} \searrow \tfrac{\eta_0}{10^4}`,
  'inverse-sqrt': String.raw`\eta_t = \eta_0 \cdot \min\!\big(\tfrac{t+1}{t_w},\ \sqrt{t_w/(t+1)}\big)`,
}

/** Multiplier η_t / η₀ at step t of T. `warmup` is the fraction of T used for warm-up. */
export function scheduleMultiplier(id: ScheduleId, t: number, T: number, warmup = 0.1): number {
  const tw = Math.max(1, Math.round(warmup * T))
  switch (id) {
    case 'constant':
      return 1
    case 'step':
      return 0.1 ** ((t >= T / 2 ? 1 : 0) + (t >= (3 * T) / 4 ? 1 : 0))
    case 'exponential':
      return 0.01 ** (t / T)
    case 'cosine':
      return 0.5 * (1 + Math.cos((Math.PI * t) / T))
    case 'warmup-cosine':
      return t < tw ? (t + 1) / tw : 0.5 * (1 + Math.cos((Math.PI * (t - tw)) / Math.max(1, T - tw)))
    case 'one-cycle': {
      const up = Math.max(1, Math.round(0.3 * T))
      const start = 1 / 25
      const end = 1e-4
      if (t < up) return start + (1 - start) * 0.5 * (1 - Math.cos((Math.PI * t) / up))
      return end + (1 - end) * 0.5 * (1 + Math.cos((Math.PI * (t - up)) / Math.max(1, T - up)))
    }
    case 'inverse-sqrt':
      return Math.min((t + 1) / tw, Math.sqrt(tw / (t + 1)))
  }
}
