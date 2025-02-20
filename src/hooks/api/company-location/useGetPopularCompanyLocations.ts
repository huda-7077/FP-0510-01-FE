import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface PopularCompanyLocations {
  data: { province: string; applicants: number }[];
}

interface PopularCompanyLocationsQuery {
  timeRange?: string;
}

const useGetPopularCompanyLocations = ({
  timeRange,
}: PopularCompanyLocationsQuery) => {
  return useQuery({
    queryKey: ["popular-company-locations", timeRange],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PopularCompanyLocations>(
        `/company-locations/province/popular`,
        {
          params: { timeRange },
        },
      );
      return data;
    },
  });
};

export default useGetPopularCompanyLocations;
