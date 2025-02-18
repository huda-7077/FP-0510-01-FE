"use client";
import { DeveloperLayout } from "@/components/layouts/DeveloperLayout";
import { usePathname } from "next/navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  if (pathname.startsWith("/dashboard/developer/skill-assessments/")) {
    return <>{children}</>;
  }
  return <DeveloperLayout>{children}</DeveloperLayout>;
};

export default DashboardLayout;
