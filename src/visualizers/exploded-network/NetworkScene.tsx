import { Edges, Html, Line, OrbitControls } from '@react-three/drei'
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { fitDistance as fitCameraDistance, type V3 } from '@/lib/cameraFit'
import { diverging, rgbString, sequential, type Mode } from '@/lib/colormap'
import { MAX_VISIBLE_UNITS, PLANE_THICKNESS, layerGeometry, layoutLayers, type LayerGeometry, type PlacedLayer } from '@/lib/explodedLayout'
import type { ViewLayer } from '@/lib/models'
import { formatShape } from '@/lib/tensorShapes'
import type { LayerActivation } from '@/lib/tf/model'
import { channel, scaleFor, valuesToTexture, type LayerScale } from './textures'

export interface NetworkSceneProps {
  layers: ViewLayer[]
  /** Index-aligned with `layers` (element 0 is the input image). */
  activations: (LayerActivation | null)[] | null
  classes: string[]
  explosion: number
  selected: number | null
  onSelect: (index: number | null) => void
  showLabels: boolean
  mode: Mode
}

/** Planes lean towards the default camera so feature maps stay legible. */
export const PLANE_TILT = (32 * Math.PI) / 180

const PALETTE = {
  dark: { bg: '#0b1020', accent: '#a5b4fc', hover: '#e7e9f0', line: '#3b4a66', idle: '#253046', label: 'text-slate-200' },
  light: { bg: '#f7f7f5', accent: '#4338ca', hover: '#16181d', line: '#b9bccb', idle: '#d6d8e0', label: 'text-slate-700' },
}

function layerHeight(g: LayerGeometry) {
  return g.size
}

function layerDepth(g: LayerGeometry) {
  return g.kind === 'volume' ? g.size * Math.cos(PLANE_TILT) : 0.3
}

function useAnimatedExplosion(target: number) {
  const [value, setValue] = useState(target)
  const current = useRef(target)
  const invalidate = useThree((s) => s.invalidate)
  useEffect(() => invalidate(), [target, invalidate])
  useFrame(() => {
    const d = target - current.current
    if (Math.abs(d) < 0.002) {
      if (current.current !== target) {
        current.current = target
        setValue(target)
      }
      return
    }
    current.current += d * 0.16
    setValue(current.current)
    invalidate()
  })
  return value
}

interface LayerObjectProps {
  layer: ViewLayer
  geom: LayerGeometry
  placed: PlacedLayer
  activation: LayerActivation | null
  classes: string[]
  isLast: boolean
  dimmed: boolean
  selected: boolean
  hovered: boolean
  onHover: (h: boolean) => void
  onSelect: () => void
  showLabels: boolean
  mode: Mode
}

function VolumePlanes({ geom, placed, activation, isInput, mode, opacity }: { geom: LayerGeometry; placed: PlacedLayer; activation: LayerActivation | null; isInput: boolean; mode: Mode; opacity: number }) {
  const textures = useMemo(() => {
    if (!activation) return null
    const s = scaleFor(activation, isInput)
    const [h, w] = activation.shape
    return Array.from({ length: geom.count }, (_, c) => valuesToTexture(channel(activation, c), w, h, s.kind, mode, s.range))
  }, [activation, geom.count, isInput, mode])
  useEffect(() => () => textures?.forEach((t) => t.dispose()), [textures])
  return (
    <>
      {Array.from({ length: geom.count }, (_, c) => (
        <mesh key={c} position={[(c - (geom.count - 1) / 2) * placed.channelGap, 0, 0]} rotation={[0, -Math.PI / 2 + PLANE_TILT, 0]}>
          <planeGeometry args={[geom.size, geom.size]} />
          <meshBasicMaterial
            map={textures?.[c] ?? null}
            color={textures ? '#ffffff' : PALETTE[mode].idle}
            side={THREE.DoubleSide}
            transparent
            opacity={opacity}
            toneMapped={false}
          />
        </mesh>
      ))}
    </>
  )
}

function unitColor(v: number, s: LayerScale, mode: Mode): string {
  if (s.kind === 'diverging') return rgbString(diverging(v / (s.range[1] || 1), mode))
  return rgbString(sequential((v - s.range[0]) / (s.range[1] - s.range[0] || 1), mode))
}

