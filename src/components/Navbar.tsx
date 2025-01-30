"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="flex items-center justify-between bg-white p-4 shadow">
      <div>Logo</div>
      <div className="flex items-center gap-4">
        {session ? (
          <>
            <span>
              Welcome, {session.user?.fullName || session.user?.email}
            </span>
            <div className="flex items-center gap-2">
              {String(session.user?.isVerified) === "true" ? (
                <span className="flex items-center gap-1 text-green-500">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  Verified
                </span>
              ) : (
                <span className="flex items-center gap-1 text-yellow-500">
                  <div className="h-2 w-2 rounded-full bg-yellow-500" />
                  Not Verified
                </span>
              )}
            </div>
            <Button
              onClick={() => signOut({ callbackUrl: "/login" })}
              variant="outline"
            >
              Logout
            </Button>
          </>
        ) : (
          <a href="/login">Sign In</a>
        )}
      </div>
    </nav>
  );
}
