"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarMenuProps {
  session: { user: { fullName: string; role: string } } | null;
  navLinks: { href: string; label: string }[];
  avatarSrc: string;
  onSignOut: () => void;
}

const AvatarMenu: React.FC<AvatarMenuProps> = ({
  session,
  navLinks,
  avatarSrc,
  onSignOut,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const userRole = session?.user?.role || "USER";

  const userNavLinks = [
    { href: "/", label: "Home" },
    { href: "/dashboard/user", label: "Dashboard" },
    { href: "/jobs", label: "Find Job" },
    { href: "/find-employers", label: "Find Employers" },
    { href: "/job-alerts", label: "Job Alerts" },
    { href: "/customer-supports", label: "Customer Supports" },
    { href: "/dashboard/user/settings", label: "Settings" },
  ];

  const adminNavLinks = [
    { href: "/dashboard/admin/overview", label: "Dashboard" },
    { href: "/dashboard/admin/jobs", label: "Manage Jobs" },
    { href: "/dashboard/admin/jobs/create", label: "Post a Job" },
    { href: "/analytics", label: "Analytics" },
    { href: "/dashboard/admin/settings", label: "Settings" },
  ];

  const currentNavLinks = userRole === "ADMIN" ? adminNavLinks : userNavLinks;

  return (
    <>
      <Button
        variant="ghost"
        className="relative h-12 w-12 rounded-full transition-transform hover:scale-105 active:scale-95"
        onClick={() => setIsOpen(true)}
      >
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={avatarSrc}
            alt={session?.user?.fullName || "User"}
          />
          <AvatarFallback>
            <Image
              src="/anonymous.svg"
              alt="Anonymous User"
              width={48}
              height={48}
            />
          </AvatarFallback>
        </Avatar>
      </Button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Menu */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full bg-white transition-transform duration-300 ease-out md:w-[400px] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b p-4">
            <div className="relative flex-1 pr-4">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Job title, keyword, company"
                className="w-full pl-10"
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 transition-transform hover:rotate-90"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <nav className="flex flex-col space-y-4">
              {currentNavLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transform text-base text-gray-600 transition-all hover:translate-x-2 hover:text-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="border-t p-4">
            <button
              onClick={() => {
                setIsOpen(false);
                onSignOut();
              }}
              className="w-full text-left text-base text-red-600 transition-colors hover:text-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AvatarMenu;
