import { Link } from 'react-router-dom'
import ExplodedNetworkViewer from '@/visualizers/exploded-network/ExplodedNetworkViewer'

export default function NetworkPage() {
  return (
    <div className="mx-auto max-w-[90rem] px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Exploded network viewer</h1>
      <p className="mt-1 max-w-3xl text-muted-foreground">
        A real convolutional network, built and trained with TensorFlow.js in this tab. Drag the explosion slider to pull the
        layers apart, click any layer to open its inspector, and draw your own input to watch every feature map update. The
        full walkthrough is in the <Link to="/learn/exploded-networks" className="text-primary underline">Anatomy of a CNN</Link> lesson.
      </p>
      <ExplodedNetworkViewer height={600} />
    </div>
  )
}
