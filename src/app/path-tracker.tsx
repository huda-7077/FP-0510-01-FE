"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function PathTracker({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (
      !pathname.includes("/login") &&
      !pathname.includes("/register") &&
      !pathname.includes("/forgot-password") &&
      !pathname.includes("/reset-password")
    ) {
      localStorage.setItem("lastPath", pathname);
    }
  }, [pathname]);

  return children;
}
