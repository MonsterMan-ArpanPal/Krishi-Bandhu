import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "~/env";

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

interface FarmerProfileContext {
  name: string;
  district: string;
  zone: string;
  soilType: string;
  landSize: number;
  crops: string[];
  isIrrigated: boolean;
}

interface ChatMessage {
  role: "user" | "model";
  text: string;
}

/**
 * Executes a function with automatic exponential backoff retries for rate limit and server errors.
 */
async function callWithRetry<T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    const err = error as Error;
    const errString = String(err.message ?? err);
    const isRateLimit = errString.includes("429") || errString.toLowerCase().includes("quota");
    const isServiceUnavailable = errString.includes("503") || errString.includes("fetch failed");

    if ((isRateLimit || isServiceUnavailable) && retries > 0) {
      console.warn(`[Retry System] Request failed, retrying in ${delay}ms... (Retries remaining: ${retries}). Error: ${errString}`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return callWithRetry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
}

/**
 * Construct system instructions for the farming assistant (Krishi Sakhi)
 */
function buildSystemInstructions(profile: FarmerProfileContext, weatherSim: string, language: "en" | "kn"): string {
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

/**
 * Call Gemini to get a conversational response
 */
export async function askKrishiSakhi(
  profile: FarmerProfileContext,
  weatherSim: string,
  message: string,
  history: ChatMessage[] = [],
  language: "en" | "kn" = "en"
): Promise<string> {
  const modelsToTry = [
    { name: "gemini-1.5-flash", apiVersion: "v1beta" as const },
    { name: "gemini-2.5-flash", apiVersion: "v1beta" as const },
    { name: "gemini-2.5-flash-lite", apiVersion: "v1beta" as const }
  ];
  let lastError: Error | null = null;

  for (const modelCfg of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel(
        {
          model: modelCfg.name,
          systemInstruction: buildSystemInstructions(profile, weatherSim, language),
        },
        { apiVersion: modelCfg.apiVersion }
      );

      // Clean and validate chat history for Gemini API
      // SDK requirements: Must start with "user" role and alternate strictly user -> model -> user -> model.
      const cleanHistory: ChatMessage[] = [];
      let expectedRole: "user" | "model" = "user";
      for (const msg of history) {
        if (msg.role === expectedRole) {
          cleanHistory.push(msg);
          expectedRole = expectedRole === "user" ? "model" : "user";
        }
      }

      const chatHistory = cleanHistory.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      }));

      const chat = model.startChat({
        history: chatHistory,
        generationConfig: {
          maxOutputTokens: 800,
          temperature: 0.7,
        },
      });

      const result = await callWithRetry(() => chat.sendMessage(message));
      const response = result.response;
      return response.text().trim();
    } catch (error) {
      const err = error as Error;
      console.warn(`Model ${modelCfg.name} (${modelCfg.apiVersion}) failed in askKrishiSakhi, trying next... Error:`, err.message ?? err);
      lastError = err;
    }
  }

  console.error("All models failed in askKrishiSakhi. Last error:", lastError);
  return `Error: Unable to connect to Krishi Sakhi API. Please verify your GEMINI_API_KEY in the env settings or try again. (Service status: ${lastError?.message ?? lastError})`;
}

/**
 * Call Gemini to generate a proactive morning/daily alert card
 */
export async function getProactiveAdvisory(
  profile: FarmerProfileContext,
  weatherSim: string,
  language: "en" | "kn"
): Promise<string> {
  const modelsToTry = [
    { name: "gemini-1.5-flash", apiVersion: "v1beta" as const },
    { name: "gemini-2.5-flash", apiVersion: "v1beta" as const },
    { name: "gemini-2.5-flash-lite", apiVersion: "v1beta" as const }
  ];
  let lastError: Error | null = null;

  for (const modelCfg of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel(
        {
          model: modelCfg.name,
          systemInstruction: buildSystemInstructions(profile, weatherSim, language),
        },
        { apiVersion: modelCfg.apiVersion }
      );

      const prompt = language === "kn" 
        ? `ಪ್ರಸ್ತುತ ಹವಾಮಾನ ಪರಿಸ್ಥಿತಿಗಳು ಮತ್ತು ನನ್ನ ಬೆಳೆಗಳ (${profile.crops.join(", ")}) ಆಧಾರದ ಮೇಲೆ ಇಂದು ನನಗೆ ಒಂದು ಸಂಕ್ಷಿಪ್ತ, ಕ್ರಿಯಾಶೀಲ ಮತ್ತು ನೇರವಾದ ಕೃಷಿ ಸಲಹೆಯನ್ನು ನೀಡಿ. (ಗರಿಷ್ಠ 3 ಸಾಲುಗಳು, ನೇರವಾಗಿ ಉತ್ತರ ನೀಡಿ)`
        : `Based on my crops (${profile.crops.join(", ")}) and the current weather context, provide a brief, direct, and actionable farm advisory for today. Keep it extremely concise (maximum 3 sentences).`;

      const result = await callWithRetry(() => model.generateContent(prompt));
      const response = result.response;
      return response.text().trim();
    } catch (error) {
      const err = error as Error;
      console.warn(`Model ${modelCfg.name} (${modelCfg.apiVersion}) failed in getProactiveAdvisory, trying next... Error:`, err.message ?? err);
      lastError = err;
    }
  }

  console.error("All models failed in getProactiveAdvisory. Last error:", lastError);
  return language === "kn"
    ? "ಸಂಪರ್ಕ ದೋಷ: ದಯವಿಟ್ಟು ನಿಮ್ಮ ಇಂಟರ್ನೆಟ್ ಸಂಪರ್ಕ ಅಥವಾ ಎಪಿಐ ಕೀಲಿಯನ್ನು ಪರಿಶೀಲಿಸಿ."
    : "Connection error: Please verify your internet connection or Gemini API key.";
}
