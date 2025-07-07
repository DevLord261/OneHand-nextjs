"use client";
import { Campaign, userProfile } from "@/types/campaign";
import CrowdfundingToolbar from "./ToolBar";
import { useState } from "react";
import SearchOverlay from "./home/search-overlay";

export default function Shell({
  user,
  campaignsPromise,
}: {
  user: Promise<userProfile>;
  campaignsPromise: Promise<Campaign[]>;
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  return (
    <>
      <CrowdfundingToolbar
        userPromise={user}
        onSearchOpen={() => setIsSearchOpen(true)}
      />

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        campaignPromise={campaignsPromise}
      />
    </>
  );
}
