import type { Mode } from '@/lib/colormap'
import { useProgressStore } from '@/store/useProgressStore'

/** The active colour mode, for canvas and WebGL colour maps that cannot read CSS variables. */
export function useThemeMode(): Mode {
  return useProgressStore((s) => s.theme)
}
