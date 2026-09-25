import type { TrackId } from './curriculum'

/** Tailwind classes per curriculum track (literal strings so Tailwind can see them). */
export const TRACK_TEXT: Record<TrackId, string> = {
  foundations: 'text-track-foundations',
  cv: 'text-track-cv',
  modern: 'text-track-modern',
}

export const TRACK_BG: Record<TrackId, string> = {
  foundations: 'bg-track-foundations',
  cv: 'bg-track-cv',
  modern: 'bg-track-modern',
}

export const TRACK_BORDER: Record<TrackId, string> = {
  foundations: 'border-track-foundations',
  cv: 'border-track-cv',
  modern: 'border-track-modern',
}
