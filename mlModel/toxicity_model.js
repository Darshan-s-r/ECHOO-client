
import * as toxicity from '@tensorflow-models/toxicity';

const threshold = 0.9;

let model;

const loadModel = async () => {
  if (!model) {
    model = await toxicity.load(threshold);
  }
};

export default async function predict_toxicity(content) {
  console.log('enter predict_toxicity function')

  await loadModel();

  const predictions = await model.classify([content]);

  const isToxic = predictions.some(prediction => prediction.results.some(result => result.match));
 return isToxic;
}
