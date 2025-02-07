import { axiosInstance } from "@/lib/axios";
import { Job } from "@/types/job";
import { useQuery } from "@tanstack/react-query";

interface GetJobQuery {
  jobId: number;
}

const useGetJob = ({ jobId }: GetJobQuery) => {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Job>(`/jobs/${jobId}`);
      return data;
    },
    enabled: !!jobId,
  });
};

export default useGetJob;
