"use client";

import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CalendarDays,
  MapPin,
  Users,
  Heart,
  Share2,
  Flag,
  ArrowLeft,
} from "lucide-react";
import { DonationModal } from "@/components/donation";
import { VolunteerModal } from "@/components/volunteer";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { GetCampaign } from "@/lib/actions/GetCampaign";
import { Campaign } from "@/types/campaign";

export default function ViewCampaign({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [campaign, setCampaign] = useState<Campaign | null>(null);

  const { id } = use(params);
  // const campaign: Campaign = async () => await GetCampaign({ id });
  useEffect(() => {
    const fetchcampaign = async () => {
      try {
        setLoading(true);
        const campaignData = await GetCampaign({ id });
        setCampaign(campaignData);
      } catch (e) {
        console.error("Internal Server Error: " + e);
      } finally {
        setLoading(false);
      }
    };
    fetchcampaign();
  }, [id]);
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="header">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href={"/"}
                className="gap-2 flex flex-row justify-center items-center"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
              <Separator orientation="vertical" className="h-6" />
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Campaign Images */}
            <Card>
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={
                      campaign?.heroimage ||
                      "https://imagehandler.fra1.digitaloceanspaces.com/defautuser.jpg"
                    }
                    alt="Campaign"
                    className="w-full h-[400px] object-cover rounded-t-lg"
                    width={100}
                    height={100}
                  />
                  {/* {campaign?.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {campaign?.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-3 h-3 rounded-full ${
                            index === currentImageIndex
                              ? "bg-white"
                              : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  )} */}
                </div>
              </CardContent>
            </Card>

            {/* Campaign Details */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <Badge variant="secondary">{campaign?.category}</Badge>
                    <CardTitle className="text-2xl">
                      {campaign?.title}
                    </CardTitle>
                    <CardDescription className="text-lg">
                      {campaign?.shortDescription}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Flag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{campaign?.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CalendarDays className="h-4 w-4" />
                    <span>{campaign?.daysLeft} days left</span>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Tabs for Details */}
            <Tabs defaultValue="story" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="story">Story</TabsTrigger>
                <TabsTrigger value="updates">Updates</TabsTrigger>
                <TabsTrigger value="donors">Supporters</TabsTrigger>
              </TabsList>

              <TabsContent value="story" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="prose max-w-none">
                      {campaign != null ? (
                        <p
                          className="whitespace-pre-line"
                          dangerouslySetInnerHTML={{
                            __html: campaign.description,
                          }}
                        ></p>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="updates" className="space-y-4">
                {/* {campaign?.updates.map((update) => (
                  <Card key={update.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{update.title}</CardTitle>
                      <CardDescription>{update.date}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{update.content}</p>
                    </CardContent>
                  </Card>
                ))} */}
              </TabsContent>

              <TabsContent value="donors" className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center text-muted-foreground">
                      <Users className="h-12 w-12 mx-auto mb-4" />
                      <p>
                        Donor information is kept private to protect supporter
                        privacy.
                      </p>
                      <p className="mt-2">
                        Thank you to all {campaign?.donatercount} supporters!{" "}
                        {/*{campaign?.donorCount}*/}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Funding Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  raised of $
                  {campaign?.currentDonation?.toLocaleString() ?? "0"}
                </CardTitle>
                <CardDescription>
                  ${campaign?.donationGoal?.toLocaleString() ?? "0"} goal
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={100} className="h-3" />

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-semibold">
                      {campaign?.donatercount}
                    </div>
                    <div className="text-muted-foreground">donors</div>
                  </div>
                  <div>
                    <div className="font-semibold">{campaign?.daysLeft}</div>
                    <div className="text-muted-foreground">days left</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => setShowDonationModal(true)}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Donate Now
                  </Button>

                  {campaign?.isvolunteer == false ? (
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => setShowVolunteerModal(true)}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Volunteer ({campaign?.volunteers})
                    </Button>
                  ) : null}
                </div>
              </CardContent>
            </Card>

            {/* Organizer Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Organizer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage
                      src={
                        campaign?.organizer.avatar ||
                        "https://imagehandler.fra1.digitaloceanspaces.com/defautuser.jpg"
                      }
                    />
                    <AvatarFallback>CW</AvatarFallback>
                  </Avatar>
                  <div>
                    {campaign?.organizer && (
                      <div className="font-semibold flex items-center space-x-1">
                        <span>{campaign?.organizer.username}</span>
                        {campaign?.organizer.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Verified
                          </Badge>
                        )}
                      </div>
                    )}

                    <div className="text-sm text-muted-foreground">
                      Campaign Organizer
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modals */}
      <DonationModal
        isOpen={showDonationModal}
        onClose={() => setShowDonationModal(false)}
        campaignId={id}
        campaignTitle={campaign?.title}
        islogin={true}
      />

      <VolunteerModal
        isOpen={showVolunteerModal}
        onClose={() => setShowVolunteerModal(false)}
        campaignId={id}
        campaignTitle={campaign?.title}
        user={campaign?.organizer}
        islogin={true}
      />
    </div>
  );
}
