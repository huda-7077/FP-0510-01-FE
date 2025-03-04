import { axiosInstance } from "@/lib/axios";
import { Overview } from "@/types/overview";
import { useQuery } from "@tanstack/react-query";

const useGetOverview = () => {
  return useQuery({
    queryKey: ["overview"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Overview>(`/overviews`);
      return data;
    },
  });
};

export default useGetOverview;
