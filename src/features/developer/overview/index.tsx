"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import useGetDeveloperOverview from "@/hooks/api/overview/useGetDeveloperOverview";
import DashboardOverview from "./components/DashboardOverview";
import OverviewCardSkeleton from "./components/OverviewCardSkeleton";

const DeveloperOverviewPage = () => {
  const { data: developerOverview, isLoading } = useGetDeveloperOverview();

  return (
    <div className="">
      <Breadcrumb className="py-2 pl-1">
        <BreadcrumbList>
          <BreadcrumbItem className="font-semibold text-gray-900">
            Dashboard
          </BreadcrumbItem>
          <BreadcrumbSeparator />
        </BreadcrumbList>
      </Breadcrumb>
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
