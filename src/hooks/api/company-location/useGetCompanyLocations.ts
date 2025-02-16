import useAxios from "@/hooks/useAxios";
import { CompanyLocation } from "@/types/companyLocation";
import { useQuery } from "@tanstack/react-query";

export const useGetCompanyLocations = () => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["company-locations"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/company-locations");

      if (!Array.isArray(data)) {
        throw new Error("Invalid data format received from the server");
      }

      return data as CompanyLocation[];
    },
  });
};
