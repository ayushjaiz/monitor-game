import { fileURLToPath } from "url";
import path from "path";
import { getLlama, LlamaChatSession } from "node-llama-cpp";

async function main() {
    try {
        // Define the __dirname using fileURLToPath
        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        
        // Initialize the Llama model
        const llama = await getLlama();
        const model = await llama.loadModel({
            modelPath: path.join(__dirname, "model", "phi2-all-app-reviews-absa.Q2_K.gguf")
        });

        // Create context and chat session
        const context = await model.createContext();
        const session = new LlamaChatSession({
            contextSequence: context.getSequence()
        });

        // User prompt
        const userPrompt = "What are you doing?";
        console.log("User: " + userPrompt);

        // AI response
        const aiResponse = await session.prompt(userPrompt);
        console.log("AI: " + aiResponse);

    } catch (error) {
        console.error("An error occurred:", error);
    }
}

// Execute the main function
main();
