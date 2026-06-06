const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'app', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Normalize line endings
const hasCRLF = content.includes('\r\n');
if (hasCRLF) {
  content = content.replace(/\r\n/g, '\n');
}

// 1. Add keys to 'kn' block
const knSearch = `    listening: "ಕೇಳಲಾಗುತ್ತಿದೆ...",
    treatmentGuide: "ಚಿಕಿತ್ಸಾ ಮಾರ್ಗದರ್ಶಿ ವೀಕ್ಷಿಸಿ",
  },`;

const knReplacement = `    listening: "ಕೇಳಲಾಗುತ್ತಿದೆ...",
    treatmentGuide: "ಚಿಕಿತ್ಸಾ ಮಾರ್ಗದರ್ಶಿ ವೀಕ್ಷಿಸಿ",
    farmAtAGlance: "ನಿಮ್ಮ ಕೃಷಿ ಒಂದು ನೋಟದಲ್ಲಿ.",
    askSakhiDetails: "ಕೃಷಿ ಸಖಿಯ ಸಲಹೆ ಪಡೆಯಿರಿ",
    activeChatContext: "ಸಕ್ರಿಯ ಚಾಟ್ ವಿಷಯ",
    aiPowered: "ಆನ್‌ಲೈನ್ • ಜೆಮಿನಿ AI ಚಾಲಿತ",
    activityLogDesc: "ನಿಮ್ಮ ಕೃಷಿ ಇತಿಹಾಸ ಮತ್ತು ಅವಲೋಕನಗಳು.",
    profileDesc: "ಸಕ್ರಿಯ ರೈತರ ವಿವರಗಳು ಮತ್ತು ಸಂರಚನೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ.",
    soilProfile: "ಮಣ್ಣಿನ ವಿವರ",
    activeCrops: "ಸಕ್ರಿಯ ಬೆಳೆಗಳು",
    ttsOn: "ಧ್ವನಿ ಆನ್",
    ttsOff: "ಧ್ವನಿ ಆಫ್",
  },`;

if (content.includes(knSearch)) {
  content = content.replace(knSearch, knReplacement);
  console.log("Added Kannada translation keys");
} else {
  console.log("Error: could not find kn dictionary tail");
  process.exit(1);
}

// 2. Add keys to 'en' block
const enSearch = `    listening: "Listening...",
    treatmentGuide: "View Treatment Guide",
  },`;

const enReplacement = `    listening: "Listening...",
    treatmentGuide: "View Treatment Guide",
    farmAtAGlance: "Your farm at a glance.",
    askSakhiDetails: "Ask Krishi Sakhi details",
    activeChatContext: "Active Chat Context",
    aiPowered: "Online • Gemini AI Powered",
    activityLogDesc: "Your farm history and observations.",
    profileDesc: "Manage active farmer credentials and configurations.",
    soilProfile: "Soil Profile",
    activeCrops: "Active Crops",
    ttsOn: "Speech On",
    ttsOff: "Muted",
  },`;

if (content.includes(enSearch)) {
  content = content.replace(enSearch, enReplacement);
  console.log("Added English translation keys");
} else {
  console.log("Error: could not find en dictionary tail");
  process.exit(1);
}

// 3. Replace hardcoded strings in HTML body

// Your farm at a glance.
content = content.replace('<span>Your farm at a glance.</span>', '<span>{t[lang].farmAtAGlance}</span>');

// Ask Krishi Sakhi details
content = content.replace('<span>Ask Krishi Sakhi details</span>', '<span>{t[lang].askSakhiDetails}</span>');

// Active Chat Context
content = content.replace('<span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Active Chat Context</span>', 
                          '<span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{t[lang].activeChatContext}</span>');

// Online • Gemini AI Powered
content = content.replace('<p className="text-[10px] font-bold text-[#1B835E]">Online • Gemini AI Powered</p>',
                          '<p className="text-[10px] font-bold text-[#1B835E]">{t[lang].aiPowered}</p>');

// Your farm history and observations.
content = content.replace('<p className="text-sm font-semibold text-[#404943] mt-1">Your farm history and observations.</p>',
                          '<p className="text-sm font-semibold text-[#404943] mt-1">{t[lang].activityLogDesc}</p>');

// Manage active farmer credentials and configurations.
content = content.replace('<p className="text-sm font-semibold text-[#404943] mt-1">Manage active farmer credentials and configurations.</p>',
                          '<p className="text-sm font-semibold text-[#404943] mt-1">{t[lang].profileDesc}</p>');

// Soil Profile label
content = content.replace('<span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Soil Profile</span>',
                          '<span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">{t[lang].soilProfile}</span>');

// Active Crops label
content = content.replace('<span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Active Crops</span>',
                          '<span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">{t[lang].activeCrops}</span>');

// ttsEnabled status label
content = content.replace('<span>{ttsEnabled ? "Speech On" : "Muted"}</span>',
                          '<span>{ttsEnabled ? t[lang].ttsOn : t[lang].ttsOff}</span>');

console.log("Successfully replaced hardcoded strings with translated ones!");

// Restore CRLF if file had it originally
if (hasCRLF) {
  content = content.replace(/\n/g, '\r\n');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log("page.tsx translation completely updated!");
