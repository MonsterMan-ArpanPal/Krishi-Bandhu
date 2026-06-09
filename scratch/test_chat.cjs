const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

// Read API Key from .env
const envPath = path.join(__dirname, '..', '.env');
let apiKey = '';
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/GEMINI_API_KEY\s*=\s*["']?([^"'\r\n]+)["']?/);
  if (match) {
    apiKey = match[1];
  }
}

if (!apiKey || apiKey.includes('replace_me')) {
  console.error("Please provide a valid GEMINI_API_KEY in your .env file.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

const profile = {
  name: "Arpan",
  district: "Mandya",
  zone: "Zone 6",
  soilType: "red sandy loamy",
  landSize: 2.5,
  crops: ["Sugarcane", "Ragi"],
  isIrrigated: true
};

const weatherSim = "sunny and dry weather around 32°C";

function buildSystemInstructions(profile, weatherSim, language) {
  return `You are "Krishi Sakhi" (Farmer's Friend), a compassionate, highly knowledgeable, and expert agricultural AI assistant created to support smallholder farmers in Karnataka, India. 
Your goal is to guide the farmer through their crop cycles, offer diagnostic tips for pests, recommend best practices, and suggest government schemes.

CRITICAL INSTRUCTIONS:
1. CUSTOMER PROFILE:
   - Farmer Name: ${profile.name}
   - District/Region: ${profile.district} (Agro-climatic Zone: ${profile.zone})
   - Soil Type: ${profile.soilType}
   - Farm Size: ${profile.landSize} Acres
   - Selected Crops: ${profile.crops.join(", ")}
   - Irrigation Status: ${profile.isIrrigated ? "Irrigated" : "Rainfed / Unirrigated"}

2. CURRENT SIMULATED WEATHER / REGIONAL ALERTS:
   - Context: ${weatherSim}

3. LANGUAGE POLICY:
   - You MUST respond strictly in ${language === "kn" ? "Kannada (ಕನ್ನಡ)" : "English"}.
   - If Kannada (ಕನ್ನಡ), respond in warm, polite, and grammatically correct Kannada using the Kannada script. Use simple farming terms (e.g., "ಬಿತ್ತನೆ" for sowing, "ನೀರಾವರಿ" for irrigation, "ಗೊಬ್ಬರ" for fertilizer).
   - If English, respond in clear, easy-to-understand English.
   - Keep answers structured with short paragraphs or bullet points for readability.

4. ADVISORY STYLE:
   - Be empathetic and supportive. Agriculture is high-risk; always offer encouraging words.
   - Always base your advice on the farmer's specific crop choice, soil type, and the current weather context. For example, if rain is expected, warn against spraying pesticides or fertilizers.
   - Mention local Karnataka agriculture schemes (e.g. Krishi Bhagya, Ganga Kalyana, PM-KISAN, PMFBY crop insurance) when highly relevant to their profile or district.
   - Mention APMC market prices or price trends in Karnataka for their specific crops when asked.
   - Provide concrete, organic and inorganic crop remedies, prioritizing cost-effective and sustainable organic remedies (like Neem oil spray, Jeevamrutha, Bejamrutha).
   - Keep responses concise (under 250 words) so they are easy to read and suitable for text-to-speech voice readouts.`;
}

async function run() {
  const modelName = "gemini-2.5-flash";
  console.log(`Querying ${modelName} with v1beta...`);
  
  try {
    const model = genAI.getGenerativeModel(
      {
        model: modelName,
        systemInstruction: buildSystemInstructions(profile, weatherSim, "en"),
      },
      { apiVersion: "v1beta" }
    );

    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: 'hello' }] },
        { role: 'model', parts: [{ text: 'Namaste Arpan! I am doing very well, thank you for asking. I hope you and your family are healthy and happy in Mandya.\n\nAs your Krishi Sakhi, I am always excited to help you manage your 2.5-acre farm.' }] }
      ],
      generationConfig: {
        maxOutputTokens: 800,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage("how can I get help");
    console.log("\n--- API RESPONSE ---");
    console.log(result.response.text());
    console.log("--------------------\n");
  } catch (error) {
    console.error("API Call Failed:", error);
  }
}

run();
