import useAxios from "@/hooks/useAxios";
import { Job } from "@/types/job";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface GetCompanyJobsQuery extends PaginationQueries {
  search?: string;
  category?: string;
  timeRange?: string;
  isDeleted?: string;
}

const useGetCompanyJobs = (queries: GetCompanyJobsQuery) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["jobs", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Job>>(
        "/jobs/company",
        {
          params: queries,
        },
      );
      return data;
    },
  });
};

export default useGetCompanyJobs;
