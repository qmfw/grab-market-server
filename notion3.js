<html>
  <head>
    <!-- TensorFlow.js -->
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@0.11.2"></script>
  </head>
  <body>
    <form onsubmit="predict();return false;">
      <input id="input" />
      <input type="submit" value="예측하기" />
    </form>
    <div>
      <div id="output_field"></div>
    </div>
  </body>
  <script>
    const model = tf.sequential();
    const layer1 = tf.layers.dense({
      inputShape: [1],
      units: 1,
      activation: "linear",
    });
    const layer2 = tf.layers.dense({ units: 1, activation: "linear" });
    model.add(layer1);
    model.add(layer2);
    model.compile({
      loss: "meanSquaredError",
      optimizer: "sgd",
    });
    const xs = tf.tensor2d([-1, 0, 1, 2, 3, 4], [6, 1]);
    const ys = tf.tensor2d([-3, -1, 1, 3, 5, 7], [6, 1]);
    model
      .fit(xs, ys, { epochs: 500 }) //Promise 객체
      .then((result) => {
        console.log(result);
      });
    function predict() {
      const value = parseInt(document.getElementById("input").value);
      const predictedValue = model.predict(tf.tensor2d([value], [1, 1]));
      document.getElementById("output_field").innerText = predictedValue;
    }
  </script>
</html>
