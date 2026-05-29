const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'app', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Normalize line endings to LF for easier manipulation
const hasCRLF = content.includes('\r\n');
if (hasCRLF) {
  content = content.replace(/\r\n/g, '\n');
}

// 1. Insert getDisplayMessageText helper after handleSpeakMessage declaration
const targetSearch = `  const handleSpeakMessage = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === "kn" ? "kn-IN" : "en-IN";
      window.speechSynthesis.speak(utterance);
    }
  };`;

const helperCode = `  const getDisplayMessageText = (msg: { role: "user" | "model"; text: string }, idx: number) => {
    if (idx === 0) {
      const primaryCrop = activeProfile?.crops ? activeProfile.crops.split(",")[0] : "";
      if (lang === "kn") {
        const cropText = primaryCrop === "Sugarcane" ? "ಕಬ್ಬಿನ" : 
                         primaryCrop === "Ragi" ? "ರಾಗಿ" : 
                         primaryCrop === "Jowar" ? "ಜೋಳದ" : 
                         primaryCrop === "Paddy" ? "ಭತ್ತದ" : 
                         primaryCrop === "Coconut" ? "ತೆಂಗಿನ" : 
                         primaryCrop === "Arecanut" ? "ಅಡಿಕೆ" : 
                         primaryCrop === "Coffee" ? "ಕಾಫಿ" : "ಕೃಷಿ";
        return \`ನಮಸ್ಕಾರ! ನಿಮ್ಮ \${cropText} ಬೆಳೆಗೆ ನಾನು ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ?\`;
      } else {
        const cropText = primaryCrop ? primaryCrop : "crops";
        return \`Namaskara! How can I help with your \${cropText} crop today?\`;
      }
    }
    return msg.text;
  };`;

if (content.includes(targetSearch)) {
  content = content.replace(targetSearch, targetSearch + '\n\n' + helperCode);
  console.log("Successfully inserted helper method");
} else {
  console.log("Error: could not find handleSpeakMessage declaration");
  process.exit(1);
}

// 2. Replace message text display and volume speaker triggers
const oldDisplay = '<p className="whitespace-pre-line">{msg.text}</p>';
const newDisplay = '<p className="whitespace-pre-line">{getDisplayMessageText(msg, idx)}</p>';
if (content.includes(oldDisplay)) {
  content = content.replace(oldDisplay, newDisplay);
  console.log("Successfully updated message text display element");
} else {
  console.log("Error: could not find old message text display element");
  process.exit(1);
}

const oldVolume = 'onClick={() => handleSpeakMessage(msg.text)}';
const newVolume = 'onClick={() => handleSpeakMessage(getDisplayMessageText(msg, idx))}';
if (content.includes(oldVolume)) {
  content = content.replace(oldVolume, newVolume);
  console.log("Successfully updated message volume click handler");
} else {
  console.log("Error: could not find old message volume click handler");
  process.exit(1);
}

// Restore CRLF if file had it originally
if (hasCRLF) {
  content = content.replace(/\n/g, '\r\n');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully updated page.tsx with dynamic welcome greeting!");
