import { createRng } from './random'
import { SHAPE_CLASSES, randomShapeParams, renderShape } from './shapeImages'

export interface SampleImage {
  id: string
  label: number
  image: Float32Array
}

/** A fixed gallery of held-out shapes (two per class) for probing the network. */
export const SAMPLE_IMAGES: SampleImage[] = (() => {
  const rng = createRng(4242)
  const out: SampleImage[] = []
  for (let k = 0; k < 2; k++) {
    SHAPE_CLASSES.forEach((cls, label) => {
      out.push({ id: `${cls}-${k}`, label, image: renderShape(cls, randomShapeParams(rng), 28, rng) })
    })
  }
  return out
})()
