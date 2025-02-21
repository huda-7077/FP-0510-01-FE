import { axiosInstance } from "@/lib/axios";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { Company } from "@/types/company";
import { useQuery } from "@tanstack/react-query";

interface GetCompaniesQuery extends PaginationQueries {
  search?: string;
  location?: string;
  industry?: string;
  establishedYearMin?: string;
  establishedYearMax?: string;
  hasActiveJobs?: string;
}

interface CompanyResponse extends Omit<Company, "user"> {
  averageRating: number;
  totalJobs: number;
  companyLocations: Array<{
    address: string;
    postalCode: string;
    regency: {
      regency: string;
      province: {
        province: string;
      };
    };
  }>;
}

const useGetCompanies = (queries: GetCompaniesQuery) => {
  return useQuery({
    queryKey: ["companies", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<CompanyResponse>>(
        "/companies",
        {
          params: queries, 
        }
      );
      return data;
    },
  });
};

export default useGetCompanies;