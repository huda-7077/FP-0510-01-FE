import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface PopularJobCategories {
  data: { category: string; applicants: number }[];
}

interface PopularJobCategoriesQuery {
  timeRange?: string;
}

const useGetPopularJobCategories = ({
  timeRange,
}: PopularJobCategoriesQuery) => {
  return useQuery({
    queryKey: ["popular-job-categories", timeRange],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PopularJobCategories>(
        `/jobs/categories/popular`,
        {
          params: { timeRange },
        },
      );
      return data;
    },
  });
};

export default useGetPopularJobCategories;
