import { axiosInstance } from "@/lib/axios";
import { AssessmentQuestion } from "@/types/assessmentQuestion";
import { useQuery } from "@tanstack/react-query";

interface GetAssessmentQuestionsQuery {
  assessmentId: number;
}

const useGetAssessmentQuestions = (queries: GetAssessmentQuestionsQuery) => {
  return useQuery({
    queryKey: ["assessment-questions", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<AssessmentQuestion>(
        "/questions",
        {
          params: queries,
        },
      );

      return data;
    },
  });
};

export default useGetAssessmentQuestions;
