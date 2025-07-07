"use client";

import { Search, Menu, X, Heart, Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "@/public/Logo.png";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { userProfile } from "@/types/campaign";
import { Logout } from "@/lib/actions/logout";
import { redirect } from "next/navigation";

export default function CrowdfundingToolbar({
  userPromise,
  onSearchOpen,
}: {
  userPromise: Promise<userProfile>;
  onSearchOpen?: () => void;
}) {
  const data = use(userPromise);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(true);
  }, [data]);

  const handleSearchClick = () => {
    if (onSearchOpen) {
      onSearchOpen();
    }
  };

  const redirectItems = [
    { label: "Categories", href: "/categories" },
    { label: "How it Works", href: "/HowItWorks" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image src={Logo} alt="Your Company" className="h-8 w-auto" />
              <span className="font-bold text-xl text-gray-900">One Hand</span>
            </Link>
          </div>

          {/* Desktop redirect */}
          <nav className="hidden lg:flex items-center space-x-6">
            {redirectItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
            {data?.roles == "ADMIN" ? (
              <a
                href="/dashboard"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors whitespace-nowrap"
              >
                Dashboard
              </a>
            ) : null}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search projects..."
                className="pl-10 pr-4 w-full bg-gray-50 border-gray-200 focus:bg-white"
                onClick={handleSearchClick}
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Start Project Button */}
            <Button
              className="hidden sm:flex bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => redirect("/campaign/create")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Start a campaign
            </Button>

            {/* Mobile Search */}
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Search className="h-5 w-5" />
            </Button>

            {isLoggedIn ? (
              <>
                {/* Notifications */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hidden sm:flex"
                >
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                    3
                  </Badge>
                </Button>

                {/* Favorites */}
                <Button variant="ghost" size="icon" className="hidden sm:flex">
                  <Heart className="h-5 w-5" />
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={
                            data?.avatar ||
                            "https://imagehandler.fra1.digitaloceanspaces.com/defautuser.jpg"
                          }
                          alt="User"
                        />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">
                        {data?.username || "Guest"}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {data?.username || "Guest"}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {data?.email || "Guest@email.com"}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        redirect("/mycampaigns");
                      }}
                    >
                      My Projects
                    </DropdownMenuItem>
                    <DropdownMenuItem>Backed Projects</DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        redirect("/profile");
                      }}
                    >
                      Profile Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        Logout();
                        setIsLoggedIn(false);
                      }}
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => {
                    redirect("/auth");
                  }}
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => {
                    redirect("/auth");
                  }}
                  className="hidden sm:flex"
                >
                  Sign Up
                </Button>
              </>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Search */}
              <div className="px-3 py-2 lg:hidden">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="search"
                    placeholder="Search projects..."
                    className="pl-10 pr-4 w-full bg-gray-50 border-gray-200"
                  />
                </div>
              </div>

              {/* Mobile redirect */}
              {redirectItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                >
                  {item.label}
                </a>
              ))}

              {/* Mobile Actions */}
              <div className="px-3 py-2 space-y-2">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Start a Project
                </Button>

                {!isLoggedIn && (
                  <Button
                    variant="outline"
                    className="w-full sm:hidden"
                    onClick={() => {
                      redirect("/auth");
                    }}
                  >
                    Sign Up
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
