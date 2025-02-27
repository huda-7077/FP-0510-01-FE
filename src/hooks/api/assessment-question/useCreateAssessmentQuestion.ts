import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface CreateAssessmentQuestionPayload {
  preTestAssessmentId: number;
  question: string;
  options: { option: string; isCorrect: boolean }[];
}

const useCreateAssessmentQuestion = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: CreateAssessmentQuestionPayload) => {
      const { data } = await axiosInstance.post(
        "/assessment-questions",
        payload,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["assessment-questions"],
      });
      console.log("Assessment Question added successfullly");
    },
    onError: (error: AxiosError<any>) => {
      console.log(error.response?.data || "Failed to add question");
    },
  });
};

export default useCreateAssessmentQuestion;
