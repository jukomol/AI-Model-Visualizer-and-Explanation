import{c as R,r,j as e,B as h,O as E,l as p}from"./index-ghSIyZeh.js";import{B as g}from"./badge-c-xISW8k.js";import{N as F}from"./select-CVzNppoQ.js";import{V as W}from"./VizFrame-BOMiHHIz.js";import{S as z}from"./square-DPlwzUyH.js";import{P as B}from"./play-DCcrGOU4.js";import{R as L}from"./rotate-ccw-CSmqy29z.js";import{T as $}from"./ErrorBoundary-DIzaOSPr.js";import"./katex-DStc31fQ.js";import"./tfjs-DmZc1K5o.js";/**
 * @license lucide-react v1.48.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j={name:"loader-circle",size:24,node:[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],aliases:["loader-2"]};j.node;const A=R(j),u={shapes:{title:"Tensor shapes & broadcasting",code:`// A batch of 2 RGB images, 4×4 pixels, channels last.
const images = tf.randomUniform([2, 4, 4, 3], 0, 1, 'float32', 42)
print('images', images.shape)

// Broadcasting: a per-channel mean [3] subtracts from every pixel.
const mean = images.mean([0, 1, 2])
const centred = images.sub(mean)
show(mean, 'per-channel mean')
print('centred', centred.shape, 'mean now ≈', centred.mean().dataSync()[0].toFixed(6))`},matmul:{title:"Matrix products (a dense layer by hand)",code:`// y = xW + b for a batch of 3 inputs with 4 features → 2 outputs
const x = tf.tensor2d([[1, 2, 3, 4], [0, 1, 0, 1], [2, 2, 2, 2]])
const W = tf.tensor2d([[0.1, -0.2], [0.3, 0.4], [-0.5, 0.6], [0.7, -0.8]])
const b = tf.tensor1d([0.5, -0.5])
const y = x.matMul(W).add(b)
show(y, 'xW + b  →  shape [3, 2]')
show(tf.relu(y), 'ReLU(xW + b)')`},conv:{title:"conv2d output shapes",code:`// [batch, height, width, channels] ∗ [kh, kw, in, out]
const img = tf.ones([1, 28, 28, 1])
const kernel = tf.randomNormal([3, 3, 1, 8], 0, 0.1, 'float32', 1)
for (const [stride, pad] of [[1, 'valid'], [1, 'same'], [2, 'valid'], [2, 'same']]) {
  const out = tf.conv2d(img, kernel, stride, pad)
  print(\`stride \${stride}, padding \${pad}:\`, out.shape)
}
const pooled = tf.maxPool(tf.conv2d(img, kernel, 1, 'valid'), 2, 2, 'valid')
print('conv 3×3 → maxPool 2×2:', pooled.shape)`},grad:{title:"Automatic differentiation with tf.grad",code:`// f(x) = x³ − 2x  →  f'(x) = 3x² − 2
const f = (x) => x.pow(3).sub(x.mul(2))
const df = tf.grad(f)
const xs = tf.tensor1d([-2, -1, 0, 1, 2])
show(df(xs), "f'(x) from autodiff")
show(xs.square().mul(3).sub(2), "3x² − 2 by hand")`},softmax:{title:"Softmax cross-entropy gradient = p − y",code:`const logits = tf.variable(tf.tensor2d([[2.0, 0.5, -1.0]]))
const labels = tf.tensor2d([[0, 1, 0]])
const { grads, value } = tf.variableGrads(() => tf.losses.softmaxCrossEntropy(labels, logits))
show(value, 'loss')
show(grads[logits.name], 'dL/dlogits (autodiff)')
show(tf.softmax(logits).sub(labels), 'softmax(z) − y (by hand)')`},regression:{title:"Linear regression with an optimizer",code:`// Fit y = 2x − 1 from noisy samples with SGD.
const xs = tf.linspace(-1, 1, 50)
const ys = xs.mul(2).sub(1).add(tf.randomNormal([50], 0, 0.1, 'float32', 7))
const w = tf.variable(tf.scalar(0))
const b = tf.variable(tf.scalar(0))
const opt = tf.train.sgd(0.2)
for (let step = 1; step <= 100; step++) {
  const loss = opt.minimize(() => tf.losses.meanSquaredError(ys, xs.mul(w).add(b)), true)
  if (step % 25 === 0) print(\`step \${step}: loss \${loss.dataSync()[0].toFixed(5)}  w=\${w.dataSync()[0].toFixed(3)}  b=\${b.dataSync()[0].toFixed(3)}\`)
  loss.dispose()
}`},memory:{title:"Memory: tf.tidy and dispose",code:`// WebGL tensors are not garbage-collected automatically.
print('tensors before:', tf.memory().numTensors)
for (let i = 0; i < 100; i++) tf.ones([100]).add(1) // leaks 200 tensors!
print('after a leaky loop:', tf.memory().numTensors)
const kept = tf.tidy(() => {
  let t = tf.ones([100])
  for (let i = 0; i < 100; i++) t = t.add(1)
  return t.sum()
})
print('after a tidy loop:', tf.memory().numTensors, '(only the returned tensor survives)')
show(kept, 'result')`}},b=8e3;function M(){return new Worker(new URL(""+new URL("sandbox.worker-D38ZlH1C.js",import.meta.url).href,import.meta.url),{type:"module"})}function H(){const[w,y]=r.useState("shapes"),[c,d]=r.useState(u.shapes.code),[s,k]=r.useState(null),[n,m]=r.useState("idle"),o=r.useRef(null),i=r.useRef(0),f=r.useRef(0),l=r.useCallback(()=>{o.current?.terminate();const t=M();t.onmessage=a=>{a.data.id===f.current&&(window.clearTimeout(i.current),k(a.data),m("idle"))},o.current=t},[]);r.useEffect(()=>(l(),()=>{window.clearTimeout(i.current),o.current?.terminate()}),[l]);const v=()=>{o.current||l(),f.current++,m("running"),o.current.postMessage({id:f.current,code:c}),window.clearTimeout(i.current),i.current=window.setTimeout(()=>{m("timeout"),l()},b)},N=()=>{window.clearTimeout(i.current),m("idle"),l()},S=t=>{if((t.metaKey||t.ctrlKey)&&t.key==="Enter")t.preventDefault(),v();else if(t.key==="Tab"){t.preventDefault();const a=t.currentTarget,{selectionStart:x,selectionEnd:T}=a,C=`${c.slice(0,x)}  ${c.slice(T)}`;d(C),requestAnimationFrame(()=>a.setSelectionRange(x+2,x+2))}};return e.jsx(W,{title:"Tensor sandbox",description:e.jsxs(e.Fragment,{children:["Write TensorFlow.js code and inspect the tensors it produces. ",e.jsx("code",{children:"tf"}),", ",e.jsx("code",{children:"print(…)"})," and ",e.jsx("code",{children:"show(tensor, label)"})," are in scope, and top-level ",e.jsx("code",{children:"await"})," works. Code runs in a Web Worker with no page access and is stopped after ",b/1e3," s. Ctrl/⌘ + Enter runs it."]}),stacked:!0,children:e.jsxs("div",{className:"grid gap-4 xl:grid-cols-2",children:[e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsx("div",{className:"min-w-56 flex-1",children:e.jsx(F,{"aria-label":"Example snippet",value:w,onChange:t=>{y(t.target.value),d(u[t.target.value].code)},children:Object.entries(u).map(([t,a])=>e.jsx("option",{value:t,children:a.title},t))})}),n==="running"?e.jsxs(h,{onClick:N,variant:"destructive",children:[e.jsx(z,{})," Stop"]}):e.jsxs(h,{onClick:v,children:[e.jsx(B,{})," Run"]}),e.jsx(h,{variant:"ghost",onClick:()=>d(u[w].code),"aria-label":"Restore the example code",children:e.jsx(L,{})})]}),e.jsx("textarea",{value:c,onChange:t=>d(t.target.value),onKeyDown:S,spellCheck:!1,"aria-label":"TensorFlow.js code",className:"h-[26rem] w-full resize-y rounded-lg border bg-muted/50 p-3 font-mono text-[13px] leading-5 focus-visible:outline-2 focus-visible:outline-ring"})]}),e.jsxs("div",{className:"flex min-h-[26rem] flex-col rounded-lg border bg-background/60",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-2 border-b px-3 py-2 text-xs text-muted-foreground",children:[n==="running"&&e.jsxs("span",{className:"flex items-center gap-1",children:[e.jsx(A,{className:"size-3.5 animate-spin"})," running…"]}),n==="timeout"&&e.jsxs("span",{className:"flex items-center gap-1 text-destructive",children:[e.jsx($,{className:"size-3.5"})," stopped after ",b/1e3," s (worker restarted)"]}),s&&n==="idle"&&e.jsxs(e.Fragment,{children:[e.jsxs(g,{variant:"outline",children:[e.jsx(E,{})," ",s.backend]}),e.jsxs("span",{children:[p(s.ms,1)," ms"]}),e.jsxs("span",{children:["live tensors ",s.tensorsBefore," → ",s.tensorsAfter,s.tensorsAfter>s.tensorsBefore&&` (+${s.tensorsAfter-s.tensorsBefore} not disposed)`]})]}),!s&&n==="idle"&&e.jsx("span",{children:"Output appears here."})]}),e.jsx("div",{className:"flex-1 space-y-2 overflow-auto p-3 font-mono text-[12.5px]","aria-live":"polite",children:s?.lines.map((t,a)=>t.kind==="log"?e.jsx("pre",{className:"whitespace-pre-wrap",children:t.text},a):t.kind==="error"?e.jsx("pre",{className:"whitespace-pre-wrap text-destructive",children:t.text},a):e.jsxs("div",{className:"rounded-md border bg-card p-2",children:[e.jsxs("div",{className:"mb-1 flex flex-wrap items-center gap-2 font-sans text-xs",children:[e.jsx("span",{className:"font-semibold",children:t.label}),e.jsxs(g,{variant:"secondary",children:["shape [",t.shape.join(", "),"]"]}),e.jsx(g,{variant:"outline",children:t.dtype}),t.stats&&e.jsxs("span",{className:"text-muted-foreground",children:["min ",p(t.stats.min,4)," · max ",p(t.stats.max,4)," · mean ",p(t.stats.mean,4)]})]}),e.jsx("pre",{className:"max-h-48 overflow-auto whitespace-pre",children:t.values})]},a))})]})]})})}export{H as default};
