import { axiosInstance } from "@/lib/axios";
import { Job } from "@/types/job";
import { JobApplication } from "@/types/jobApplication";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface GetJobApplicationsQuery extends PaginationQueries {
  search?: string;
  jobId?: number;
  educationLevel?: string;
}

const useGetJobApplications = (queries: GetJobApplicationsQuery) => {
  return useQuery({
    queryKey: ["job-applications", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<
        PageableResponse<JobApplication>
      >("/job-applications", {
        params: queries,
      });
      console.log("Sorting by:", queries.sortBy, "Order:", queries.sortOrder);
      return data;
    },
  });
};

export default useGetJobApplications;
