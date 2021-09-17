const tf = require("@tensorflow/tfjs-node");
const mobilenet = require("@tensorflow-models/mobilenet");
const fs = require("fs");

function detectProduct(url) {
  const image = fs.readFileSync(url);
  const input = tf.node.decodeImage(image, 3);
}
