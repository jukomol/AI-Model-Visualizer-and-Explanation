import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/toaster'
import { useProgressStore } from '@/store/useProgressStore'
import { BookmarkBanner } from './BookmarkBanner'
import { Footer } from './Footer'
import { TopNav } from './TopNav'

export function PageSpinner() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center" role="status" aria-label="Loading">
      <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  )
}

export function AppLayout() {
  const theme = useProgressStore((s) => s.theme)
  const { pathname } = useLocation()
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])
  return (
    <TooltipProvider delayDuration={200}>
      <a href="#main" className="sr-only z-50 rounded bg-primary px-3 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-2 focus:left-2">
        Skip to content
      </a>
      <TopNav />
      <BookmarkBanner />
      <main id="main" className="min-h-[70vh]">
        <Suspense fallback={<PageSpinner />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <Toaster />
    </TooltipProvider>
  )
}
