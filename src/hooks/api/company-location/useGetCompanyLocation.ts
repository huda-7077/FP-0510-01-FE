import { axiosInstance } from "@/lib/axios";
import { Job } from "@/types/job";
import { useQuery } from "@tanstack/react-query";

interface GetCompanyLocationQuery {
  id: number;
}

const useGetJob = (query: GetCompanyLocationQuery) => {
  return useQuery({
    queryKey: ["company-locations", query],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Job>(`/jobs/${query.id}`);

      return data;
    },
  });
};

export default useGetJob;
