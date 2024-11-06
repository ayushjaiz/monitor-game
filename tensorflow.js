import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { Transformer } from 'transformer.js';

// Define the 5 review categories
const CATEGORIES = ['Complaints', 'Crashes', 'Bugs', 'Praises', 'Others'];

// Load the Transformer.js DistilBERT model
async function loadModel() {
  try {
    // Load the pre-trained DistilBERT model from Hugging Face
    const model = await Transformer.fromHuggingFace('distilbert-base-uncased-finetuned-sst-2-english');
    return model;
  } catch (error) {
    console.error('Error loading Transformer.js model:', error);
    throw error;
  }
}

// Classify a review text into one of the 5 categories
async function classifyReview(model, reviewText) {
  try {
    // Use the loaded DistilBERT model to predict the review category
    const output = await model.classify([reviewText]);
    const predictedCategory = CATEGORIES[output[0].label];
    return predictedCategory;
  } catch (error) {
    console.error('Error classifying review:', error);
    throw error;
  }
}

// Example usage
async function main() {
  try {
    // Load the Transformer.js DistilBERT model
    const model = await loadModel();
    console.log('Transformer.js model loaded successfully.');

    // Classify a sample review
    const reviewText = "The app keeps crashing on my device. Very frustrating!";
    const category = await classifyReview(model, reviewText);
    console.log(`The review is classified as: ${category}`);
  } catch (error) {
    console.error('Error in main function:', error);
  }
}

main();