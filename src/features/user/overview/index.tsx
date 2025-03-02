"use client";

import { Button } from "@/components/ui/button";
import useGetUserJobApplications from "@/hooks/api/job-applications/useGetUserJobApplications";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import OverviewButtons from "./components/OverviewButtons";
import ProfileAlert from "./components/ProfileAlert";
import RecentJobs from "./components/RecentJobs";
import useGetProfile from "@/hooks/api/account/useGetProfile";
import useGetSavedJobs from "@/hooks/api/saved-job/useGetSavedJobs";

const OverviewPage = () => {
  const {
    data: profileData,
    isLoading: isLoadingProfile,
    error: profileError,
  } = useGetProfile();

  const {
    data: applicationsData,
    isLoading: isLoadingApplications,
    error: applicationsError,
  } = useGetUserJobApplications({
    page: 1,
    take: 5,
  });

  const userName = profileData?.fullName || "User";

  const applicationStats = {
    total: applicationsData?.meta?.total || 0,
    applications: applicationsData?.data || [],
    isLoading: isLoadingApplications,
    error: applicationsError,
  };

  const { data } = useGetSavedJobs(
    {
      page: 1,
      take: 5,
    },
    {
      enabled: !isLoadingProfile,
      staleTime: 5 * 60 * 1000,
    },
  );
  const favoritesCount = data?.meta?.total || 0;

  const isLoading = isLoadingProfile || isLoadingApplications;

  return (
    <div className="container mx-auto space-y-6 p-4 sm:p-6 md:space-y-8">
      <div>
        <h1 className="text-xl">
          {isLoadingProfile ? "Loading..." : `Hello, ${userName}!`}
        </h1>
        <p className="text-gray-400">Here's your daily activities</p>
      </div>

      <OverviewButtons
        totalApplications={applicationStats.total}
        totalFavorites={favoritesCount}
        isLoading={isLoading}
      />

      <ProfileAlert profileData={profileData} isLoading={isLoadingProfile} />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg">Recently Applied</h2>
          <Link href="/dashboard/user/jobs">
            <Button
              variant="outline"
              className="group self-start border-none text-gray-400 shadow-none transition-colors hover:text-gray-400 sm:self-auto"
            >
              View all
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <RecentJobs
          applications={applicationStats.applications.slice(0, 4)}
          isLoading={applicationStats.isLoading}
          error={applicationStats.error}
        />
      </div>
    </div>
  );
};

export default OverviewPage;
