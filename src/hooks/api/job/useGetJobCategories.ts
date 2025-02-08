import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface GetJobCategoriesQuery {
  companyId?: number;
}

interface JobCategories {
  data: string[];
}

const useGetJobCategories = (queries: GetJobCategoriesQuery) => {
  return useQuery({
    queryKey: ["job-categories", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<JobCategories>(
        "/jobs/categories",
        {
          params: queries,
        },
      );
      return data;
    },
  });
};

export default useGetJobCategories;
