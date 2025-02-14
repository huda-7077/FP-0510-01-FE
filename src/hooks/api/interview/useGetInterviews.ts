import useAxios from "@/hooks/useAxios";
import { Interview } from "@/types/interviews";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface GetInterviewQuery extends PaginationQueries {
  search?: string;
}

const useGetInterviews = (queries: GetInterviewQuery) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["interviews", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Interview>>(
        "/interviews",
        {
          params: queries,
        },
      );
      return data;
    },
  });
};

export default useGetInterviews;
