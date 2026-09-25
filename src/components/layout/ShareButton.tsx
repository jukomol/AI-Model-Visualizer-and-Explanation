import { Check, Link2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/toaster'
import { generateBookmarkUrl } from '@/lib/bookmark'
import { bookmarkFromState, useProgressStore } from '@/store/useProgressStore'

/** Copies a compressed `?save=` bookmark of the current session to the clipboard. */
export function ShareButton({ compact }: { compact?: boolean }) {
  const [copied, setCopied] = useState(false)
  const onClick = async () => {
    const url = generateBookmarkUrl(bookmarkFromState(useProgressStore.getState()))
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
      toast({ kind: 'success', title: 'Bookmark link copied', description: 'Anyone opening it can load this session’s progress.' })
    } catch {
      window.prompt('Copy this bookmark link:', url)
    }
  }
  return (
    <Button variant="outline" size={compact ? 'icon' : 'sm'} onClick={onClick} aria-label="Copy a shareable bookmark of your progress">
      {copied ? <Check /> : <Link2 />}
      {!compact && (copied ? 'Copied' : 'Share progress')}
    </Button>
  )
}
