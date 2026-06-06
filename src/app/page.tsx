"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard,
  MessageSquare,
  History,
  User,
  Languages,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  CloudSun,
  Droplets,
  Bug,
  MapPin,
  Clock,
  Plus,
  Trash2,
  ArrowRight,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Sprout,
  LogOut,
  Store,
  Award,
  ChevronRight,
  Sun,
  CloudRain,
} from "lucide-react";
import {
  getProfiles,
  createProfile,
  deleteProfile,
  getLogs,
  addLogEntry,
  deleteLogEntry,
  askAI,
  getAIAdvisory,
} from "~/server/actions";
import {
  karnatakaDistricts,
  cropOptions,
  apmcPrices,
  governmentSchemes,
} from "~/data/shared-data";

// Bilingual Dictionary matching the premium styling
const t = {
  kn: {
    title: "ಕೃಷಿ ಬಂಧು",
    subtitle: "ಕರ್ನಾಟಕ ರೈತರ ಡಿಜಿಟಲ್ ಒಡನಾಡಿ",
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    chat: "ಕೃಷಿ ಸಖಿ ಚಾಟ್",
    activityLog: "ಚಟುವಟಿಕೆ ದಾಖಲೆ",
    myProfile: "ನನ್ನ ಪ್ರೊಫೈಲ್",
    createProfile: "ಹೊಸ ರೈತ ಪ್ರೊಫೈಲ್ ರಚಿಸಿ",
    selectProfile: "ರೈತ ಪ್ರೊಫೈಲ್ ಆಯ್ಕೆ ಮಾಡಿ",
    name: "ರೈತರ ಹೆಸರು",
    district: "ಜಿಲ್ಲೆ",
    soilType: "ಮಣ್ಣಿನ ಪ್ರಕಾರ",
    landSize: "ಭೂಮಿಯ ಗಾತ್ರ (ಎಕರೆಗಳಲ್ಲಿ)",
    crops: "ಬೆಳೆಯುವ ಬೆಳೆಗಳು",
    irrigation: "ನೀರಾವರಿ ವ್ಯವಸ್ಥೆ",
    irrigated: "ನೀರಾವರಿ (ಕಾಲುವೆ/ಬಾವಿ)",
    rainfed: "ಮಳೆ ಆಶ್ರಿತ (ಖುಷ್ಕಿ)",
    save: "ಉಳಿಸಿ",
    delete: "ಅಳಿಸಿ",
    soilRed: "ಕೆಂಪು ಮಣ್ಣು",
    soilBlack: "ಕರಿ ಮಣ್ಣು",
    soilLaterite: "ಜೆಡಿ ಮಣ್ಣು / ಕೆಂಪು ಜೇಡಿ",
    soilAlluvial: "ಕರಾವಳಿ ಹೂಳು ಮಣ್ಣು",
    weatherSim: "ಹವಾಮಾನ ಸಿಮ್ಯುಲೇಟರ್",
    weatherSunny: "ಬಿಸಿಲು / ಸಾಮಾನ್ಯ",
    weatherRainy: "ಭಾರೀ ಮಳೆ",
    weatherDry: "ಬರಗಾಲ / ಒಣ ಹವಾಮಾನ",
    weatherPest: "ಕೀಟ ಬಾಧೆ ಮುನ್ಸೂಚನೆ",
    priceTicker: "ಕೃಷಿ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು",
    schemes: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು ಮತ್ತು ಗಡುವುಗಳು",
    timeline: "ಕೃಷಿ ಚಟುವಟಿಕೆಗಳ ಟ್ರ್ಯಾಕರ್",
    addLog: "ಹೊಸ ಚಟುವಟಿಕೆ ದಾಖಲಿಸಿ",
    logNotes: "ವಿವರಗಳು (ಉದಾಹರಣೆಗೆ: ರಾಗಿಗೆ ಕೊನೆಯ ನೀರು ಕೊಟ್ಟೆ)",
    category: "ವರ್ಗ",
    sowing: "ಬಿತ್ತನೆ",
    watering: "ನೀರಾವರಿ",
    fertilizer: "ಗೊಬ್ಬರ / ಪೋಷಕಾಂಶ",
    pest: "ಕೀಟ ಹತೋಟಿ",
    harvest: "ಕೊಯ್ಲು",
    other: "ಇತರೆ",
    askAI: "ಕೃಷಿ ಸಖಿಯೊಂದಿಗೆ ಮಾತನಾಡಿ (ಕನ್ನಡ/English)",
    placeholder: "ಕೃಷಿ ಬಗ್ಗೆ ಏನನ್ನಾದರೂ ಕೇಳಿ (ಉದಾ: ರಾಗಿ ಬಿತ್ತನೆ ಯಾವಾಗ?)...",
    sttListening: "ಕೇಳಿಸಿಕೊಳ್ಳಲಾಗುತ್ತಿದೆ...",
    sttError: "ಧ್ವನಿ ಗುರುತಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ.",
    ttsActive: "ಧ್ವನಿ ಆನ್ ಆಗಿದೆ",
    ttsInactive: "ಧ್ವನಿ ಆಫ್ ಆಗಿದೆ",
    advisoryAlert: "ಇಂದಿನ ಕೃಷಿ ಸಲಹೆ (Gemini AI)",
    noProfiles: "ಯಾವುದೇ ಪ್ರೊಫೈಲ್ ಪತ್ತೆಯಾಗಿಲ್ಲ. ಕೃಷಿ ಸಲಹೆಗಳನ್ನು ಪಡೆಯಲು ದಯವಿಟ್ಟು ಹೊಸ ಪ್ರೊಫೈಲ್ ರಚಿಸಿ.",
    loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    send: "ಕಳುಹಿಸಿ",
    activeProfile: "ಸಕ್ರಿಯ ಪ್ರೊಫೈಲ್",
    logsHistory: "ದಾಖಲಿತ ಚಟುವಟಿಕೆಗಳು",
    zone: "ವಲಯ",
    tapToSpeak: "ಮಾತನಾಡಲು ಸ್ಪರ್ಶಿಸಿ",
    listening: "ಕೇಳಲಾಗುತ್ತಿದೆ...",
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
  },
  en: {
    title: "Krishi Bandhu",
    subtitle: "Karnataka Farmer Assistant",
    dashboard: "Dashboard",
    chat: "Krishi Sakhi Chat",
    activityLog: "Activity Log",
    myProfile: "My Profile",
    createProfile: "Create Farmer Profile",
    selectProfile: "Select Farmer Profile",
    name: "Farmer's Name",
    district: "District",
    soilType: "Soil Type",
    landSize: "Land Size (in Acres)",
    crops: "Crops Cultivated",
    irrigation: "Irrigation Type",
    irrigated: "Irrigated (Canal/Borewell)",
    rainfed: "Rainfed",
    save: "Save Profile",
    delete: "Delete Profile",
    soilRed: "Red Sandy/Loamy Soil",
    soilBlack: "Black Cotton Soil",
    soilLaterite: "Laterite / Gravelly Soil",
    soilAlluvial: "Coastal Alluvial Soil",
    weatherSim: "Weather Simulator",
    weatherSunny: "Sunny / Normal",
    weatherRainy: "Heavy Rainfall",
    weatherDry: "Dry Spell / Drought",
    weatherPest: "Pest Outbreak Alert",
    priceTicker: "Live Mandi Prices",
    schemes: "Govt Schemes & Deadlines",
    timeline: "Farming Activity Log Tracker",
    addLog: "Log New Activity",
    logNotes: "What did you do? (e.g. Sowed Ragi, applied organic compost)",
    category: "Category",
    sowing: "Sowing",
    watering: "Irrigation / Watering",
    fertilizer: "Fertilization / Nutrient",
    pest: "Pest / Disease Control",
    harvest: "Harvesting",
    other: "Other",
    askAI: "Talk to Krishi Sakhi (English/ಕನ್ನಡ)",
    placeholder: "Ask anything about farming (e.g. fertilizer for Arecanut?)...",
    sttListening: "Listening carefully...",
    sttError: "Could not recognize speech.",
    ttsActive: "Speech Output Enabled",
    ttsInactive: "Speech Output Muted",
    advisoryAlert: "Today's Tailored Advisory (Gemini AI)",
    noProfiles: "No profiles found. Please create a new profile to get personalized AI advice.",
    loading: "Loading...",
    send: "Send",
    activeProfile: "Active Profile",
    logsHistory: "Log History",
    zone: "Zone",
    tapToSpeak: "Tap to Speak",
    listening: "Listening...",
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
  },
};



