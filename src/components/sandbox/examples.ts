/** Starter snippets for the tensor sandbox. `tf`, `print(...)` and `show(tensor, label)` are in scope. */
export const EXAMPLES: Record<string, { title: string; code: string }> = {
  shapes: {
    title: 'Tensor shapes & broadcasting',
    code: `// A batch of 2 RGB images, 4×4 pixels, channels last.
const images = tf.randomUniform([2, 4, 4, 3], 0, 1, 'float32', 42)
print('images', images.shape)

// Broadcasting: a per-channel mean [3] subtracts from every pixel.
const mean = images.mean([0, 1, 2])
const centred = images.sub(mean)
show(mean, 'per-channel mean')
print('centred', centred.shape, 'mean now ≈', centred.mean().dataSync()[0].toFixed(6))`,
  },
  matmul: {
    title: 'Matrix products (a dense layer by hand)',
    code: `// y = xW + b for a batch of 3 inputs with 4 features → 2 outputs
const x = tf.tensor2d([[1, 2, 3, 4], [0, 1, 0, 1], [2, 2, 2, 2]])
const W = tf.tensor2d([[0.1, -0.2], [0.3, 0.4], [-0.5, 0.6], [0.7, -0.8]])
const b = tf.tensor1d([0.5, -0.5])
const y = x.matMul(W).add(b)
show(y, 'xW + b  →  shape [3, 2]')
show(tf.relu(y), 'ReLU(xW + b)')`,
  },
  conv: {
    title: 'conv2d output shapes',
    code: `// [batch, height, width, channels] ∗ [kh, kw, in, out]
const img = tf.ones([1, 28, 28, 1])
const kernel = tf.randomNormal([3, 3, 1, 8], 0, 0.1, 'float32', 1)
for (const [stride, pad] of [[1, 'valid'], [1, 'same'], [2, 'valid'], [2, 'same']]) {
  const out = tf.conv2d(img, kernel, stride, pad)
  print(\`stride \${stride}, padding \${pad}:\`, out.shape)
}
const pooled = tf.maxPool(tf.conv2d(img, kernel, 1, 'valid'), 2, 2, 'valid')
print('conv 3×3 → maxPool 2×2:', pooled.shape)`,
  },
  grad: {
    title: 'Automatic differentiation with tf.grad',
    code: `// f(x) = x³ − 2x  →  f'(x) = 3x² − 2
const f = (x) => x.pow(3).sub(x.mul(2))
const df = tf.grad(f)
const xs = tf.tensor1d([-2, -1, 0, 1, 2])
show(df(xs), "f'(x) from autodiff")
show(xs.square().mul(3).sub(2), "3x² − 2 by hand")`,
  },
  softmax: {
    title: 'Softmax cross-entropy gradient = p − y',
    code: `const logits = tf.variable(tf.tensor2d([[2.0, 0.5, -1.0]]))
const labels = tf.tensor2d([[0, 1, 0]])
const { grads, value } = tf.variableGrads(() => tf.losses.softmaxCrossEntropy(labels, logits))
show(value, 'loss')
show(grads[logits.name], 'dL/dlogits (autodiff)')
show(tf.softmax(logits).sub(labels), 'softmax(z) − y (by hand)')`,
  },
  regression: {
    title: 'Linear regression with an optimizer',
    code: `// Fit y = 2x − 1 from noisy samples with SGD.
const xs = tf.linspace(-1, 1, 50)
const ys = xs.mul(2).sub(1).add(tf.randomNormal([50], 0, 0.1, 'float32', 7))
const w = tf.variable(tf.scalar(0))
const b = tf.variable(tf.scalar(0))
const opt = tf.train.sgd(0.2)
for (let step = 1; step <= 100; step++) {
  const loss = opt.minimize(() => tf.losses.meanSquaredError(ys, xs.mul(w).add(b)), true)
  if (step % 25 === 0) print(\`step \${step}: loss \${loss.dataSync()[0].toFixed(5)}  w=\${w.dataSync()[0].toFixed(3)}  b=\${b.dataSync()[0].toFixed(3)}\`)
  loss.dispose()
}`,
  },
  memory: {
    title: 'Memory: tf.tidy and dispose',
    code: `// WebGL tensors are not garbage-collected automatically.
print('tensors before:', tf.memory().numTensors)
for (let i = 0; i < 100; i++) tf.ones([100]).add(1) // leaks 200 tensors!
print('after a leaky loop:', tf.memory().numTensors)
const kept = tf.tidy(() => {
  let t = tf.ones([100])
  for (let i = 0; i < 100; i++) t = t.add(1)
  return t.sum()
})
print('after a tidy loop:', tf.memory().numTensors, '(only the returned tensor survives)')
show(kept, 'result')`,
  },
}
