/**
 * Distance at which a perspective camera looking along `dir` (towards `center`)
 * sees every corner of an axis-aligned box. Pure math so it can be unit tested.
 */
export type V3 = [number, number, number]

function normalize(v: V3): V3 {
  const n = Math.hypot(v[0], v[1], v[2]) || 1
  return [v[0] / n, v[1] / n, v[2] / n]
}

function cross(a: V3, b: V3): V3 {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
}

function dot(a: V3, b: V3): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
}

/**
 * @param dir unit vector from the box centre towards the camera
 * @param fovY vertical field of view in degrees
 */
export function fitDistance(min: V3, max: V3, dir: V3, fovY: number, aspect: number, margin = 1.1): number {
  const d = normalize(dir)
  const forward: V3 = [-d[0], -d[1], -d[2]]
  const right = normalize(cross(forward, [0, 1, 0]))
  const up = cross(right, forward)
  const center: V3 = [(min[0] + max[0]) / 2, (min[1] + max[1]) / 2, (min[2] + max[2]) / 2]
  const tanY = Math.tan(((fovY / 2) * Math.PI) / 180) / margin
  const tanX = tanY * aspect
  let dist = 0
  for (const x of [min[0], max[0]]) {
    for (const y of [min[1], max[1]]) {
      for (const z of [min[2], max[2]]) {
        const p: V3 = [x - center[0], y - center[1], z - center[2]]
        const px = dot(p, right)
        const py = dot(p, up)
        const pz = dot(p, forward) // depth offset relative to the centre along the view axis
        // Need |px| ≤ tanX·(dist + pz) and |py| ≤ tanY·(dist + pz).
        dist = Math.max(dist, Math.abs(px) / tanX - pz, Math.abs(py) / tanY - pz)
      }
    }
  }
  return dist
}
