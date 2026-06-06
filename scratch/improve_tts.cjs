const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'app', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Normalize line endings
const hasCRLF = content.includes('\r\n');
if (hasCRLF) {
  content = content.replace(/\r\n/g, '\n');
}

// 1. Rewrite handleSpeakMessage to search available voices for Kannada
const speakOld = `  const handleSpeakMessage = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === "kn" ? "kn-IN" : "en-IN";
      window.speechSynthesis.speak(utterance);
    }
  };`;

const speakNew = `  const handleSpeakMessage = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      
      if (lang === "kn") {
        const voices = window.speechSynthesis.getVoices();
        const knVoice = voices.find(v => v.lang.startsWith("kn") || v.name.toLowerCase().includes("kannada"));
        if (knVoice) {
          utterance.voice = knVoice;
        }
        utterance.lang = "kn-IN";
      } else {
        const voices = window.speechSynthesis.getVoices();
        const enVoice = voices.find(v => v.lang.startsWith("en") && (v.name.includes("India") || v.lang.includes("IN")));
        if (enVoice) {
          utterance.voice = enVoice;
        }
        utterance.lang = "en-IN";
      }
      
      window.speechSynthesis.speak(utterance);
    }
  };`;

if (content.includes(speakOld)) {
  content = content.replace(speakOld, speakNew);
  console.log("Successfully rewrote handleSpeakMessage");
} else {
  console.log("Error: could not find handleSpeakMessage declaration");
  process.exit(1);
}

// 2. Simplify the speech trigger inside handleSendChat to reuse handleSpeakMessage
const sendChatSpeechOld = `      if (ttsEnabled && typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(answer);
        utterance.lang = lang === "kn" ? "kn-IN" : "en-IN";
        window.speechSynthesis.speak(utterance);
      }`;

const sendChatSpeechNew = `      if (ttsEnabled) {
        handleSpeakMessage(answer);
      }`;

if (content.includes(sendChatSpeechOld)) {
  content = content.replace(sendChatSpeechOld, sendChatSpeechNew);
  console.log("Successfully simplified handleSendChat speech trigger");
} else {
  console.log("Error: could not find handleSendChat speech trigger block");
  process.exit(1);
}

// Restore CRLF if file had it originally
if (hasCRLF) {
  content = content.replace(/\n/g, '\r\n');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log("TTS and voice selection logic fully updated!");
