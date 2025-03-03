"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContactRound, Link2Icon, Settings, User } from "lucide-react";
import { useEffect, useState } from "react";
import AccountSettings from "./components/account-settings/AccountSettings";
import PersonalForm from "./components/personal-settings/PersonalForm";
import { WorkExperienceList } from "./components/work-experience/workExperienceList";
import DashboardBreadcrumb from "@/components/DashboardBreadcrumb";

const UserSettingsPage = () => {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <>
      <DashboardBreadcrumb route="user" lastCrumb="Settings" />
      <div className="container relative mx-auto px-1 py-2">
        <h1 className="mb-4 text-xl font-semibold sm:mb-6 sm:text-2xl">
          Settings
        </h1>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="w-full overflow-x-auto">
            <div className="min-w-max border-b border-border">
              <TabsList className="flex h-auto w-full justify-start gap-1 rounded-none bg-transparent p-0 md:gap-6">
                <TabsTrigger
                  value="personal"
                  className="relative flex gap-2 rounded-none px-4 py-2 text-xs after:absolute after:inset-x-0 after:bottom-[-1px] after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:text-[#0a65cc] data-[state=active]:shadow-none data-[state=active]:after:bg-[#0a65cc] [&_svg]:data-[state=active]:stroke-[#0a65cc]"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Personal</span>
                  <span className="sm:hidden">Info</span>
                </TabsTrigger>

                <TabsTrigger
                  value="experience"
                  className="relative flex gap-2 rounded-none px-4 py-2 text-xs after:absolute after:inset-x-0 after:bottom-[-1px] after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:text-[#0a65cc] data-[state=active]:shadow-none data-[state=active]:after:bg-[#0a65cc] [&_svg]:data-[state=active]:stroke-[#0a65cc]"
                >
                  <ContactRound className="h-4 w-4" />
                  <span className="hidden sm:inline">Work Experience</span>
                  <span className="sm:hidden">Work</span>
                </TabsTrigger>

                <TabsTrigger
                  value="account"
                  className="relative flex gap-2 rounded-none px-4 py-2 text-xs after:absolute after:inset-x-0 after:bottom-[-1px] after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:text-[#0a65cc] data-[state=active]:shadow-none data-[state=active]:after:bg-[#0a65cc] [&_svg]:data-[state=active]:stroke-[#0a65cc]"
                >
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Account Setting</span>
                  <span className="sm:hidden">Account</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="personal">
            {activeTab === "personal" && <PersonalForm />}
          </TabsContent>

          <TabsContent value="experience">
            {activeTab === "experience" && <WorkExperienceList />}
          </TabsContent>

          <TabsContent value="account">
            {activeTab === "account" && <AccountSettings />}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default UserSettingsPage;
