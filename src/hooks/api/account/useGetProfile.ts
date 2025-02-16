import useAxios from "@/hooks/useAxios";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const useGetProfile = () => {
  const { data } = useSession();
  const token = data?.user.token;
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<User>("/accounts/profile");
      return data;
    },
    enabled: !!token,
  });
};

export default useGetProfile;
