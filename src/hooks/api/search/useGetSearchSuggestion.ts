import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface JobSuggestion {
  id: number;
  title: string;
  slug: string;
}

interface CompanySuggestion {
  id: number;
  title: string;
}

interface Suggestions {
  jobs: JobSuggestion[];
  companies: CompanySuggestion[];
}

export const useGetSearchSuggestions = (query: string) => {
  return useQuery<Suggestions>({
    queryKey: ["search-suggestions", query],
    queryFn: async () => {
      if (!query) return { jobs: [], companies: [] };
      const { data } = await axiosInstance.get("/search", {
        params: { q: query },
      });
      return data as Suggestions;
    },
    enabled: !!query,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
