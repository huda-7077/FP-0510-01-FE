"use client";

import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import useGetUsersCountByAgeRanges from "@/hooks/api/user/useGetUserCountByAgeRanges";
import useGetUsersCountByGender from "@/hooks/api/user/useGetUsersCountByGender";
import useGetUsersCountByProvince from "@/hooks/api/user/useGetUsersCountByProvince";
import AgeRangesCard from "./AgeRangesCard";
import GenderCountCard from "./GenderCountCard";
import UsersByProvinceCard from "./UsersByProvinceCard";

const UserDemographics = () => {
  const { data: userGenderCount, isLoading: isUserGenderCountLoading } =
    useGetUsersCountByGender();

  const { data: ageRanges, isLoading: isGetUsersAgeRangesLoading } =
    useGetUsersCountByAgeRanges();

  const { data: userByProvince, isLoading: isGetUserByProvinceLoading } =
    useGetUsersCountByProvince();

  if (
    isUserGenderCountLoading &&
    isGetUsersAgeRangesLoading &&
    isGetUserByProvinceLoading
  ) {
    return <LoadingScreen />;
  }

  return (
    <div className="mx-auto w-full max-w-[1920px]">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="min-w-0 overflow-hidden">
            <GenderCountCard data={userGenderCount?.data || []} />
          </div>
          <div className="min-w-0 overflow-hidden">
            <AgeRangesCard data={ageRanges?.data || []} />
          </div>
        </div>

        <div className="min-w-0 overflow-hidden">
          <UsersByProvinceCard data={userByProvince?.data || []} />
        </div>
      </div>
    </div>
  );
};

export default UserDemographics;
