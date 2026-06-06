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

console.log("Using API Key:", apiKey.substring(0, 6) + "..." + apiKey.substring(apiKey.length - 4));

const genAI = new GoogleGenerativeAI(apiKey);

async function run() {
  try {
    // In @google/generative-ai, listModels is not exposed directly on GoogleGenerativeAI class,
    // we need to call it via the REST API or the client helper.
    // Let's make a raw REST fetch to Google AI Studio List Models API to check supported models and endpoints
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    console.log("\nAvailable Models for your API Key:");
    if (data.models && data.models.length > 0) {
      data.models.forEach(model => {
        if (model.supportedGenerationMethods.includes('generateContent')) {
          console.log(`- ${model.name} (${model.displayName})`);
        }
      });
    } else {
      console.log("No models returned or invalid format:", data);
    }
  } catch (error) {
    console.error("Error fetching models:", error.message);
  }
}

run();
