import useAxios from "@/hooks/useAxios";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { Subscription } from "@/types/subscription";
import { useQuery } from "@tanstack/react-query";

interface GetSubscriptionsQuery extends PaginationQueries {
  search?: string;
  status?: string;
}

const useGetSubscriptions = (queries: GetSubscriptionsQuery) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["subscription", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Subscription>>(
        "/subscriptions",
        {
          params: queries,
        },
      );
      return data;
    },
  });
};

export default useGetSubscriptions;
