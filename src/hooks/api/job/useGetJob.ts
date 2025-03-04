import { axiosInstance } from "@/lib/axios";
import { Job } from "@/types/job";
import { useQuery } from "@tanstack/react-query";

interface GetJobQuery {
  slug: string;
  companyId?: number;
  isPublished?: boolean;
  isExpired?: boolean;
}

const useGetJob = ({ slug, companyId, isPublished, isExpired }: GetJobQuery) => {
  return useQuery({
    queryKey: ["jobs", companyId, slug],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Job>(`/jobs/${slug}`, {
        params: { companyId, isPublished, isExpired },
      });
      return data;
    },
    enabled: !!slug,
  });
};

export default useGetJob;
