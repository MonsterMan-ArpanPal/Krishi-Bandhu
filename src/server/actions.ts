"use server";

import { db } from "~/server/db";
import { askKrishiSakhi, getProactiveAdvisory } from "./gemini";
import { createClient } from "~/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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
