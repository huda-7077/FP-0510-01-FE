"use client";
import DashboardBreadcrumb from "@/components/DashboardBreadcrumb";
import DashboardOverview from "./components/DashboardOverview";
import useGetDeveloperOverview from "@/hooks/api/overview/useGetDeveloperOverview";
import OverviewCardSkeleton from "./components/OverviewCardSkeleton";

const DeveloperOverviewPage = () => {
  const { data: developerOverview, isLoading } = useGetDeveloperOverview();

  return (
    <div className="">
      <DashboardBreadcrumb route="developer" lastCrumb="Overview" />
      <h1 className="mb-6 mt-2 text-2xl font-bold">Dashboard Overview</h1>
      {isLoading && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <OverviewCardSkeleton bgColor="bg-blue-500" />
          <OverviewCardSkeleton bgColor="bg-green-500" />
          <OverviewCardSkeleton bgColor="bg-yellow-500" />
          <OverviewCardSkeleton bgColor="bg-yellow-700" />
          <OverviewCardSkeleton bgColor="bg-purple-500" />
          <OverviewCardSkeleton bgColor="bg-indigo-500" />
          <OverviewCardSkeleton bgColor="bg-red-500" />
          <OverviewCardSkeleton bgColor="bg-teal-500" />
        </div>
      )}
      {developerOverview && <DashboardOverview data={developerOverview} />}
    </div>
  );
};

export default DeveloperOverviewPage;