function VectorUnits({ geom, activation, mode, opacity, classes, isLast, showLabels }: { geom: LayerGeometry; activation: LayerActivation | null; mode: Mode; opacity: number; classes: string[]; isLast: boolean; showLabels: boolean }) {
  const scale = useMemo(() => (activation ? scaleFor(activation, false) : null), [activation])
  const strip = useMemo(() => {
    if (!activation || geom.total <= MAX_VISIBLE_UNITS || !scale) return null
    return valuesToTexture(activation.data, 1, activation.data.length, scale.kind, mode, scale.range)
  }, [activation, geom.total, scale, mode])
  useEffect(() => () => strip?.dispose(), [strip])
  if (geom.total > MAX_VISIBLE_UNITS) {
    return (
      <mesh rotation={[0, -Math.PI / 2 + PLANE_TILT, 0]}>
        <planeGeometry args={[0.28, geom.size]} />
        <meshBasicMaterial map={strip} color={strip ? '#ffffff' : PALETTE[mode].idle} side={THREE.DoubleSide} transparent opacity={opacity} toneMapped={false} />
      </mesh>
    )
  }
  const spacing = geom.size / geom.count
  const cube = Math.min(0.24, spacing * 0.78)
  return (
    <>
      {Array.from({ length: geom.count }, (_, u) => {
        const y = geom.size / 2 - spacing * (u + 0.5)
        const v = activation?.data[u] ?? 0
        return (
          <group key={u} position={[0, y, 0]}>
            <mesh>
              <boxGeometry args={[cube, cube, cube]} />
              <meshBasicMaterial color={activation && scale ? unitColor(v, scale, mode) : PALETTE[mode].idle} transparent opacity={opacity} toneMapped={false} />
            </mesh>
            {isLast && showLabels && activation && (
              <Html position={[0, 0, -0.35]} center={false} style={{ pointerEvents: 'none', transform: 'translate(8px, -50%)' }}>
                <div className="rounded bg-background/80 px-1.5 py-0.5 font-mono text-[10px] whitespace-nowrap text-foreground">
                  {classes[u]} {(v * 100).toFixed(1)}%
                </div>
              </Html>
            )}
          </group>
        )
      })}
    </>
  )
}

function LayerObject(p: LayerObjectProps) {
  const h = layerHeight(p.geom)
  const d = layerDepth(p.geom)
  const opacity = p.dimmed ? 0.18 : 1
  const pal = PALETTE[p.mode]
  const onClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    p.onSelect()
  }
  return (
    <group position={[p.placed.x, 0, 0]}>
      {p.geom.kind === 'volume' ? (
        <VolumePlanes geom={p.geom} placed={p.placed} activation={p.activation} isInput={p.layer.type === 'input'} mode={p.mode} opacity={opacity} />
      ) : (
        <VectorUnits geom={p.geom} activation={p.activation} mode={p.mode} opacity={opacity} classes={p.classes} isLast={p.isLast} showLabels={p.showLabels} />
      )}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation()
          p.onHover(true)
        }}
        onPointerOut={() => p.onHover(false)}
        onClick={onClick}
      >
        <boxGeometry args={[p.placed.thickness + 0.24, h + 0.24, d + 0.24]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        {(p.hovered || p.selected) && <Edges color={p.selected ? pal.accent : pal.hover} lineWidth={p.selected ? 2 : 1} />}
      </mesh>
      {p.showLabels && (
        <Html position={[0, p.layer.index % 2 === 0 ? -h / 2 - 0.45 : h / 2 + 0.55, 0]} center style={{ pointerEvents: 'none' }}>
          <div className={`text-center whitespace-nowrap ${p.dimmed ? 'opacity-40' : ''}`}>
            <div className="text-[11px] font-semibold text-foreground">{p.layer.name}</div>
            <div className="font-mono text-[10px] text-muted-foreground">{formatShape(p.layer.outputShape)}</div>
          </div>
        </Html>
      )}
    </group>
  )
}

function Connections({ geoms, placed, selected, mode }: { geoms: LayerGeometry[]; placed: PlacedLayer[]; selected: number | null; mode: Mode }) {
  const pal = PALETTE[mode]
  const lines = []
  for (let i = 0; i < placed.length - 1; i++) {
    const a = placed[i]
    const b = placed[i + 1]
    const ha = layerHeight(geoms[i]) / 2
    const da = layerDepth(geoms[i]) / 2
    const hb = layerHeight(geoms[i + 1]) / 2
    const db = layerDepth(geoms[i + 1]) / 2
    const xa = a.x + a.thickness / 2 + PLANE_THICKNESS
    const xb = b.x - b.thickness / 2 - PLANE_THICKNESS
    const active = selected === i || selected === i + 1
    for (const [sy, sz] of [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ]) {
      lines.push(
        <Line
          key={`${i}-${sy}-${sz}`}
          points={[
            [xa, sy * ha, sz * da],
            [xb, sy * hb, sz * db],
          ]}
          color={active ? pal.accent : pal.line}
          lineWidth={active ? 1.6 : 1}
          transparent
          opacity={selected === null || active ? 0.9 : 0.25}
        />,
      )
    }
  }
  return <>{lines}</>
}

