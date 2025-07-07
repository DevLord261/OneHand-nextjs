import { Campaign } from "@/types/campaign";

export async function getFeaturedCampaigns(): Promise<Campaign> {
  const res = await fetch("http://localhost:8080/api/campaigns/featured", {
    method: "GET",
    cache: "no-cache", // Optional: disable caching
  });

  if (!res.ok) {
    throw new Error("Failed to fetch campaigns");
  }

  return res.json();
}
