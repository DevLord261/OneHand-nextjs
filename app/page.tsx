import Image from "next/image";
import Hero from "@/public/Hero.webp";
import Link from "next/link";
import CategoryCard from "@/components/Card";
import CampaignCard from "@/components/CampaignCard";
import { Business, Medical, Restoring, Technology } from "@/resources/images";

import "@/styles/Home.css";
import { getFeaturedCampaigns } from "@/lib/api/getfeaturedcampaigns";
import { getUserProfile } from "@/lib/api/getUserProfile";

import Shell from "@/components/homeshell";
import { Campaign } from "@/types/campaign";
import { Suspense } from "react";

export default async function Home() {
  let featuredcampaigns: Campaign[] = []; //await getFeaturedCampaigns();
  let user = null; //getUserProfile()

  try {
    featuredcampaigns = await getFeaturedCampaigns();
    user = await getUserProfile();
  } catch (error) {
    console.error("Error loading home page data:", error);
  }
  return (
    <>
      {/* <Shell user={user} /> */}
      <Suspense fallback={<div>Loading...</div>}>
        <Shell user={Promise.resolve(user)} />
      </Suspense>
      <main className="container">
        {/* Hero section */}
        <section className="herosection">
          <picture>
            <source srcSet="Hero.webp" type="image/webp" />
            <Image className="herologo" src={Hero} alt="Hero logo"></Image>
          </picture>
          <div className="textbox">
            <p className="maintext">A Helping Hand for a Better Tomorrow</p>
            <p className="alttext">
              Launch a fundraiser to support the causes you care about.
            </p>
            <Link type="button" href={"/campaign/create"}>
              Start a Campaign
            </Link>
          </div>
        </section>
        {/* caregory section */}
        <section className="categoriesSection">
          <div className="categtext">
            <h2 className="categtitle">Top Categories</h2>
            <div>
              <p>
                Explore fundraiser in some of the platform&apos;s most popular
                categories.
              </p>
              <p> There is more cause you can support - just check them all.</p>
            </div>
          </div>
          <Link
            className="see-all-categories"
            style={{
              cursor: "pointer",
              fontSize: "18px",
              height: "fit-content",
              textDecoration: "underline",
              color: "#007bff",
            }}
            href={""}
          >
            See all categories
          </Link>
        </section>
        {/* categoryContainer */}
        <section className="categoryScrollWrapper">
          <div className="categorycontainer">
            <CategoryCard logo={Medical} name="Medical" />
            <CategoryCard logo={Business} name="Bavatarusiness" />
            <CategoryCard logo={Technology} name="Technology" />
            <CategoryCard logo={Restoring} name="Rebuild & Recover" />
          </div>
        </section>
        <section className="Categcontainer">
          <h1>Featured Campaigns</h1>

          {Array.isArray(featuredcampaigns) &&
            featuredcampaigns.map((camp) => (
              <CampaignCard key={camp.id} campaign={camp} />
            ))}
        </section>
        <section className="trustworthy">
          <h3>Fundraising on OneHand is easy, powerful, and trusted.</h3>
          <p>
            Get what you need to help your fundraiser succeed on OneHand,
            whether you’re raising money for yourself, friends, family, or
            charity. OneHand is a trusted leader in online fundraising. With
            simple pricing and a team of Trust & Safety experts in your corner,
            you can raise money or make a donation with peace of mind. memorial
            tributes and funerals to medical emergencies and nonprofits.
            Whenever you need help, you can ask here.
          </p>
        </section>
        {/* <SearchOverlay
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          campaigns={allcampaigns}
        /> */}
      </main>
    </>
  );
}