function SceneContents(props: NetworkSceneProps) {
  const [hovered, setHovered] = useState<number | null>(null)
  const e = useAnimatedExplosion(props.explosion)
  const geoms = useMemo(() => props.layers.map((l) => layerGeometry(l.outputShape)), [props.layers])
  const placed = useMemo(() => layoutLayers(geoms, e, PLANE_TILT), [geoms, e])
  const invalidate = useThree((s) => s.invalidate)
  useEffect(() => invalidate(), [props.activations, props.selected, props.showLabels, props.mode, hovered, invalidate])
  useEffect(() => {
    document.body.style.cursor = hovered !== null ? 'pointer' : ''
    return () => {
      document.body.style.cursor = ''
    }
  }, [hovered])
  return (
    <>
      <Connections geoms={geoms} placed={placed} selected={props.selected} mode={props.mode} />
      {props.layers.map((layer, i) => (
        <LayerObject
          key={layer.id}
          layer={layer}
          geom={geoms[i]}
          placed={placed[i]}
          activation={props.activations?.[i] ?? null}
          classes={props.classes}
          isLast={i === props.layers.length - 1}
          dimmed={props.selected !== null && props.selected !== i}
          selected={props.selected === i}
          hovered={hovered === i}
          onHover={(h) => setHovered((cur) => (h ? i : cur === i ? null : cur))}
          onSelect={() => props.onSelect(props.selected === i ? null : i)}
          showLabels={props.showLabels}
          mode={props.mode}
        />
      ))}
    </>
  )
}

const VIEW_DIR: V3 = [-0.6, 0.34, 0.72]
const FOV = 35

/** Axis-aligned bounds of the laid-out network (labels included below). */
function networkBounds(geoms: LayerGeometry[], placed: PlacedLayer[]): { min: V3; max: V3 } {
  const first = placed[0]
  const last = placed[placed.length - 1]
  const h = Math.max(...geoms.map(layerHeight)) / 2
  const d = Math.max(...geoms.map(layerDepth)) / 2
  return { min: [first.x - first.thickness / 2, -h - 0.8, -d], max: [last.x + last.thickness / 2, h + 0.8, d] }
}

/**
 * Frames the network: on mount (and model change) the camera jumps to the
 * fitted pose; when the explosion changes it glides to the new fitted
 * distance while keeping the user's current orbit direction.
 */
function CameraRig({ layers, explosion }: { layers: ViewLayer[]; explosion: number }) {
  const camera = useThree((s) => s.camera)
  const size = useThree((s) => s.size)
  const controls = useThree((s) => s.controls) as unknown as { target: THREE.Vector3; update: () => void } | null
  const invalidate = useThree((s) => s.invalidate)
  const goal = useRef<{ center: THREE.Vector3; dist: number } | null>(null)
  const geoms = useMemo(() => layers.map((l) => layerGeometry(l.outputShape)), [layers])
  const fitted = useRef(false)

  useEffect(() => {
    const { min, max } = networkBounds(geoms, layoutLayers(geoms, explosion, PLANE_TILT))
    const center = new THREE.Vector3((min[0] + max[0]) / 2, (min[1] + max[1]) / 2, 0)
    const target = controls?.target ?? new THREE.Vector3()
    const dir = fitted.current ? camera.position.clone().sub(target).normalize() : new THREE.Vector3(...VIEW_DIR).normalize()
    const dist = fitCameraDistance(min, max, [dir.x, dir.y, dir.z], FOV, size.width / Math.max(1, size.height), 1.06)
    if (!fitted.current) {
      camera.position.copy(center.clone().add(dir.multiplyScalar(dist)))
      controls?.target.copy(center)
      controls?.update()
      fitted.current = true
      invalidate()
      return
    }
    goal.current = { center, dist }
    invalidate()
  }, [geoms, explosion, size.width, size.height, camera, controls, invalidate])

  useEffect(() => {
    fitted.current = false
  }, [geoms])

  useFrame(() => {
    const g = goal.current
    if (!g || !controls) return
    const dir = camera.position.clone().sub(controls.target).normalize()
    const curDist = camera.position.distanceTo(controls.target)
    const nextDist = curDist + (g.dist - curDist) * 0.12
    controls.target.lerp(g.center, 0.12)
    camera.position.copy(controls.target.clone().add(dir.multiplyScalar(nextDist)))
    controls.update()
    if (Math.abs(g.dist - nextDist) < 0.01 && controls.target.distanceTo(g.center) < 0.01) goal.current = null
    invalidate()
  })
  return null
}

export default function NetworkScene(props: NetworkSceneProps) {
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 2]}
      camera={{ position: [-12, 7, 14], fov: FOV, near: 0.1, far: 500 }}
      onPointerMissed={() => props.onSelect(null)}
      gl={{ antialias: true }}
      aria-label="3-D exploded view of the network"
    >
      <color attach="background" args={[PALETTE[props.mode].bg]} />
      <SceneContents {...props} />
      <OrbitControls makeDefault enableDamping dampingFactor={0.12} minDistance={2} maxDistance={120} />
      <CameraRig layers={props.layers} explosion={props.explosion} />
    </Canvas>
  )
}
