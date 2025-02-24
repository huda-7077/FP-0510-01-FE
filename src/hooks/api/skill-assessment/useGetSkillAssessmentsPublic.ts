import { axiosInstance } from "@/lib/axios";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { SkillAssessment } from "@/types/skillAssessments";
import { useQuery } from "@tanstack/react-query";

interface GetSkillAssessmentsPublicQuery extends PaginationQueries {
  search?: string;
}

const useGetSkillAssessmentsPublic = (
  queries: GetSkillAssessmentsPublicQuery,
) => {
  return useQuery({
    queryKey: ["skill-assessments", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<
        PageableResponse<SkillAssessment>
      >("/skill-assessments", {
        params: queries,
      });
      return data;
    },
  });
};

export default useGetSkillAssessmentsPublic;
