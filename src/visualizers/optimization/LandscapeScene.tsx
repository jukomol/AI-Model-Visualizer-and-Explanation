import { Line, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useMemo } from 'react'
import * as THREE from 'three'
import { sequential, type Mode } from '@/lib/colormap'
import type { LossSurface } from '@/lib/lossSurfaces'

export interface LandscapePath {
  id: string
  color: string
  points: Array<{ x: number; y: number }>
}

const SIZE = 6
const HEIGHT = 2.6
const RES = 120

/** Maps surface coordinates into scene space and heights into [0, HEIGHT]. */
function makeMapper(surface: LossSurface) {
  const d = surface.domain
  const aspect = (d.yMax - d.yMin) / (d.xMax - d.xMin)
  let lo = Infinity
  let hi = -Infinity
  for (let i = 0; i <= 60; i++) {
    for (let j = 0; j <= 60; j++) {
      const v = surface.display(surface.f(d.xMin + ((d.xMax - d.xMin) * i) / 60, d.yMin + ((d.yMax - d.yMin) * j) / 60))
      lo = Math.min(lo, v)
      hi = Math.max(hi, v)
    }
  }
  const w = SIZE
  const h = SIZE * Math.min(1.2, aspect)
  const clampX = (x: number) => Math.min(d.xMax, Math.max(d.xMin, x))
  const clampY = (y: number) => Math.min(d.yMax, Math.max(d.yMin, y))
  const height = (x: number, y: number) => Math.min(1, Math.max(0, (surface.display(surface.f(x, y)) - lo) / (hi - lo || 1))) * HEIGHT
  const toScene = (x: number, y: number): [number, number, number] => {
    const cx = clampX(x)
    const cy = clampY(y)
    return [((cx - d.xMin) / (d.xMax - d.xMin) - 0.5) * w, height(cx, cy), -((cy - d.yMin) / (d.yMax - d.yMin) - 0.5) * h]
  }
  return { w, h, height, toScene, lo, hi }
}

function Surface({ surface, mode }: { surface: LossSurface; mode: Mode }) {
  const geometry = useMemo(() => {
    const m = makeMapper(surface)
    const g = new THREE.PlaneGeometry(m.w, m.h, RES, RES)
    const pos = g.attributes.position
    const colors = new Float32Array(pos.count * 3)
    const d = surface.domain
    const c = new THREE.Color()
    for (let i = 0; i < pos.count; i++) {
      const u = pos.getX(i) / m.w + 0.5
      const v = pos.getY(i) / m.h + 0.5
      const x = d.xMin + u * (d.xMax - d.xMin)
      const y = d.yMin + v * (d.yMax - d.yMin)
      const z = m.height(x, y)
      pos.setZ(i, z)
      const [r, gg, b] = sequential(1 - z / HEIGHT, mode === 'dark' ? 'light' : 'dark')
      c.setRGB(r / 255, gg / 255, b / 255, THREE.SRGBColorSpace)
      colors.set([c.r, c.g, c.b], i * 3)
    }
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    g.computeVertexNormals()
    return g
  }, [surface, mode])
  return (
    <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
      <meshStandardMaterial vertexColors side={THREE.DoubleSide} roughness={0.85} metalness={0} transparent opacity={0.96} />
    </mesh>
  )
}

export default function LandscapeScene({ surface, paths, frame, mode }: { surface: LossSurface; paths: LandscapePath[]; frame: number; mode: Mode }) {
  const mapper = useMemo(() => makeMapper(surface), [surface])
  return (
    <Canvas camera={{ position: [3.6, 5.4, 5.2], fov: 42 }} dpr={[1, 2]} aria-label="3-D loss surface with optimiser trajectories">
      <color attach="background" args={[mode === 'dark' ? '#0b1020' : '#f7f7f5']} />
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 8, 3]} intensity={1.1} />
      <Surface surface={surface} mode={mode} />
      {paths.map((p) => {
        const pts = p.points.slice(0, frame + 1).map((q) => {
          const [x, y, z] = mapper.toScene(q.x, q.y)
          return new THREE.Vector3(x, y + 0.04, z)
        })
        const head = pts[pts.length - 1]
        return (
          <group key={p.id}>
            {pts.length > 1 && <Line points={pts} color={p.color} lineWidth={3.5} />}
            {head && (
              <mesh position={head}>
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshBasicMaterial color={p.color} />
              </mesh>
            )}
          </group>
        )
      })}
      {surface.minima.map(([x, y], i) => {
        const [sx, sy, sz] = mapper.toScene(x, y)
        return (
          <mesh key={i} position={[sx, sy + 0.03, sz]}>
            <octahedronGeometry args={[0.1]} />
            <meshBasicMaterial color={mode === 'dark' ? '#ffffff' : '#16181d'} />
          </mesh>
        )
      })}
      <OrbitControls enableDamping target={[0, 0.4, 0]} minDistance={3} maxDistance={20} />
    </Canvas>
  )
}
