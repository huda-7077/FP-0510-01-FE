"use client";

import React, { useState } from "react";

import Sidebar from "../sidebar/Sidebar";
import { developerSidebarLinks } from "../consts";
import Developerbar from "../Developerbar";

interface DeveloperLayoutProps {
  children: React.ReactNode;
}

export const DeveloperLayout = ({ children }: DeveloperLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Developerbar />
      <div className="min-w-screen h-full">
        <div className="container relative mx-auto flex">
          <Sidebar
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
            links={developerSidebarLinks}
            dashboardName="DEVELOPER DASHBOARD"
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
