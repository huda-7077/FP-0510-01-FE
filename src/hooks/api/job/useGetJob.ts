import { axiosInstance } from "@/lib/axios";
import { Job } from "@/types/job";
import { useQuery } from "@tanstack/react-query";

interface GetJobQuery {
  jobId: number;
  companyId?: number;
}

const useGetJob = ({ jobId, companyId }: GetJobQuery) => {
  return useQuery({
    queryKey: ["jobs", companyId, jobId], // Include both companyId and jobId in the queryKey
    queryFn: async () => {
      const { data } = await axiosInstance.get<Job>(`/jobs/${jobId}`, {
        params: { companyId },
      });
      return data;
    },
    enabled: !!jobId, // Ensure the query only runs if jobId is defined
  });
};

export default useGetJob;
