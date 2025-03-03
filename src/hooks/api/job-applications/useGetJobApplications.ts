import useAxios from "@/hooks/useAxios";
import { JobApplication } from "@/types/jobApplication";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface GetJobApplicationsQuery extends PaginationQueries {
  search?: string;
  jobId?: number;
  educationLevel?: string;
  maxExpectedSalary?: number;
  minExpectedSalary?: number;
  maxAge?: number;
  minAge?: number;
}

const useGetJobApplications = (queries: GetJobApplicationsQuery) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["job-applications", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<
        PageableResponse<JobApplication>
      >("/job-applications", {
        params: queries,
      });
      return data;
    },
  });
};

export default useGetJobApplications;
