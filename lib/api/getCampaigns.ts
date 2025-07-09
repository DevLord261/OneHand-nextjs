"use server";

import { Campaign } from "@/types/campaign";

export async function GetAllCampaigns({
  page,
}: {
  page: number;
}): Promise<Campaign[]> {
  const res = await fetch(
    `http://localhost:8080/api/campaigns/allcampaigns?page=${page}`,
    {
      method: "GET",
      cache: "force-cache", // Optional: disable caching
    },
  );
  console.log(await res.json());
  if (!res.ok) {
    throw new Error("Failed to fetch campaigns");
  }
  return await res.json();
}
