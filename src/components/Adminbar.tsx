"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell, Menu, Plus } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import useGetProfile from "@/hooks/api/account/useGetProfile";

// Helper function to get initials from full name
const getInitials = (fullName: string) => {
  return fullName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const { data: profile } = useGetProfile();

  const userRole = session?.user?.role || "USER";
  const isAdmin = userRole === "ADMIN";
  const isDeveloper = userRole === "DEVELOPER";

  // Get profile picture or use anonymous fallback
  const profilePicture =
    profile?.profilePicture ||
    session?.user?.profilePicture ||
    "/anonymous.svg";

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/find-job", label: "Find Job" },
    { href: "/find-employers", label: "Find Employers" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/job-alerts", label: "Job Alerts" },
    { href: "/customer-supports", label: "Customer Supports" },
  ];

  const renderUserMenu = (isMobile = false) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`relative ${isMobile ? "w-full justify-start gap-2 px-2" : "h-8 w-8 rounded-full"}`}
        >
          <Avatar className={`${isMobile ? "h-8 w-8" : "h-8 w-8"}`}>
            <AvatarImage
              src={profilePicture}
              alt={session?.user?.fullName || "User"}
            />
            <AvatarFallback>
              <Image
                src="/anonymous.svg"
                alt="Anonymous User"
                width={32}
                height={32}
              />
            </AvatarFallback>
          </Avatar>
          {isMobile && (
            <span className="text-sm font-medium">
              {session?.user?.fullName || "User Profile"}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`w-56 ${isMobile ? "relative" : ""}`}
        align={isMobile ? "center" : "end"}
        forceMount
      >
        <DropdownMenuItem className="cursor-pointer">
          Profile Settings
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer text-red-600"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const renderTopBar = () => (
    <div className="hidden border-b bg-gray-50 px-6 py-2 lg:block">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 md:px-6">
        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-blue-600"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  const renderMobileMenu = () => (
    <div className="border-t lg:hidden">
      <div className="container mx-auto px-4 py-4">
        {!isAdmin && !isDeveloper && (
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Job title, keyword, company"
                className="w-full pl-10"
              />
            </div>
          </div>
        )}

        <div className="flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-blue-600"
            >
              {link.label}
            </Link>
          ))}

          {(isAdmin || isDeveloper) && (
            <Button
              variant="default"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="mr-2 h-4 w-4" /> Post A Job
            </Button>
          )}

          {renderUserMenu(true)}
        </div>
      </div>
    </div>
  );

  const renderMainContent = () => {
    if (isAdmin || isDeveloper) {
      return (
        <nav className="border-b">
          <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
            <div className="flex items-center p-4">
              <Link href="/">
                <Image
                  src="/logo-company.svg"
                  alt="logo"
                  width={125}
                  height={50}
                  className="object-contain"
                />
              </Link>
            </div>
            <div className="ml-auto flex items-center space-x-4">
              <Button
                variant="default"
                className="hidden bg-blue-600 hover:bg-blue-700 md:flex"
              >
                <Plus className="mr-2 h-4 w-4" /> Post A Job
              </Button>
              {renderUserMenu()}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </nav>
      );
    }

    return (
      <div className="container mx-auto px-4 py-3 md:px-6">
        <nav className="flex items-center justify-between gap-8">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-14 w-28">
                <Image
                  src="/logo.svg"
                  alt="icon"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>

            <div className="hidden lg:block lg:flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Job title, keyword, company"
                  className="w-full max-w-xl pl-10"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {session ? (
              <>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
                </Button>
                {renderUserMenu()}
              </>
            ) : (
              <Link href="/login">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Sign in
                </Button>
              </Link>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </nav>
      </div>
    );
  };

  return (
    <header
      className={`bg-white ${isAdmin || isDeveloper ? "sticky left-0 top-0 z-50" : "border-b"}`}
    >
      {renderTopBar()}
      {renderMainContent()}
      {isMenuOpen && renderMobileMenu()}
    </header>
  );
};

export default Navbar;
