import useAxios from "@/hooks/useAxios";
import { SkillAssessmentQuestion } from "@/types/skillAssessments";
import { useQuery } from "@tanstack/react-query";

interface GetSkillAssessmentQuestionsData {
  data: SkillAssessmentQuestion[];
}

const useGetSkillAssessmentQuestions = (slug: string) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["skill-assessment-question", slug],
    queryFn: async () => {
      const { data } = await axiosInstance.get<GetSkillAssessmentQuestionsData>(
        `/skill-assessment-questions/${slug}`,
      );
      return data;
    },
  });
};

export default useGetSkillAssessmentQuestions;
