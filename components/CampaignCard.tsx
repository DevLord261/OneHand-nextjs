"use client";
import styles from "@/styles/CampaignCard.module.css";
import ProgressBar from "./PrograssBar";
import { Campaign } from "@/types/campaign";

import { BadgeCheckIcon } from "lucide-react";

import { Badge } from "./ui/badge";
import Link from "next/link";
import Image from "next/image";

export default function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <Link className={styles.container} href={`/campaign/${campaign.id}`}>
      <Image
        className={styles.image}
        src={campaign.mainimage}
        alt="solar energy"
        width={100}
        height={100}
      />
      <section className={styles.sectioncontainer}>
        <h3 className={styles.title} style={{ paddingLeft: "20px" }}>
          {campaign.title}
        </h3>
        <div className={styles.ProgressBar}>
          <ProgressBar
            value={(campaign.currentDonation / campaign.donationGoal) * 100}
          />{" "}
          {/* 75% funded */}
        </div>
        <div className={styles.info}>
          <p>${campaign.currentDonation} Raised</p>
          <p>Goal: ${campaign.donationGoal}</p>
        </div>
        <div className={styles.infocontainer}>
          {/* <div className={styles.verifiedContainer}> */}
          <Badge
            variant="secondary"
            className="bg-blue-500 text-white dark:bg-blue-600"
          >
            <BadgeCheckIcon />
            Verified
          </Badge>
          {/* </div> */}
          <p>Location: {campaign.location}</p>
        </div>
      </section>
    </Link>
  );
}
