import useAxios from "@/hooks/useAxios";
import { CompanyLocation } from "@/types/companyLocation";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface GetCompanyLocationsQuery extends PaginationQueries {
  search?: string;
}

const useGetCompanyLocations = (queries: GetCompanyLocationsQuery) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["company-locations", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<
        PageableResponse<CompanyLocation>
      >("/company-locations", {
        params: queries,
      });

      return data;
    },
  });
};

export default useGetCompanyLocations;
