import { Bookmark, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/toaster'
import { hydrateFromUrl, stripBookmarkParam, type BookmarkState } from '@/lib/bookmark'
import { getNode, isKnownNode } from '@/lib/curriculum'
import { useProgressStore } from '@/store/useProgressStore'

function readBookmark(): BookmarkState | null {
  if (typeof window === 'undefined') return null
  return hydrateFromUrl(window.location.href, isKnownNode)
}

/** Offers to load a session shared through a `?save=` link. */
export function BookmarkBanner() {
  const [bookmark, setBookmark] = useState<BookmarkState | null>(readBookmark)
  const applyBookmark = useProgressStore((s) => s.applyBookmark)
  const mine = useProgressStore((s) => s.masteredNodes.length)
  if (!bookmark) return null
  const close = () => {
    window.history.replaceState(null, '', stripBookmarkParam(window.location.href))
    setBookmark(null)
  }
  const apply = (mode: 'replace' | 'merge') => {
    applyBookmark(bookmark, mode)
    toast({ kind: 'success', title: mode === 'replace' ? 'Shared session loaded' : 'Shared progress merged' })
    close()
  }
  const active = getNode(bookmark.activeNode)
  return (
    <div role="region" aria-label="Shared session" className="border-b bg-primary/10">
      <div className="mx-auto flex max-w-[90rem] flex-wrap items-center gap-3 px-4 py-3 text-sm sm:px-6">
        <Bookmark className="size-4 text-primary" aria-hidden />
        <p className="min-w-0 flex-1">
          You opened a shared session with <strong>{bookmark.masteredNodes.length}</strong> mastered concept
          {bookmark.masteredNodes.length === 1 ? '' : 's'}
          {active ? (
            <>
              , last studying <strong>{active.title}</strong>
            </>
          ) : null}
          . You currently have {mine}.
        </p>
        <div className="flex gap-2">
          <Button size="sm" onClick={() => apply('replace')}>
            Load session
          </Button>
          <Button size="sm" variant="outline" onClick={() => apply('merge')}>
            Merge with mine
          </Button>
          <Button size="icon" variant="ghost" onClick={close} aria-label="Dismiss shared session">
            <X />
          </Button>
        </div>
      </div>
    </div>
  )
}
