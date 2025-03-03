import useAxios from "@/hooks/useAxios";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

interface Options {
  enabled?: boolean;
}

const useGetProfile = (options: Options = {}) => {
  const { enabled = true } = options;
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<User>("/accounts/profile");
      return data;
    },
    enabled,
    ...options,
  });
};

export default useGetProfile;
