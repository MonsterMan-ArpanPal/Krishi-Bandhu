"use server";

import { db } from "~/server/db";
import { askKrishiSakhi, getProactiveAdvisory } from "./gemini";

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

export async function getProfiles() {
  return await db.farmerProfile.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createProfile(data: ProfileInput) {
  return await db.farmerProfile.create({
    data: {
      name: data.name,
      district: data.district,
      zone: data.zone,
      soilType: data.soilType,
      landSize: data.landSize,
      crops: data.crops.join(","),
      isIrrigated: data.isIrrigated,
    },
  });
}

export async function deleteProfile(id: number) {
  return await db.farmerProfile.delete({
    where: { id },
  });
}

export async function getLogs(profileId: number) {
  return await db.farmActivityLog.findMany({
    where: { profileId },
    orderBy: { timestamp: "desc" },
  });
}

export async function addLogEntry(profileId: number, category: string, notes: string) {
  return await db.farmActivityLog.create({
    data: {
      profileId,
      category,
      notes,
    },
  });
}

export async function deleteLogEntry(id: number) {
  return await db.farmActivityLog.delete({
    where: { id },
  });
}

export async function askAI(
  profileId: number,
  weatherSim: string,
  message: string,
  history: Array<{ role: "user" | "model"; text: string }>
) {
  const profile = await db.farmerProfile.findUnique({
    where: { id: profileId },
  });

  if (!profile) {
    throw new Error("Farmer profile not found");
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

  return await askKrishiSakhi(context, weatherSim, message, history);
}

export async function getAIAdvisory(profileId: number, weatherSim: string, language: "en" | "kn") {
  const profile = await db.farmerProfile.findUnique({
    where: { id: profileId },
  });

  if (!profile) {
    throw new Error("Farmer profile not found");
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
