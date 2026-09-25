import { useEffect, useRef } from 'react'

/**
 * Calls `tick` on every animation frame while `running` is true, at most
 * `stepsPerSecond` times per second. Stops automatically when `tick` returns false.
 */
export function useAnimationLoop(running: boolean, tick: () => boolean | void, stepsPerSecond = 30) {
  const tickRef = useRef(tick)
  tickRef.current = tick
  useEffect(() => {
    if (!running) return
    let raf = 0
    let last = 0
    const interval = 1000 / stepsPerSecond
    const loop = (t: number) => {
      if (t - last >= interval) {
        last = t
        if (tickRef.current() === false) return
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [running, stepsPerSecond])
}
