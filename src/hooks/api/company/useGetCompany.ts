import { axiosInstance } from "@/lib/axios";
import { Company } from "@/types/company";
import { useQuery } from "@tanstack/react-query";

interface GetJobQuery {
  companyId: number;
}

const useGetCompany = ({ companyId }: GetJobQuery) => {
  return useQuery({
    queryKey: ["companies", companyId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Company>(
        `/companies/${companyId}`,
        {
          params: { companyId },
        },
      );
      return data;
    },
    enabled: !!companyId,
  });
};

export default useGetCompany;
