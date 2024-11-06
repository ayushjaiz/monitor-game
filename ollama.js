import ollama from 'ollama';

const reviews = [
    "This app is good",
    "This app has glitches",
    "I love the new update!",
    "The app crashes every time I open it.",
    "Great app, very user-friendly.",
    "The app is slow and lags a lot.",
    "I experienced a bug in the payment section.",
    "Amazing app! Very useful.",
    "Terrible experience, keeps freezing.",
    "Excellent performance on my device.",
    "The app drains my battery too quickly.",
    "So many bugs, it's unusable!",
    "Fantastic app, very responsive.",
    "The app won’t load past the splash screen.",
    "Good customer support, helped me solve my issue.",
    "The UI is confusing and hard to navigate.",
    "No crashes, smooth experience overall.",
    "The app randomly logs me out.",
    "Perfect for what I need, very intuitive.",
    "Keeps giving me error messages when I try to log in.",
    "This app is good",
    "This app has glitches",
    "I love the new update!",
    "The app crashes every time I open it.",
    "Great app, very user-friendly.",
    "The app is slow and lags a lot.",
    "I experienced a bug in the payment section.",
    "Amazing app! Very useful.",
    "Terrible experience, keeps freezing.",
    "Excellent performance on my device.",
    "The app drains my battery too quickly.",
    "So many bugs, it's unusable!",
    "Fantastic app, very responsive.",
    "The app won’t load past the splash screen.",
    "Good customer support, helped me solve my issue.",
    "The UI is confusing and hard to navigate.",
    "No crashes, smooth experience overall.",
    "The app randomly logs me out.",
    "Perfect for what I need, very intuitive.",
    "Keeps giving me error messages when I try to log in.",
    "Great app, very user-friendly.",
    "The app is slow and lags a lot.",
    "I experienced a bug in the payment section.",
    "Amazing app! Very useful.",
    "Terrible experience, keeps freezing.",
    "Excellent performance on my device.",
    "The app drains my battery too quickly.",
    "So many bugs, it's unusable!",
    "Fantastic app, very responsive.",
    "The app won’t load past the splash screen.",
    "Good customer support, helped me solve my issue.",
    "The UI is confusing and hard to navigate.",
    "No crashes, smooth experience overall.",
    "The app randomly logs me out.",
    "Perfect for what I need, very intuitive.",
    "Keeps giving me error messages when I try to log in."
];

const categories = ["COMPLAINTS", "CRASHES", "BUGS", "PRAISES", "OTHERS"];
const batchSize = 8; // Process 20 reviews at a time
let modelResponses = [];

const chatConfig = {
    model: "gemma2:2b",
    role: "user"
};

// Function to process a batch of reviews
async function invokeLLMBatch(reviewsBatch) {
    const prompt = {
        role: "user",
        content: `Classify each review into one of the following categories: ${categories.join(", ")}

        Reviews: ["This app is good",
        "This app has glitches",
        "I love the new update!",
        "The app crashes every time I open it.",
        "Great app, very user-friendly.",
        "The app is slow and lags a lot.",
        "I experienced a bug in the payment section.",
        "Amazing app! Very useful.",
        "Terrible experience, keeps freezing.",
        "Excellent performance on my device.",
        "The app drains my battery too quickly.",
        "So many bugs, it's unusable!",
        "Fantastic app, very responsive.",
        "The app won’t load past the splash screen."],

        Respond with only the single-word category for each review, in order, separated by commas.`
    };

    try {
        console.log(`Processing batch of ${reviewsBatch.length} reviews...`);
        const response = await ollama.chat({ model: chatConfig.model, messages: [prompt] });

        // Split the response by commas and add to modelResponses
        const classifications = response.message.content.trim().split(",");
        modelResponses.push(...classifications.map(item => item.trim()));
    } catch (error) {
        console.error("Batch processing failed!", error);
    }
}

(async () => {
    console.log(`Total reviews: ${reviews.length}`);

    // Process reviews in batches of 10
    for (let i = 0; i < reviews.length; i += batchSize) {
        const batch = reviews.slice(i, i + batchSize);
        await invokeLLMBatch(batch);
    }

    console.log("All responses:", modelResponses);
})();


(async () => {
    await invokeLLMBatch();
})();

