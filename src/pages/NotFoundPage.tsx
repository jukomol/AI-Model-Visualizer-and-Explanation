import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="font-mono text-sm text-primary">404 · gradient not found</p>
      <h1 className="mt-2 text-3xl font-bold">This page diverged</h1>
      <p className="mt-3 text-muted-foreground">The route you followed does not exist. Try a smaller learning rate, or head back to the roadmap.</p>
      <Button asChild className="mt-6">
        <Link to="/roadmap">Back to the roadmap</Link>
      </Button>
    </div>
  )
}
