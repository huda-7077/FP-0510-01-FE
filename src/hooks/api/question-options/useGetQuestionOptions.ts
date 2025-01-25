import { axiosInstance } from "@/lib/axios";
import { AssessmentOption } from "@/types/assessmentOptions";
import { useQuery } from "@tanstack/react-query";

interface GetQuestionOptionsQuery {
  questionId: number;
}

const useGetQuestionOptions = (queries: GetQuestionOptionsQuery) => {
  return useQuery({
    queryKey: ["question-options", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<AssessmentOption>("/options", {
        params: queries,
      });

      return data;
    },
  });
};

export default useGetQuestionOptions;
