import useAxios from "@/hooks/useAxios";
import { BadgeData } from "@/types/badge";
import { PageableResponse } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface GetBadgesQuery {
  take?: number;
  page?: number;
}

const useGetBadges = (queries: GetBadgesQuery) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["badges", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<BadgeData>>(
        "/badges",
        {
          params: queries,
        },
      );
      return data;
    },
  });
};

export default useGetBadges;
