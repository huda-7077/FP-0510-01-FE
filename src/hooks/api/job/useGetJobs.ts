import useAxios from "@/hooks/useAxios";
import { Job } from "@/types/job";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface GetJobsQuery extends PaginationQueries {
  search?: string;
  category?: string;
  timeRange?: string;
  isPublished?: string;
  isDeleted?: string;
}

const useGetJobs = (queries: GetJobsQuery) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["jobs", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Job>>("/jobs", {
        params: queries,
      });
      return data;
    },
  });
};

export default useGetJobs;
