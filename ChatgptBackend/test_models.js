import 'dotenv/config';

const API_KEY = process.env.GEMINI_API_KEY;
const URL = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

async function listModels() {
    console.log("Fetching models from:", URL.replace(API_KEY, "HIDDEN_KEY"));
    try {
        const response = await fetch(URL);
        const data = await response.json();

        if (!response.ok) {
            console.error("❌ API Error:", JSON.stringify(data, null, 2));
        } else {
            console.log("✅ Models found:");
            if (data.models) {
                data.models.forEach(m => console.log(` - ${m.name} (${m.supportedGenerationMethods})`));
            } else {
                console.log("No models returned in list.");
            }
        }
    } catch (e) {
        console.error("❌ Network/Script Error:", e);
    }
}

listModels();
