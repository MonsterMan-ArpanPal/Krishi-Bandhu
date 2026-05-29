const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'app', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');
const hasCRLF = content.includes('\r\n');
if (hasCRLF) content = content.replace(/\r\n/g, '\n');

let fixCount = 0;
function safeReplace(search, replacement, label) {
  if (content.includes(search)) {
    content = content.replace(search, replacement);
    fixCount++;
    console.log(`✅ Fixed: ${label}`);
  } else {
    console.log(`⚠️  SKIPPED (not found): ${label}`);
  }
}

// ===== STEP A: Add missing translation keys to kn block =====
const knTail = `    ttsOn: "ಧ್ವನಿ ಆನ್",
    ttsOff: "ಧ್ವನಿ ಆಫ್",
  },`;

const knNewTail = `    ttsOn: "ಧ್ವನಿ ಆನ್",
    ttsOff: "ಧ್ವನಿ ಆಫ್",
    weather: "ಹವಾಮಾನ",
    humidity: "ಆರ್ದ್ರತೆ",
    wind: "ಗಾಳಿ",
    highSeverity: "ಹೆಚ್ಚಿನ ತೀವ್ರತೆ",
    pestAlertTitle: "ಹಳದಿ ತುಕ್ಕು ಪತ್ತೆಯಾಗಿದೆ",
    pestAlertSubtitle: "ಕೀಟ ಕಾಂಡ ಕೊರೆಯುವಿಕೆ ಮಂಡ್ಯ APMC ಸುತ್ತಮುತ್ತ ವರದಿಯಾಗಿದೆ",
    infectionSpotted: "ಸೋಂಕು ಪತ್ತೆಯಾಗಿದೆ",
    apmcFeed: "ಕರ್ನಾಟಕ APMC ಮಾಹಿತಿ",
    eligibleProfile: "🎯 ಅರ್ಹ ಪ್ರೊಫೈಲ್",
    acres: "ಎಕರೆ",
    bilingualSupport: "ದ್ವಿಭಾಷಾ ಬೆಂಬಲ",
    todayTime: "ಇಂದು",
    farmAcreage: "ಕೃಷಿ ವಿಸ್ತೀರ್ಣ",
    waterSupply: "ನೀರಿನ ಸರಬರಾಜು",
    activityNavMobile: "ಚಟುವಟಿಕೆ",
    logPlaceholder: "ಉದಾ: ೨ ಎಕರೆಯಲ್ಲಿ ರಾಗಿ ಬಿತ್ತಿದೆ...",
    namePlaceholder: "ಉದಾ: ರಾಮಪ್ಪ ಗೌಡ",
  },`;

safeReplace(knTail, knNewTail, "KN dictionary: added 18 new keys");

// ===== STEP B: Add missing translation keys to en block =====
const enTail = `    ttsOn: "Speech On",
    ttsOff: "Muted",
  },`;

const enNewTail = `    ttsOn: "Speech On",
    ttsOff: "Muted",
    weather: "Weather",
    humidity: "Humidity",
    wind: "Wind",
    highSeverity: "High Severity",
    pestAlertTitle: "Yellow Rust Detected",
    pestAlertSubtitle: "Critical pest stem-borers reported near Mandya APMC region",
    infectionSpotted: "Infection Spotted",
    apmcFeed: "Karnataka APMC Feed",
    eligibleProfile: "🎯 Eligible Profile",
    acres: "Acres",
    bilingualSupport: "Bilingual Support",
    todayTime: "Today",
    farmAcreage: "Farm Acreage",
    waterSupply: "Water Supply",
    activityNavMobile: "Activity",
    logPlaceholder: "e.g. Sowed Ragi on 2 acres...",
    namePlaceholder: "e.g. Ramappa Gowda",
  },`;

safeReplace(enTail, enNewTail, "EN dictionary: added 18 new keys");

// ===== STEP C: Fix all hardcoded strings in JSX =====

// BUG 1: Dashboard sub-greeting always in Kannada
safeReplace(
  `<span>ನಮಸ್ಕಾರ, {activeProfile?.name ?? "ರೈತರೇ"}</span>`,
  `<span>{lang === "kn" ? \`ನಮಸ್ಕಾರ, \${activeProfile?.name ?? "ರೈತರೇ"}\` : \`Namaskara, \${activeProfile?.name ?? "Farmer"}\`}</span>`,
  "BUG 1: Dashboard sub-greeting bilingual"
);

// BUG 2: Weather label
safeReplace(
  `{activeProfile?.district ?? "Mandya"} Weather`,
  `{activeProfile?.district ?? "Mandya"} {t[lang].weather}`,
  "BUG 2: Weather label"
);

// BUG 3: Humidity label
safeReplace(
  `} Humidity`,
  `} {t[lang].humidity}`,
  "BUG 3: Humidity label"
);

