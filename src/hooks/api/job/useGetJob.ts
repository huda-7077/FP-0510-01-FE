import { axiosInstance } from "@/lib/axios";
import { Job } from "@/types/job";
import { useQuery } from "@tanstack/react-query";

interface GetJobQuery {
  jobId: number;
}

const useGetJob = (query: GetJobQuery) => {
  return useQuery({
    queryKey: ["jobs", query],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Job>(`/jobs/${query.jobId}`);

      return data;
    },
  });
};

export default useGetJob;
