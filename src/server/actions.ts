"use server";

import { db } from "~/server/db";
import { askKrishiSakhi, getProactiveAdvisory } from "./gemini";
import { createClient } from "~/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { apmcPrices, type APMCPrice } from "~/data/shared-data";

// Typings for Server Actions
export interface ProfileInput {
  name: string;
  district: string;
  zone: string;
  soilType: string;
  landSize: number;
  crops: string[];
  isIrrigated: boolean;
}

export async function logout() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch (err) {
    console.error("logout action error:", err);
  }
  revalidatePath("/", "layout");
  redirect("/login");
}

export async function getProfiles() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    return await db.farmerProfile.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error("getProfiles error:", err);
    return [];
  }
}

export async function createProfile(data: ProfileInput) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const newProfile = await db.farmerProfile.create({
      data: {
        userId: user.id,
        name: data.name,
        district: data.district,
        zone: data.zone,
        soilType: data.soilType,
        landSize: data.landSize,
        crops: data.crops.join(","),
        isIrrigated: data.isIrrigated,
      },
    });
    revalidatePath("/", "layout");
    return newProfile;
  } catch (err) {
    console.error("createProfile error:", err);
    return null;
  }
}

export async function deleteProfile(id: number) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const profile = await db.farmerProfile.findUnique({ where: { id } });
    if (profile?.userId !== user.id) return null;

    const deleted = await db.farmerProfile.delete({
      where: { id },
    });
    revalidatePath("/", "layout");
    return deleted;
  } catch (err) {
    console.error("deleteProfile error:", err);
    return null;
  }
}

export async function getLogs(profileId: number) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const profile = await db.farmerProfile.findUnique({ where: { id: profileId } });
    if (profile?.userId !== user.id) return [];

    return await db.farmActivityLog.findMany({
      where: { profileId },
      orderBy: { timestamp: "desc" },
    });
  } catch (err) {
    console.error("getLogs error:", err);
    return [];
  }
}

export async function addLogEntry(profileId: number, category: string, notes: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const profile = await db.farmerProfile.findUnique({ where: { id: profileId } });
    if (profile?.userId !== user.id) return null;

    const newLog = await db.farmActivityLog.create({
      data: {
        profileId,
        category,
        notes,
      },
    });
    revalidatePath("/", "layout");
    return newLog;
  } catch (err) {
    console.error("addLogEntry error:", err);
    return null;
  }
}

export async function deleteLogEntry(id: number) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const log = await db.farmActivityLog.findUnique({ where: { id }, include: { profile: true } });
    if (log?.profile.userId !== user.id) return null;

    const deleted = await db.farmActivityLog.delete({
      where: { id },
    });
    revalidatePath("/", "layout");
    return deleted;
  } catch (err) {
    console.error("deleteLogEntry error:", err);
    return null;
  }
}

export async function askAI(
  profileId: number,
  weatherSim: string,
  message: string,
  history: Array<{ role: "user" | "model"; text: string }>,
  language: "en" | "kn" = "en"
) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return language === "kn"
        ? "ದೋಷ: ದಯವಿಟ್ಟು ಲಾಗ್ ಇನ್ ಮಾಡಿ ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ."
        : "Error: You are not authorized. Please log in again.";
    }

    const profile = await db.farmerProfile.findUnique({
      where: { id: profileId },
    });

    if (profile?.userId !== user.id) {
      return language === "kn"
        ? "ದೋಷ: ರೈತರ ವಿವರಗಳು ಕಂಡುಬಂದಿಲ್ಲ."
        : "Error: Profile not found or unauthorized.";
    }

    const context = {
      name: profile.name,
      district: profile.district,
      zone: profile.zone,
      soilType: profile.soilType,
      landSize: profile.landSize,
      crops: profile.crops.split(","),
      isIrrigated: profile.isIrrigated,
    };

    return await askKrishiSakhi(context, weatherSim, message, history, language);
  } catch (err) {
    console.error("askAI error:", err);
    return language === "kn"
      ? "ಕ್ಷಮಿಸಿ, ಕೃಷಿ ಸಖಿ ಸರ್ವರ್ ದೋಷ ಸಂಭವಿಸಿದೆ."
      : "Error: A server exception occurred while contacting Krishi Sakhi.";
  }
}

