import ort from 'onnxruntime-node';
import fs from 'fs';

// Load and classify a review using the ONNX model
async function classifyReview(text) {
    // Load the ONNX model
    const session = await ort.InferenceSession.create('./distilbert_sentiment.onnx');

    // Tokenize the input text
    const inputIds = textToTokens(text);

    // Prepare input data in the format the model expects
    const inputs = {
        input_ids: new ort.Tensor('int64', inputIds, [1, inputIds.length]),
    };

    // Run inference
    const results = await session.run(inputs);

    // Interpret the output and classify
    const logits = results.logits.data;
    const category = interpretResults(logits);

    return category;
}

// Dummy function for text tokenization (replace with actual tokenization)
function textToTokens(text) {
    // Convert text to IDs based on vocabulary
    // This is a simplified example; use the appropriate tokenizer
    return [101, ...text.split('').map((c) => c.charCodeAt(0)), 102];
}

// Interpret model output
function interpretResults(logits) {
    const categories = ['bugs', 'complaints', 'crashes', 'praises', 'other'];
    const categoryIndex = logits.indexOf(Math.max(...logits));
    return categories[categoryIndex];
}

// Example usage
(async () => {
    const reviewText = 'This app keeps crashing every time I open it.';
    const category = await classifyReview(reviewText);
    console.log(`Review Category: ${category}`);
})();
