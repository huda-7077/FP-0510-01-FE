import useAxios from "@/hooks/useAxios";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { SkillAssessment } from "@/types/skillAssessments";
import { useQuery } from "@tanstack/react-query";

interface GetSkillAssessmentsQuery extends PaginationQueries {
  search?: string;
  status?: string;
}

const useGetSkillAssessments = (queries: GetSkillAssessmentsQuery) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["skill-assessments", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<
        PageableResponse<SkillAssessment>
      >("/skill-assessments/developer/data", {
        params: queries,
      });
      return data;
    },
  });
};

export default useGetSkillAssessments;