export async function getAIAdvisory(profileId: number, weatherSim: string, language: "en" | "kn") {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return language === "kn"
        ? "ದೋಷ: ರೈತರು ಲಾಗ್ ಇನ್ ಆಗಿಲ್ಲ."
        : "Error: Unauthorized. Please log in.";
    }

    const profile = await db.farmerProfile.findUnique({
      where: { id: profileId },
    });

    if (profile?.userId !== user.id) {
      return language === "kn"
        ? "ದೋಷ: ವಿವರಗಳು ಸಿಕ್ಕಿಲ್ಲ."
        : "Error: Profile not found.";
    }

    const context = {
      name: profile.name,
      district: profile.district,
      zone: profile.zone,
      soilType: profile.soilType,
      landSize: profile.landSize,
      crops: profile.crops.split(","),
      isIrrigated: profile.isIrrigated,
    };

    return await getProactiveAdvisory(context, weatherSim, language);
  } catch (err) {
    console.error("getAIAdvisory error:", err);
    return language === "kn"
      ? "ದೋಷ: ಸಲಹೆ ತಯಾರಿಸಲು ಸಾಧ್ಯವಾಗಿಲ್ಲ."
      : "Error: Unable to generate daily advisory card.";
  }
}

export async function analyzeTelemetry(
  profileId: number,
  temp: number,
  humidity: number,
  moisture: number,
  light: number,
  language: "en" | "kn" = "en"
) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return language === "kn"
        ? "ದೋಷ: ದಯವಿಟ್ಟು ಲಾಗ್ ಇನ್ ಮಾಡಿ."
        : "Error: Please log in again.";
    }

    const profile = await db.farmerProfile.findUnique({
      where: { id: profileId },
    });

    if (profile?.userId !== user.id) {
      return language === "kn"
        ? "ದೋಷ: ರೈತರ ವಿವರಗಳು ಕಂಡುಬಂದಿಲ್ಲ."
        : "Error: Profile not found.";
    }

    const context = {
      name: profile.name,
      district: profile.district,
      zone: profile.zone,
      soilType: profile.soilType,
      landSize: profile.landSize,
      crops: profile.crops.split(","),
      isIrrigated: profile.isIrrigated,
    };

    const prompt = language === "kn"
      ? `ನನ್ನ ಕೃಷಿ ಸಂವೇದಕಗಳ (Sensors) ಲೈವ್ ರೀಡಿಂಗ್ ಈ ಕೆಳಗಿನಂತಿದೆ:
- ತಾಪಮಾನ: ${temp}°C
- ಆರ್ದ್ರತೆ: ${humidity}%
- ಮಣ್ಣಿನ ತೇವಾಂಶ: ${moisture}%
- ಸೂರ್ಯನ ಬೆಳಕು: ${light}%

ನನ್ನ ಬೆಳೆ: ${profile.crops}
ದಯವಿಟ್ಟು ಈ ರೀಡಿಂಗ್ ಆಧಾರದ ಮೇಲೆ ನನ್ನ ಬೆಳೆಗೆ ೨-೩ ಸಾಲುಗಳಲ್ಲಿ ನೇರವಾದ ಸಲಹೆಯನ್ನು ನೀಡಿ.`
      : `My IoT farm sensor readings:
- Air Temperature: ${temp}°C
- Air Humidity: ${humidity}%
- Soil Moisture: ${moisture}%
- Sunlight Level: ${light}%

Active Crop: ${profile.crops}
Please analyze these telemetry readings and provide a 2-3 sentence actionable diagnostic report for my crop.`;

    const weatherContext = `IoT Telemetry Reading: Temp ${temp}°C, Humidity ${humidity}%, Soil Moisture ${moisture}%, Light ${light}%`;
    return await askKrishiSakhi(context, weatherContext, prompt, [], language);
  } catch (err) {
    console.error("analyzeTelemetry error:", err);
    return language === "kn"
      ? "ದೋಷ: ಮಣ್ಣಿನ ವಿಶ್ಲೇಷಣೆ ಮಾಡಲು ಸಾಧ್ಯವಾಗಿಲ್ಲ."
      : "Error: Unable to analyze soil health telemetry.";
  }
}

