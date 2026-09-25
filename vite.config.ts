import { fileURLToPath, URL } from 'node:url'
import mdx from '@mdx-js/rollup'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { defineConfig } from 'vite'

// The app uses a HashRouter, so every route is served by the same index.html.
// A relative base therefore works for any GitHub Pages sub-path
// (https://<user>.github.io/<repo>/) without hard-coding the repository name.
export default defineConfig({
  base: './',
  plugins: [
    // MDX must run before the React plugin so the compiled JSX gets Fast Refresh.
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [[rehypeKatex, { strict: 'ignore' }]],
        providerImportSource: '@mdx-js/react',
      }),
    },
    react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
    tailwindcss(),
  ],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  // The tensor sandbox runs user snippets inside an ES-module Web Worker that
  // imports TensorFlow.js, so workers must be emitted as ES modules.
  worker: { format: 'es' },
  // TF.js ships WebAssembly kernels for optional backends; serve them as assets.
  assetsInclude: ['**/*.wasm'],
  optimizeDeps: {
    include: ['@tensorflow/tfjs', 'katex', 'lz-string', 'three'],
  },
  build: {
    target: 'es2022',
    sourcemap: false,
    // TensorFlow.js (~1.9 MB minified, ~0.3 MB gzipped) is one indivisible
    // library; it and three.js (~0.7 MB) live in lazily-loaded chunks, so only
    // pages that need them download them. The tensor-sandbox worker bundles
    // its own copy of TF.js because workers cannot share the page's chunks.
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/@tensorflow/')) return 'tfjs'
          if (id.includes('node_modules/three/') || id.includes('node_modules/three-stdlib/')) return 'three'
          if (id.includes('node_modules/katex/')) return 'katex'
          return undefined
        },
      },
    },
  },
})