interface FarmerProfile {
  id: number;
  name: string;
  district: string;
  zone: string;
  soilType: string;
  landSize: number;
  crops: string;
  isIrrigated: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface FarmActivityLog {
  id: number;
  profileId: number;
  category: string;
  notes: string;
  timestamp: Date;
}

export default function HomePage() {
  const [lang, setLang] = useState<"en" | "kn">("en");
  const [activeTab, setActiveTab] = useState<"dashboard" | "chat" | "activity" | "profile">("dashboard");
  const [profiles, setProfiles] = useState<FarmerProfile[]>([]);
  const [activeProfile, setActiveProfile] = useState<FarmerProfile | null>(null);
  const [logs, setLogs] = useState<FarmActivityLog[]>([]);

  // Profile Form States
  const [profileForm, setProfileForm] = useState({
    name: "",
    district: "Mandya",
    soilType: "soilRed",
    landSize: 2.5,
    crops: ["Sugarcane"] as string[],
    isIrrigated: true,
  });

  // Simulator State
  const [weatherSim, setWeatherSim] = useState<"sunny" | "rainy" | "dry" | "pest">("sunny");

  // Daily AI advisory state
  const [dailyAdvisory, setDailyAdvisory] = useState<string>("Spray pesticides today, heavy rain expected tomorrow.");
  const [loadingAdvisory, setLoadingAdvisory] = useState<boolean>(false);

  // Chat Interface State
  const [messages, setMessages] = useState<Array<{ role: "user" | "model"; text: string }>>([
    {
      role: "model",
      text: "ನಮಸ್ಕಾರ! ನಿಮ್ಮ ಕಬ್ಬಿನ ಬೆಳೆಗೆ ನಾನು ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ? \n\nNamaskara! How can I help with your Sugarcane crop today?",
    },
  ]);
  const [chatInput, setChatInput] = useState<string>("");
  const [loadingChat, setLoadingChat] = useState<boolean>(false);
  const [ttsEnabled, setTtsEnabled] = useState<boolean>(true);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [speechError, setSpeechError] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  // Speech and TTS cleanup on unmount or tab switch
  useEffect(() => {
    return () => {
      /* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.warn("Failed to stop speech recognition:", e);
        }
      }
      /* eslint-enable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [activeTab]);

  // Preload browser speech synthesis voices on mount to ensure voice lists are populated
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
      const handleVoicesChanged = () => {
        window.speechSynthesis.getVoices();
      };
      window.speechSynthesis.addEventListener("voiceschanged", handleVoicesChanged);
      return () => {
        window.speechSynthesis.removeEventListener("voiceschanged", handleVoicesChanged);
      };
    }
  }, []);

  // Fetch initial profiles on load
  useEffect(() => {
    async function loadData() {
      const allProfiles = await getProfiles();
      setProfiles(allProfiles);
      if (allProfiles.length > 0) {
        setActiveProfile(allProfiles[0] ?? null);
      } else {
        setActiveProfile(null);
        setActiveTab("profile");
      }
    }
    void loadData();
  }, []);

  // Fetch logs and advisory when active profile or weather changes
  useEffect(() => {
    if (!activeProfile) {
      setLogs([]);
      setDailyAdvisory("");
      return;
    }

    async function loadProfileData() {
      if (!activeProfile) return;
      const profileLogs = await getLogs(activeProfile.id);
      setLogs(profileLogs);

      setLoadingAdvisory(true);
      try {
        const weatherText = getWeatherText(weatherSim, lang);
        const advisory = await getAIAdvisory(activeProfile.id, weatherText, lang);
        setDailyAdvisory(advisory);
      } catch (err) {
        console.error("Advisory error:", err);
      } finally {
        setLoadingAdvisory(false);
      }
    }

    void loadProfileData();
  }, [activeProfile, weatherSim, lang]);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loadingChat]);

  // Form field changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCropCheckbox = (crop: string) => {
    setProfileForm((prev) => {
      const activeCrops = prev.crops.includes(crop)
        ? prev.crops.filter((c) => c !== crop)
        : [...prev.crops, crop];
      return { ...prev, crops: activeCrops };
    });
  };

  // Create Profile Submission
  const handleSubmitProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileForm.name) return;

    const districtObj = karnatakaDistricts.find((d) => d.name === profileForm.district);
    const zoneName = districtObj ? districtObj.zone.en : "Dry Zone";

    const newProfile = await createProfile({
      name: profileForm.name,
      district: profileForm.district,
      zone: zoneName,
      soilType: t[lang][profileForm.soilType as keyof (typeof t)["en"]] ?? "Red Soil",
      landSize: Number(profileForm.landSize),
      crops: profileForm.crops,
      isIrrigated: profileForm.isIrrigated,
    });

    setProfiles((prev) => [newProfile, ...prev]);
    setActiveProfile(newProfile);
    setActiveTab("dashboard");
    // Reset Form
    setProfileForm({
      name: "",
      district: "Mandya",
      soilType: "soilRed",
      landSize: 2.5,
      crops: ["Sugarcane"] as string[],
      isIrrigated: true,
    });
  };

  // Delete profile
  const handleDeleteProfileClick = async (id: number) => {
    await deleteProfile(id);
    const updated = profiles.filter((p) => p.id !== id);
    setProfiles(updated);
    if (activeProfile?.id === id) {
      setActiveProfile(updated.length > 0 ? (updated[0] ?? null) : null);
    }
  };

  // Activity Log States
  const [logNotes, setLogNotes] = useState("");
  const [logCategory, setLogCategory] = useState("sowing");

  // Log Activity Submission
  const handleAddLog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeProfile || !logNotes) return;

    const newLog = await addLogEntry(activeProfile.id, logCategory, logNotes);
    setLogs((prev) => [newLog, ...prev]);
    setLogNotes("");
  };

  // Delete Log entry
  const handleDeleteLog = async (id: number) => {
    await deleteLogEntry(id);
    setLogs((prev) => prev.filter((l) => l.id !== id));
  };

  // Speak specific text aloud
  const handleSpeakMessage = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      // 1. Cancel any active speech synthesis and stop any active microphone listening to prevent resource locks
      window.speechSynthesis.cancel();
      /* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.warn("Failed to stop recognition before speaking:", e);
        }
      }
      /* eslint-enable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
      setIsListening(false);

      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();

      // Check if text is written in Devanagari script (Hindi/Sanskrit/etc.)
      const containsDevanagari = /[\u0900-\u097F]/.test(text);

      if (lang === "kn") {
        // Prioritize case-insensitive matching for natural sounding Kannada voices
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
          utterance.voice = knVoice;
        }
        utterance.lang = "kn-IN";
      } else if (containsDevanagari) {
        // If text contains Hindi characters, select a Hindi voice case-insensitively
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
          utterance.voice = hiVoice;
        }
        utterance.lang = "hi-IN";
      } else {
        // Prioritize case-insensitive matching for natural Indian English voices
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
            (langLower.startsWith("en") && (nameLower.includes("india") || langLower.includes("in")))
          );
        });
        if (enVoice) {
          utterance.voice = enVoice;
        }
        utterance.lang = "en-IN";
      }

      // Slightly relaxed speed for clearer comprehension
      utterance.rate = 0.95;

      // Debug log selected voice
      console.log("Selected TTS Voice:", utterance.voice ? utterance.voice.name : "Default Voice", "Locale:", utterance.lang);

      // Event handlers to prevent voice synthesis engine freezes
      utterance.onerror = (e) => {
        // Use console.warn instead of console.error to avoid triggering Next.js dev error overlays on normal interruptions/cancellations
        console.warn("SpeechSynthesisUtterance error event:", e);
      };
      utterance.onend = () => {
        console.log("SpeechSynthesisUtterance ended successfully.");
      };
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const getDisplayMessageText = (msg: { role: "user" | "model"; text: string }, idx: number) => {
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
        return `ನಮಸ್ಕಾರ! ನಿಮ್ಮ ${cropText} ಬೆಳೆಗೆ ನಾನು ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ?`;
      } else {
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        const cropText = primaryCrop || "crops";
        return `Namaskara! How can I help with your ${cropText} crop today?`;
      }
    }
    return msg.text;
  };

  const renderFormattedText = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(\*\*[\s\S]*?\*\*)/g);
    
    const renderItalics = (str: string) => {
      const subParts = str.split(/(\*[\s\S]*?\*)/g);
      return subParts.map((subPart, subIdx) => {
        if (subPart.startsWith("*") && subPart.endsWith("*") && subPart.length > 2) {
          return <em key={subIdx}>{subPart.slice(1, -1)}</em>;
        }
        return subPart;
      });
    };

    return parts.map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
        const boldText = part.slice(2, -2);
        return <strong key={idx}>{renderItalics(boldText)}</strong>;
      }
      return <span key={idx}>{renderItalics(part)}</span>;
    });
  };

  // Send Conversational Chat
  const handleSendChat = async (textToSend?: string) => {
    const input = textToSend ?? chatInput;
    if (!activeProfile || !input.trim()) return;

    const newMsg = { role: "user" as const, text: input };
    setMessages((prev) => [...prev, newMsg]);
    setChatInput("");
    setLoadingChat(true);

    try {
      const weatherText = getWeatherText(weatherSim, lang);
      const answer = await askAI(activeProfile.id, weatherText, input, messages, lang);
      setMessages((prev) => [...prev, { role: "model", text: answer }]);

      if (ttsEnabled) {
        handleSpeakMessage(answer);
      }
    } catch (err) {
      console.error("Chat error:", err);
      // Append a clear error fallback bubble so that the UI does not freeze or stay silent
      const errorMsg = lang === "kn" 
        ? "ಕ್ಷಮಿಸಿ, ಕೃಷಿ ಸಖಿ ಎಪಿಐ ಜೊತೆ ಸಂಪರ್ಕಿಸಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ."
        : "Sorry, I am unable to connect to the Krishi Sakhi API. Please check your network or try again.";
      setMessages((prev) => [...prev, { role: "model", text: errorMsg }]);
    } finally {
      setLoadingChat(false);
    }
  };

  // Speech-to-Text handler
  const handleStartSpeech = () => {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
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
    /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
  };

  const getGreeting = () => {
    if (!activeProfile) return lang === "kn" ? "ನಮಸ್ಕಾರ, ರೈತ ಮಿತ್ರರೇ" : "Namaskara, Farmer";
    return lang === "kn" 
      ? `ನಮಸ್ಕಾರ, ${activeProfile.name}` 
      : `Namaskara, ${activeProfile.name}`;
  };

  // Farmer portrait matching the mockups exactly
  const activeFarmerPhoto = "https://lh3.googleusercontent.com/aida-public/AB6AXuB8mGfO8eAIZK5_6VVVddpF8NYYSguXiNcjCX-oPkTMPdFrfyiy1u9H2d83_Nkm3u1YOfbLNBZxjaWTDBLVWrByBBiL6b1zPOKPJ-t8ajgMxMsfQgvvDsszstFvb2JIPa9VQHXwO4GtlKub_TaHX_34LeCzZVHc1KJ3zyj2GEYvJBeP5s31gZ1hT5CMUvJRemo2wKY5Q--s2u4N4-tAug4LdEKrjAxoodT6bPbN1b5XP-DpU_pFcawp9ZDPz0_ZOcBZnmk9blG7EYY";

  return (
    <div className="bg-[#f8faf7] min-h-screen text-[#191c1b] font-sans flex relative overflow-hidden">
      
      {/* Ambient Dotted Grid Background Pattern from Stitch Mockup */}
      <div 
        className="fixed inset-0 z-0 opacity-10 pointer-events-none" 
        style={{ 
          backgroundImage: "radial-gradient(#1B835E 1px, transparent 1px)", 
          backgroundSize: "24px 24px" 
        }} 
      />
      {/* Beautiful sand-cream background blur gradients */}
      <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary-fixed-dim opacity-20 blur-[100px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary-fixed-dim opacity-20 blur-[100px] pointer-events-none" />

      {/* SideNavBar (Desktop Web Navigation) */}
      <nav className="hidden md:flex bg-white text-[#1B835E] font-medium h-full w-64 fixed left-0 top-0 z-40 border-r border-glass-stroke shadow-md flex-col py-6 justify-between shrink-0">
        <div className="flex flex-col gap-6">
          <div className="px-6 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-slate-100 mb-3 overflow-hidden border-2 border-[#1B835E] shadow-sm flex items-center justify-center shrink-0">
              <img 
                alt="Farmer profile avatar" 
                className="w-full h-full object-cover animate-fade-in" 
                src={activeFarmerPhoto}
              />
            </div>
            <h1 className="font-bold text-xl text-[#1B835E] tracking-tight">{t[lang].title}</h1>
            <p className="text-xs text-[#404943] mt-1 font-medium">{t[lang].subtitle}</p>
          </div>

          <div className="flex-1 flex flex-col gap-1 w-full px-2">
            <button 
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-all text-left font-medium active:opacity-80 ${
                activeTab === "dashboard"
                  ? "bg-secondary-fixed text-on-secondary-fixed shadow-sm"
                  : "text-[#404943] hover:bg-surface-container-high"
              }`}
            >
              <LayoutDashboard size={18} className={activeTab === "dashboard" ? "fill-[#2f1500]/10" : ""} />
              <span>{t[lang].dashboard}</span>
            </button>
            <button 
              onClick={() => setActiveTab("chat")}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-all text-left font-medium active:opacity-80 ${
                activeTab === "chat"
                  ? "bg-secondary-fixed text-on-secondary-fixed shadow-sm"
                  : "text-[#404943] hover:bg-surface-container-high"
              }`}
            >
              <MessageSquare size={18} className={activeTab === "chat" ? "fill-[#2f1500]/10" : ""} />
              <span>{t[lang].chat}</span>
            </button>
            <button 
              onClick={() => setActiveTab("activity")}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-all text-left font-medium active:opacity-80 ${
                activeTab === "activity"
                  ? "bg-secondary-fixed text-on-secondary-fixed shadow-sm"
                  : "text-[#404943] hover:bg-surface-container-high"
              }`}
            >
              <History size={18} />
              <span>{t[lang].activityLog}</span>
            </button>
            <button 
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-all text-left font-medium active:opacity-80 ${
                activeTab === "profile"
                  ? "bg-secondary-fixed text-on-secondary-fixed shadow-sm"
                  : "text-[#404943] hover:bg-surface-container-high"
              }`}
            >
              <User size={18} className={activeTab === "profile" ? "fill-[#2f1500]/10" : ""} />
              <span>{t[lang].myProfile}</span>
            </button>
          </div>
        </div>

        {/* Dynamic User Profile card at the bottom of left sidebar */}
        {activeProfile && (
          <div className="px-4">
            <div className="bg-surface-container-low border border-glass-stroke p-3 rounded-xl flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-slate-800 truncate">{activeProfile.name}</p>
                <p className="text-[10px] text-slate-500 font-medium truncate">{activeProfile.district}</p>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Wrapper */}
      <div className="flex-1 md:ml-64 relative z-10 flex flex-col h-screen overflow-hidden">
        
        {/* Top Header Bar */}
        <header className="bg-white/80 backdrop-blur-md sticky top-0 w-full z-20 border-b border-glass-stroke shadow-sm flex justify-between items-center px-6 h-16 shrink-0">
          <div className="flex items-center gap-2">
            {/* Mobile Title */}
            <h1 className="text-lg font-bold text-[#1B835E] md:hidden">{t[lang].title}</h1>
            {/* Web District Tag */}
            <div className="hidden md:flex items-center gap-1.5 text-[#404943] text-sm font-semibold">
              <MapPin size={15} className="text-[#1B835E]" />
              <span>{activeProfile ? `${activeProfile.district}, Karnataka` : "Karnataka, India"}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Profile Dropdown Switch */}
            {profiles.length > 1 && (
              <select
                value={activeProfile?.id ?? ""}
                onChange={(e) => {
                  const selected = profiles.find((p) => p.id === Number(e.target.value));
                  if (selected) setActiveProfile(selected);
                }}
                className="hidden sm:inline-block rounded-xl border border-glass-stroke bg-white px-3 py-1.5 text-xs font-semibold text-[#404943] outline-none cursor-pointer focus:border-[#1B835E] transition-all"
              >
                {profiles.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.district})
                  </option>
                ))}
              </select>
            )}

            {/* Language Switch */}
            <button 
              onClick={() => setLang(lang === "en" ? "kn" : "en")}
              className="text-[#404943] hover:bg-surface-container/50 transition-all active:scale-95 duration-200 px-3.5 py-1.5 rounded-full border border-glass-stroke bg-white flex items-center gap-1.5 font-bold text-xs shadow-sm"
            >
              <Languages size={14} className="text-[#1B835E]" />
              <span className="uppercase">{lang}</span>
            </button>

            {/* User Icon link to profile tab */}
            <button 
              onClick={() => setActiveTab("profile")}
              className="text-[#404943] hover:bg-surface-container/50 transition-colors active:scale-95 duration-200 p-2 rounded-full border border-glass-stroke bg-white flex items-center justify-center shadow-sm"
            >
              <User size={18} className="fill-[#1B835E]/10 stroke-[#1B835E]" />
            </button>

            <button 
              onClick={() => {
                void import("~/server/actions").then((a) => a.logout());
              }}
              className="text-red-500 hover:bg-red-50 transition-colors active:scale-95 duration-200 px-3 py-1.5 rounded-full border border-red-100 bg-white flex items-center gap-1.5 shadow-sm font-bold text-xs"
            >
              <LogOut size={14} className="stroke-current" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* View Canvas Viewport */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 pb-32">
          
          {/* ================================================================= */}
          {/* VIEW: DASHBOARD                                                  */}
          {/* ================================================================= */}
          {activeTab === "dashboard" && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Farmer Greeting block */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#191c1b]">
                  {getGreeting()}
                </h2>
                <p className="text-sm text-[#404943] mt-1 font-semibold flex items-center gap-1">
                  <span>{lang === "kn" ? `ನಮಸ್ಕಾರ, ${activeProfile?.name ?? "ರೈತರೇ"}` : `Namaskara, ${activeProfile?.name ?? "Farmer"}`}</span>
                  <span className="h-1 w-1 rounded-full bg-[#404943]/20" />
                  <span>{t[lang].farmAtAGlance}</span>
                </p>
              </div>

              {/* Bento Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Weather Widget (Col-span 8) */}
                <div className="lg:col-span-8 bg-white/70 backdrop-blur-md border border-glass-stroke rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-6 relative overflow-hidden group">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#fe932c] opacity-10 rounded-full blur-2xl group-hover:scale-115 transition-transform duration-700 pointer-events-none" />
                  
                  {/* Weather description */}
                  <div className="flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-2">
                        {weatherSim === "sunny" && <CloudSun className="text-[#904d00]" />}
                        {weatherSim === "rainy" && <CloudRain className="text-sky-600" />}
                        {weatherSim === "dry" && <Sun className="text-amber-500 animate-spin-slow" />}
                        {weatherSim === "pest" && <Bug className="text-red-500 animate-bounce" />}
                        <span className="font-semibold text-xs text-[#904d00] uppercase tracking-wider">
                          {activeProfile?.district ?? "Mandya"} {t[lang].weather}
                        </span>
                      </div>

                      <div className="flex items-baseline gap-4 mt-3">
                        <span className="text-5xl font-extrabold text-[#191c1b]">
                          {weatherSim === "sunny" && "32°C"}
                          {weatherSim === "rainy" && "23°C"}
                          {weatherSim === "dry" && "38°C"}
                          {weatherSim === "pest" && "29°C"}
                        </span>
                        <span className="font-semibold text-[#404943] text-sm">
                          {weatherSim === "sunny" && (lang === "kn" ? "ಬಿಸಿಲು" : "Mostly Sunny")}
                          {weatherSim === "rainy" && (lang === "kn" ? "ಭಾರೀ ಮಳೆ" : "Heavy Rainfall")}
                          {weatherSim === "dry" && (lang === "kn" ? "ಒಣ ಹವೆ" : "Drought Spell")}
                          {weatherSim === "pest" && (lang === "kn" ? "ಕೀಟ ಅಪಾಯ" : "Pest Risk")}
                        </span>
                      </div>

                      <div className="flex gap-4 text-xs font-semibold text-[#404943] mt-2">
                        <span className="flex items-center gap-1">
                          <Droplets size={14} className="text-sky-500" />
                          {weatherSim === "sunny" && "65%"}
                          {weatherSim === "rainy" && "95%"}
                          {weatherSim === "dry" && "30%"}
                          {weatherSim === "pest" && "70%"} {t[lang].humidity}
                        </span>
                        <span className="flex items-center gap-1">
                          <Sprout size={14} className="text-[#1B835E]" />
                          {weatherSim === "sunny" && `12 km/h ${t[lang].wind}`}
                          {weatherSim === "rainy" && `28 km/h ${t[lang].wind}`}
                          {weatherSim === "dry" && `6 km/h ${t[lang].wind}`}
                          {weatherSim === "pest" && `10 km/h ${t[lang].wind}`}
                        </span>
                      </div>
                    </div>

                    {/* Weather Simulator Selector Buttons */}
                    <div className="pt-2 border-t border-glass-stroke">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">
                        {t[lang].weatherSim}:
                      </span>
                      <div className="grid grid-cols-4 gap-1.5">
                        <button
                          onClick={() => setWeatherSim("sunny")}
                          className={`rounded-lg py-1.5 text-[10px] sm:text-xs font-bold border transition-all active:scale-95 text-center ${
                            weatherSim === "sunny"
                              ? "border-[#ffdcc3] bg-[#ffdcc3] text-[#2f1500]"
                              : "border-slate-200 bg-white/40 text-slate-500 hover:border-slate-300"
                          }`}
                        >
                          {lang === "kn" ? "ಬಿಸಿಲು" : "Sunny"}
                        </button>
                        <button
                          onClick={() => setWeatherSim("rainy")}
                          className={`rounded-lg py-1.5 text-[10px] sm:text-xs font-bold border transition-all active:scale-95 text-center ${
                            weatherSim === "rainy"
                              ? "border-sky-200 bg-sky-50 text-sky-700"
                              : "border-slate-200 bg-white/40 text-slate-500 hover:border-slate-300"
                          }`}
                        >
                          {lang === "kn" ? "ಮಳೆ" : "Rainy"}
                        </button>
                        <button
                          onClick={() => setWeatherSim("dry")}
                          className={`rounded-lg py-1.5 text-[10px] sm:text-xs font-bold border transition-all active:scale-95 text-center ${
                            weatherSim === "dry"
                              ? "border-amber-200 bg-[#ffdcc3] text-[#2f1500]"
                              : "border-slate-200 bg-white/40 text-slate-500 hover:border-slate-300"
                          }`}
                        >
                          {lang === "kn" ? "ಒಣ" : "Drought"}
                        </button>
                        <button
                          onClick={() => setWeatherSim("pest")}
                          className={`rounded-lg py-1.5 text-[10px] sm:text-xs font-bold border transition-all active:scale-95 text-center ${
                            weatherSim === "pest"
                              ? "border-red-200 bg-red-50 text-red-600"
                              : "border-slate-200 bg-white/40 text-slate-500 hover:border-slate-300"
                          }`}
                        >
                          {lang === "kn" ? "ಕೀಟ" : "Pests"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Proactive Advice panel nested inside Weather Widget */}
                  <div className="flex-1 bg-surface-container-low/80 backdrop-blur-md rounded-xl p-4 border border-glass-stroke flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-[#1B835E] font-bold mb-2">
                        <Sparkles size={14} className="fill-[#1B835E]/10" />
                        <span className="text-xs uppercase tracking-wide">{t[lang].advisoryAlert}</span>
                      </div>
                      
                      {loadingAdvisory ? (
                        <div className="py-8 flex items-center gap-2 justify-center text-slate-400 text-xs font-bold">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#1B835E] border-t-transparent" />
                          {t[lang].loading}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-[#404943] leading-relaxed whitespace-pre-line">
                            {renderFormattedText(dailyAdvisory)}
                          </p>
                          {lang === "kn" ? (
                            <p className="text-xs text-slate-400 leading-normal font-medium italic">
                              * ಜೆಮಿನಿ ಕೃಷಿ ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ ತಂತ್ರಜ್ಞಾನದಿಂದ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ತಯಾರಿಸಲ್ಪಟ್ಟಿದೆ.
                            </p>
                          ) : (
                            <p className="text-xs text-slate-400 leading-normal font-medium italic">
                              * Tailored AI advice generated based on weather conditions.
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    <button 
                      onClick={() => setActiveTab("chat")}
                      className="mt-4 flex items-center justify-between text-xs font-bold text-[#1B835E] hover:underline pt-2 border-t border-glass-stroke"
                    >
                      <span>{t[lang].askSakhiDetails}</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>

                {/* Pest Severity Warning (Col-span 4) */}
                <div className="lg:col-span-4 bg-error-container/10 backdrop-blur-md border border-error/20 rounded-2xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-2 h-full bg-error" />
                  
                  <div className="space-y-4">
                    <span className="bg-error text-on-error font-bold text-[10px] px-3 py-1 rounded-full flex items-center gap-1 w-max uppercase tracking-wider shadow-sm">
                      <AlertTriangle size={12} />
                      {t[lang].highSeverity}
                    </span>
                    
                    <div>
                      <h3 className="text-lg font-bold text-[#191c1b]">
                        {weatherSim === "pest" ? t[lang].infectionSpotted : t[lang].pestAlertTitle}
                      </h3>
                      <p className="text-xs font-semibold text-[#404943] mt-1.5 leading-relaxed">
                        {weatherSim === "pest" 
                          ? "Critical pest stem-borers observed in contiguous Mandya APMC farming fields. Protect crop nodes." 
                          : "Reported in nearby Mandya APMC areas affecting Sugarcane crop. Spray pesticide treatment immediately."}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-glass-stroke">
                    <button 
                      onClick={() => {
                        setChatInput(lang === "kn" ? "ಕಬ್ಬಿನ ರೋಗ ಹಳದಿ ತುಕ್ಕು ಹೇಗೆ ತಡೆಯುವುದು?" : "How to treat yellow rust in sugarcane?");
                        setActiveTab("chat");
                      }}
                      className="w-full bg-surface-container text-on-surface-variant py-2.5 rounded-xl font-semibold text-xs hover:bg-surface-container-high active:scale-98 transition-all flex items-center justify-center gap-1"
                    >
                      {t[lang].treatmentGuide}
                      <ChevronRight size={13} />
                    </button>
                  </div>
                </div>

                {/* APMC Ticker horizontal cards (Col-span 12) */}
                <div className="lg:col-span-12 bg-white/70 border border-glass-stroke rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-glass-stroke pb-2">
                    <div className="flex items-center gap-2">
                      <Store size={18} className="text-[#1B835E]" />
                      <h3 className="text-sm font-extrabold text-[#191c1b] uppercase tracking-wider">{t[lang].priceTicker}</h3>
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t[lang].apmcFeed}</span>
                  </div>

                  <div className="flex overflow-x-auto gap-4 pb-2 snap-x hide-scrollbar scroll-smooth">
                    {apmcPrices.map((item, idx) => (
                      <div 
                        key={idx} 
                        className="min-w-[210px] bg-surface-container-lowest rounded-xl p-4 snap-center shrink-0 flex flex-col justify-between hover:border-[#1B835E]/40 border border-surface-container transition-all shadow-sm"
                      >
                        <div className="flex justify-between items-start gap-2">
                          <span className="font-bold text-xs text-[#191c1b] truncate">{item.crop[lang]}</span>
                          {item.trend === "up" && <TrendingUp size={14} className="text-emerald-600 shrink-0" />}
                          {item.trend === "down" && <TrendingUp size={14} className="text-red-500 rotate-90 shrink-0" />}
                          {item.trend === "stable" && <ChevronRight size={14} className="text-slate-400 shrink-0" />}
                        </div>

                        <div className="mt-3">
                          <span className="text-2xl font-extrabold text-[#1B835E]">{item.price}</span>
                          <span className="text-[#404943] text-xs font-semibold"> {item.unit[lang]}</span>
                        </div>

                        <div className="mt-2 text-[10px] font-semibold text-slate-400 flex items-center justify-between border-t border-glass-stroke pt-2">
                          <span>{item.market[lang]}</span>
                          <span>{item.time[lang]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* State Government Schemes Checklist (Col-span 12) */}
                <div className="lg:col-span-12 bg-white/70 border border-glass-stroke rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 border-b border-glass-stroke pb-2">
                    <Award size={18} className="text-amber-500" />
                    <h3 className="text-sm font-extrabold text-[#191c1b] uppercase tracking-wider">{t[lang].schemes}</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {governmentSchemes.map((scheme, idx) => (
                      <div 
                        key={idx} 
                        className="bg-surface-container-lowest border border-surface-container rounded-xl p-4 flex items-center justify-between hover:border-slate-300 transition-all"
                      >
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-[#191c1b] leading-snug">{scheme.name[lang]}</h4>
                          <span className="text-[9px] font-bold text-[#1B835E] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-500/10 inline-block shadow-sm">
                            {t[lang].eligibleProfile}
                          </span>
                        </div>

                        <div className="text-[10px] font-bold text-amber-700 bg-[#ffdcc3]/50 border border-[#ffdcc3]/80 px-2.5 py-1.5 rounded-lg shrink-0 shadow-sm">
                          {scheme.deadline[lang]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* VIEW: KRISHI SAKHI CHAT                                          */}
          {/* ================================================================= */}
          {activeTab === "chat" && (
            <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
              
              {/* Dynamic Context Header */}
              <div className="bg-white/80 backdrop-blur-md border border-glass-stroke rounded-xl p-4 shadow-sm flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{t[lang].activeChatContext}</span>
                  <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                    <span className="bg-emerald-50 border border-emerald-500/20 text-[#1B835E] font-bold text-[10px] px-2.5 py-0.5 rounded-full shadow-sm">
                      🌾 {activeProfile?.crops.split(",")[0] ?? "Sugarcane"}
                    </span>
                    <span className="bg-[#ffdcc3] border border-amber-500/20 text-[#904d00] font-bold text-[10px] px-2.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
                      <MapPin size={10} />
                      {activeProfile?.district ?? "Mandya"}
                    </span>
                    <span className="bg-slate-100 text-slate-600 font-bold text-[10px] px-2.5 py-0.5 rounded-full border border-slate-200/40 shadow-sm">
                      📐 {activeProfile?.landSize ?? "5"} {t[lang].acres}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setTtsEnabled(!ttsEnabled)}
                    className={`flex h-9 px-3 items-center justify-center gap-1.5 rounded-xl border transition-all text-xs font-bold active:scale-95 ${
                      ttsEnabled
                        ? "border-emerald-500/30 bg-emerald-50 text-[#1B835E]"
                        : "border-slate-200 bg-white text-slate-400"
                    }`}
                  >
                    {ttsEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                    <span>{ttsEnabled ? t[lang].ttsOn : t[lang].ttsOff}</span>
                  </button>
                </div>
              </div>

              {/* Chat Canvas Box */}
              <div className="bg-white/80 backdrop-blur-md border border-glass-stroke rounded-2xl shadow-sm flex flex-col h-[520px] overflow-hidden">
                
                {/* Header Section */}
                <div className="bg-[#eceeeb]/30 border-b border-glass-stroke px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-full bg-emerald-700 text-white flex items-center justify-center border border-emerald-800 shadow-sm animate-pulse">
                      <Sprout size={18} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#191c1b] text-sm">{t[lang].chat}</h3>
                      <p className="text-[10px] font-bold text-[#1B835E]">{t[lang].aiPowered}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t[lang].bilingualSupport}</span>
                </div>

                {/* Message lists viewport */}
                <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-[#fcfbfa]/80">
                  <div className="flex justify-center">
                    <span className="bg-[#eceeeb] border border-glass-stroke text-slate-500 font-bold text-[10px] px-3 py-1 rounded-full shadow-sm">
                      {t[lang].todayTime}, 9:41 AM
                    </span>
                  </div>

                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in-30 duration-200`}
                    >
                      <div className={`flex items-start gap-2.5 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                        {msg.role !== "user" ? (
                          <div className="w-9 h-9 rounded-full bg-emerald-700 text-white flex-shrink-0 flex items-center justify-center border border-emerald-800 shadow-sm text-sm">
                            🌱
                          </div>
                        ) : (
                          <div className="w-9 h-9 rounded-full border border-glass-stroke shadow-sm overflow-hidden flex-shrink-0">
                            <img alt="Farmer profile avatar" className="w-full h-full object-cover" src={activeFarmerPhoto} />
                          </div>
                        )}

                        <div className="flex flex-col gap-1">
                          <div
                            className={`rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-sm ${
                              msg.role === "user"
                                ? "bg-[#1B835E] text-white font-semibold rounded-tr-none"
                                : "glass-panel bg-white text-[#191c1b] rounded-tl-none border border-slate-200/50"
                            }`}
                          >
                            <p className="whitespace-pre-line">{renderFormattedText(getDisplayMessageText(msg, idx))}</p>
                          </div>

                          {msg.role === "model" && (
                            <button
                              onClick={() => handleSpeakMessage(getDisplayMessageText(msg, idx))}
                              className="p-1 rounded-lg bg-white border border-glass-stroke text-slate-400 hover:text-[#1B835E] hover:border-[#1B835E]/30 transition-colors shrink-0 self-start mt-0.5 ml-1 active:scale-90 shadow-sm"
                            >
                              <Volume2 size={13} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {loadingChat && (
                    <div className="flex justify-start">
                      <div className="flex items-start gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-emerald-700 text-white flex-shrink-0 flex items-center justify-center text-sm">
                          🌱
                        </div>
                        <div className="rounded-2xl rounded-tl-none bg-white border border-slate-200 px-4 py-3 shadow-sm flex items-center gap-1.5">
                          <span className="flex h-1.5 w-1.5 animate-bounce rounded-full bg-[#1B835E]" />
                          <span className="flex h-1.5 w-1.5 animate-bounce rounded-full bg-[#1B835E] delay-75" />
                          <span className="flex h-1.5 w-1.5 animate-bounce rounded-full bg-[#1B835E] delay-150" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>

                {/* Input Text form container */}
                <div className="border-t border-glass-stroke p-4 bg-white">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      disabled={!activeProfile}
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") void handleSendChat();
                      }}
                      placeholder={activeProfile ? t[lang].placeholder : t[lang].noProfiles}
                      className="flex-1 rounded-xl border border-glass-stroke bg-slate-50 px-4 py-3 text-sm text-[#191c1b] outline-none focus:border-[#1B835E] focus:bg-white disabled:opacity-50 min-h-[48px] transition-all font-semibold"
                    />

                    <button
                      onClick={() => handleSendChat()}
                      disabled={!activeProfile || !chatInput.trim()}
                      className="flex items-center justify-center rounded-xl bg-[#1B835E] px-5 text-sm font-bold text-white shadow-sm hover:brightness-105 transition-all active:scale-95 disabled:opacity-40 min-h-[48px]"
                    >
                      <ArrowRight size={16} className="stroke-[3]" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Large Voice Interaction Floating block inside Chat Viewport */}
              <div className="flex flex-col items-center justify-center pt-6 pb-2">
                <button 
                  onClick={handleStartSpeech}
                  className={`relative w-20 h-20 rounded-full text-white flex items-center justify-center shadow-lg transition-colors duration-300 mb-3 group border-4 border-white ${
                    isListening ? "bg-[#C2410C]" : "bg-[#1B835E]"
                  }`}
                >
                  <span 
                    className={`absolute inset-0 rounded-full opacity-35 pointer-events-none animate-ping ${
                      isListening ? "bg-[#C2410C]" : "bg-[#b0f1cd]"
                    }`}
                    style={{ animationDuration: "1.8s" }}
                  />
                  {isListening ? (
                    <MicOff size={32} className="animate-pulse" />
                  ) : (
                    <Mic size={32} className="group-hover:scale-110 transition-transform duration-300" />
                  )}
                  {/* Inner shadow overlay */}
                  <div className="absolute inset-0 rounded-full shadow-[inset_0_0_15px_rgba(255,255,255,0.4)] pointer-events-none" />
                </button>
                <p className="font-bold text-sm text-[#191c1b] bg-white/60 px-4 py-1.5 rounded-full backdrop-blur-sm border border-glass-stroke shadow-sm">
                  {isListening ? t[lang].listening : t[lang].tapToSpeak}
                </p>
                {speechError && (
                  <p className="mt-2.5 text-xs text-red-600 bg-red-50/90 px-3.5 py-2 rounded-lg border border-red-200 text-center max-w-[320px] shadow-sm font-semibold relative">
                    {speechError}
                    <button 
                      onClick={() => setSpeechError(null)} 
                      className="absolute -top-1.5 -right-1.5 bg-red-200 text-red-700 w-4 h-4 rounded-full flex items-center justify-center font-bold hover:bg-red-300 transition-colors"
                    >
                      ×
                    </button>
                  </p>
                )}
              </div>

            </div>
          )}

          {/* VIEW: ACTIVITY TIMELINE                                          */}
          {/* ================================================================= */}
          {activeTab === "activity" && (
            <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
              
              <div>
                <h2 className="text-3xl font-bold text-[#191c1b]">{t[lang].activityLog}</h2>
                <p className="text-sm font-semibold text-[#404943] mt-1">{t[lang].activityLogDesc}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Form presets tag column */}
                <div className="lg:col-span-5 bg-white/80 backdrop-blur-md border border-glass-stroke rounded-2xl p-6 shadow-sm h-max space-y-6">
                  
                  {/* Category presets 1-click */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block border-b border-glass-stroke pb-1">
                      {lang === "kn" ? "ತ್ವರಿತ ದಾಖಲೆ (೧-ಕ್ಲಿಕ್)" : "Quick presets (1-Click Log)"}
                    </label>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {(() => {
                        const cropList = activeProfile?.crops.split(",") ?? ["Sugarcane"];
                        const presets = [
                          { en: "Watered crops today", kn: "ಬೆಳೆಗಳಿಗೆ ನೀರು ಹಾಯಿಸಿದೆ", category: "watering" },
                          { en: "Applied compost manure", kn: "ಸಾವಯವ ಗೊಬ್ಬರ ಹಾಕಿದೆ", category: "fertilizer" },
                          { en: "Inspected leaves for pests", kn: "ಕೀಟಗಳಿಗಾಗಿ ಎಲೆಗಳನ್ನು ಪರೀಕ್ಷಿಸಿದೆ", category: "pest" },
                        ];
                        cropList.forEach((crop) => {
                          presets.unshift(
                            { en: `Harvested ${crop} today`, kn: `${crop} ಕೊಯ್ಲು ಮಾಡಿದೆ`, category: "harvest" },
                            { en: `Sowed ${crop} seeds`, kn: `${crop} ಬಿತ್ತನೆ ಮಾಡಿದೆ`, category: "sowing" }
                          );
                        });
                        return presets.slice(0, 5).map((p, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setLogNotes(lang === "kn" ? p.kn : p.en);
                              setLogCategory(p.category);
                            }}
                            className="text-[10px] font-semibold rounded-lg border border-slate-200 bg-white/40 px-2.5 py-1.5 text-[#404943] hover:border-[#1B835E] hover:text-[#1B835E] hover:bg-emerald-50/20 transition-all cursor-pointer shadow-sm active:scale-95"
                          >
                            ⚡ {lang === "kn" ? p.kn : p.en}
                          </button>
                        ));
                      })()}
                    </div>
                  </div>

                  {/* Form fields */}
                  <form onSubmit={handleAddLog} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        {t[lang].category}
                      </label>
                      <select
                        value={logCategory}
                        onChange={(e) => setLogCategory(e.target.value)}
                        className="w-full rounded-xl border border-glass-stroke bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-[#404943] outline-none cursor-pointer focus:border-[#1B835E]"
                      >
                        <option value="sowing">{t[lang].sowing}</option>
                        <option value="watering">{t[lang].watering}</option>
                        <option value="fertilizer">{t[lang].fertilizer}</option>
                        <option value="pest">{t[lang].pest}</option>
                        <option value="harvest">{t[lang].harvest}</option>
                        <option value="other">{t[lang].other}</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        {t[lang].logNotes}
                      </label>
                      <textarea
                        value={logNotes}
                        required
                        onChange={(e) => setLogNotes(e.target.value)}
                        className="w-full h-24 rounded-xl border border-glass-stroke bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-[#404943] outline-none focus:border-[#1B835E] focus:bg-white resize-none transition-all"
                        placeholder={t[lang].logPlaceholder}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-[#1B835E] px-4 py-3 text-xs font-bold text-white shadow-sm hover:brightness-105 active:scale-98 transition-all min-h-[40px]"
                    >
                      <Plus size={14} className="stroke-[2.5]" />
                      {t[lang].addLog}
                    </button>
                  </form>
                </div>

                {/* Timeline column */}
                <div className="lg:col-span-7 bg-white/80 backdrop-blur-md border border-glass-stroke rounded-2xl p-6 shadow-sm space-y-6">
                  <h3 className="text-sm font-extrabold text-[#191c1b] border-b border-glass-stroke pb-2 uppercase tracking-wider">
                    {t[lang].logsHistory}
                  </h3>

                  <div className="max-h-[480px] overflow-y-auto space-y-6 pr-1 hide-scrollbar">
                    
                    {/* Render static mock items if logs are empty to preserve premium visual showcase */}
                    {logs.length === 0 ? (
                      <div className="relative border-l-2 border-slate-200 ml-4 pl-8 space-y-8">
                        
                        {/* Mock Sowing entry */}
                        <div className="relative group">
                          <div className="absolute -left-[41px] top-4 w-6 h-6 rounded-full bg-slate-100 border-4 border-white z-10 flex items-center justify-center text-primary text-xs shadow-sm">
                            🌾
                          </div>
                          <div className="bg-white/60 backdrop-blur-md p-5 rounded-xl border border-glass-stroke shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-[#1B835E]" />
                            <div className="flex justify-between items-start mb-3">
                              <span className="bg-emerald-50 border border-emerald-500/20 text-[#1B835E] font-bold text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                                {t[lang].sowing}
                              </span>
                              <span className="text-[10px] font-semibold text-slate-400">Oct 24, 2023 • 08:30 AM</span>
                            </div>
                            <p className="font-kannada-body text-kannada-body text-[#191c1b] mb-2 italic border-l-2 border-slate-200 pl-3">
                              &ldquo;ಇಂದು ಬೆಳಿಗ್ಗೆ ರಾಗಿ ಬಿತ್ತನೆ ಆರಂಭಿಸಿದೆವು. ಮಣ್ಣಿನ ತೇವಾಂಶ ಉತ್ತಮವಾಗಿದೆ.&rdquo;
                            </p>
                            <p className="text-xs text-[#404943] font-semibold">
                              Started Ragi sowing this morning. Soil moisture is optimal.
                            </p>
                          </div>
                        </div>

                        {/* Mock Pest entry with image */}
                        <div className="relative group">
                          <div className="absolute -left-[41px] top-4 w-6 h-6 rounded-full bg-slate-100 border-4 border-white z-10 flex items-center justify-center text-[#C2410C] text-xs shadow-sm">
                            🐛
                          </div>
                          <div className="bg-white/60 backdrop-blur-md p-5 rounded-xl border border-glass-stroke shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-[#C2410C]" />
                            <div className="flex justify-between items-start mb-3">
                              <span className="bg-red-50 border border-red-500/20 text-red-700 font-bold text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                                {t[lang].pest}
                              </span>
                              <span className="text-[10px] font-semibold text-slate-400">Oct 20, 2023 • 05:15 PM</span>
                            </div>
                            <p className="font-kannada-body text-kannada-body text-[#191c1b] mb-2 italic border-l-2 border-slate-200 pl-3">
                              &ldquo;ಟೊಮೆಟೊ ಗಿಡಗಳಲ್ಲಿ ಕೆಲವು ಎಲೆಗಳು ಹಳದಿಯಾಗುತ್ತಿವೆ, ಸಣ್ಣ ಹುಳುಗಳು ಕಾಣಿಸುತ್ತಿವೆ.&rdquo;
                            </p>
                            <p className="text-xs text-[#404943] font-semibold">
                              Some leaves on tomato plants are turning yellow, noticed small insects.
                            </p>
                            {/* Visual Image Attachment */}
                            <div className="mt-4 rounded-lg overflow-hidden h-32 w-full bg-slate-100 relative shadow-sm border border-glass-stroke">
                              <img 
                                alt="Tomato leaf observation" 
                                className="w-full h-full object-cover animate-fade-in" 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkKvOLDfUjvYAWkuIWlAhnyirB1bm1tUHdG6Skogg6477uIRqFQkGTUbA2dON9k56Z3hA-Zc3z1VPBddx-c1aKUvZ1RHeJZKq22vGKd8YG4lFK6KXOrf8HXmPhU2e5vI69dlCa2NlGCZRUnrGdIBCIsqXGVX7TnRQRFKme5GC2OTba7DHTLfS0u-RNQSq6VjOoMZtUwIyZZHfU8Z8FLnh3HK7AEwXEiprgYAZtOeeUC-LuaZv_k85P9x5ON42qabtMe8h4GgdLbNI" 
                              />
                            </div>
                          </div>
                        </div>

                      </div>
                    ) : (
                      <div className="relative border-l-2 border-slate-200 ml-4 pl-8 space-y-6">
                        {logs.map((log) => {
                          const dateStr = new Date(log.timestamp).toLocaleDateString(
                            lang === "kn" ? "kn-IN" : "en-US",
                            { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }
                          );
                          const isPest = log.category === "pest";
                          const leftBorderColor = 
                            log.category === "sowing" ? "bg-[#1B835E]" :
                            log.category === "pest" ? "bg-[#C2410C]" :
                            log.category === "fertilizer" ? "bg-[#fe932c]" :
                            "bg-slate-400";

                          return (
                            <div key={log.id} className="relative group">
                              <span className="absolute -left-[40px] top-4 w-5 h-5 rounded-full border-4 border-white shadow-sm bg-slate-100 flex items-center justify-center text-xs">
                                {log.category === "sowing" ? "🌾" :
                                 log.category === "watering" ? "💧" :
                                 log.category === "fertilizer" ? "🧪" :
                                 log.category === "pest" ? "🐛" :
                                 log.category === "harvest" ? "🧺" : "📋"}
                              </span>
                              
                              <div className="bg-white/60 backdrop-blur-md border border-glass-stroke p-5 rounded-xl flex justify-between items-start hover:border-slate-300 transition-all shadow-sm relative overflow-hidden">
                                <div className={`absolute top-0 left-0 w-1 h-full database-log-indicator-stripe ${leftBorderColor}`} />
                                
                                <div className="space-y-2 w-full">
                                  <div className="flex items-center justify-between gap-2 flex-wrap border-b border-glass-stroke pb-1.5">
                                    <span className="font-extrabold text-[9px] uppercase tracking-wider text-[#1B835E]">
                                      {t[lang][log.category as keyof (typeof t)["en"]] ?? log.category}
                                    </span>
                                    <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-0.5">
                                      <Clock size={10} />
                                      {dateStr}
                                    </span>
                                  </div>
                                  <p className="text-sm text-[#191c1b] font-semibold leading-relaxed">
                                    {log.notes}
                                  </p>

                                  {/* Pest entry displays leaf image dynamically */}
                                  {isPest && (
                                    <div className="mt-4 rounded-lg overflow-hidden h-32 w-full bg-slate-100 relative shadow-sm border border-glass-stroke">
                                      <img 
                                        alt="Tomato leaf observation" 
                                        className="w-full h-full object-cover animate-fade-in" 
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkKvOLDfUjvYAWkuIWlAhnyirB1bm1tUHdG6Skogg6477uIRqFQkGTUbA2dON9k56Z3hA-Zc3z1VPBddx-c1aKUvZ1RHeJZKq22vGKd8YG4lFK6KXOrf8HXmPhU2e5vI69dlCa2NlGCZRUnrGdIBCIsqXGVX7TnRQRFKme5GC2OTba7DHTLfS0u-RNQSq6VjOoMZtUwIyZZHfU8Z8FLnh3HK7AEwXEiprgYAZtOeeUC-LuaZv_k85P9x5ON42qabtMe8h4GgdLbNI" 
                                      />
                                    </div>
                                  )}
                                </div>

                                <button
                                  onClick={() => handleDeleteLog(log.id)}
                                  className="opacity-0 group-hover:opacity-100 rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all active:scale-90 absolute right-2 top-2"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}


          {/* ================================================================= */}
          {/* VIEW: FARMER PROFILE                                             */}
          {/* ================================================================= */}
          {activeTab === "profile" && (
            <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
              
              <div>
                <h2 className="text-3xl font-bold text-[#191c1b]">{t[lang].myProfile}</h2>
                <p className="text-sm font-semibold text-[#404943] mt-1">{t[lang].profileDesc}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                
                {/* Profile card (Col-span 5) */}
                <div className="md:col-span-5 space-y-6">
                  <div className="bg-white/80 backdrop-blur-md border border-glass-stroke rounded-2xl p-6 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-28 h-28 bg-[#ffdcc3]/30 rounded-bl-full -z-10 blur-xl pointer-events-none" />
                    
                    <div className="w-24 h-24 rounded-full border-4 border-slate-100 shadow-sm overflow-hidden mb-4 flex items-center justify-center shrink-0">
                      <img 
                        alt="Farmer settings avatar portrait" 
                        className="w-full h-full object-cover" 
                        src={activeFarmerPhoto}
                      />
                    </div>
                    
                    {activeProfile ? (
                      <div className="space-y-1 w-full">
                        <h3 className="text-xl font-bold text-[#191c1b] truncate">{activeProfile.name}</h3>
                        <p className="text-[#404943] font-bold text-xs flex items-center justify-center gap-1">
                          <MapPin size={12} className="text-amber-500" />
                          {activeProfile.district} ({activeProfile.zone})
                        </p>

                        <div className="mt-4 pt-4 border-t border-glass-stroke text-xs font-semibold text-[#404943] grid grid-cols-2 gap-4 text-left">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">{t[lang].soilProfile}</span>
                            <span className="font-bold text-[#191c1b]">{activeProfile.soilType}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">{t[lang].farmAcreage}</span>
                            <span className="font-bold text-[#191c1b]">{activeProfile.landSize} Acres</span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">{t[lang].waterSupply}</span>
                            <span className={`inline-flex items-center gap-1 font-bold text-xs ${activeProfile.isIrrigated ? "text-[#1B835E]" : "text-[#904d00]"}`}>
                              <span className={`h-2.5 w-2.5 rounded-full ${activeProfile.isIrrigated ? "bg-[#1B835E]" : "bg-[#fe932c]"}`} />
                              {activeProfile.isIrrigated ? t[lang].irrigated : t[lang].rainfed}
                            </span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">{t[lang].activeCrops}</span>
                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {activeProfile.crops.split(",").map((crop, idx) => (
                                <span key={idx} className="bg-slate-100 px-2.5 py-1 rounded-full text-[10px] font-bold text-slate-600 border border-slate-200/50 shadow-sm">
                                  🌾 {crop}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-glass-stroke mt-4">
                          <button
                            onClick={() => handleDeleteProfileClick(activeProfile.id)}
                            className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-100 transition-all active:scale-98 min-h-[38px] shadow-sm"
                          >
                            <Trash2 size={13} />
                            {t[lang].delete} {activeProfile.name}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-slate-400 text-xs italic py-6">{t[lang].noProfiles}</p>
                    )}
                  </div>
                </div>

                {/* Form column (Col-span 7) */}
                <div className="md:col-span-7 bg-white/80 backdrop-blur-md border border-glass-stroke rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-[#191c1b] border-b border-glass-stroke pb-2 mb-4">
                    {t[lang].createProfile}
                  </h3>

                  <form onSubmit={handleSubmitProfile} className="space-y-5">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{t[lang].name}</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={profileForm.name}
                        onChange={handleFormChange}
                        className="w-full rounded-xl border border-glass-stroke bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-[#191c1b] outline-none focus:border-[#1B835E] focus:bg-white min-h-[44px]"
                        placeholder={t[lang].namePlaceholder}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{t[lang].district}</label>
                        <select
                          name="district"
                          value={profileForm.district}
                          onChange={handleFormChange}
                          className="w-full rounded-xl border border-glass-stroke bg-slate-50 px-3 py-2 text-xs font-bold text-[#404943] outline-none cursor-pointer focus:border-[#1B835E]"
                        >
                          {karnatakaDistricts.map((d) => (
                            <option key={d.name} value={d.name}>
                              {d.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{t[lang].soilType}</label>
                        <select
                          name="soilType"
                          value={profileForm.soilType}
                          onChange={handleFormChange}
                          className="w-full rounded-xl border border-glass-stroke bg-slate-50 px-3 py-2 text-xs font-bold text-[#404943] outline-none cursor-pointer focus:border-[#1B835E]"
                        >
                          <option value="soilRed">{t[lang].soilRed}</option>
                          <option value="soilBlack">{t[lang].soilBlack}</option>
                          <option value="soilLaterite">{t[lang].soilLaterite}</option>
                          <option value="soilAlluvial">{t[lang].soilAlluvial}</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 items-center">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{t[lang].landSize}</label>
                        <input
                          type="number"
                          name="landSize"
                          step="0.1"
                          min="0.1"
                          required
                          value={profileForm.landSize}
                          onChange={handleFormChange}
                          className="w-full rounded-xl border border-glass-stroke bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-[#191c1b] outline-none focus:border-[#1B835E] focus:bg-white min-h-[44px]"
                        />
                      </div>

                      <div className="pt-4 flex items-center justify-end">
                        <label className="relative inline-flex items-center cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={profileForm.isIrrigated}
                            onChange={(e) =>
                              setProfileForm((prev) => ({ ...prev, isIrrigated: e.target.checked }))
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1B835E]" />
                          <span className="text-xs font-bold text-[#404943] ml-2">{t[lang].irrigated}</span>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{t[lang].crops}</label>
                      <div className="grid grid-cols-3 gap-2">
                        {cropOptions.map((crop) => (
                          <button
                            type="button"
                            key={crop}
                            onClick={() => handleCropCheckbox(crop)}
                            className={`rounded-xl border px-2 py-2 text-xs font-bold transition-all active:scale-95 min-h-[38px] ${
                              profileForm.crops.includes(crop)
                                ? "border-[#1B835E] bg-emerald-50 text-[#1B835E]"
                                : "border-slate-200 bg-white/40 text-slate-500 hover:border-slate-300"
                            }`}
                          >
                            {crop}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#1B835E] px-4 py-3 text-sm font-bold text-white hover:brightness-105 transition-all active:scale-95 shadow-md shadow-emerald-700/10 min-h-[48px]"
                    >
                      <Plus size={16} className="stroke-[3]" />
                      {t[lang].save}
                    </button>
                  </form>
                </div>

              </div>
            </div>
          )}

        </main>

        {/* Global Floating Action Microphone Button (Glows dynamically) */}
        {(activeTab === "dashboard") && activeProfile && (
          <div className="fixed z-40 bottom-24 left-1/2 -translate-x-1/2 md:bottom-8 md:right-8 md:left-auto md:translate-x-0 flex flex-col items-center pointer-events-none">
            {speechError && (
              <div className="mb-3 bg-red-50/95 text-red-600 text-xs px-3.5 py-2 rounded-lg border border-red-200 shadow-md max-w-[240px] text-center font-semibold relative pointer-events-auto animate-fade-in">
                {speechError}
                <button 
                  onClick={() => setSpeechError(null)} 
                  className="absolute -top-1.5 -right-1.5 bg-red-200 text-red-700 w-4 h-4 rounded-full flex items-center justify-center font-bold hover:bg-red-300 transition-colors"
                >
                  ×
                </button>
              </div>
            )}
            <button 
              onClick={handleStartSpeech}
              className={`w-16 h-16 rounded-full shadow-lg flex flex-col items-center justify-center hover:scale-105 active:scale-95 transition-all group pointer-events-auto ${
                isListening 
                  ? "bg-[#C2410C] text-white shadow-red-600/30 scale-105 border-4 border-white" 
                  : "bg-[#1B835E] text-white shadow-emerald-700/30 border-4 border-white"
              }`}
            >
              {/* Glowing animated halo */}
              <div 
                className={`absolute inset-0 rounded-full opacity-35 pointer-events-none animate-ping ${isListening ? "bg-[#C2410C]" : "bg-[#b0f1cd]"}`} 
                style={{ animationDuration: "2s" }}
              />
              {isListening ? (
                <MicOff size={28} className="animate-pulse" />
              ) : (
                <Mic size={28} className="group-hover:animate-pulse" />
              )}
            </button>
          </div>
        )}

        {/* Mobile View Bottom Navigation Bar (Tabs switch matching layout.tsx specs) */}
        <nav className="md:hidden bg-white/95 backdrop-blur-xl border-t border-glass-stroke shadow-lg fixed bottom-0 w-full z-30 rounded-t-xl flex justify-around items-center h-20 px-4 pb-safe shrink-0">
          <button 
            onClick={() => setActiveTab("dashboard")}
            className={`flex flex-col items-center justify-center active:scale-90 transition-transform ${
              activeTab === "dashboard"
                ? "bg-[#ffdcc3] text-[#2f1500] rounded-xl px-4 py-1.5 font-bold"
                : "text-[#404943]"
            }`}
          >
            <LayoutDashboard size={20} className={activeTab === "dashboard" ? "fill-[#2f1500]/10" : ""} />
            <span className="text-[10px] font-bold mt-1">{t[lang].dashboard}</span>
          </button>

          <button 
            onClick={() => setActiveTab("chat")}
            className={`flex flex-col items-center justify-center active:scale-90 transition-transform ${
              activeTab === "chat"
                ? "bg-[#ffdcc3] text-[#2f1500] rounded-xl px-4 py-1.5 font-bold"
                : "text-[#404943]"
            }`}
          >
            <MessageSquare size={20} className={activeTab === "chat" ? "fill-[#2f1500]/10" : ""} />
            <span className="text-[10px] font-bold mt-1">{t[lang].chat}</span>
          </button>

          <button 
            onClick={() => setActiveTab("activity")}
            className={`flex flex-col items-center justify-center active:scale-90 transition-transform ${
              activeTab === "activity"
                ? "bg-[#ffdcc3] text-[#2f1500] rounded-xl px-4 py-1.5 font-bold"
                : "text-[#404943]"
            }`}
          >
            <History size={20} />
            <span className="text-[10px] font-bold mt-1">{t[lang].activityNavMobile}</span>
          </button>

          <button 
            onClick={() => setActiveTab("profile")}
            className={`flex flex-col items-center justify-center active:scale-90 transition-transform ${
              activeTab === "profile"
                ? "bg-[#ffdcc3] text-[#2f1500] rounded-xl px-4 py-1.5 font-bold"
                : "text-[#404943]"
            }`}
          >
            <User size={20} className={activeTab === "profile" ? "fill-[#2f1500]/10" : ""} />
            <span className="text-[10px] font-bold mt-1">{t[lang].myProfile}</span>
          </button>
        </nav>

      </div>
    </div>
  );
}

// Helpers
function getWeatherText(sim: string, language: "en" | "kn"): string {
  const map = {
    sunny: {
      en: "Sunny and dry conditions, current temperature around 32°C. Excellent daylight, normal evaporation.",
      kn: "ಬಿಸಿಲು ಮತ್ತು ಒಣ ಹವಾಮಾನ, ಪ್ರಸ್ತುತ ತಾಪಮಾನ ಸುಮಾರು ೩೨°C. ರಾಗಿ ಮತ್ತು ಇತರ ಬೆಳೆಗಳಿಗೆ ಸೂಕ್ತ ಬಿಸಿಲಿದೆ.",
    },
    rainy: {
      en: "Alert: Heavy rainfall predicted in the district for next 48 hours. Flood advisory active. Avoid pesticide spraying and fertilizer application.",
      kn: "ಮುನ್ನೆಚ್ಚರಿಕೆ: ಮುಂದಿನ ೪೮ ಗಂಟೆಗಳಲ್ಲಿ ಜಿಲ್ಲೆಯಲ್ಲಿ ಭಾರಿ ಮಳೆಯಾಗುವ ಮುನ್ಸೂಚನೆ ಇದೆ. ಕ್ರಿಮಿನಾಶಕ ಸಿಂಪಡಣೆ ಮತ್ತು ಗೊಬ್ಬರ ಹಾಕುವುದನ್ನು ತಕ್ಷಣ ಮುಂದೂಡಿ.",
    },
    dry: {
      en: "Warning: Dry spell reported, humidity is very low (30%). Water tables are depleting. Recommendations for micro-irrigation or farm-pond usage active.",
      kn: "ಎಚ್ಚರಿಕೆ: ದೀರ್ಘ ಒಣ ಹವೆ ಮತ್ತು ಬರಗಾಲದ ವಾತಾವರಣ, ಮಣ್ಣಿನಲ್ಲಿ ತೇವಾಂಶ ಕೊರತೆ ಇದೆ. ಕೃಷಿ ಹೊಂಡದಿಂದ ಹನಿ ನೀರಾವರಿ ಬಳಸಲು ಸಲಹೆ ನೀಡಲಾಗಿದೆ.",
    },
    pest: {
      en: "Critical Alert: Localized pest threat (Stem borer / Yellow Leaf Blast disease) reported in adjacent villages. Recommend inspecting leaf blades and applying neem decoction.",
      kn: "ತುರ್ತು ಎಚ್ಚರಿಕೆ: ನೆರೆಹೊರೆಯ ಹಳ್ಳಿಗಳಲ್ಲಿ ಕೀಟ ಬಾಧೆ (ಕಾಂಡ ಕೊರೆಯುವ ಹುಳು / ಹಳದಿ ಎಲೆ ರೋಗ) ವರದಿಯಾಗಿದೆ. ಎಲೆಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ ಬೇವಿನ ಕಷಾಯ ಸಿಂಪಡಿಸಲು ಸಲಹೆ.",
    },
  };
  return map[sim as keyof typeof map][language];
}