// Translations dictionaries for data.gov.in mandi commodities and markets
const cropTranslations: Record<string, { en: string; kn: string }> = {
  sugarcane: { en: "Sugarcane (ಕಬ್ಬು)", kn: "ಕಬ್ಬು (Sugarcane)" },
  ragi: { en: "Ragi (ರಾಗಿ)", kn: "ರಾಗಿ (Ragi)" },
  jowar: { en: "Jowar (ಜೋಳ)", kn: "ಜೋಳ (Jowar)" },
  paddy: { en: "Paddy (ಭತ್ತ)", kn: "ಭತ್ತ (Paddy)" },
  rice: { en: "Rice (ಅಕ್ಕಿ)", kn: "ಅಕ್ಕಿ (Rice)" },
  arecanut: { en: "Arecanut (ಅಡಿಕೆ)", kn: "ಅಡಿಕೆ (Arecanut)" },
  coconut: { en: "Coconut (ತೆಂಗಿನಕಾಯಿ)", kn: "ತೆಂಗಿನಕಾಯಿ (Coconut)" },
  "copra": { en: "Copra (ಕೊಬ್ಬರಿ)", kn: "ಕೊಬ್ಬರಿ (Copra)" },
  coffee: { en: "Coffee (ಕಾಫಿ)", kn: "ಕಾಫಿ (Coffee)" },
  maize: { en: "Maize (ಮೆಕ್ಕೆಜೋಳ)", kn: "ಮೆಕ್ಕೆಜೋಳ (Maize)" },
  cotton: { en: "Cotton (ಹತ್ತಿ)", kn: "ಹತ್ತಿ (Cotton)" },
  onion: { en: "Onion (ಈರುಳ್ಳಿ)", kn: "ಈರುಳ್ಳಿ (Onion)" },
  potato: { en: "Potato (ಆಲೂಗಡ್ಡೆ)", kn: "ಆಲೂಗಡ್ಡೆ (Potato)" },
  tomato: { en: "Tomato (ಟೊಮೆಟೊ)", kn: "ಟೊಮೆಟೊ (Tomato)" },
  groundnut: { en: "Groundnut (ಶೇಂಗಾ)", kn: "ಶೇಂಗಾ (Groundnut)" },
  turmeric: { en: "Turmeric (ಅರಿಶಿನ)", kn: "ಅರಿಶಿನ (Turmeric)" },
  chilli: { en: "Chilli (ಮೆಣಸಿನಕಾಯಿ)", kn: "ಮೆಣಸಿನಕಾಯಿ (Chilli)" },
  "bengal gram": { en: "Bengal Gram (ಕಡಲೆ)", kn: "ಕಡಲೆ (Bengal Gram)" },
  "tur": { en: "Tur Dal (ತೊಗರಿ)", kn: "ತೊಗರಿ (Tur Dal)" },
  wheat: { en: "Wheat (ಗೋಧಿ)", kn: "ಗೋಧಿ (Wheat)" },
  soyabean: { en: "Soyabean (ಸೋಯಾಬೀನ್)", kn: "ಸೋಯಾಬೀನ್ (Soyabean)" },
  sunflower: { en: "Sunflower (ಸೂರ್ಯಕಾಂತಿ)", kn: "ಸೂರ್ಯಕಾಂತಿ (Sunflower)" },
  banana: { en: "Banana (ಬಾಳೆಹಣ್ಣು)", kn: "ಬಾಳೆಹಣ್ಣು (Banana)" },
  mango: { en: "Mango (ಮಾವಿನಹಣ್ಣು)", kn: "ಮಾವಿನಹಣ್ಣು (Mango)" },
  cashewnuts: { en: "Cashew (ಗೋಡಂಬಿ)", kn: "ಗೋಡಂಬಿ (Cashew)" },
  pepper: { en: "Pepper (ಕಾಳುಮೆಣಸು)", kn: "ಕಾಳುಮೆಣಸು (Pepper)" },
  "green ginger": { en: "Ginger (ಶುಂಠಿ)", kn: "ಶುಂಠಿ (Ginger)" },
  ginger: { en: "Ginger (ಶುಂಠಿ)", kn: "ಶುಂಠಿ (Ginger)" },
};

