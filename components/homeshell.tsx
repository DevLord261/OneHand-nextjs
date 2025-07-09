"use client";
import { userProfile } from "@/types/campaign";
import CrowdfundingToolbar from "./ToolBar";
import { useState } from "react";
import SearchOverlay from "./home/search-overlay";

export default function Shell({ user }: { user: Promise<userProfile | null> }) {
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
      />
    </>
  );
}
