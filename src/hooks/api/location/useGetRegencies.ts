import { axiosInstance } from "@/lib/axios";
import { Regency } from "@/types/location";
import { useQuery } from "@tanstack/react-query";

interface GetRegenciesQuery {
  provinceId?: number;
  search?: string;
}

const useGetRegencies = (queries: GetRegenciesQuery) => {
  return useQuery({
    queryKey: ["regencies", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Regency[]>(
        "/locations/regencies",
        {
          params: queries,
        },
      );
      return data;
    },
  });
};

export default useGetRegencies;
