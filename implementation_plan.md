# Implementation Plan - Intelligent Offline Fallback for Gemini Quota Limits (429)

## Goal
The primary goal is to resolve the chatbot UI freezes and raw developer-oriented error blocks (e.g. `Unable to connect to Krishi Sakhi API... [429 Too Many Requests]`) when the Google Gemini API free-tier project quota of 20 requests/day is exhausted. 

Instead of failing, the application will automatically activate a **Bilingual, Context-Aware Local Offline Fallback Assistant**. This fallback system will leverage the farmer's profile (name, district, crops, soil type, irrigation status) and current weather simulation context to generate rich, personalized, and formatted agricultural advice in either English or Kannada depending on the selected language.

---

## Proposed Changes

### [Component: Server-side API & Helpers]

#### [MODIFY] [gemini.ts](src/server/gemini.ts)
- Add `generateOfflineResponse(profile, weatherSim, message, language)` helper function:
  - Scans user queries for agricultural keywords (APMC, prices, weather, pests, diseases, fertilizers, schemes, sowing).
  - Dynamically constructs a response using the profile context (`name`, `district`, `zone`, `soilType`, `crops`, `isIrrigated`) and current `weatherSim` simulated conditions.
  - Formats responses in rich Markdown (using bold items and bullet points) and keeps them under 250 words for clear Text-to-Speech (TTS) compatibility.
  - Properly handles both English (`en`) and Kannada (`kn`) outputs.
- Add `generateOfflineAdvisory(profile, weatherSim, language)` helper function:
  - Generates a concise 1-3 sentence advisory card text for the farmer's dashboard when the proactive advice generation fails due to quota limits.
- Update `askKrishiSakhi` and `getProactiveAdvisory` catch blocks:
  - If all models fail (e.g. 429 quota exhaustion or network error), print a console warning and return the generated local offline response or daily advisory instead of an error message.

---

## Verification Plan

### Automated Tests
- Run `npm run check` to verify that there are no TypeScript or linting errors.
- Run `npm run build` to verify the Next.js compilation succeeds.

### Manual Verification
1. **Chat UI Error Bypass:**
   - Simulate a quota failure (e.g. temporarily scramble the Gemini API key or force a mock failure in `gemini.ts` model iteration).
   - Submit a chat message and verify that the chat UI doesn't freeze and instead receives a neat response prefixed with `⚠️ [Krishi Sakhi - Offline Mode]` (or the Kannada equivalent).
   - Test key queries: "What is the APMC price for Sugarcane?", "How is the weather today?", "How to treat yellow rust on Sugarcane?", "What are the latest government schemes?".
   - Verify that the response references the current active farmer profile name, district, and selected crops.

2. **Dashboard Advisory Card Fallback:**
   - Verify that the Daily Advisory card on the main dashboard renders a clean, context-sensitive advice paragraph in the chosen language instead of a connection error when the API is unavailable.

3. **Text-To-Speech (TTS) Verification:**
   - Click the speech/speaker button on the offline fallback response. Verify that the TTS engine speaks the phonetic text correctly and does not read out codepoints or crash.
