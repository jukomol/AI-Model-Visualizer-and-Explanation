/** Small hand-made grayscale images (0–9 intensity) for the convolution and pooling walkthroughs. */
export const PATTERNS: Record<string, { name: string; grid: number[][] }> = {
  edge: {
    name: 'Vertical edge',
    grid: Array.from({ length: 8 }, () => [0, 0, 0, 0, 9, 9, 9, 9]),
  },
  cross: {
    name: 'Plus sign',
    grid: [
      [0, 0, 0, 9, 9, 0, 0, 0],
      [0, 0, 0, 9, 9, 0, 0, 0],
      [0, 0, 0, 9, 9, 0, 0, 0],
      [9, 9, 9, 9, 9, 9, 9, 9],
      [9, 9, 9, 9, 9, 9, 9, 9],
      [0, 0, 0, 9, 9, 0, 0, 0],
      [0, 0, 0, 9, 9, 0, 0, 0],
      [0, 0, 0, 9, 9, 0, 0, 0],
    ],
  },
  seven: {
    name: 'Digit 7',
    grid: [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 9, 9, 9, 9, 9, 9, 0],
      [0, 0, 0, 0, 0, 8, 7, 0],
      [0, 0, 0, 0, 7, 8, 0, 0],
      [0, 0, 0, 6, 9, 0, 0, 0],
      [0, 0, 3, 9, 2, 0, 0, 0],
      [0, 0, 7, 8, 0, 0, 0, 0],
      [0, 0, 9, 4, 0, 0, 0, 0],
    ],
  },
  diagonal: {
    name: 'Diagonal line',
    grid: Array.from({ length: 8 }, (_, i) => Array.from({ length: 8 }, (_, j) => (i === j ? 9 : Math.abs(i - j) === 1 ? 4 : 0))),
  },
  checker: {
    name: 'Checkerboard',
    grid: Array.from({ length: 8 }, (_, i) => Array.from({ length: 8 }, (_, j) => ((Math.floor(i / 2) + Math.floor(j / 2)) % 2 ? 9 : 0))),
  },
}
