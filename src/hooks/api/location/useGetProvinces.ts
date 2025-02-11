import { axiosInstance } from "@/lib/axios";
import { Province } from "@/types/location";
import { useQuery } from "@tanstack/react-query";

interface GetProvincesQuery {
  search?: string;
}

const useGetProvinces = (queries: GetProvincesQuery) => {
  return useQuery({
    queryKey: ["provinces", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Province[]>("/locations/provinces", {
        params: queries,
      });
      return data;
    },
  });
};

export default useGetProvinces;
