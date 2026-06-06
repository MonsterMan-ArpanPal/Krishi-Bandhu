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
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}

export async function getProfiles() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  return await db.farmerProfile.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
}

export async function createProfile(data: ProfileInput) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

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
}

export async function deleteProfile(id: number) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const profile = await db.farmerProfile.findUnique({ where: { id } });
  if (profile?.userId !== user.id) throw new Error("Unauthorized");

  const deleted = await db.farmerProfile.delete({
    where: { id },
  });
  revalidatePath("/", "layout");
  return deleted;
}

export async function getLogs(profileId: number) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const profile = await db.farmerProfile.findUnique({ where: { id: profileId } });
  if (profile?.userId !== user.id) throw new Error("Unauthorized");

  return await db.farmActivityLog.findMany({
    where: { profileId },
    orderBy: { timestamp: "desc" },
  });
}

export async function addLogEntry(profileId: number, category: string, notes: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const profile = await db.farmerProfile.findUnique({ where: { id: profileId } });
  if (profile?.userId !== user.id) throw new Error("Unauthorized");

  const newLog = await db.farmActivityLog.create({
    data: {
      profileId,
      category,
      notes,
    },
  });
  revalidatePath("/", "layout");
  return newLog;
}

export async function deleteLogEntry(id: number) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const log = await db.farmActivityLog.findUnique({ where: { id }, include: { profile: true } });
  if (log?.profile.userId !== user.id) throw new Error("Unauthorized");

  const deleted = await db.farmActivityLog.delete({
    where: { id },
  });
  revalidatePath("/", "layout");
  return deleted;
}

export async function askAI(
  profileId: number,
  weatherSim: string,
  message: string,
  history: Array<{ role: "user" | "model"; text: string }>,
  language: "en" | "kn" = "en"
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const profile = await db.farmerProfile.findUnique({
    where: { id: profileId },
  });

  if (!profile) {
    throw new Error("Farmer profile not found or unauthorized");
  }
  if (profile.userId !== user.id) {
    throw new Error("Farmer profile not found or unauthorized");
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
}

export async function getAIAdvisory(profileId: number, weatherSim: string, language: "en" | "kn") {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const profile = await db.farmerProfile.findUnique({
    where: { id: profileId },
  });

  if (!profile) {
    throw new Error("Farmer profile not found or unauthorized");
  }
  if (profile.userId !== user.id) {
    throw new Error("Farmer profile not found or unauthorized");
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
}
