const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'app', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Normalize line endings
const hasCRLF = content.includes('\r\n');
if (hasCRLF) {
  content = content.replace(/\r\n/g, '\n');
}

// 1. Insert recognitionRef and cleanups after chatEndRef
const refSearch = `  const chatEndRef = useRef<HTMLDivElement>(null);`;
const refInsert = `  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Speech and TTS cleanup on unmount or tab switch
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.warn("Failed to stop speech recognition:", e);
        }
      }
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [activeTab]);`;

if (content.includes(refSearch)) {
  content = content.replace(refSearch, refInsert);
  console.log("Successfully declared recognitionRef and cleanup useEffect");
} else {
  console.log("Error: could not find chatEndRef declaration");
  process.exit(1);
}

// 2. Replace handleStartSpeech implementation
const startSpeechOld = `  // Speech-to-Text handler
  const handleStartSpeech = () => {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument, @typescript-eslint/prefer-nullish-coalescing */
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert(
          lang === "kn"
            ? "ನಿಮ್ಮ ಬ್ರೌಸರ್ ಧ್ವನಿ ಗುರುತಿಸುವಿಕೆಯನ್ನು ಬೆಂಬಲಿಸುವುದಿಲ್ಲ."
            : "Your browser does not support Speech Recognition."
        );
        return;
      }

      if (isListening) {
        setIsListening(false);
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = lang === "kn" ? "kn-IN" : "en-IN";

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        setIsListening(false);
        if (event.error === "not-allowed") {
          setSpeechError(lang === "kn" ? "ಮೈಕ್ರೊಫೋನ್ ಅನುಮತಿ ನಿರಾಕರಿಸಲಾಗಿದೆ." : "Microphone permission blocked.");
        } else if (event.error === "network") {
          setSpeechError(
            lang === "kn"
              ? "ನೆಟ್‌ವರ್ಕ್ ದೋಷ: ಬ್ರೌಸರ್ ಧ್ವನಿ ಗುರುತಿಸುವಿಕೆ ಸರ್ವರ್ ಸಂಪರ್ಕ ವಿಫಲವಾಗಿದೆ (Chrome/Edge ಬಳಸಿ)."
              : "Speech network unreachable. Google speech services restricted on Chromium; please use official Chrome or Edge."
          );
        } else if (event.error === "no-speech") {
          setSpeechError(lang === "kn" ? "ಯಾವುದೇ ಧ್ವನಿ ಪತ್ತೆಯಾಗಿಲ್ಲ." : "No speech detected. Please speak louder.");
        } else if (event.error !== "aborted") {
          setSpeechError(t[lang].sttError);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (event: any) => {
        const resultText = (event.results[0]?.[0]?.transcript ?? "") as string;
        if (resultText) {
          setChatInput(resultText);
          void handleSendChat(resultText);
        }
      };

      recognition.start();
    }
    /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument, @typescript-eslint/prefer-nullish-coalescing */
  };`;

const startSpeechNew = `  // Speech-to-Text handler
  const handleStartSpeech = () => {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument, @typescript-eslint/prefer-nullish-coalescing */
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert(
          lang === "kn"
            ? "ನಿಮ್ಮ ಬ್ರೌಸರ್ ಧ್ವನಿ ಗುರುತಿಸುವಿಕೆಯನ್ನು ಬೆಂಬಲಿಸುವುದಿಲ್ಲ."
            : "Your browser does not support Speech Recognition."
        );
        return;
      }

      if (isListening) {
        if (recognitionRef.current) {
          try {
            recognitionRef.current.stop();
          } catch (e) {
            console.warn("Failed to stop recognition:", e);
          }
        }
        setIsListening(false);
        return;
      }

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = lang === "kn" ? "kn-IN" : "en-IN";

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        setIsListening(false);
        if (event.error === "not-allowed") {
          setSpeechError(lang === "kn" ? "ಮೈಕ್ರೊಫೋನ್ ಅನುಮತಿ ನಿರಾಕರಿಸಲಾಗಿದೆ." : "Microphone permission blocked.");
        } else if (event.error === "network") {
          setSpeechError(
            lang === "kn"
              ? "ನೆಟ್‌ವರ್ಕ್ ದೋಷ: ಬ್ರೌಸರ್ ಧ್ವನಿ ಗುರುತಿಸುವಿಕೆ ಸರ್ವರ್ ಸಂಪರ್ಕ ವಿಫಲವಾಗಿದೆ (Chrome/Edge ಬಳಸಿ)."
              : "Speech network unreachable. Google speech services restricted on Chromium; please use official Chrome or Edge."
          );
        } else if (event.error === "no-speech") {
          setSpeechError(lang === "kn" ? "ಯಾವುದೇ ಧ್ವನಿ ಪತ್ತೆಯಾಗಿಲ್ಲ." : "No speech detected. Please speak louder.");
        } else if (event.error !== "aborted") {
          setSpeechError(t[lang].sttError);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        recognitionRef.current = null;
      };

      recognition.onresult = (event: any) => {
        const resultText = (event.results[0]?.[0]?.transcript ?? "") as string;
        if (resultText) {
          setChatInput(resultText);
          void handleSendChat(resultText);
        }
      };

      recognition.start();
    }
    /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument, @typescript-eslint/prefer-nullish-coalescing */
  };`;

if (content.includes(startSpeechOld)) {
  content = content.replace(startSpeechOld, startSpeechNew);
  console.log("Successfully rewrote handleStartSpeech");
} else {
  // Let's do string searching to find why it didn't match.
  console.log("Error: could not find original handleStartSpeech block exactly");
  process.exit(1);
}

// Restore CRLF if file had it originally
if (hasCRLF) {
  content = content.replace(/\n/g, '\r\n');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log("Speech logic updated in page.tsx!");
