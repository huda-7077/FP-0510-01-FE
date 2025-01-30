import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface GetJobApplicationTotalQuery {
  jobId: number;
}

interface JobApplicationTotal {
  count: number;
}

const useGetJobApplicationTotal = (query: GetJobApplicationTotalQuery) => {
  return useQuery({
    queryKey: ["job-applications", query],
    queryFn: async () => {
      const { data } = await axiosInstance.get<JobApplicationTotal>(
        `job-applications/total?jobId=${query.jobId}`,
      );
      return data;
    },
  });
};

export default useGetJobApplicationTotal;
