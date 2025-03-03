"use client";

import { Plus } from "lucide-react";
import React, { useState } from "react";
import { adminSidebarLinks } from "../consts";
import Navbar from "../Navbar";
import Sidebar from "../sidebar/Sidebar";
import { Button } from "../ui/button";
import { Link } from "next-view-transitions";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const postJobButton: JSX.Element = (
    <Link href="/dashboard/admin/jobs/create" className="flex w-full sm:hidden">
      <Button
        variant="default"
        className="w-full bg-blue-600 hover:bg-blue-800 md:flex"
      >
        <Plus className="mr-2 h-4 w-4" /> Post A Job
      </Button>
    </Link>
  );

  return (
    <>
      <Navbar />
      <div className="min-w-screen h-full">
        <div className="container relative mx-auto flex">
          <Sidebar
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
            links={adminSidebarLinks}
            dashboardName="EMPLOYERS DASHBOARD"
            addOn={postJobButton}
          />

          <div className="flex-1 p-4 lg:p-6">
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
