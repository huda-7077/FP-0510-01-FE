import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogOut, LucideIcon, Menu, X } from "lucide-react";
import { signOut } from "next-auth/react";
import UserSidebarLink from "./components/UserSidebarLink";

interface SidebarProps {
  links: { name: string; url: string; icon: LucideIcon }[];
  isOpen: boolean;
  onToggle: () => void;
}
const UserSidebar = ({ links, isOpen, onToggle }: SidebarProps) => {
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
          "fixed left-0 top-16 z-30 h-[calc(100vh-64px)] w-64 transform border-r border-gray-200 bg-white ps-4 transition-transform duration-200 ease-in-out lg:sticky lg:top-32 lg:h-[calc(100vh-112px)] lg:translate-x-0",
          !isOpen && "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex-1 space-y-2 overflow-y-auto p-4">
            <div className="my-4">
              <p className="px-3 text-xs font-medium uppercase text-gray-500">
                CANDIDATE DASHBOARD
              </p>
            </div>

            <div className="space-y-2">
              {links.map((link, index) => (
                <UserSidebarLink
                  key={index}
                  icon={link.icon}
                  label={link.name}
                  url={link.url}
                />
              ))}
            </div>
          </div>

          <div className="p-4">
            <Button
              variant="ghost"
              className="flex w-full items-center justify-start space-x-3 rounded-lg px-3 py-2 transition-colors hover:bg-blue-50"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              <LogOut className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Log Out</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSidebar;
