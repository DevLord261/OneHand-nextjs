"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Search, X, Heart, MapPin, Calendar, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Campaign } from "@/types/campaign";
import Image from "next/image";
import Link from "next/link";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [initialLoad, setInitialLoad] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories = [
    "All",
    "Water & Sanitation",
    "Education",
    "Healthcare",
    "Food & Nutrition",
    "Environment",
    "Emergency Relief",
  ];

  const loadingRef = useRef(false);

  const loadCampaigns = useCallback(async (pageNum: number, retry = 0) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:8080/api/campaigns/pages?pagenumber=${pageNum}&size=6`,
        {
          method: "GET",
        },
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log(`Loading page ${pageNum}:`, data);

      if (pageNum === 0) {
        setCampaigns(data.content);
      } else {
        setCampaigns((prev) => [...prev, ...data.content]);
      }

      setHasMore(pageNum + 1 < data.page.totalPages);
      setPage(pageNum);
      setRetryCount(0);
    } catch (e) {
      console.error("Failed to load campaigns:", e);
      if (retry < MAX_RETRIES) {
        console.log(`Retrying... (${retry + 1}/${MAX_RETRIES})`);
        setTimeout(
          () => {
            loadCampaigns(pageNum, retry + 1);
          },
          1000 * (retry + 1),
        ); // Exponential backoff
        return;
      }
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    if (isOpen && !initialLoad) {
      setInitialLoad(true);
      loadCampaigns(0);
    }
  }, [isOpen, initialLoad, loadCampaigns]);

  // Reset when overlay closes
  useEffect(() => {
    if (!isOpen) {
      setCampaigns([]);
      setPage(0);
      setHasMore(true);
      setSearchQuery("");
      setFilteredCampaigns([]);
      setSelectedCategory("All");
      setInitialLoad(false);
      setLoading(false);
      loadingRef.current = false;
    }
  }, [isOpen]);

  const loadMore = useCallback(() => {
    if (hasMore && !loadingRef.current) {
      const nextPage = page + 1;

      loadCampaigns(nextPage);
    }
  }, [hasMore, page, loadCampaigns]);

  // Scroll event handler for the overlay container
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const threshold = 200; // pixels from bottom
    // Trigger load more when user is within 200px of the bottom
    if (scrollTop + clientHeight >= scrollHeight - threshold) {
      loadMore();
    }
  }, [loadMore, loading, hasMore]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let timeoutId: NodeJS.Timeout;
    const throttledScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 100); // Throttle to 100ms
    };

    container.addEventListener("scroll", throttledScroll);
    return () => {
      container.removeEventListener("scroll", throttledScroll);
      clearTimeout(timeoutId);
    };
  }, [handleScroll]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterCampaigns(query, selectedCategory);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    filterCampaigns(searchQuery, category);
  };

  const filterCampaigns = useCallback(
    (query: string, category: string) => {
      let filtered = campaigns;

      // Filter by category
      if (category !== "All") {
        filtered = filtered.filter(
          (campaign) => campaign.category === category,
        );
      }

      // Filter by search query
      if (query.trim() !== "") {
        filtered = filtered.filter(
          (campaign) =>
            campaign.title.toLowerCase().includes(query.toLowerCase()) ||
            campaign.description.toLowerCase().includes(query.toLowerCase()) ||
            campaign.category.toLowerCase().includes(query.toLowerCase()) ||
            campaign.location.toLowerCase().includes(query.toLowerCase()),
        );
      }

      setFilteredCampaigns(filtered);
    },
    [campaigns, setFilteredCampaigns],
  );

  // Update filtered campaigns when campaigns change
  useEffect(() => {
    if (campaigns.length > 0) {
      filterCampaigns(searchQuery, selectedCategory);
    }
  }, [campaigns, searchQuery, selectedCategory, filterCampaigns]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getProgressPercentage = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100);
  };

  if (!isOpen) return null;

  // Show campaigns from filtered results if there's a search/filter, otherwise show all campaigns
  const displayCampaigns =
    searchQuery || selectedCategory !== "All" ? filteredCampaigns : campaigns;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div ref={scrollContainerRef} className="absolute inset-0 overflow-auto">
        <div className="min-h-full bg-white">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
            <div className="max-w-6xl mx-auto px-4 py-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-2xl">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search campaigns, causes, locations..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                    autoFocus
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="w-10 h-10 rounded-full hover:bg-gray-100"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-8 bg-gray-50 p-4 rounded-lg border">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Filter by Category:
              </h3>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryFilter(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white border-blue-600 shadow-md"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {searchQuery && (
              <div className="mb-6">
                <p className="text-gray-600">
                  {filteredCampaigns.length} campaign
                  {filteredCampaigns.length !== 1 ? "s" : ""} found for
                  {searchQuery}
                </p>
              </div>
            )}

            {displayCampaigns.length === 0 && !loading ? (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No campaigns found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search terms or browse all campaigns
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayCampaigns.map((campaign) => (
                    <Link key={campaign.id} href={`/campaign/${campaign.id}`}>
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
                        <CardHeader className="p-0">
                          <div className="relative">
                            <Image
                              src={
                                campaign.heroimage ||
                                "https://imagehandler.fra1.digitaloceanspaces.com/defautuser.jpg"
                              }
                              alt={campaign.title}
                              width={300}
                              height={200}
                              className="w-full h-48 object-cover"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute top-3 right-3 w-8 h-8 bg-white/80 hover:bg-white rounded-full"
                            >
                              <Heart className="w-4 h-4" />
                            </Button>
                            <Badge className="absolute bottom-3 left-3 bg-white/90 text-gray-800 hover:bg-white">
                              {campaign.category}
                            </Badge>
                          </div>
                        </CardHeader>

                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                            {campaign.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {campaign.shortDescription}
                          </p>

                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <MapPin className="w-4 h-4" />
                              <span>{campaign.location}</span>
                            </div>

                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium text-gray-700">
                                  {formatCurrency(campaign.currentDonation)}{" "}
                                  raised
                                </span>
                                <span className="text-sm text-gray-500">
                                  {getProgressPercentage(
                                    campaign.currentDonation,
                                    campaign.donationGoal,
                                  ).toFixed(0)}
                                  %
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                                  style={{
                                    width: `${getProgressPercentage(
                                      campaign.currentDonation,
                                      campaign.donationGoal,
                                    )}%`,
                                  }}
                                />
                              </div>
                              <div className="flex justify-between items-center mt-1 text-xs text-gray-500">
                                <span>
                                  Goal: {formatCurrency(campaign.donationGoal)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>

                        <CardFooter className="p-4 pt-0 flex justify-between items-center">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Target className="w-4 h-4" />
                              <span>{campaign.donatercount} supporters</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{campaign.daysLeft} days left</span>
                            </div>
                          </div>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
                  {hasMore && !loading && displayCampaigns.length > 0 && (
                    <div className="text-center py-8">
                      <Button
                        onClick={loadMore}
                        variant="outline"
                        size="lg"
                        className="px-8"
                      >
                        Load More Campaigns
                      </Button>
                    </div>
                  )}
                </div>

                {/* Loading indicator */}
                {loading && (
                  <div className="text-center py-8">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div key={index} className="animate-pulse">
                        <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                )}

                {/* No more campaigns message */}
                {!hasMore && displayCampaigns.length > 0 && !loading && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No more campaigns to load</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
