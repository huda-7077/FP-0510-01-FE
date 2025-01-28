import React from "react";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  FileText,
  Bookmark,
  Building2,
  Settings,
  Menu,
  LogOut,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";

interface SidebarProps {
  links: { name: string; url: string; icon: LucideIcon }[];
  isOpen: boolean;
  onToggle: () => void;
}

interface SidebarLinkProps {
  icon: LucideIcon;
  label: string;
  url: string;
}

const SidebarLink = ({ icon: Icon, url, label }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(url);

  return (
    <Link href={url} className="block">
      <div
        className={cn(
          "flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors hover:bg-blue-50",
          isActive && "bg-blue-50 text-blue-600",
        )}
      >
        <Icon
          className={cn(
            "h-5 w-5",
            isActive ? "text-blue-600" : "text-gray-500",
          )}
        />
        <span
          className={cn(
            "text-sm font-medium",
            isActive ? "text-blue-600" : "text-gray-700",
          )}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

const Sidebar = ({ links, isOpen, onToggle }: SidebarProps) => {
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "fixed bottom-4 right-4 z-40 rounded-full lg:hidden",
          "bg-blue-600 shadow-lg hover:bg-blue-500",
        )}
        onClick={onToggle}
      >
        {isOpen ? <X color="white" /> : <Menu color="white" />}
      </Button>

      <div
        className={cn(
          "fixed inset-y-0 left-0 top-16 z-30 h-[calc(100vh-65px)] w-64 transform border-r border-gray-200 bg-white ps-4 transition-transform duration-200 ease-in-out lg:sticky lg:translate-x-0",
          !isOpen && "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex-1 space-y-1 overflow-y-auto p-4">
            <div className="mb-4">
              <p className="px-3 text-xs font-medium uppercase text-gray-500">
                EMPLOYERS DASHBOARD
              </p>
            </div>

            <div className="space-y-2">
              {links.map((link, index) => (
                <SidebarLink
                  key={index}
                  icon={link.icon}
                  label={link.name}
                  url={link.url}
                />
              ))}
            </div>
          </div>

          <div className="p-4">
            <SidebarLink icon={LogOut} label="Log out" url="/logout" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
