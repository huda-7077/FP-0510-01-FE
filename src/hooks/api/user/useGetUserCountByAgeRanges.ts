import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface UserAgeRanges {
  data: { age: string; userAges: number }[];
}

const useGetUsersCountByAgeRanges = () => {
  return useQuery({
    queryKey: ["user-count-by-age-ranges"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<UserAgeRanges>(
        `/users/count/age-ranges`,
      );
      return data;
    },
  });
};

export default useGetUsersCountByAgeRanges;
