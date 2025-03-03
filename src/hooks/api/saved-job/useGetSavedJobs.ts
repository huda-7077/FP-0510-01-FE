import useAxios from "@/hooks/useAxios";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { SavedJob } from "@/types/saved-job";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface GetSavedJobsQuery extends PaginationQueries {
  search?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
}

const useGetSavedJobs = (
  queries: GetSavedJobsQuery, 
  options?: Partial<UseQueryOptions<PageableResponse<SavedJob>, AxiosError>>
) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["savedJobs", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<SavedJob>>(
        "/saved-jobs",
        {
          params: queries,
        },
      );
      return data;
    },
    enabled: true,
    ...options
  });
};

export default useGetSavedJobs;