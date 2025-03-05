"use client";
import { Button } from "@/components/ui/button";
import useGetProfile from "@/hooks/api/account/useGetProfile";
import { LayoutPanelLeft, Mail, Menu, Plus } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { useState } from "react";
import AvatarMenu from "./AvatarNavbar";
import SearchBar from "./NavbarSearchbar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const session = useSession();
  const user = session.data?.user;
  const { data: profile } = useGetProfile({ enabled: !!user });
  const userRole = user?.role;

  const isUser = userRole === "USER";
  const isAdmin = userRole === "ADMIN";
  const isDeveloper = userRole === "DEVELOPER";
  const avatarSrc = isAdmin
    ? profile?.company?.logo || "/anonymous.svg"
    : profile?.profilePicture || user?.profilePicture || "/anonymous.svg";

  const getLogo = () => {
    if (isDeveloper) return "/logo-developer.png";
    if (isAdmin) return "/logo-company.svg";
    return "/logo.svg";
  };

  const getVerificationUrl = () => {
    if (isAdmin) return "/dashboard/admin/settings";
    return "/dashboard/user/settings";
  };

  let navLinks;
  const noUserMenuLinks = [
    { href: "/", label: "Home" },
    { href: "/jobs", label: "Find Job" },
    { href: "/companies", label: "Find Employers" },
    { href: "/skill-assessments", label: "Skill Assessments" },
    { href: "/subscriptions", label: "Subscriptions" },
    { href: "/about-us", label: "About Us" },
  ];
  const userMenuLinks = [
    { href: "/", label: "Home" },
    { href: "/jobs", label: "Find Job" },
    { href: "/companies", label: "Find Employers" },
    { href: "/skill-assessments", label: "Skill Assessments" },
    { href: "/subscriptions", label: "Subscriptions" },
    { href: "/dashboard/user", label: "Dashboard" },
    { href: "/about-us", label: "About Us" },
  ];
  const adminMenuLinks = [
    { href: "/", label: "Home" },
    { href: "/jobs", label: "Find Job" },
    { href: "/companies", label: "Find Employers" },
    { href: "/dashboard/admin", label: "Dashboard" },
    { href: "/about-us", label: "About Us" },
  ];
  const developerMenuLinks = [
    { href: "/", label: "Home" },
    { href: "/jobs", label: "Find Job" },
    { href: "/companies", label: "Find Employers" },
    { href: "/skill-assessments", label: "Skill Assessments" },
    { href: "/dashboard/developer", label: "Dashboard" },
    { href: "/about-us", label: "About Us" },
  ];

  if (isUser) navLinks = userMenuLinks;
  else if (isAdmin) navLinks = adminMenuLinks;
  else if (isDeveloper) navLinks = developerMenuLinks;
  else navLinks = noUserMenuLinks;

  const renderDesktopUserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-12 w-12 rounded-full">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={avatarSrc}
              alt={user?.fullName || "User"}
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
          <Link href="/dashboard/developer" className="flex items-center">
            <DropdownMenuItem className="cursor-pointer">
              <LayoutPanelLeft className="mr-2 h-4 w-4" /> Dashboard
            </DropdownMenuItem>
          </Link>
        ) : isAdmin ? (
          <Link href="/dashboard/admin/settings">
            <DropdownMenuItem className="cursor-pointer">
              Profile Settings
            </DropdownMenuItem>
          </Link>
        ) : isUser ? (
          <Link href="/dashboard/user/settings">
            <DropdownMenuItem className="cursor-pointer">
              Profile Settings
            </DropdownMenuItem>
          </Link>
        ) : null}

        {userRole ? (
          <DropdownMenuItem
            className="cursor-pointer text-red-600"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Logout
          </DropdownMenuItem>
        ) : (
          <Link href="/login">
            <DropdownMenuItem className="cursor-pointer text-blue-500">
              Login
            </DropdownMenuItem>
          </Link>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const renderMobileUserMenu = () => (
    <div className="lg:hidden">
      <AvatarMenu
        session={session.data}
        avatarSrc={avatarSrc}
        onSignOut={() => signOut({ callbackUrl: "/login" })}
      />
    </div>
  );

  const renderVerificationButton = () => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={getVerificationUrl()}>
              <Button variant="ghost" size="icon" className="relative">
                <Mail className="h-5 w-5 text-amber-500" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Email not verified. Click to verify your email.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

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
              {isDeveloper && <></>}
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
            {userRole ? (
              <>
                {profile && profile.isVerified === false
                  ? renderVerificationButton()
                  : null}
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
      {!userRole && isMenuOpen && (
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
