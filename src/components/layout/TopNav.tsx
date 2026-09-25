import { Boxes, FileText, FlaskConical, Map as MapIcon, Menu, Moon, Sun, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { curriculum } from '@/lib/curriculum'
import { cn } from '@/lib/utils'
import { useProgressStore } from '@/store/useProgressStore'
import { ShareButton } from './ShareButton'

const LINKS = [
  { to: '/roadmap', label: 'Roadmap', icon: MapIcon },
  { to: '/network', label: 'Exploded CNN', icon: Boxes },
  { to: '/sandbox', label: 'Sandbox', icon: FlaskConical },
  { to: '/cheatsheet', label: 'Cheat sheet', icon: FileText },
]

export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <rect width="64" height="64" rx="14" className="fill-primary/15" />
      <g fill="none" strokeWidth="3" strokeLinecap="round" className="stroke-primary">
        <path d="M16 20 L32 32 L16 44 M32 32 L48 22 M32 32 L48 42" />
      </g>
      <circle cx="16" cy="20" r="5" className="fill-track-cv" />
      <circle cx="16" cy="44" r="5" className="fill-track-cv" />
      <circle cx="32" cy="32" r="6" className="fill-track-foundations" />
      <circle cx="48" cy="22" r="5" className="fill-track-modern" />
      <circle cx="48" cy="42" r="5" className="fill-track-modern" />
    </svg>
  )
}

export function TopNav() {
  const [open, setOpen] = useState(false)
  const theme = useProgressStore((s) => s.theme)
  const toggleTheme = useProgressStore((s) => s.toggleTheme)
  const mastered = useProgressStore((s) => s.masteredNodes.length)
  const total = curriculum.nodes.length
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-14 max-w-[90rem] items-center gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight" onClick={() => setOpen(false)}>
          <Logo className="size-7" />
          <span className="hidden sm:inline">ML Visualizer</span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {LINKS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                  isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground',
                )
              }
            >
              <Icon className="size-4" aria-hidden />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link
            to="/roadmap"
            className="hidden items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground hover:text-foreground lg:inline-flex"
            title="Concepts mastered"
          >
            <span className="tabular font-semibold text-foreground">
              {mastered}/{total}
            </span>
            mastered
          </Link>
          <div className="hidden sm:block">
            <ShareButton />
          </div>
          <div className="sm:hidden">
            <ShareButton compact />
          </div>
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
            {theme === 'dark' ? <Sun /> : <Moon />}
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label="Toggle navigation">
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {open && (
        <nav aria-label="Mobile" className="animate-fade-in border-t px-4 py-2 md:hidden">
          {LINKS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn('flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium', isActive ? 'bg-accent' : 'text-muted-foreground')
              }
            >
              <Icon className="size-4" aria-hidden />
              {label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
