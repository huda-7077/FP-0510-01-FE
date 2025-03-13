import { axiosInstance } from "@/lib/axios";
import { Company } from "@/types/company";
import { useQuery } from "@tanstack/react-query";

interface GetJobQuery {
  slug: string;
}

const useGetCompany = ({ slug }: GetJobQuery) => {
  return useQuery({
    queryKey: ["companies", slug],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Company>(`/companies/${slug}`);
      return data;
    },
    enabled: !!slug,
  });
};

export default useGetCompany;
