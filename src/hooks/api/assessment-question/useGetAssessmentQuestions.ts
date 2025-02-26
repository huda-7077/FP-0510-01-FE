import useAxios from "@/hooks/useAxios";
import { AssessmentQuestion } from "@/types/assessment";
import { useQuery } from "@tanstack/react-query";

interface GetAssessmentQuestionsData {
  data: AssessmentQuestion[];
}

const useGetAssessmentQuestions = (slug: string) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["assessment-questions", slug],

    queryFn: async () => {
      const { data } = await axiosInstance.get<GetAssessmentQuestionsData>(
        `/assessment-questions/${slug}`,
      );

      return data;
    },
  });
};

export default useGetAssessmentQuestions;
