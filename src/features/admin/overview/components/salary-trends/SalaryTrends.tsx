"use client";

import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import useGetAvgSalaryByPosition from "@/hooks/api/job-applications/useGetAvgSalaryByPosition";
import useGetAvgSalaryByProvince from "@/hooks/api/job-applications/useGetAvgSalaryByProvince";
import { useState } from "react";
import SalaryByPositionCard from "./SalaryByPositionCard";
import SalaryByProvinceCard from "./SalaryByProvinceCard";

const SalaryTrends = () => {
  const [timeRangeAvgSalaryPosition, setTimeRangeAvgSalaryPosition] =
    useState("All Time");

  const [timeRangeAvgSalaryProvince, setTimeRangeAvgSalaryProvince] =
    useState("All Time");

  const { data: avgSalaryPosition, isLoading: isGetAvgSalaryPositionLoading } =
    useGetAvgSalaryByPosition({ timeRange: timeRangeAvgSalaryPosition });

  const { data: avgSalaryProvince, isLoading: isGetAvgSalaryProvinceLoading } =
    useGetAvgSalaryByProvince({ timeRange: timeRangeAvgSalaryProvince });

  const handleTimeRangeAvgSalaryPositionChange = (timeRange: string) => {
    setTimeRangeAvgSalaryPosition(timeRange);
  };

  const handleTimeRangeAvgSalaryProvinceChange = (timeRange: string) => {
    setTimeRangeAvgSalaryProvince(timeRange);
  };

  if (isGetAvgSalaryPositionLoading && isGetAvgSalaryProvinceLoading)
    return <LoadingScreen />;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <SalaryByPositionCard
        data={avgSalaryPosition?.data || []}
        onTimeRangeChange={handleTimeRangeAvgSalaryPositionChange}
      />
      <SalaryByProvinceCard
        data={avgSalaryProvince?.data || []}
        onTimeRangeChange={handleTimeRangeAvgSalaryProvinceChange}
      />
    </div>
  );
};

export default SalaryTrends;
