/// <reference lib="webworker" />
/**
 * Runs learner-written TensorFlow.js snippets off the main thread. The worker
 * has no DOM access, and the page terminates it if a snippet runs too long.
 */
import * as tf from '@tensorflow/tfjs'

export interface SandboxRequest {
  id: number
  code: string
}

export type SandboxLine =
  | { kind: 'log'; text: string }
  | { kind: 'tensor'; label: string; shape: number[]; dtype: string; values: string; stats: { min: number; max: number; mean: number } | null }
  | { kind: 'error'; text: string }

export interface SandboxResponse {
  id: number
  lines: SandboxLine[]
  backend: string
  ms: number
  tensorsBefore: number
  tensorsAfter: number
}

const ready = (async () => {
  try {
    await tf.setBackend('webgl')
  } catch {
    await tf.setBackend('cpu')
  }
  await tf.ready()
})()

function describe(value: unknown): string {
  if (value instanceof tf.Tensor) return `Tensor${JSON.stringify(value.shape)} ${value.dtype}`
  if (typeof value === 'object' && value !== null) {
    try {
      return JSON.stringify(value)
    } catch {
      return String(value)
    }
  }
  return String(value)
}

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor as new (...args: string[]) => (...a: unknown[]) => Promise<unknown>

self.onmessage = async (e: MessageEvent<SandboxRequest>) => {
  await ready
  const lines: SandboxLine[] = []
  const print = (...args: unknown[]) => lines.push({ kind: 'log', text: args.map(describe).join(' ') })
  const show = (t: unknown, label = 'tensor') => {
    if (!(t instanceof tf.Tensor)) return print(label, t)
    const data = t.dataSync()
    const nums = Array.from(data as ArrayLike<number>)
    const stats = nums.length
      ? { min: Math.min(...nums), max: Math.max(...nums), mean: nums.reduce((a, b) => a + b, 0) / nums.length }
      : null
    lines.push({ kind: 'tensor', label, shape: t.shape.slice(), dtype: t.dtype, values: t.toString().replace(/^Tensor\n?/, ''), stats })
  }
  const before = tf.memory().numTensors
  const t0 = performance.now()
  try {
    const fn = new AsyncFunction('tf', 'print', 'show', `"use strict";\n${e.data.code}`)
    const result = await fn(tf, print, show)
    if (result !== undefined) {
      if (result instanceof tf.Tensor) show(result, 'return value')
      else print('→', result)
    }
  } catch (err) {
    lines.push({ kind: 'error', text: err instanceof Error ? `${err.name}: ${err.message}` : String(err) })
  }
  const response: SandboxResponse = {
    id: e.data.id,
    lines,
    backend: tf.getBackend(),
    ms: performance.now() - t0,
    tensorsBefore: before,
    tensorsAfter: tf.memory().numTensors,
  }
  self.postMessage(response)
}
