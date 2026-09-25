import { useCallback, useRef, useState } from 'react'
import { useAnimationLoop } from './useAnimationLoop'

/**
 * Scrub / play through `length` precomputed frames (e.g. optimiser steps).
 * Starts on the last frame so results are visible immediately; "play"
 * restarts from 0 when already at the end.
 */
export function usePlayback(length: number, fps = 30) {
  const [frame, setFrameState] = useState(Math.max(0, length - 1))
  const [running, setRunningState] = useState(false)
  const frameRef = useRef(frame)
  const runningRef = useRef(false)
  const lengthRef = useRef(length)
  lengthRef.current = length

  const setFrame = useCallback((f: number) => {
    const clamped = Math.max(0, Math.min(lengthRef.current - 1, f))
    frameRef.current = clamped
    setFrameState(clamped)
  }, [])

  const setRunning = useCallback((r: boolean) => {
    runningRef.current = r
    setRunningState(r)
  }, [])

  useAnimationLoop(
    running,
    () => {
      if (frameRef.current >= lengthRef.current - 1) {
        setRunning(false)
        return false
      }
      setFrame(frameRef.current + 1)
    },
    fps,
  )

  const toggle = useCallback(() => {
    if (!runningRef.current && frameRef.current >= lengthRef.current - 1) setFrame(0)
    setRunning(!runningRef.current)
  }, [setFrame, setRunning])

  const reset = useCallback(() => {
    setRunning(false)
    setFrame(0)
  }, [setFrame, setRunning])

  const toEnd = useCallback(() => {
    setRunning(false)
    setFrame(lengthRef.current - 1)
  }, [setFrame, setRunning])

  return { frame: Math.min(frame, Math.max(0, length - 1)), setFrame, running, setRunning, toggle, reset, toEnd }
}
