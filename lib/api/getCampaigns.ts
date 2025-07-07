"use server";

import { Campaign } from "@/types/campaign";

export async function GetAllCampaigns(): Promise<Campaign[]> {
  const res = await fetch("http://localhost:8080/api/campaigns", {
    method: "GET",
    cache: "force-cache", // Optional: disable caching
  });
  if (!res.ok) {
    throw new Error("Failed to fetch campaigns");
  }
  return res.json();
}
