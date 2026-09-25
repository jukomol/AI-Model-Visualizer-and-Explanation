import { CheckCircle2, Circle, Lock } from 'lucide-react'
import type { NodeStatus } from '@/lib/curriculum'

export const STATUS_ICON: Record<NodeStatus, typeof Lock> = {
  locked: Lock,
  available: Circle,
  mastered: CheckCircle2,
}
