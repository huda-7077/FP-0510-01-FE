"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountSettings from "@/features/user/settings/components/account-settings/AccountSettings";
import { House, Map, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import CompanyLocationSettings from "./company-location";
import CompanyProfile from "./company-profile";

const CompanySettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    const storedTab = localStorage.getItem("settingsTab");
    if (storedTab) {
      setActiveTab(storedTab);
    }
  }, []);

  return (
    <div className="container relative mx-auto p-4 sm:p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="w-full overflow-x-auto">
          <div className="min-w-max border-b border-border">
            <h1 className="mb-4 text-xl font-semibold sm:mb-6 sm:text-2xl">
              Settings
            </h1>
            <TabsList className="flex h-auto w-full justify-start gap-1 rounded-none bg-transparent p-0 md:gap-6">
              <TabsTrigger
                value="profile"
                className="relative flex gap-2 rounded-none px-4 py-2 text-xs after:absolute after:inset-x-0 after:bottom-[-1px] after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:text-[#0a65cc] data-[state=active]:shadow-none data-[state=active]:after:bg-[#0a65cc] [&_svg]:data-[state=active]:stroke-[#0a65cc]"
              >
                <House className="h-4 w-4" />
                <span className="hidden sm:inline">Profile</span>
                <span className="sm:hidden">Info</span>
              </TabsTrigger>

              <TabsTrigger
                value="location"
                className="relative flex gap-2 rounded-none px-4 py-2 text-xs after:absolute after:inset-x-0 after:bottom-[-1px] after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:text-[#0a65cc] data-[state=active]:shadow-none data-[state=active]:after:bg-[#0a65cc] [&_svg]:data-[state=active]:stroke-[#0a65cc]"
              >
                <Map className="h-4 w-4" />
                <span className="hidden sm:inline">Company Locations</span>
                <span className="sm:hidden">locations</span>
              </TabsTrigger>

              <TabsTrigger
                value="account"
                className="relative flex gap-2 rounded-none px-4 py-2 text-xs after:absolute after:inset-x-0 after:bottom-[-1px] after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:text-[#0a65cc] data-[state=active]:shadow-none data-[state=active]:after:bg-[#0a65cc] [&_svg]:data-[state=active]:stroke-[#0a65cc]"
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Account Settings</span>
                <span className="sm:hidden">Account</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="profile">
          {activeTab === "profile" && <CompanyProfile />}
        </TabsContent>

        <TabsContent value="location">
          {/* {activeTab === "location" && <CompanyLocationsTable />} */}
          {activeTab === "location" && <CompanyLocationSettings />}
        </TabsContent>

        <TabsContent value="account">
          {activeTab === "account" && <AccountSettings />}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompanySettingsPage;
