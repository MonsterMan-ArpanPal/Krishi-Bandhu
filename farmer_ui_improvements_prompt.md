# Stitch Enhanced Prompt: Farmer-Friendly AI Dashboard ("Krishi Sakhi")

Create a premium, accessibility-first, and high-fidelity bilingual Web Dashboard specifically designed for farmers in Karnataka. The UI must be optimized for varying age groups and technical backgrounds, utilizing high-contrast visual cues, large touch targets, and beautiful earthy-modern aesthetics.

---

## 🎨 Design System & Adjectives
*   **Vibe**: Warm, encouraging, earthy, and premium modern-glassmorphic.
*   **Color Palette**:
    *   **Primary Accent**: Deep Forest Green (`#1b4332`) - symbolizing healthy crops and growth.
    *   **Secondary Accent**: Warm Sun Gold/Wheat (`#ee9b00` / `#e9d8a6`) - symbolizing harvest and light.
    *   **Backgrounds**: Ultra-clean frosted glass boards (`rgba(255, 255, 255, 0.75)`) over soft, subtle natural organic gradients.
    *   **Alerts**: High-contrast Warning Orange (`#ca6702`) and success Emerald Green (`#0a9396`).
*   **Typography**: Highly legible sans-serif font (e.g., *Outfit* or *Inter*). Headlines must be large, bold, and clear.
*   **Layout Style**: Spacious grid with generous padding, fully rounded container corners (`border-radius: 1.5rem`), and soft drop shadows to separate dashboard sections.

---

## ♿ Accessibility & Usability Enhancements
*   **Large Touch Targets**: All interactive elements, inputs, and toggle switches must have at least `48px` of height/width for outdoor, one-handed, or field-use.
*   **Bilingual Translation Toggle**: High-visibility pill switch at the top right to instantly swap between English and ಕೃಷಿ ಕನ್ನಡ (Agricultural Kannada).
*   **Immersive Voice Assistant**:
    *   A prominent, inviting voice button featuring a soft, glowing, pulsating green aura to signify Speech-to-Text ready mode.
    *   Visual audio wave micro-animations while listening.
*   **Heavy Visual Iconography**: Every metric, setting, or command must have a highly illustrative, unambiguous icon (e.g., water droplets for irrigation, leaf for crops, tractor for farming logs) to aid low-literacy users.

---

## 🧩 Dashboard Modules & Layout Grid

### 1. Unified Welcome & Profile Bar
*   Left side: Large greeting text ("Namaste, Basavaraj!") with the farmer's active district, agro-climatic zone, and soil type listed underneath.
*   Right side: Language toggler (`EN` / `KN`) and profile-management drawer button.

### 2. Proactive AI Weather & Crop Advisory Card
*   A 2-column card:
    *   Left Column: Current simulated weather state (represented by large custom-drawn weather assets, e.g., an animated rain cloud or bright sun) and temperature.
    *   Right Column: High-contrast, highlighted "Daily AI Recommendation" container. If the weather is "Heavy Rain", the container shows an alert banner: `⚠️ Stop pesticide sprays today to avoid washing away.`

### 3. Interactive Bilingual Chat Assistant (Voice-to-Voice)
*   A chat container showing clear bubble histories.
*   The system response bubbles have a speaker button to repeat the response aloud via Text-to-Speech (TTS).
*   Input area: Includes a text input field, an absolute bottom-right glowing microphone button, and a toggle for "Voice Synthesis / ಧ್ವನಿ ಸೌಲಭ್ಯ" so users can opt to hear all text read aloud automatically.

### 4. APMC Market Prices Ticker
*   A horizontally scrolling ticker ribbon.
*   Displays large, color-coded price cards for staple Karnataka crops (Ragi, Coconut, Jowar, Arecanut).
*   Green up-arrows (`▲`) for rising prices, red down-arrows (`▼`) for falling prices.

### 5. Farm Activity Timeline Logger
*   A vertically scrolling card showing completed or scheduled actions (Planting, Irrigation, Fertilizing).
*   Each category has a customized visual color code (e.g., Sowing = Gold, Water = Cyan, Harvesting = Amber).
*   A quick-add floating action button to add a new log with 1-click presets.

### 6. Karnataka Government Schemes Directory
*   Clean, cards-based list detailing state-level benefits (e.g., *Krishi Bhagya*, *Surya Raitha*, *PM-Kisan Karnataka*).
*   Highlights dynamic eligibility flags (e.g., "Perfect Match for Mandya Arecanut Farmers") to make registration seamless.