// BUG 4: Wind labels  
safeReplace(
  `"12 km/h Wind"`,
  `\`12 km/h \${t[lang].wind}\``,
  "BUG 4a: Wind sunny"
);
safeReplace(
  `"28 km/h Wind"`,
  `\`28 km/h \${t[lang].wind}\``,
  "BUG 4b: Wind rainy"
);
safeReplace(
  `"6 km/h Wind"`,
  `\`6 km/h \${t[lang].wind}\``,
  "BUG 4c: Wind dry"
);
safeReplace(
  `"10 km/h Wind"`,
  `\`10 km/h \${t[lang].wind}\``,
  "BUG 4d: Wind pest"
);

// BUG 5: High Severity badge
safeReplace(
  `>High Severity<`,
  `>{t[lang].highSeverity}<`,
  "BUG 5: High Severity badge"
);

// BUG 6: Pest alert text - Yellow Rust Detected  
safeReplace(
  `>Yellow Rust Detected<`,
  `>{t[lang].pestAlertTitle}<`,
  "BUG 6a: Yellow Rust Detected"
);

// BUG 6: Infection Spotted
safeReplace(
  `>Infection Spotted<`,
  `>{t[lang].infectionSpotted}<`,
  "BUG 6b: Infection Spotted"
);

// BUG 7: Karnataka APMC Feed
safeReplace(
  `>Karnataka APMC Feed<`,
  `>{t[lang].apmcFeed}<`,
  "BUG 7: Karnataka APMC Feed"
);

// BUG 8: Eligible Profile
safeReplace(
  `>🎯 Eligible Profile<`,
  `>{t[lang].eligibleProfile}<`,
  "BUG 8: Eligible Profile"
);

// BUG 9: Acres in chat context
safeReplace(
  `} Acres`,
  `} {t[lang].acres}`,
  "BUG 9: Acres label"
);

// BUG 10: Bilingual Support
safeReplace(
  `>Bilingual Support<`,
  `>{t[lang].bilingualSupport}<`,
  "BUG 10: Bilingual Support"
);

// BUG 11: Today, 9:41 AM
safeReplace(
  `Today, 9:41 AM`,
  `{t[lang].todayTime}, 9:41 AM`,
  "BUG 11: Today timestamp"
);

// BUG 12: Tap to Speak / Listening in voice area (KEYS EXIST but unused)
safeReplace(
  `{isListening ? "Listening..." : "Tap to Speak"}`,
  `{isListening ? t[lang].listening : t[lang].tapToSpeak}`,
  "BUG 12: Tap to Speak / Listening (chat voice section)"
);

// BUG 13: Activity log textarea placeholder
safeReplace(
  `placeholder="e.g. Sowed Ragi on 2 acres..."`,
  `placeholder={t[lang].logPlaceholder}`,
  "BUG 13: Activity log textarea placeholder"
);

// BUG 14: Name input placeholder
safeReplace(
  `placeholder="e.g. Ramappa Gowda"`,
  `placeholder={t[lang].namePlaceholder}`,
  "BUG 14: Name input placeholder"
);

// BUG 16: Farm Acreage
safeReplace(
  `>Farm Acreage<`,
  `>{t[lang].farmAcreage}<`,
  "BUG 16: Farm Acreage"
);

// BUG 17: Water Supply
safeReplace(
  `>Water Supply<`,
  `>{t[lang].waterSupply}<`,
  "BUG 17: Water Supply"
);

// BUG 18: Irrigated / Rainfed in profile card
safeReplace(
  `{activeProfile.isIrrigated ? "Canal & Borewell (Irrigated)" : "Rainfed"}`,
  `{activeProfile.isIrrigated ? t[lang].irrigated : t[lang].rainfed}`,
  "BUG 18: Irrigated/Rainfed in profile card"
);

// BUG 19: Mobile bottom nav labels
safeReplace(
  `<span className="text-[10px] font-bold mt-1">Chat</span>`,
  `<span className="text-[10px] font-bold mt-1">{t[lang].chat}</span>`,
  "BUG 19a: Mobile nav Chat"
);
safeReplace(
  `<span className="text-[10px] font-bold mt-1">Activity</span>`,
  `<span className="text-[10px] font-bold mt-1">{t[lang].activityNavMobile}</span>`,
  "BUG 19b: Mobile nav Activity"
);
safeReplace(
  `<span className="text-[10px] font-bold mt-1">Profile</span>`,
  `<span className="text-[10px] font-bold mt-1">{t[lang].myProfile}</span>`,
  "BUG 19c: Mobile nav Profile"
);

// Restore CRLF
if (hasCRLF) content = content.replace(/\n/g, '\r\n');

fs.writeFileSync(filePath, content, 'utf8');
console.log(`\n========================================`);
console.log(`Total fixes applied: ${fixCount}`);
console.log(`========================================`);
