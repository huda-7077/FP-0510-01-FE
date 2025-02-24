"use client";

import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BriefcaseBusiness, DollarSign, Heart, Users } from "lucide-react";
import { useState } from "react";
import UserDemographics from "./components/user-demographics/UserDemographics";
import ApplicantInterests from "./components/applicant-interests/ApplicantInterests";

const OverviewComponent = () => {
  const [activeTab, setActiveTab] = useState("userDemographics");

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="h-full w-full"
        >
          <div className="w-full">
            <div className="min-w-max border-b border-border">
              <h1 className="mb-4 text-xl font-semibold sm:mb-6 sm:text-2xl">
                Overview
              </h1>
              <TabsList className="flex h-auto w-full justify-start gap-1 rounded-none bg-transparent p-0 md:gap-6">
                <TabsTrigger
                  value="userDemographics"
                  className="relative flex gap-2 rounded-none px-4 py-2 text-xs after:absolute after:inset-x-0 after:bottom-[-1px] after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:text-[#0a65cc] data-[state=active]:shadow-none data-[state=active]:after:bg-[#0a65cc] [&_svg]:data-[state=active]:stroke-[#0a65cc]"
                >
                  <Users className="h-4 w-4" />
                  User Demographics
                </TabsTrigger>
                <TabsTrigger
                  value="applicantInterests"
                  className="relative flex gap-2 rounded-none px-4 py-2 text-xs after:absolute after:inset-x-0 after:bottom-[-1px] after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:text-[#0a65cc] data-[state=active]:shadow-none data-[state=active]:after:bg-[#0a65cc] [&_svg]:data-[state=active]:stroke-[#0a65cc]"
                >
                  <Heart className="h-4 w-4" />
                  Applicant Interests
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="userDemographics">
            <UserDemographics />
          </TabsContent>
          <TabsContent value="applicantInterests">
            <ApplicantInterests />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default OverviewComponent;
