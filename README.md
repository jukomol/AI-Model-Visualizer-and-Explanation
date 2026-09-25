# ML/DL Interactive Visualizer

An open-source, **fully client-side interactive textbook** for machine learning and deep learning. It runs from linear regression to transformers, diffusion models, INT8 quantisation and Q-learning. Every lesson pairs an explanation with its maths (KaTeX) and one or more interactive visualizers. Every model trains, and every formula is evaluated, **in your browser** with TensorFlow.js, WebGL and plain TypeScript. There is no backend.

## Highlights

- **Exploded neural network viewer**: a real CNN built and trained with TensorFlow.js, rendered in 3-D with react-three-fiber. An explosion slider pulls the layers and channels apart. Click any layer to open the **Layer Inspector**: its functional purpose, a tensor-shape derivation, parameter formulas, KaTeX forward-pass equations, learned kernels and live feature maps for images you pick or draw.
- **Curriculum tech tree**: 25 concepts in three tracks (Foundations · Deep Learning & Computer Vision · Sequences & Modern Architectures), with prerequisites, milestone papers (DOI/arXiv links) and **mastery challenges** that unlock the next nodes.
- **31 interactive visualizers** (including the exploded CNN, dataset painter and tensor sandbox): gradient descent on real data, 3-D loss landscapes, an optimizer race with learning-rate schedules, loss-function explorer, regularisation and bias–variance, perceptron, SMO-trained SVM, K-Means with exact Voronoi cells, PCA on Iris, decision trees and random forests, back-propagation with gradient checking, activation functions and initialisation, convolution and pooling walkthroughs, Grad-CAM, NMS, RNN gradient flow, LSTM gates, analytic attention heads, diffusion forward/DDIM sampling, quantisation and a Q-learning grid world.
- **Dataset painter**: paint 2-D points, train logistic regression or MLPs live, export `[x, y, label]` JSON.
- **Tensor sandbox**: run TensorFlow.js snippets in a Web Worker and inspect tensor shapes, values and memory.
- **Progress & sharing**: progress auto-saves to `localStorage`. **Share progress** creates a compact `?save=` link (lz-string) that restores or merges a session.
- **Cheat-sheet exporter**: a Markdown download or print-to-PDF study sheet of everything you have mastered.

## Tech stack

React 18 · Vite 6 · TypeScript · React Router (hash routing for GitHub Pages) · MDX 3 (`@mdx-js/rollup`, `remark-math`, `rehype-katex`) · Tailwind CSS v4 with shadcn/ui-style components (Radix primitives) · TensorFlow.js · three.js / `@react-three/fiber` / `@react-three/drei` · visx · Recharts · Zustand (persist middleware) · lz-string · lucide-react · Vitest.

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # 300+ unit tests (maths, curriculum, lessons, TF.js models)
npm run lint
npm run build      # type-check + static bundle in dist/
npm run preview    # serve the production build
```

Node 22 or newer is recommended.

## Project structure

```text
.github/workflows/deploy.yml   Lint, test and build on every push/PR; publish dist/ to gh-pages from main
public/datasets/               Real public-domain datasets (Iris, Old Faithful, Anscombe's quartet)
src/
  components/
    layout/                    Top nav, sidebar, footer, bookmark banner, share button
    roadmap/                   Tech-tree canvas and node cards
    sandbox/                   Dataset painter, tensor sandbox (+ Web Worker)
    content/                   MDX components, challenge panel, formulas, paper list
    viz/                       Shared visualisation kit (Plot2D, LineChart, heatmaps, controls)
    ui/                        shadcn/ui-style primitives
  content/{foundations,cv,modern}/*.mdx   One lesson per curriculum node
  data/curriculum.json         Nodes, prerequisites, routes, formulas, papers, challenges
  data/models.json             Architectures and layer descriptions for the exploded viewer
  hooks/                       useExplodedModel, useCanvasDraw, useChallenge, usePlayback, …
  lib/                         Pure maths (each module has *.test.ts), bookmarks, curriculum logic
  lib/tf/                      TensorFlow.js model builder, trainer, Grad-CAM, classifiers
  store/                       Zustand progress store persisted to localStorage
  visualizers/                 Lazily loaded visualizers (exploded-network, vision, attention, …)
```

## Design principles

- **Content is data.** Lesson text lives in MDX, and curriculum metadata (prerequisites, formulas, papers, challenges) in `curriculum.json`. Layer explanations live in `models.json`.
- **No mock computation.** Visualizers run real algorithms: exact formulas in `src/lib` or live TensorFlow.js tensors. Synthetic datasets are generated from fixed seeds, so a shared bookmark reproduces the same state.
- **Test-driven maths.** Every module in `src/lib` has unit tests, checked against closed forms, finite differences, published numbers (Anscombe's OLS line, Iris explained variance) or TensorFlow.js itself. *Feasibility tests* prove every metric challenge is achievable, and that the default settings do not already pass it.
- **Lazy by default.** TensorFlow.js (≈300 kB gzipped) and three.js load only on pages that use them.
- **Accessible charts.** Colour-vision-deficiency-validated categorical palettes, marker shapes for class identity, a single-hue sequential ramp and a blue/grey/red diverging ramp, in both light and dark themes.

## Adding a lesson

1. Add a node to `src/data/curriculum.json` (id, track, prerequisites, formulas, papers, challenge, visualizers).
2. Write `src/content/<track>/<id>.mdx`. Registered visualizers (`<LossLandscape3D />`, `<DatasetPainter model="mlp" />`, …) and `<Callout>` are available without imports, and `$…$` / `$$…$$` render with KaTeX.
3. For a new visualizer, add it under `src/visualizers/` and register it in `src/visualizers/registry.ts`. Report challenge metrics with `useChallengeReporter()`.
4. `npm test` compiles every lesson and checks that it embeds its visualizers and that the curriculum graph is valid.

## Deployment (GitHub Pages)

The workflow in `.github/workflows/deploy.yml` runs lint, tests and the build for every push and pull request. On pushes to `main`, it publishes `dist/` to the **`gh-pages`** branch. To enable the site, open **Settings → Pages**, choose **Deploy from a branch**, and select `gh-pages` / `(root)`. The build uses a relative base path and hash routing, so it works under any repository name.

## Datasets

- **Iris**: Fisher, R. A. (1936), *Annals of Eugenics* 7(2); measurements by Edgar Anderson. Public domain.
- **Old Faithful**: Azzalini & Bowman (1990), *Applied Statistics* 39(3), as distributed with R (`datasets::faithful`). Public domain.
- **Anscombe's quartet**: Anscombe, F. J. (1973), *The American Statistician* 27(1).

## License

MIT. See [LICENSE](LICENSE).
