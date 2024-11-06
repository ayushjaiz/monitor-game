import ollama from 'ollama';

let modelResponse = "";

const prompt = `Classify this review into one of the following five categories: 
- Complaints, Crashes, Bugs, Praises, Others

Review: "I liked this app."

Respond with only the single - word category that best fits.`;

let chatConfig = {
    model: "llama3.2:1b",
    role: "user",
    content: prompt,
};

// Check for chat content argument, otherwise use default prompt above
if (process.argv[2] && process.argv[2].length >= 2) {
    chatConfig.content = process.argv[2];
}

async function invokeLLM(props) {
    console.log(`-----`);
    console.log(`[${props.model}]: ${props.content}`);
    console.log(`-----`);
    try {
        console.log(`Running prompt...`);
        const response = await ollama.chat({
            model: props.model,
            messages: [{ role: props.role, content: props.content }],
        });
        console.log(`${response.message.content}\n`);
        modelResponse = response.message.content;
    } catch (error) {
        console.log(`Query failed!`);
        console.log(error);
    }
}

// Execute the loop
(async () => {
    for (let i = 0; i < 10; i++) {
        await invokeLLM(chatConfig);  // Awaiting each iteration for sequential execution
    }
})();
