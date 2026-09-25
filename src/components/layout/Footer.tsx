import { ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto grid max-w-[90rem] gap-6 px-4 py-8 text-sm text-muted-foreground sm:px-6 md:grid-cols-[2fr_1fr_1fr]">
        <div className="space-y-2">
          <p className="font-medium text-foreground">ML/DL Interactive Visualizer</p>
          <p className="max-w-prose">
            An open-source visual textbook. Every model trains and every formula evaluates in your browser with TensorFlow.js,
            WebGL and plain TypeScript. There is no backend.
          </p>
          <p className="flex items-center gap-1.5">
            <ShieldCheck className="size-4 text-success" aria-hidden /> Your progress is stored only in this browser (localStorage).
          </p>
        </div>
        <div className="space-y-1.5">
          <p className="font-medium text-foreground">Explore</p>
          <Link className="block hover:text-foreground" to="/roadmap">Curriculum roadmap</Link>
          <Link className="block hover:text-foreground" to="/network">Exploded CNN viewer</Link>
          <Link className="block hover:text-foreground" to="/sandbox">Sandbox</Link>
          <Link className="block hover:text-foreground" to="/cheatsheet">Cheat sheet exporter</Link>
        </div>
        <div className="space-y-1.5">
          <p className="font-medium text-foreground">Datasets</p>
          <p>Iris (Fisher, 1936), Old Faithful (Azzalini &amp; Bowman, 1990) and Anscombe’s quartet (1973), all public domain.</p>
        </div>
      </div>
    </footer>
  )
}
