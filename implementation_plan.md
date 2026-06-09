# Implementation Plan — IoT Telemetry Dashboard & ESP32 Integration

## Goal
The goal is to design and implement a complete, visually stunning **IoT Telemetry Dashboard** page within "Krishi Bandhu" for your Hardware Interface Design (HID) presentation. 

This page will receive real-time soil and ambient environment readings (Temperature, Humidity, Soil Moisture, Light Intensity) from an **ESP32 microcontroller** (via Wi-Fi HTTP POST requests) and display them using responsive live gauge dials, an interactive SVG chart (zero-dependency, highly compatible), and an **AI Soil Agronomist** insight feature that feeds the physical sensor values into Gemini for crop advice.

---

## User Review Required

> [!IMPORTANT]
> **Data Transmission (ESP32 to Web App):**
> I propose creating a Next.js App Router API route at `/api/iot`. 
> - The ESP32 will make periodic HTTP POST requests sending JSON telemetry data.
> - The server will store this data in an **in-memory rolling buffer** (`globalThis.telemetryHistory`) capped at 50 readings. This is extremely fast, works out of the box, and requires no database migrations.
> - The frontend React page will poll `/api/iot` every 3 seconds to fetch the history.

> [!TIP]
> **"Simulation Mode" Lifesaver:**
> To ensure your presentation is 100% fail-proof, the page will include a **"Simulate Live Data"** toggle switch. If the ESP32 is offline, or you lose Wi-Fi in the presentation room, turning this on will automatically generate realistic, fluctuating data streams so the dashboard charts and gauges animate live in front of the judges.

---

## Proposed Changes

### [Component: Next.js API Routes]

#### [NEW] [route.ts](src/app/api/iot/route.ts)
- Create a GET and POST handler:
  - `POST`: Expects JSON body `{ "temp": number, "humidity": number, "moisture": number, "light": number }`. Validates data and pushes it to `globalThis.telemetryHistory` along with a timestamp.
  - `GET`: Returns the telemetry history array.

### [Component: Client Page & Telemetry Charting]

#### [MODIFY] [page.tsx](src/app/page.tsx)
- Add `"iot"` to the `activeTab` menu state.
- Integrate the **IoT Telemetry** tab button into the desktop Sidebar and mobile Navigation Bar.
- Add Kannada & English translation keys in the `t` bilingual dictionary for gauges, status lights, titles, and AI button labels.
- Implement the **IoT Page Layout**:
  - **Connection Status Bar**: Displays local IP info, live status (🟢 Live / 🟡 Simulated / 🔴 Disconnected), and a "Simulate Live Data" toggle.
  - **Telemetry Grid**: Gauges showing Air Temp & Humidity, Soil Moisture, and Light Intensity (with caution warnings for extreme values).
  - **Live SVG Bezier Line Chart**: A fully responsive SVG path chart with gradient fills and mouse-over hover tooltips. It allows toggling between viewing Temperature, Humidity, Moisture, or Light.
  - **AI Soil Diagnostic Box**: An interactive panel where clicking "Analyze with Gemini" triggers a server action passing the current live sensor values and crop choice to get tailored farming instructions.

### [Component: Server Actions]

#### [MODIFY] [actions.ts](src/server/actions.ts)
- Create an `analyzeTelemetry(moisture, temp, humidity, light, crop, lang)` action:
  - Forwards the parameters to a specialized Gemini model trigger.
  - Returns a formatted 2-3 sentence crop health action plan based on the sensor numbers.

### [Component: Microcontroller Codebase]

#### [NEW] [esp32_iot_node.ino](esp32_iot_node.ino)
- Write a ready-to-flash C++ sketch for your ESP32:
  - Connects to Wi-Fi.
  - Reads a DHT11 sensor (temp/humidity), analog Soil Moisture sensor, and LDR light sensor.
  - Sends an HTTP POST request to `http://<your-laptop-ip>:3000/api/iot` every 5 seconds.

---

## Verification Plan

### Automated Tests
- Run `npm run check` to verify TypeScript compilation and Next.js App Router rules.
- Run `npm run build` to confirm everything builds successfully.

### Manual Verification
1. **Simulation Verification:**
   - Turn on "Simulate Live Data" on the dashboard.
   - Verify that the gauges update every 3 seconds, and the SVG chart displays a scrolling line of points with hover tooltips displaying values.
2. **API Endpoint Test:**
   - Use a command-line tool or browser API tester to send a mock POST to `http://localhost:3000/api/iot` with sample sensor values.
   - Verify the dashboard switches status to "🟢 Connected" and registers the exact values.
3. **AI Telemetry Insight:**
   - Click "Analyze Soil Health" and verify Gemini responds with specific crop recommendations matching the telemetry state.
