import { AlertTriangle } from 'lucide-react'
import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  name: string
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  error: Error | null
}

/** Keeps one failing visualizer (e.g. no WebGL) from taking down the whole lesson. */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[${this.props.name}]`, error, info.componentStack)
  }

  render() {
    if (!this.state.error) return this.props.children
    if (this.props.fallback) return this.props.fallback
    return (
      <div role="alert" className="my-8 flex gap-3 rounded-xl border border-destructive/40 bg-destructive/5 p-5 text-sm">
        <AlertTriangle className="size-5 shrink-0 text-destructive" aria-hidden />
        <div>
          <p className="font-semibold">The {this.props.name} visualizer could not start.</p>
          <p className="mt-1 text-muted-foreground">
            {this.state.error.message}. Your browser may lack WebGL support, or hardware acceleration may be disabled.
          </p>
          <button className="mt-2 text-primary underline" onClick={() => this.setState({ error: null })}>
            Try again
          </button>
        </div>
      </div>
    )
  }
}
