// Test voice selector logic simulation
const assert = require('assert');

// Mock voice profiles from actual browser outputs
const edgeVoices = [
  { name: 'Microsoft Sapna Online (Natural) - Kannada (India)', lang: 'kn-IN' },
  { name: 'Microsoft Gagan Online (Natural) - Kannada (India)', lang: 'kn-IN' },
  { name: 'Microsoft Neerja Online (Natural) - English (India)', lang: 'en-IN' },
  { name: 'Microsoft Prabhat Online (Natural) - English (India)', lang: 'en-IN' },
  { name: 'Microsoft Swara Online (Natural) - Hindi (India)', lang: 'hi-IN' },
  { name: 'Microsoft David Desktop - English (United States)', lang: 'en-US' }
];

const chromeVoices = [
  { name: 'Google English (India)', lang: 'en-IN' },
  { name: 'Google हिन्दी', lang: 'hi-IN' },
  { name: 'Microsoft David Desktop - English (United States)', lang: 'en-US' }
];

const safariVoices = [
  { name: 'Rishi', lang: 'en-IN' },
  { name: 'Isha', lang: 'en-IN' },
  { name: 'Kanya', lang: 'hi-IN' },
  { name: 'Samantha', lang: 'en-US' }
];

const fallbackOnlyVoices = [
  { name: 'Microsoft David Desktop - English (United States)', lang: 'en-US' },
  { name: 'Microsoft Zira Desktop - English (United States)', lang: 'en-US' }
];

// Simulated handleSpeakMessage selector logic returning { voiceSelected, langConfigured }
function selectVoice(text, voices) {
  const containsKannada = /[\u0C80-\u0CFF]/.test(text);
  const containsDevanagari = /[\u0900-\u097F]/.test(text);

  let selectedVoice = null;
  let targetLang = "";

  if (containsKannada) {
    const knVoice = voices.find(v => {
      const nameLower = v.name.toLowerCase();
      const langLower = v.lang.toLowerCase();
      return (
        nameLower.includes("sapna") || 
        nameLower.includes("gagan") || 
        langLower === "kn-in" ||
        langLower.startsWith("kn") || 
        nameLower.includes("kannada")
      );
    });
    if (knVoice) {
      selectedVoice = knVoice;
    } else {
      const fallbackKn = voices.find(v => v.lang.toLowerCase().startsWith("kn"));
      if (fallbackKn) selectedVoice = fallbackKn;
    }
    targetLang = "kn-IN";
  } else if (containsDevanagari) {
    const hiVoice = voices.find(v => {
      const nameLower = v.name.toLowerCase();
      const langLower = v.lang.toLowerCase();
      return (
        nameLower.includes("swara") || 
        nameLower.includes("madhur") || 
        nameLower.includes("kanya") || 
        nameLower.includes("google हिन्दी") ||
        nameLower.includes("hindi") ||
        langLower === "hi-in" ||
        langLower.startsWith("hi")
      );
    });
    if (hiVoice) {
      selectedVoice = hiVoice;
    } else {
      const fallbackHi = voices.find(v => v.lang.toLowerCase().startsWith("hi"));
      if (fallbackHi) selectedVoice = fallbackHi;
    }
    targetLang = "hi-IN";
  } else {
    const enVoice = voices.find(v => {
      const nameLower = v.name.toLowerCase();
      const langLower = v.lang.toLowerCase();
      return (
        nameLower.includes("neerja") || 
        nameLower.includes("prabhat") || 
        nameLower.includes("rishi") || 
        nameLower.includes("isha") || 
        nameLower.includes("veena") || 
        nameLower.includes("google english (india)") ||
        (langLower.startsWith("en") && (nameLower.includes("india") || langLower.includes("in") || langLower.endsWith("in")))
      );
    });
    if (enVoice) {
      selectedVoice = enVoice;
    } else {
      const fallbackEn = voices.find(v => v.lang.toLowerCase().startsWith("en"));
      if (fallbackEn) selectedVoice = fallbackEn;
    }
    targetLang = "en-IN";
  }

  return { voice: selectedVoice, lang: targetLang };
}

// Run test cases
console.log("Running Voice Selector simulation tests...");

const knText = "ನಮಸ್ಕಾರ, ನೀವು ಹೇಗಿದ್ದೀರಿ?";
const hiText = "नमस्ते, आप कैसे हैं?";
const enText = "Hello, how are you doing today?";

// 1. Edge Tests
console.log("\nTesting Edge environment...");
const edgeKn = selectVoice(knText, edgeVoices);
console.log(`- Kannada matched: ${edgeKn.voice.name} (${edgeKn.lang})`);
assert.strictEqual(edgeKn.voice.name.includes("Sapna"), true);

const edgeHi = selectVoice(hiText, edgeVoices);
console.log(`- Hindi matched: ${edgeHi.voice.name} (${edgeHi.lang})`);
assert.strictEqual(edgeHi.voice.name.includes("Swara"), true);

const edgeEn = selectVoice(enText, edgeVoices);
console.log(`- English matched: ${edgeEn.voice.name} (${edgeEn.lang})`);
assert.strictEqual(edgeEn.voice.name.includes("Neerja"), true);

// 2. Chrome Tests
console.log("\nTesting Chrome environment...");
const chromeHi = selectVoice(hiText, chromeVoices);
console.log(`- Hindi matched: ${chromeHi.voice.name} (${chromeHi.lang})`);
assert.strictEqual(chromeHi.voice.name, "Google हिन्दी");

const chromeEn = selectVoice(enText, chromeVoices);
console.log(`- English matched: ${chromeEn.voice.name} (${chromeEn.lang})`);
assert.strictEqual(chromeEn.voice.name, "Google English (India)");

// 3. Safari Tests
console.log("\nTesting Safari environment...");
const safariHi = selectVoice(hiText, safariVoices);
console.log(`- Hindi matched: ${safariHi.voice.name} (${safariHi.lang})`);
assert.strictEqual(safariHi.voice.name, "Kanya");

const safariEn = selectVoice(enText, safariVoices);
console.log(`- English matched: ${safariEn.voice.name} (${safariEn.lang})`);
assert.strictEqual(safariEn.voice.name, "Rishi");

// 4. Fallback Tests (When no native Indian voice packs are available)
console.log("\nTesting Fallback environment...");
const fallbackKn = selectVoice(knText, fallbackOnlyVoices);
console.log(`- Kannada fallback matched: ${fallbackKn.voice ? fallbackKn.voice.name : 'None'} (${fallbackKn.lang})`);
// Since fallbackOnlyVoices only has David and Zira (both en-US), Kannada should fall back to undefined or null cleanly, which is safe.
assert.strictEqual(fallbackKn.voice, null);

const fallbackEn = selectVoice(enText, fallbackOnlyVoices);
console.log(`- English fallback matched: ${fallbackEn.voice.name} (${fallbackEn.lang})`);
assert.strictEqual(fallbackEn.voice.name, "Microsoft David Desktop - English (United States)");

console.log("\nAll simulation test cases PASSED successfully!");
