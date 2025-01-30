import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

export default SidebarLink;
