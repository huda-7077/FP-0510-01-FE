import { axiosInstance } from "@/lib/axios";
import { Job } from "@/types/job";
import { useQuery } from "@tanstack/react-query";

interface GetJobQuery {
  slug: string;
  companyId?: number;
}

const useGetJob = ({ slug, companyId }: GetJobQuery) => {
  return useQuery({
    queryKey: ["jobs", companyId, slug],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Job>(`/jobs/${slug}`, {
        params: { companyId },
      });
      return data;
    },
    enabled: !!slug,
  });
};

export default useGetJob;
