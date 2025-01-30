// app/path-tracker.tsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function PathTracker({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    console.log("Current pathname:", pathname);
    if (
      !pathname.includes("/login") &&
      !pathname.includes("/register") &&
      !pathname.includes("/api")
    ) {
      localStorage.setItem("lastPath", pathname);
      console.log("Stored path in localStorage:", pathname);
    }
  }, [pathname]);

  return children;
}
