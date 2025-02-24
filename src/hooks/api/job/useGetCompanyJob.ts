import useAxios from "@/hooks/useAxios";
import { Job } from "@/types/job";
import { useQuery } from "@tanstack/react-query";

interface GetCompanyJobQuery {
  jobId: number;
}

const useGetCompanyJob = ({ jobId }: GetCompanyJobQuery) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["jobs", jobId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Job>(`/jobs/company/${jobId}`);
      return data;
    },
    enabled: !!jobId,
  });
};

export default useGetCompanyJob;
