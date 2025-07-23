export async function GetCampaign({ id }: { id: string }) {
  try {
    const res = await fetch(
      `http://localhost:8080/api/campaigns/campaignId?Id=${id}`,
      {
        method: "GET",
      },
    );
    if (!res.ok) return null;

    const campaign = await res.json();
    console.log(campaign);
    return campaign;
  } catch (e) {
    console.error("Internal Server Error: " + e);
    return null;
  }
}
