/**
 * Krishi Bandhu — ESP32 IoT Sensor Node
 * 
 * Hardware Requirements:
 * - ESP32 Development Board
 * - DHT11 Temperature & Humidity Sensor (Data pin connected to GPIO 4)
 * - Soil Moisture Sensor (Analog out connected to GPIO 34)
 * - LDR Photoresistor (Analog out connected to GPIO 35)
 * - 5V Relay Module (Control pin connected to GPIO 18) - Optional Actuator
 * 
 * Dependencies:
 * - Adafruit DHT Sensor Library
 * - Adafruit Unified Sensor Library
 */

#include <WiFi.h>
#include <HTTPClient.h>
#include "DHT.h"

// ==========================================
// CONFIGURATION — UPDATE THESE VALUES
// ==========================================
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// Replace with your laptop's IP address and Next.js server port
const char* serverEndpoint = "http://192.168.1.10:3000/api/iot";

// Pin mappings
#define DHTPIN 4          // GPIO pin for DHT11 data
#define DHTTYPE DHT11     // DHT sensor type
#define MOISTURE_PIN 34   // Analog input GPIO pin for Soil Moisture
#define LDR_PIN 35        // Analog input GPIO pin for LDR
#define RELAY_PIN 18      // Control output GPIO pin for relay/pump

// Initialize DHT sensor
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  delay(1000);
  
  Serial.println("=========================================");
  Serial.println("   Krishi Bandhu — Starting IoT Node     ");
  Serial.println("=========================================");

  // Initialize sensors and pins
  dht.begin();
  pinMode(MOISTURE_PIN, INPUT);
  pinMode(LDR_PIN, INPUT);
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, LOW); // Start with relay off

  // Connect to Wi-Fi network
  WiFi.begin(ssid, password);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\n[Wi-Fi] Connected successfully!");
  Serial.print("[Wi-Fi] IP Address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  // Check Wi-Fi connection status
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("[Error] Wi-Fi disconnected. Reconnecting...");
    WiFi.disconnect();
    WiFi.rebegin();
    delay(2000);
    return;
  }

  // 1. Read DHT11 Temperature and Humidity
  float temp = dht.readTemperature();
  float humidity = dht.readHumidity();

  // Handle read failures
  if (isnan(temp) || isnan(humidity)) {
    Serial.println("[DHT11] Failed to read from sensor. Using fallbacks.");
    temp = 28.5; // Mock fallback
    humidity = 60.0;
  }

  // 2. Read Analog Soil Moisture Sensor
  int rawMoisture = analogRead(MOISTURE_PIN);
  // Map typical sensor range (e.g. 4095 dry -> 1200 wet in ESP32 12-bit ADC)
  // Adjust these calibration numbers based on your specific sensor testing
  int moisturePercent = map(rawMoisture, 4095, 1200, 0, 100);
  moisturePercent = constrain(moisturePercent, 0, 100);

  // 3. Read Analog LDR Light Sensor
  int rawLight = analogRead(LDR_PIN);
  // Map 0 (dark) -> 4095 (bright) to 0-100%
  int lightPercent = map(rawLight, 0, 4095, 0, 100);
  lightPercent = constrain(lightPercent, 0, 100);

  // Print raw telemetry metrics to Serial Monitor for debugging
  Serial.println("\n-----------------------------------------");
  Serial.printf("[Telemetry] Air Temp:      %.1f °C\n", temp);
  Serial.printf("[Telemetry] Air Humidity:  %.1f %%\n", humidity);
  Serial.printf("[Telemetry] Soil Moisture: %d %% (Raw ADC: %d)\n", moisturePercent, rawMoisture);
  Serial.printf("[Telemetry] Sunlight:      %d %% (Raw ADC: %d)\n", lightPercent, rawLight);

  // 4. Construct JSON Payload
  // Format: { "temp": 28.5, "humidity": 60, "moisture": 45, "light": 70 }
  String jsonPayload = "{\"temp\":" + String(temp, 1) + 
                       ",\"humidity\":" + String(humidity, 0) + 
                       ",\"moisture\":" + String(moisturePercent) + 
                       ",\"light\":" + String(lightPercent) + "}";

  // 5. Send HTTP POST request to the Next.js API endpoint
  HTTPClient http;
  http.begin(serverEndpoint);
  http.addHeader("Content-Type", "application/json");

  Serial.print("[HTTP] Sending POST data to server... ");
  int httpResponseCode = http.POST(jsonPayload);

  if (httpResponseCode > 0) {
    Serial.printf("Success (Response Code: %d)\n", httpResponseCode);
    String response = http.getString();
    Serial.println("[HTTP] Server Response: " + response);
  } else {
    Serial.printf("Failed! Error Code: %s\n", http.errorToString(httpResponseCode).c_str());
  }

  // Close connection
  http.end();
  
  // Wait 5 seconds before the next reading cycle
  delay(5000);
}
