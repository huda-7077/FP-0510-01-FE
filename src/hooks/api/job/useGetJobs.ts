import { axiosInstance } from "@/lib/axios";
import { Job } from "@/types/job";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface GetJobsQuery extends PaginationQueries {
  search?: string;
  category?: string;
  timeRange?: string;
  isPublished?: string;
  isDeleted?: string;
  companyId?: number;
}

const useGetJobs = (queries: GetJobsQuery) => {
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
