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
  )
    return <LoadingScreen />;

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <GenderCountCard data={userGenderCount?.data || []} />
        <AgeRangesCard data={ageRanges?.data || []} />
      </div>
      <UsersByProvinceCard data={userByProvince?.data || []} />
    </div>
  );
};

export default UserDemographics;