const marketTranslations: Record<string, { en: string; kn: string }> = {
  mandya: { en: "Mandya APMC", kn: "ಮಂಡ್ಯ APMC" },
  mysore: { en: "Mysuru APMC", kn: "ಮೈಸೂರು APMC" },
  mysuru: { en: "Mysuru APMC", kn: "ಮೈಸೂರು APMC" },
  hassan: { en: "Hassan APMC", kn: "ಹಾಸನ APMC" },
  shivamogga: { en: "Shivamogga APMC", kn: "ಶಿವಮೊಗ್ಗ APMC" },
  shimoga: { en: "Shivamogga APMC", kn: "ಶಿವಮೊಗ್ಗ APMC" },
  kolar: { en: "Kolar APMC", kn: "ಕೋಲಾರ APMC" },
  chikmagalur: { en: "Chikmagalur APMC", kn: "ಚಿಕ್ಕಮಗಳೂರು APMC" },
  chikkamagaluru: { en: "Chikmagalur APMC", kn: "ಚಿಕ್ಕಮಗಳೂರು APMC" },
  udupi: { en: "Udupi APMC", kn: "ಉಡುಪಿ APMC" },
  bangalore: { en: "Bengaluru APMC", kn: "ಬೆಂಗಳೂರು APMC" },
  bengaluru: { en: "Bengaluru APMC", kn: "ಬೆಂಗಳೂರು APMC" },
  belgaum: { en: "Belagavi APMC", kn: "ಬೆಳಗಾವಿ APMC" },
  belagavi: { en: "Belagavi APMC", kn: "ಬೆಳಗಾವಿ APMC" },
  dharwad: { en: "Dharwad APMC", kn: "ಧಾರವಾಡ APMC" },
  davangere: { en: "Davangere APMC", kn: "ದಾವಣಗೆರೆ APMC" },
  tumkur: { en: "Tumakuru APMC", kn: "ತುಮಕೂರು APMC" },
  tumakuru: { en: "Tumakuru APMC", kn: "ತುಮಕೂರು APMC" },
  hubli: { en: "Hubballi APMC", kn: "ಹುಬ್ಬಳ್ಳಿ APMC" },
  "hubli (amaragol)": { en: "Hubballi APMC", kn: "ಹುಬ್ಬಳ್ಳಿ APMC" },
  hubballi: { en: "Hubballi APMC", kn: "ಹುಬ್ಬಳ್ಳಿ APMC" },
  bellary: { en: "Ballari APMC", kn: "ಬಳ್ಳಾರಿ APMC" },
  ballari: { en: "Ballari APMC", kn: "ಬಳ್ಳಾರಿ APMC" },
  raichur: { en: "Raichur APMC", kn: "ರಾಯಚೂರು APMC" },
  mangalore: { en: "Mangaluru APMC", kn: "ಮಂಗಳೂರು APMC" },
  mangaluru: { en: "Mangaluru APMC", kn: "ಮಂಗಳೂರು APMC" },
  gulbarga: { en: "Kalaburagi APMC", kn: "ಕಲಬುರಗಿ APMC" },
  kalaburagi: { en: "Kalaburagi APMC", kn: "ಕಲಬುರಗಿ APMC" },
  chitradurga: { en: "Chitradurga APMC", kn: "ಚಿತ್ರದುರ್ಗ APMC" },
  gadag: { en: "Gadag APMC", kn: "ಗದಗ APMC" },
  haveri: { en: "Haveri APMC", kn: "ಹಾವೇರಿ APMC" },
  bagalkot: { en: "Bagalkot APMC", kn: "ಬಾಗಲಕೋಟೆ APMC" },
  bidar: { en: "Bidar APMC", kn: "ಬೀದರ APMC" },
  vijayapura: { en: "Vijayapura APMC", kn: "ವಿಜಯಪುರ APMC" },
  bijapur: { en: "Vijayapura APMC", kn: "ವಿಜಯಪುರ APMC" },
  ramanagara: { en: "Ramanagara APMC", kn: "ರಾಮನಗರ APMC" },
  koppal: { en: "Koppal APMC", kn: "ಕೊಪ್ಪಳ APMC" },
  yadgir: { en: "Yadgir APMC", kn: "ಯಾದಗಿರಿ APMC" },
};

