import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface UserGenderCount {
  data: { gender: string; userGenders: number; fill: string }[];
}

const useGetUsersCountByGender = () => {
  return useQuery({
    queryKey: ["user-count-by-gender"],
    queryFn: async () => {
      const { data } =
        await axiosInstance.get<UserGenderCount>(`/users/count/gender`);
      return data;
    },
  });
};

export default useGetUsersCountByGender;
