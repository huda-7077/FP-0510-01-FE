import useAxios from "@/hooks/useAxios";
import { JobApplication } from "@/types/jobApplication";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface GetUserJobApplicationsQuery extends PaginationQueries {
  search?: string;
  status?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
}

const useGetUserJobApplications = (queries: GetUserJobApplicationsQuery) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["jobApplications", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<
        PageableResponse<JobApplication>
      >("/job-applications/user", {
        params: queries,
      });
      return data;
    },
  });
};

export default useGetUserJobApplications;
