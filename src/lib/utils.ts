import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind class names, resolving conflicts (shadcn/ui convention). */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/** Format a number compactly for UI readouts. */
export function fmt(value: number, digits = 3): string {
  if (!Number.isFinite(value)) return value > 0 ? '∞' : value < 0 ? '−∞' : '—'
  if (value !== 0 && (Math.abs(value) < 1e-3 || Math.abs(value) >= 1e5)) return value.toExponential(2).replace('-', '−')
  return Number(value.toFixed(digits)).toString().replace('-', '−')
}

export function pct(value: number, digits = 1): string {
  return `${(value * 100).toFixed(digits)}%`
}
