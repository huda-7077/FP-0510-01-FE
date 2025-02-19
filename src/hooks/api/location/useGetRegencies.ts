import { axiosInstance } from "@/lib/axios";
import { Regency } from "@/types/location";
import { useQuery } from "@tanstack/react-query";

interface GetRegenciesQuery {
  provinceId?: number;
  search?: string;
}

const useGetRegencies = ({ provinceId, search }: GetRegenciesQuery = {}) => {
  return useQuery({
    queryKey: ["regencies", { provinceId, search }],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Regency[]>("/locations/regencies", {
        params: {
          provinceId,
          search: search?.trim(),
        },
      });
      return data;
    },
    enabled: !search || search.length >= 2, 
    staleTime: 5 * 60 * 1000,
  });
};

export default useGetRegencies;