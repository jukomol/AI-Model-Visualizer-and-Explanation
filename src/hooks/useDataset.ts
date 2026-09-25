import { useEffect, useState } from 'react'

const cache = new Map<string, Promise<unknown>>()

/** Fetch a JSON dataset from public/datasets (relative to the deployed base path). */
export function fetchDataset<T>(name: string): Promise<T> {
  if (!cache.has(name)) {
    cache.set(
      name,
      fetch(`${import.meta.env.BASE_URL}datasets/${name}.json`).then((r) => {
        if (!r.ok) throw new Error(`Failed to load dataset ${name}: ${r.status}`)
        return r.json()
      }),
    )
  }
  return cache.get(name) as Promise<T>
}

export function useDataset<T>(name: string): { data: T | null; error: string | null } {
  const [state, setState] = useState<{ data: T | null; error: string | null }>({ data: null, error: null })
  useEffect(() => {
    let alive = true
    fetchDataset<T>(name).then(
      (data) => alive && setState({ data, error: null }),
      (e: Error) => alive && setState({ data: null, error: e.message }),
    )
    return () => {
      alive = false
    }
  }, [name])
  return state
}

export interface AnscombeFile {
  name: string
  citation: string
  sets: Record<'I' | 'II' | 'III' | 'IV', { x: number[]; y: number[] }>
}

export interface TableFile {
  name: string
  citation: string
  columns: string[]
  rows: (number | string)[][]
}
