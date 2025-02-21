import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface UserAgeRanges {
  data: { province: string; users: number }[];
}

const useGetUsersCountByProvince = () => {
  return useQuery({
    queryKey: ["user-count-by-province"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<UserAgeRanges>(
        `/users/count/province`,
      );
      return data;
    },
  });
};

export default useGetUsersCountByProvince;
