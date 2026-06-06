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
 * Intelligent offline fallback responder
 */
function generateOfflineResponse(
  profile: FarmerProfileContext,
  weatherSim: string,
  message: string,
  language: "en" | "kn"
): string {
  const msgLower = message.toLowerCase();
  const cropListStr = profile.crops.length > 0 ? profile.crops.join(", ") : "crops";

  if (language === "kn") {
    if (
      msgLower.includes("ಬೆಲೆ") ||
      msgLower.includes("ಧಾರಣೆ") ||
      msgLower.includes("ಮಾರುಕಟ್ಟೆ") ||
      msgLower.includes("ಎಪಿಎಂಸಿ") ||
      msgLower.includes("ರೇಟ್") ||
      msgLower.includes("ಖರೀದಿ") ||
      msgLower.includes("ಮಾರಾಟ") ||
      msgLower.includes("price") ||
      msgLower.includes("apmc") ||
      msgLower.includes("mandi") ||
      msgLower.includes("rate")
    ) {
      return `⚠️ [ಕೃಷಿ ಸಖಿ - ಆಫ್‌ಲೈನ್ ಮೋಡ್]
${profile.name} ಅವರೇ, ನಿಮ್ಮ ಬೆಳೆಗಳಿಗೆ ಪ್ರಸ್ತುತ ಕರ್ನಾಟಕದ APMC ಮಾರುಕಟ್ಟೆ ಧಾರಣೆಗಳ ವಿವರ:
• **ಕಬ್ಬು**: ಪ್ರತಿ ಟನ್‌ಗೆ ಸರಿಸುಮಾರು ₹3,150 ರಿಂದ ₹3,400 (FRP).
• **ರಾಗಿ**: ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್‌ಗೆ ₹3,800 ರಿಂದ ₹4,300 (MSP ₹4,290).
• **ಭತ್ತ**: ತಳಿಯ ಆಧಾರದ ಮೇಲೆ ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್‌ಗೆ ₹2,183 ರಿಂದ ₹2,500.
• **ಅಡಿಕೆ**: ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್‌ಗೆ ₹38,000 ರಿಂದ ₹46,000 (ಮಾರುಕಟ್ಟೆ ಏರಿಳಿತಕ್ಕೆ ಒಳಪಟ್ಟಿದೆ).
• **ಟೊಮೆಟೊ**: ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್‌ಗೆ ₹1,200 ರಿಂದ ₹2,500.

ನಿಖರವಾದ ದರಗಳಿಗಾಗಿ ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆ ಅಥವಾ ಕೃಷಿ ಇಲಾಖೆಯ ಪೋರ್ಟಲ್ ಪರಿಶೀಲಿಸಿ.`;
    }

    if (
      msgLower.includes("ಹವಾಮಾನ") ||
      msgLower.includes("ಮಳೆ") ||
      msgLower.includes("ತಾಪಮಾನ") ||
      msgLower.includes("ಮುನ್ಸೂಚನೆ") ||
      msgLower.includes("ಬಿಸಿಲು") ||
      msgLower.includes("ಒಣ") ||
      msgLower.includes("ಗಾಳಿ") ||
      msgLower.includes("ಚಳಿ") ||
      msgLower.includes("weather") ||
      msgLower.includes("rain") ||
      msgLower.includes("temp")
    ) {
      const isRainy = weatherSim.toLowerCase().includes("rain") || weatherSim.toLowerCase().includes("ಮಳೆ");
      const isDry = weatherSim.toLowerCase().includes("dry") || weatherSim.toLowerCase().includes("ಒಣ") || weatherSim.toLowerCase().includes("ಬರಗಾಲ");
      const isPest = weatherSim.toLowerCase().includes("pest") || weatherSim.toLowerCase().includes("ಕೀಟ");

      if (isRainy) {
        return `⚠️ [ಕೃಷಿ ಸಖಿ - ಆಫ್‌ಲೈನ್ ಮೋಡ್]
${profile.name} ಅವರೇ, ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ಪ್ರಕಾರ ನಿಮ್ಮ **${profile.district}** ಜಿಲ್ಲೆಯಲ್ಲಿ **ಭಾರೀ ಮಳೆಯಾಗುವ** ಸಾಧ್ಯತೆ ಇದೆ:
1. ತಕ್ಷಣ ಯಾವುದೇ ರೀತಿಯ ಕೀಟನಾಶಕ ಸಿಂಪಡಣೆ ಅಥವಾ ರಸಗೊಬ್ಬರ ಹಾಕುವುದನ್ನು ನಿಲ್ಲಿಸಿ.
2. ನಿಮ್ಮ **${cropListStr}** ಜಮೀನಿನಲ್ಲಿ ನೀರು ನಿಲ್ಲದಂತೆ ಬರಿದಾಗುವಿಕೆ ಕಾಲುವೆಗಳನ್ನು ಸ್ವಚ್ಛಗೊಳಿಸಿ.
3. ತೇವಾಂಶ ಹೆಚ್ಚಾಗುವುದರಿಂದ ಬರುವ ಬೇರು ಕೊಳೆಯುವ ರೋಗದ ಬಗ್ಗೆ ಜಾಗೃತರಾಗಿರಿ.`;
      } else if (isDry) {
        return `⚠️ [ಕೃಷಿ ಸಖಿ - ಆಫ್‌ಲೈನ್ ಮೋಡ್]
${profile.name} ಅವರೇ, ಪ್ರಸ್ತುತ ಹವಾಮಾನವು **ಒಣ ಮತ್ತು ಬರಗಾಲದ** ಸ್ಥಿತಿಯನ್ನು ಸೂಚಿಸುತ್ತಿದೆ:
1. ನಿಮ್ಮ ಬೆಳೆಗಳಿಗೆ ತೇವಾಂಶ ಉಳಿಸಿಕೊಳ್ಳಲು ಒಣ ಹಲ್ಲು ಅಥವಾ ಎಲೆಗಳಿಂದ ಮಲ್ಚಿಂಗ್ (ಹೊದಿಕೆ) ಮಾಡಿ.
2. ಬಾಷ್ಪೀಕರಣವನ್ನು ಕಡಿಮೆ ಮಾಡಲು ಮುಂಜಾನೆ ಅಥವಾ ಸಂಜೆ ವೇಳೆ ನೀರು ಹಾಯಿಸಿ.
3. ಸಾಧ್ಯವಾದರೆ ಹನಿ ನೀರಾವರಿ (Drip Irrigation) ಪದ್ಧತಿಯನ್ನು ಅಳವಡಿಸಿಕೊಳ್ಳಿ.`;
      } else if (isPest) {
        return `⚠️ [ಕೃಷಿ ಸಖಿ - ಆಫ್‌ಲೈನ್ ಮೋಡ್]
${profile.name} ಅವರೇ, ನಿಮ್ಮ ಪ್ರದೇಶದಲ್ಲಿ **ಕೀಟ ಬಾಧೆಯ ಅಪಾಯ** ಹೆಚ್ಚಾಗಿದೆ:
1. ನಿಮ್ಮ **${cropListStr}** ಬೆಳೆಗಳ ಎಲೆಗಳ ಕೆಳಭಾಗವನ್ನು ಸೂಕ್ಷ್ಮವಾಗಿ ಪರೀಕ್ಷಿಸಿ.
2. ಮುನ್ನೆಚ್ಚರಿಕೆಯಾಗಿ 1 ಲೀಟರ್ ನೀರಿಗೆ 5 ಮಿ.ಲೀ ಬೇವಿನ ಎಣ್ಣೆ ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ.
3. ಬಾಧಿತ ಗಿಡಗಳನ್ನು ತಕ್ಷಣ ಗುರುತಿಸಿ ಪ್ರತ್ಯೇಕಿಸಿ ಅಥವಾ ನಾಶಪಡಿಸಿ.`;
      } else {
        return `⚠️ [ಕೃಷಿ ಸಖಿ - ಆಫ್‌ಲೈನ್ ಮೋಡ್]
${profile.name} ಅವರೇ, ಪ್ರಸ್ತುತ ಹವಾಮಾನವು **ಬಿಸಿಲು ಮತ್ತು ಸಾಮಾನ್ಯವಾಗಿದೆ** (ಸುಮಾರು 32°C):
1. ಇದು ಕಳೆ ಕೀಳಲು ಮತ್ತು ಲಘು ಗೊಬ್ಬರ ನೀಡಲು ಸೂಕ್ತ ಸಮಯ.
2. ನಿಮ್ಮ ಜಮೀನು ${profile.isIrrigated ? "ನೀರಾವರಿ ಹೊಂದಿದೆ" : "ಮಳೆ ಆಶ್ರಿತವಾಗಿದೆ"}, ಆದ್ದರಿಂದ ತೇವಾಂಶಕ್ಕೆ ತಕ್ಕಂತೆ ನೀರು ನಿರ್ವಹಣೆ ಮಾಡಿ.
3. ಬೆಳೆಗಳು ಉತ್ತಮ ಸೂರ್ಯನ ಬೆಳಕನ್ನು ಪಡೆಯುತ್ತಿವೆ.`;
      }
    }

    if (
      msgLower.includes("ಕೀಟ") ||
      msgLower.includes("ರೋಗ") ||
      msgLower.includes("ಹುಳು") ||
      msgLower.includes("ಕಾಂಡ") ||
      msgLower.includes("ಕೊಳೆತ") ||
      msgLower.includes("ರೋಗಗಳು") ||
      msgLower.includes("ನಿವಾರಣೆ") ||
      msgLower.includes("ನಿಯಂತ್ರಣ") ||
      msgLower.includes("ಹಳದಿ") ||
      msgLower.includes("ಎಲೆ") ||
      msgLower.includes("ಸಿಂಪಡಣೆ") ||
      msgLower.includes("ಔಷಧಿ") ||
      msgLower.includes("pest") ||
      msgLower.includes("disease") ||
      msgLower.includes("insect") ||
      msgLower.includes("worm") ||
      msgLower.includes("bug")
    ) {
      return `⚠️ [ಕೃಷಿ ಸಖಿ - ಆಫ್‌ಲೈನ್ ಮೋಡ್]
${profile.name} ಅವರೇ, ನಿಮ್ಮ **${cropListStr}** ಬೆಳೆಗೆ ಬರುವ ಕೀಟ ಮತ್ತು ರೋಗ ನಿಯಂತ್ರಣಕ್ಕೆ ಈ ಕೆಳಗಿನ ಸಾವಯವ ಮತ್ತು ರಾಸಾಯನಿಕ ಕ್ರಮಗಳನ್ನು ಕೈಗೊಳ್ಳಿ:
• **ಸಾವಯವ ಪರಿಹಾರ**: 1 ಲೀಟರ್ ನೀರಿಗೆ 3-5 ಮಿ.ಲೀ ಬベーション ಎಣ್ಣೆಯನ್ನು ಮತ್ತು ಸ್ವಲ್ಪ ಸೋಪಿನ ದ್ರಾವಣವನ್ನು ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ. ಕೀಟನಿರೋಧಕವಾಗಿ ಬೇವಿನ ಹಿಂಡಿ ಬಳಸಿ.
• **ರೋಗ ನಿರೋಧಕತೆ**: ಬೆಳೆಗಳ ಸಾಮಾನ್ಯ ರೋಗನಿರೋಧಕ ಶಕ್ತಿಯನ್ನು ಹೆಚ್ಚಿಸಲು ಜೀವಾಮೃತವನ್ನು ಮಣ್ಣಿಗೆ ಉಣಿಸಿ.
• **ರಾಸಾಯನಿಕ ಪರಿಹಾರ**: ಕೀಟ ಬಾಧೆ ತೀವ್ರವಾಗಿದ್ದರೆ ಮಾತ್ರ ಸ್ಥಳೀಯ ಕೃಷಿ ಅಧಿಕಾರಿಯ ಸಲಹೆಯಂತೆ ಇಮಿಡಾಕ್ಲೋಪ್ರಿಡ್ ಅಥವಾ ಕ್ಲೋರಾಂಟ್ರಾನಿಲಿಪ್ರೋಲ್ ಬಳಸಿ. ಮಳೆಯ ಮುನ್ಸೂಚನೆ ಇದ್ದರೆ ಸ್ಪ್ರೇ ಮಾಡಬೇಡಿ.`;
    }

    if (
      msgLower.includes("ಗೊಬ್ಬರ") ||
      msgLower.includes("ಯೂರಿಯಾ") ||
      msgLower.includes("ಪೋಷಕಾಂಶ") ||
      msgLower.includes("ಸಾವಯವ") ||
      msgLower.includes("ರಾಸಾಯನಿಕ") ||
      msgLower.includes("ಮಣ್ಣು") ||
      msgLower.includes("ಖನಿಜ") ||
      msgLower.includes("fertilizer") ||
      msgLower.includes("urea") ||
      msgLower.includes("soil") ||
      msgLower.includes("compost")
    ) {
      return `⚠️ [ಕೃಷಿ ಸಖಿ - ಆಫ್‌ಲೈನ್ ಮೋಡ್]
ನಿಮ್ಮ ಜಮೀನಿನ **${profile.soilType}** ಮಣ್ಣು ಮತ್ತು **${cropListStr}** ಬೆಳೆಗಳಿಗೆ ಗೊಬ್ಬರ ಮತ್ತು ಪೋಷಕಾಂಶಗಳ ನಿರ್ವಹಣೆ:
• **ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರ**: ಭೂಮಿ ತಯಾರಿಕೆ ಸಮಯದಲ್ಲಿ ಎಕರೆಗೆ 2-3 ಟನ್ ಚೆನ್ನಾಗಿ ಕೊಳೆತ ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರ ಅಥವಾ ಎರೆಗೊಬ್ಬರವನ್ನು ಹಾಕಿ.
• **NPK ಅನುಪಾತ**: ನೈಟ್ರೋಜನ್ (ಯೂರಿಯಾ) ಗೊಬ್ಬರವನ್ನು 2 ರಿಂದ 3 ಕಂತುಗಳಲ್ಲಿ ನೀಡಿ. ಮಣ್ಣಿನಲ್ಲಿ ಪೊಟ್ಯಾಶ್ ಸರಿಯಾದ ಪ್ರಮಾಣದಲ್ಲಿರಲಿ, ಇದು ರೋಗ ನಿರೋಧಕ ಶಕ್ತಿ ನೀಡುತ್ತದೆ.
• **ಸೂಕ್ಷ್ಮ ಪೋಷಕಾಂಶಗಳು**: ಎಲೆಗಳು ಹಳದಿಯಾಗುತ್ತಿದ್ದರೆ ಲಘು ಪೋಷಕಾಂಶಗಳ ಕೊರತೆ ಇರಬಹುದು. ಮಣ್ಣು ಪರೀಕ್ಷೆ ನಡೆಸಿ ಸೂಕ್ತ ಪ್ರಮಾಣದಲ್ಲಿ ಗೊಬ್ಬರ ಹಾಕಿ.`;
    }

    if (
      msgLower.includes("ಯೋಜನೆ") ||
      msgLower.includes("ಸಹಾಯಧನ") ||
      msgLower.includes("ಸಾಲ") ||
      msgLower.includes("ವಿಮೆ") ||
      msgLower.includes("ಸರಕಾರ") ||
      msgLower.includes("ಭಾಗ್ಯ") ||
      msgLower.includes("ಕಲ್ಯಾಣ") ||
      msgLower.includes("ಅರ್ಹತೆ") ||
      msgLower.includes("scheme") ||
      msgLower.includes("subsidy") ||
      msgLower.includes("gov") ||
      msgLower.includes("loan")
    ) {
      return `⚠️ [ಕೃಷಿ ಸಖಿ - ಆಫ್‌ಲೈನ್ ಮೋಡ್]
ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಪ್ರಮುಖ ಕೃಷಿ ಯೋಜನೆಗಳು ಮತ್ತು ನೆರವು (${profile.zone} ವಲಯಕ್ಕೆ):
• **ಕೃಷಿ ಭಾಗ್ಯ ಯೋಜನೆ**: ಕೃಷಿ ಹೊಂಡ, ಮಲ್ಚಿಂಗ್ ಶೀಟ್ ಮತ್ತು ಡೀಸೆಲ್ ಪಂಪ್‌ಸೆಟ್‌ಗಳಿಗೆ ಶೇ. 80-90 ರವರೆಗೆ ಸಹಾಯಧನ.
• **ಗಂಗಾ ಕಲ್ಯಾಣ ಯೋಜನೆ**: ಸಣ್ಣ ಮತ್ತು ಅತಿ ಸಣ್ಣ ಹಿಂದುಳಿದ ವರ್ಗಗಳ ರೈತರಿಗೆ ಕೃಷಿ ಜಮೀನಿನಲ್ಲಿ ಉಚಿತ ಕೊಳವೆ ಬಾವಿ ಸೌಲಭ್ಯ.
• **ಪಿಎಂ-ಕಿಸಾನ್**: ರೈತರ ಖಾತೆಗೆ ವಾರ್ಷಿಕ ₹6,000 ಆರ್ಥಿಕ ನೆರವು ವರ್ಗಾವಣೆ.
• **ಪ್ರಧಾನ ಮಂತ್ರಿ ಫಸಲ್ ಬಿಮಾ ಯೋಜನೆ (PMFBY)**: ಬೆಳೆ ನಷ್ಟದ ವಿರುದ್ಧ ಆರ್ಥಿಕ ರಕ್ಷಣೆ ನೀಡುವ ಬೆಳೆ ವಿಮೆ ಯೋಜನೆ. ನೋಂದಣಿಗಾಗಿ ನಿಮ್ಮ ಪಹಣಿ ಮತ್ತು ಆಧಾರ್‌ನೊಂದಿಗೆ ಸ್ಥಳೀಯ ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರವನ್ನು (RSK) ಸಂಪರ್ಕಿಸಿ.`;
    }

    if (
      msgLower.includes("ಬಿತ್ತನೆ") ||
      msgLower.includes("ಬೀಜ") ||
      msgLower.includes("ನಾಟಿ") ||
      msgLower.includes("ಬೇಸಾಯ") ||
      msgLower.includes("ಬೆಳೆ") ||
      msgLower.includes("ಕೊಯ್ಲು") ||
      msgLower.includes("ಸಮಯ") ||
      msgLower.includes("sow") ||
      msgLower.includes("seed") ||
      msgLower.includes("plant") ||
      msgLower.includes("harvest")
    ) {
      return `⚠️ [ಕೃಷಿ ಸಖಿ - ಆಫ್‌ಲೈನ್ ಮೋಡ್]
${profile.name} ಅವರೇ, **${profile.district}** ಜಿಲ್ಲೆಯಲ್ಲಿ ಬಿತ್ತನೆ ಮತ್ತು ಕೃಷಿ ಕಾರ್ಯಗಳಿಗೆ ಈ ಕೆಳಗಿನ ಅಂಶಗಳನ್ನು ಗಮನಿಸಿ:
• **ಹಂಗಾಮು**: ಮುಂಗಾರು ಹಂಗಾಮಿನ ಬಿತ್ತನೆಯು ಜೂನ್-ಜುಲೈ ತಿಂಗಳಲ್ಲಿ ಮಳೆಯೊಂದಿಗೆ ಆರಂಭವಾಗುತ್ತದೆ. ಹಿಂಗಾರು ಬಿತ್ತನೆ ಅಕ್ಟೋಬರ್-ನವೆಂಬರ್‌ನಲ್ಲಿ ಸೂಕ್ತ.
• **ಬೀಜೋಪಚಾರ**: ಬಿತ್ತನೆಗೆ ಮುನ್ನ ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರದಿಂದ ಪ್ರಮಾಣೀಕೃತ ಬೀಜಗಳನ್ನು ಖರೀದಿಸಿ, ಜೈವಿಕ ಗೊಬ್ಬರ ಅಥವಾ ಟ್ರೈಕೋಡರ್ಮಾದಿಂದ ಬೀಜೋಪಚಾರ ಮಾಡಿ.
• **ಅಂತರ**: ಬೆಳೆಗಳ ನಡುವೆ ಸೂಕ್ತ ಅಂತರವನ್ನು ಕಾಯ್ದುಕೊಳ್ಳುವುದರಿಂದ ಸೂರ್ಯನ ಬೆಳಕು ಚೆನ್ನಾಗಿ ಸಿಕ್ಕು ಕೀಟಗಳ ಬಾಧೆ ಕಡಿಮೆಯಾಗುತ್ತದೆ.`;
    }

    return `⚠️ [ಕೃಷಿ ಸಖಿ - ಆಫ್‌ಲೈನ್ ಮೋಡ್]
ನಮಸ್ಕಾರ ${profile.name} ಅವರೇ! ಕೃಷಿ ಸಖಿ ಆಫ್‌ಲೈನ್ ಸಹಾಯಕಿ ನಿಮ್ಮ ಸೇವೆಗೆ ಸಿದ್ಧವಿದೆ.
ಪ್ರಸ್ತುತ ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಮಾಹಿತಿ:
• ಬೆಳೆಗಳು: **${cropListStr}**
• ಜಿಲ್ಲೆ: **${profile.district}**
• ಮಣ್ಣು: **${profile.soilType}**

ನಿಮ್ಮ ಪ್ರಶ್ನೆಗೆ ತಕ್ಕ ಕೃಷಿ ಸಲಹೆ ಪಡೆಯಲು 'ಕೀಟ', 'ಗೊಬ್ಬರ', 'ಹವಾಮಾನ' ಅಥವಾ 'ಯೋಜನೆ' ಎಂಬ ಪದಗಳನ್ನು ಒಳಗೊಂಡಿರುವ ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳಿ. ಉದಾಹರಣೆಗೆ: "ನನ್ನ ಕಬ್ಬಿನ ಬೆಳೆಗೆ ಬರುವ ರೋಗಗಳಾವುವು?"`;
  } else {
    if (
      msgLower.includes("price") ||
      msgLower.includes("apmc") ||
      msgLower.includes("mandi") ||
      msgLower.includes("rate") ||
      msgLower.includes("cost") ||
      msgLower.includes("value") ||
      msgLower.includes("sell") ||
      msgLower.includes("sold") ||
      msgLower.includes("market")
    ) {
      return `⚠️ [Krishi Sakhi - Offline Mode]
Hello ${profile.name}, here are the estimated Mandi / APMC prices for crops in Karnataka:
• **Sugarcane**: FRP around ₹3,150 to ₹3,400 per ton.
• **Ragi (Finger Millet)**: Mandi prices ₹3,800 to ₹4,300 per quintal (MSP is ₹4,290).
• **Paddy (Rice)**: ₹2,183 to ₹2,500 per quintal depending on variety.
• **Arecanut**: ₹38,000 to ₹46,000 per quintal (highly variable).
• **Tomato**: ₹1,200 to ₹2,500 per quintal depending on arrivals.

For current live prices, please contact your nearest APMC yard or check the KSAMB official portal.`;
    }

    if (
      msgLower.includes("weather") ||
      msgLower.includes("rain") ||
      msgLower.includes("temp") ||
      msgLower.includes("forecast") ||
      msgLower.includes("sunny") ||
      msgLower.includes("dry") ||
      msgLower.includes("climate") ||
      msgLower.includes("hot") ||
      msgLower.includes("cold") ||
      msgLower.includes("wind")
    ) {
      const isRainy = weatherSim.toLowerCase().includes("rain") || weatherSim.toLowerCase().includes("ಮಳೆ");
      const isDry = weatherSim.toLowerCase().includes("dry") || weatherSim.toLowerCase().includes("ಒಣ") || weatherSim.toLowerCase().includes("ಬರಗಾಲ");
      const isPest = weatherSim.toLowerCase().includes("pest") || weatherSim.toLowerCase().includes("ಕೀಟ");

      if (isRainy) {
        return `⚠️ [Krishi Sakhi - Offline Mode]
Hello ${profile.name}, based on the weather simulation for **${profile.district}** district, **Heavy Rainfall** is expected:
1. Avoid spraying pesticides or applying chemical fertilizers today, as they will wash away.
2. Clear drainage channels in your **${cropListStr}** fields to prevent waterlogging and root rot.
3. Protect harvested produce in dry storage areas immediately.`;
      } else if (isDry) {
        return `⚠️ [Krishi Sakhi - Offline Mode]
Hello ${profile.name}, based on the weather simulation, **Dry Spell / Drought** conditions are reported:
1. Apply organic mulch (dry leaves, straw) to conserve soil moisture around your crops.
2. Schedule irrigation during early morning or evening to minimize evaporation losses.
3. If possible, utilize drip irrigation rather than flooding.`;
      } else if (isPest) {
        return `⚠️ [Krishi Sakhi - Offline Mode]
Hello ${profile.name}, a **Pest Outbreak Warning** is active in your agro-climatic zone (**${profile.zone}**):
1. Carefully inspect the underside of leaves for eggs, caterpillars, or spots on your **${cropListStr}**.
2. Apply organic neem oil spray (5ml per liter of water) as a preventive measure.
3. Isolate and safely destroy infected plants to stop the outbreak.`;
      } else {
        return `⚠️ [Krishi Sakhi - Offline Mode]
Hello ${profile.name}, the weather in **${profile.district}** is **Sunny and Normal** (approx 32°C):
1. This is an optimal time for weeding, tilling, and compost application.
2. Since your land is ${profile.isIrrigated ? "irrigated" : "rainfed"}, maintain standard watering cycles.
3. Crops are receiving excellent sunlight for photosynthesis.`;
      }
    }

    if (
      msgLower.includes("pest") ||
      msgLower.includes("disease") ||
      msgLower.includes("insect") ||
      msgLower.includes("bug") ||
      msgLower.includes("worm") ||
      msgLower.includes("caterpillar") ||
      msgLower.includes("rot") ||
      msgLower.includes("fungus") ||
      msgLower.includes("fungal") ||
      msgLower.includes("spray") ||
      msgLower.includes("yellow") ||
      msgLower.includes("rust") ||
      msgLower.includes("leaf") ||
      msgLower.includes("spots") ||
      msgLower.includes("treatment") ||
      msgLower.includes("prevent") ||
      msgLower.includes("cure")
    ) {
      return `⚠️ [Krishi Sakhi - Offline Mode]
For pest and disease management on your **${cropListStr}** in **${profile.district}** district:
• **Organic Treatment**: Spray Neem oil (10,000 ppm) at 3-5 ml per liter of water mixed with a few drops of liquid soap. Apply Jeevamrutha to improve crop health.
• **Inspection**: Regularly check leaf nodes and stem bases for early detection of stem-borers or leaf rust.
• **Chemical (If severe)**: Spray Chlorantraniliprole or Imidacloprid as per package directions. Do not spray during wind or when rain is forecast.`;
    }

    if (
      msgLower.includes("fertilizer") ||
      msgLower.includes("urea") ||
      msgLower.includes("potash") ||
      msgLower.includes("nitrogen") ||
      msgLower.includes("npk") ||
      msgLower.includes("compost") ||
      msgLower.includes("manure") ||
      msgLower.includes("nutrient") ||
      msgLower.includes("soil")
    ) {
      return `⚠️ [Krishi Sakhi - Offline Mode]
For your **${profile.soilType}** and crops (**${cropListStr}**), follow these fertilization recommendations:
• **Organic Compost**: Incorporate 2-3 tons of well-decomposed farmyard manure (FYM) or vermicompost per acre during soil preparation.
• **NPK Balance**: Apply Nitrogen (Urea) in split doses. Ensure adequate Potash application to help the crops tolerate water stress and resist diseases.
• **Soil Care**: Avoid excessive urea application, which can cause soft growth and attract insect pests.`;
    }

    if (
      msgLower.includes("scheme") ||
      msgLower.includes("subsidy") ||
      msgLower.includes("government") ||
      msgLower.includes("loan") ||
      msgLower.includes("pm") ||
      msgLower.includes("kisan") ||
      msgLower.includes("insurance") ||
      msgLower.includes("help")
    ) {
      return `⚠️ [Krishi Sakhi - Offline Mode]
Here are key government schemes available for farmers in Karnataka (Zone: **${profile.zone}**):
• **Krishi Bhagya**: Subsidies for building farm ponds, polythene linings, and purchasing diesel pump sets.
• **Ganga Kalyana**: Subsidized drilling of borewells with pump installations for SC/ST and small farmers.
• **PM-KISAN**: Direct income support of ₹6,000 per year paid in three equal installments.
• **PMFBY Crop Insurance**: Financial support for crops lost due to weather calamities. Visit your local Raitha Samparka Kendra (RSK) with your RTC (Pahani) and Aadhaar to register.`;
    }

    if (
      msgLower.includes("sow") ||
      msgLower.includes("sowing") ||
      msgLower.includes("seed") ||
      msgLower.includes("plant") ||
      msgLower.includes("cultivate") ||
      msgLower.includes("grow") ||
      msgLower.includes("when to") ||
      msgLower.includes("season") ||
      msgLower.includes("harvest")
    ) {
      return `⚠️ [Krishi Sakhi - Offline Mode]
Hello ${profile.name}, here are sowing and crop planting guidelines for **${profile.district}**:
• **Sowing Time**: Kharif sowing starts around June-July with the Southwest monsoon rains. Rabi sowing is done in October-November.
• **Seed Treatment**: Treat seeds with Trichoderma (5g/kg) or Azotobacter before sowing to protect against fungal infections and improve root growth.
• **Spacing**: Maintain recommended row-to-row spacing for **${cropListStr}** to ensure proper light penetration and ventilation.`;
    }

    return `⚠️ [Krishi Sakhi - Offline Mode]
Hello ${profile.name}! Krishi Sakhi is running in offline mode.
Here is your active profile context:
• Crops: **${cropListStr}**
• Location: **${profile.district}**
• Soil: **${profile.soilType}**

To get targeted advice, ask a question using keywords like 'pest', 'fertilizer', 'weather', or 'scheme'. For example: "What is the APMC price for Sugarcane?"`;
  }
}

