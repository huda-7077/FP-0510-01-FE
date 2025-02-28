"use client";
import { Button } from "@/components/ui/button";
import useGetProfile from "@/hooks/api/account/useGetProfile";
import { Bell, LayoutPanelLeft, Menu, Plus, Settings } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import AvatarMenu from "./AvatarNavbar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import SearchBar from "./NavbarSearchbar";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { data: session, status } = useSession();
  const { data: profile } = useGetProfile({ enabled: !!session?.user });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || status === "loading") {
    return null;
  }

  const userRole = session?.user?.role || "USER";
  const isAdmin = userRole === "ADMIN";
  const isDeveloper = userRole === "DEVELOPER";
  const avatarSrc = isAdmin
    ? profile?.company?.logo || "/anonymous.svg"
    : profile?.profilePicture ||
      session?.user?.profilePicture ||
      "/anonymous.svg";

  const getLogo = () => {
    if (isDeveloper) return "/logo-developer.png";
    if (isAdmin) return "/logo-company.svg";
    return "/logo.svg";
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/jobs", label: "Find Job" },
    { href: "/companies", label: "Find Employers" },
    {
      href:
        profile?.role === "ADMIN"
          ? "/dashboard/admin"
          : profile?.role === "USER"
            ? "/dashboard/user"
            : "/dashboard/developer",
      label: "Dashboard",
    },
    { href: "/job-alerts", label: "Job Alerts" },
    { href: "/customer-supports", label: "Customer Supports" },
  ];

  const renderDesktopUserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-12 w-12 rounded-full">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={avatarSrc}
              alt={session?.user?.fullName || "User"}
              className="object-cover"
            />
            <AvatarFallback>
              <Image
                src="/anonymous.svg"
                alt="Anonymous User"
                width={48}
                height={48}
                priority
              />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        {isDeveloper ? (
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/dashboard/developer" className="flex items-center">
              <LayoutPanelLeft className="mr-2 h-4 w-4" /> Dashboard
            </Link>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem className="cursor-pointer">
            Profile Settings
          </DropdownMenuItem>
        )}

        <DropdownMenuItem
          className="cursor-pointer text-red-600"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const renderMobileUserMenu = () => (
    <div className="lg:hidden">
      <AvatarMenu
        session={session}
        avatarSrc={avatarSrc}
        onSignOut={() => signOut({ callbackUrl: "/login" })}
      />
    </div>
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

  const renderMainContent = () => {
    if (isAdmin || isDeveloper) {
      return (
        <nav className="w-full border-b">
          <div className="h-18 container mx-auto flex items-center px-4 md:px-6">
            <div className="flex items-center p-4">
              <Link href="/">
                <Image
                  src={getLogo()}
                  alt="logo"
                  width={125}
                  height={50}
                  className="object-contain"
                  priority
                />
              </Link>
            </div>
            <div className="ml-auto flex items-center space-x-4">
              {isAdmin && (
                <Link href="/dashboard/admin/jobs/create">
                  <Button
                    variant="default"
                    className="hidden bg-blue-600 hover:bg-blue-700 md:flex"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Post A Job
                  </Button>
                </Link>
              )}
              {isDeveloper && (
                <>
                  {/* <Link href="/dashboard/developer/subscription-categories/create">
                    <Button
                      variant="default"
                      className="hidden bg-blue-600 hover:bg-blue-700 md:flex"
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Subscription
                      Category
                    </Button>
                  </Link> */}
                  {/* <Link href="/dashboard/developer">
                    <Button variant="ghost" className="hidden md:flex">
                      <LayoutPanelLeft className="mr-2 h-4 w-4" /> Developer
                      Dashboard
                    </Button>
                  </Link> */}
                </>
              )}
              <div className="hidden lg:block">{renderDesktopUserMenu()}</div>
              <div className="lg:hidden">{renderMobileUserMenu()}</div>
            </div>
          </div>
        </nav>
      );
    }
    return (
      <div className="container mx-auto px-4 py-3 md:px-6">
        <nav className="flex items-center justify-between gap-8">
          <div className="flex w-3/4 items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-14 w-28">
                <Image
                  src={getLogo()}
                  alt="icon"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
            <div className="hidden lg:block lg:flex-1">
              <SearchBar />
            </div>
          </div>
          <div className="flex items-center gap-4">
            {session ? (
              <>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
                </Button>
                <div className="hidden lg:block">{renderDesktopUserMenu()}</div>
                <div className="lg:hidden">{renderMobileUserMenu()}</div>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Sign in
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </>
            )}
          </div>
        </nav>
      </div>
    );
  };

  return (
    <header className="sticky left-0 top-0 z-50 bg-white shadow-sm">
      {renderTopBar()}
      {renderMainContent()}
      {!session && isMenuOpen && (
        <div className="border-t lg:hidden">
          <div className="container mx-auto px-4 py-4">
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
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
