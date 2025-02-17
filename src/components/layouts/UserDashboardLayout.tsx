"use client";

import React, { useState } from "react";
import { userSidebarLinks } from "../consts";
import Navbar from "../Navbar";
import UserSidebar from "../user-sidebar/UserSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const UserDashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Navbar />
      <div className="min-w-screen h-full">
        <div className="container relative mx-auto flex">
          <UserSidebar
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
            links={userSidebarLinks}
          />

          <div className="flex-1 overflow-auto p-4 lg:p-6">
            {sidebarOpen && (
              <div
                className="fixed inset-0 z-20 bg-black/50 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            <div className="mx-auto max-w-6xl">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};
