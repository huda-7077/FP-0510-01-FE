import useAxios from "@/hooks/useAxios";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { WorkExperience } from "@/types/workExperience";
import { useQuery } from "@tanstack/react-query";

interface GetWorkExperiencesQuery extends PaginationQueries {
  search?: string;
}

const useGetWorkExperiences = (queries: GetWorkExperiencesQuery) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["workExperiences", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<
        PageableResponse<WorkExperience>
      >("/work-experiences", {
        params: queries,
      });
      return data;
    },
  });
};

export default useGetWorkExperiences;
