import ollama from 'ollama';

const chatConfig = {
    model: "gemma2:2b",
};

async function categoriseReview(review) {
    console.log(review);
    const prompt = {
        role: "user",
        content: `Respond to the following review with a single, precise category from this set in order of given priority: BUGS, COMPLAINTS, CRASHES, PRAISES, or OTHERS.
        
        Only simply respond with the category name.
    
        Review: ${review}`
    };

    try {
        const response = await ollama.chat({ model: chatConfig.model, messages: [prompt] });

        console.log(response.message.content);

        return response.message.content;
    } catch (error) {
        console.error("Batch processing failed!", error);
    }
}

export default categoriseReview;