export async function getLiveMandiPrices(): Promise<APMCPrice[]> {
  try {
    const apiKey = process.env.DATA_GOV_IN_API_KEY;
    if (!apiKey) {
      console.log("DATA_GOV_IN_API_KEY is not configured. Falling back to static data.");
      return apmcPrices;
    }

    const url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${apiKey}&format=json&limit=200&filters[state]=Karnataka`;

    const res = await fetch(url, {
      next: { revalidate: 1800 }, // ISR cache: revalidate every 30 min
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      throw new Error(`Data.gov.in API returned HTTP ${res.status}`);
    }

    const data = (await res.json()) as {
      records?: Array<{
        state: string;
        district: string;
        market: string;
        commodity: string;
        variety: string;
        min_price: string;
        max_price: string;
        modal_price: string;
        arrival_date: string;
      }>;
    };

    if (!data.records || !Array.isArray(data.records) || data.records.length === 0) {
      throw new Error("No records returned from Data.gov.in API");
    }

    // Expanded target crop list for Karnataka agriculture
    const targetCrops = [
      "ragi", "sugarcane", "jowar", "paddy", "rice", "coconut", "copra",
      "arecanut", "coffee", "maize", "onion", "potato", "tomato",
      "groundnut", "turmeric", "chilli", "bengal gram", "tur",
      "cotton", "sunflower", "soyabean", "banana", "pepper", "ginger",
    ];

    let filteredRecords = data.records.filter((rec) => {
      const comm = rec.commodity.toLowerCase();
      return targetCrops.some((tc) => comm.includes(tc));
    });

    // If very few target crops found, use all records
    if (filteredRecords.length < 4) {
      filteredRecords = data.records;
    }

    // Deduplicate: keep one record per commodity (the one with the highest modal price)
    // This ensures the ticker shows a variety of crops instead of repeating the same one
    const bestPerCommodity = new Map<string, typeof filteredRecords[0]>();
    for (const rec of filteredRecords) {
      const key = rec.commodity.toLowerCase().trim();
      const existing = bestPerCommodity.get(key);
      if (!existing || (Number(rec.modal_price) || 0) > (Number(existing.modal_price) || 0)) {
        bestPerCommodity.set(key, rec);
      }
    }

    const deduplicated = Array.from(bestPerCommodity.values());
    const recordsToMap = deduplicated.slice(0, 8);

    const mapped: APMCPrice[] = recordsToMap.map((rec) => {
      const commodityKey = rec.commodity.toLowerCase().trim();
      const marketKey = rec.market.toLowerCase().trim();

      // Translate crop — exact match first, then fuzzy includes
      let cropObj: { en: string; kn: string };
      const rawCropObj = cropTranslations[commodityKey];
      if (rawCropObj) {
        cropObj = rawCropObj;
      } else {
        const foundKey = Object.keys(cropTranslations).find((k) => commodityKey.includes(k));
        if (foundKey) {
          cropObj = cropTranslations[foundKey]!;
        } else {
          cropObj = { en: rec.commodity, kn: rec.commodity };
        }
      }

      // Translate market — exact match first, then fuzzy includes
      let marketObj: { en: string; kn: string };
      const rawMarketObj = marketTranslations[marketKey];
      if (rawMarketObj) {
        marketObj = rawMarketObj;
      } else {
        const foundKey = Object.keys(marketTranslations).find((k) => marketKey.includes(k));
        if (foundKey) {
          marketObj = marketTranslations[foundKey]!;
        } else {
          marketObj = { en: `${rec.market} APMC`, kn: `${rec.market} APMC` };
        }
      }

      // Parse prices
      const min = Number(rec.min_price) || 0;
      const max = Number(rec.max_price) || 0;
      const modal = Number(rec.modal_price) || 0;

      const formattedPrice = `₹${modal.toLocaleString("en-IN")}`;

      // Unit: Sugarcane & Coconut are typically per Ton; everything else per Quintal
      const isTonUnit = commodityKey.includes("sugarcane") || commodityKey.includes("coconut");
      const unitObj = isTonUnit
        ? { en: "/ Ton", kn: "/ ಟನ್" }
        : { en: "/ Qtl", kn: "/ ಕ್ವಿಂಟಾಲ್" };

      // Determine price trend from min/max spread
      let trend: "up" | "stable" | "down" = "stable";
      if (max > min) {
        const ratio = (modal - min) / (max - min);
        if (ratio > 0.6) trend = "up";
        else if (ratio < 0.4) trend = "down";
      }

      // Format arrival date as a human-readable "Updated DD/MM" string
      const dateParts = rec.arrival_date.split("/");
      const displayDate = dateParts.length >= 2 ? `${dateParts[0]}/${dateParts[1]}` : rec.arrival_date;
      const timeObj = {
        en: `Updated ${displayDate}`,
        kn: `${displayDate} ರಂದು ನವೀಕರಿಸಲಾಗಿದೆ`,
      };

      return {
        crop: cropObj,
        market: marketObj,
        price: formattedPrice,
        unit: unitObj,
        trend,
        time: timeObj,
      };
    });

    return mapped.length > 0 ? mapped : apmcPrices;
  } catch (err) {
    console.error("getLiveMandiPrices error:", err);
    return apmcPrices;
  }
}
