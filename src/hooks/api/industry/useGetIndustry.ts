import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetIndustries = () => {
  return useQuery({
    queryKey: ["industries"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<string[]>("/industries");
      return data;
    },
  });
};