/**
 * Intelligent offline daily advisory generator
 */
function generateOfflineAdvisory(
  profile: FarmerProfileContext,
  weatherSim: string,
  language: "en" | "kn"
): string {
  const isRainy = weatherSim.toLowerCase().includes("rain") || weatherSim.toLowerCase().includes("ಮಳೆ");
  const isDry = weatherSim.toLowerCase().includes("dry") || weatherSim.toLowerCase().includes("ಒಣ") || weatherSim.toLowerCase().includes("ಬರಗಾಲ");
  const isPest = weatherSim.toLowerCase().includes("pest") || weatherSim.toLowerCase().includes("ಕೀಟ");

  const crop = profile.crops.length > 0 ? profile.crops[0] : "crops";

  if (language === "kn") {
    if (isRainy) {
      return `ಭಾರೀ ಮಳೆಯಾಗುವ ಮುನ್ಸೂಚನೆ ಇದೆ. ನಿಮ್ಮ ${crop} ಬೆಳೆಗೆ ಕೀಟನಾಶಕ ಸಿಂಪಡಣೆ ಅಥವಾ ಗೊಬ್ಬರ ಹಾಕುವುದನ್ನು ತಕ್ಷಣ ಮುಂದೂಡಿ. ಜಮೀನಿನಲ್ಲಿ ನೀರು ನಿಲ್ಲದಂತೆ ನೋಡಿಕೊಳ್ಳಿ.`;
    } else if (isDry) {
      return `ಒಣ ಹವಾಮಾನ ಮತ್ತು ಬರಗಾಲದ ಸ್ಥಿತಿ ಇರುವುದರಿಂದ, ತೇವಾಂಶ ಉಳಿಸಲು ಮಲ್ಚಿಂಗ್ ಮಾಡಿ. ಬೆಳಿಗ್ಗೆ ಅಥವಾ ಸಂಜೆ ವೇಳೆ ಲಘು ನೀರಾವರಿ ನೀಡಿ.`;
    } else if (isPest) {
      return `ಕೀಟ ಬಾಧೆಯ ಎಚ್ಚರಿಕೆ ಸಕ್ರಿಯವಾಗಿದೆ. ನಿಮ್ಮ ${crop} ಬೆಳೆಯನ್ನು ಪರೀಕ್ಷಿಸಿ ಮುನ್ನೆಚ್ಚರಿಕೆಯಾಗಿ ಸಾವಯವ ಬೇವಿನ ಕಷಾಯ (5ml/ಲೀಟರ್) ಸಿಂಪಡಿಸಿ.`;
    } else {
      return `ಬಿಸಿಲು ಮತ್ತು ಶುಷ್ಕ ಹವಾಮಾನವಿದ್ದು, ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರ ನೀಡಲು ಮತ್ತು ಕಳೆ ತೆಗೆಯಲು ಉತ್ತಮ ದಿನವಾಗಿದೆ. ತೇವಾಂಶಕ್ಕೆ ತಕ್ಕಂತೆ ಲಘು ನೀರಾವರಿ ಒದಗಿಸಿ.`;
    }
  } else {
    if (isRainy) {
      return `Heavy rain predicted for ${profile.district}. Suspend pesticide spraying and fertilizer application immediately. Ensure proper field drainage for ${crop}.`;
    } else if (isDry) {
      return `Dry spell active. Apply mulching to retain soil moisture and irrigate your ${crop} crop during early morning or late evening hours.`;
    } else if (isPest) {
      return `Pest alert active in ${profile.zone}. Inspect leaf undersides of ${crop} and spray neem seed extract (NSKE 5%) as a preventive measure.`;
    } else {
      return `Sunny and clear day in ${profile.district}. Ideal time for weeding, applying manure, and scheduling normal irrigation for your ${crop}.`;
    }
  }
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
    { name: "gemini-2.5-flash", apiVersion: "v1beta" as const },
    { name: "gemini-2.0-flash", apiVersion: "v1beta" as const },
    { name: "gemini-flash-latest", apiVersion: "v1beta" as const },
    { name: "gemini-2.5-pro", apiVersion: "v1beta" as const },
    { name: "gemini-pro-latest", apiVersion: "v1beta" as const }
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

      // Clean and validate chat history for Gemini API.
      // Free tier mitigation: Limit history to last 6 messages to avoid hitting GenerateContentInputTokensPerModelPerMinute quotas.
      // SDK requirements: Must start with "user" role and alternate strictly user -> model -> user -> model.
      const maxHistoryLength = 6;
      let startIdx = history.length > maxHistoryLength ? history.length - maxHistoryLength : 0;
      while (startIdx < history.length && history[startIdx]?.role !== "user") {
        startIdx++;
      }
      const slicedHistory = history.slice(startIdx);

      const cleanHistory: ChatMessage[] = [];
      let expectedRole: "user" | "model" = "user";
      for (const msg of slicedHistory) {
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

  console.warn("All models failed in askKrishiSakhi. Activating intelligent offline fallback. Last error:", lastError?.message ?? lastError);
  return generateOfflineResponse(profile, weatherSim, message, language);
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
    { name: "gemini-2.5-flash", apiVersion: "v1beta" as const },
    { name: "gemini-2.0-flash", apiVersion: "v1beta" as const },
    { name: "gemini-flash-latest", apiVersion: "v1beta" as const },
    { name: "gemini-2.5-pro", apiVersion: "v1beta" as const },
    { name: "gemini-pro-latest", apiVersion: "v1beta" as const }
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

  console.warn("All models failed in getProactiveAdvisory. Activating intelligent offline advisory. Last error:", lastError?.message ?? lastError);
  return generateOfflineAdvisory(profile, weatherSim, language);
}
