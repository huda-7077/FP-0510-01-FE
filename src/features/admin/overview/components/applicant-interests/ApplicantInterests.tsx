"use client";

import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import useGetAvgSalaryByPosition from "@/hooks/api/job-applications/useGetAvgSalaryByPosition";
import useGetAvgSalaryByProvince from "@/hooks/api/job-applications/useGetAvgSalaryByProvince";
import useGetPopularJobCategories from "@/hooks/api/job/useGetPopularJobCategories";
import useGetPopularCompanyLocations from "@/hooks/api/company-location/useGetPopularCompanyLocations";
import { useState } from "react";
import SalaryByPositionCard from "./SalaryByPositionCard";
import SalaryByProvinceCard from "./SalaryByProvinceCard";
import PopularJobCategoriesCard from "./PopularJobCategoriesCard";
import PopularCompanyLocationsCard from "./PopularCompanyLocationsCard";

const ApplicantInterests = () => {
  const [timeRangeAvgSalaryPosition, setTimeRangeAvgSalaryPosition] =
    useState("All Time");
  const [timeRangeAvgSalaryProvince, setTimeRangeAvgSalaryProvince] =
    useState("All Time");
  const [timeRangePopularJobCategories, setTimeRangePopularJobCategories] =
    useState("Last 5 years");
  const [
    timeRangePopularCompanyLocations,
    setTimeRangePopularCompanyLocations,
  ] = useState("Last 5 years");

  const { data: avgSalaryPosition, isLoading: isGetAvgSalaryPositionLoading } =
    useGetAvgSalaryByPosition({ timeRange: timeRangeAvgSalaryPosition });

  const { data: avgSalaryProvince, isLoading: isGetAvgSalaryProvinceLoading } =
    useGetAvgSalaryByProvince({ timeRange: timeRangeAvgSalaryProvince });

  const {
    data: popularJobCategories,
    isLoading: isGetPopularJobCategoriesLoading,
  } = useGetPopularJobCategories({ timeRange: timeRangePopularJobCategories });

  const {
    data: popularCompanyLocations,
    isLoading: isGetPopularCompanyLocations,
  } = useGetPopularCompanyLocations({
    timeRange: timeRangePopularCompanyLocations,
  });

  const handleTimeRangeAvgSalaryPositionChange = (timeRange: string) => {
    setTimeRangeAvgSalaryPosition(timeRange);
  };

  const handleTimeRangeAvgSalaryProvinceChange = (timeRange: string) => {
    setTimeRangeAvgSalaryProvince(timeRange);
  };

  const handleTimeRangePopularJobCategoriesChange = (timeRange: string) => {
    setTimeRangePopularJobCategories(timeRange);
  };

  const handleTimeRangePopularCompanyLocationsChange = (timeRange: string) => {
    setTimeRangePopularCompanyLocations(timeRange);
  };

  if (
    isGetAvgSalaryPositionLoading &&
    isGetAvgSalaryProvinceLoading &&
    isGetPopularJobCategoriesLoading &&
    isGetPopularCompanyLocations
  ) {
    return <LoadingScreen />;
  }

  return (
    <div className="mx-auto w-full max-w-[1920px]">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
        <div className="min-w-0 overflow-hidden">
          <SalaryByPositionCard
            data={avgSalaryPosition?.data || []}
            onTimeRangeChange={handleTimeRangeAvgSalaryPositionChange}
          />
        </div>
        <div className="min-w-0 overflow-hidden">
          <SalaryByProvinceCard
            data={avgSalaryProvince?.data || []}
            onTimeRangeChange={handleTimeRangeAvgSalaryProvinceChange}
          />
        </div>
        <div className="min-w-0 overflow-hidden">
          <PopularJobCategoriesCard
            data={popularJobCategories?.data || []}
            onTimeRangeChange={handleTimeRangePopularJobCategoriesChange}
          />
        </div>
        <div className="min-w-0 overflow-hidden">
          <PopularCompanyLocationsCard
            data={popularCompanyLocations?.data || []}
            onTimeRangeChange={handleTimeRangePopularCompanyLocationsChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicantInterests;
