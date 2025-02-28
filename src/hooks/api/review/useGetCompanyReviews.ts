import { axiosInstance } from "@/lib/axios";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { Review } from "@/types/review";
import { useQuery } from "@tanstack/react-query";

interface GetCompanyReviewsQuery extends PaginationQueries {}

const useGetCompanyReviews = (
  queries: GetCompanyReviewsQuery,
  companyId: number,
) => {
  return useQuery({
    queryKey: ["review", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Review>>(
        `/reviews/${companyId}`,
        {
          params: queries,
        },
      );
      return data;
    },
  });
};

export default useGetCompanyReviews;
