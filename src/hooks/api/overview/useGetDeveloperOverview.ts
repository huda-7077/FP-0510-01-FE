import useAxios from "@/hooks/useAxios";
import { DeveloperOverview } from "@/types/overview";
import { useQuery } from "@tanstack/react-query";

const useGetDeveloperOverview = () => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["overview"],
    queryFn: async () => {
      const { data } =
        await axiosInstance.get<DeveloperOverview>(`/overviews/developer`);
      return data;
    },
  });
};

export default useGetDeveloperOverview;
