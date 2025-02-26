import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface UpdateAssessmentQuestionPayload {
  preTestAssessmentQuestionId: number;
  question: string;
  options: { option: string; isCorrect: boolean }[];
}

const useUpdateAssessmentQuestion = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: UpdateAssessmentQuestionPayload) => {
      const { data } = await axiosInstance.patch(
        `/assessment-questions/${payload.preTestAssessmentQuestionId}`,
        payload,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assessment-questions"] });
      console.log("Question Updated Successfullly");
    },

    onError: (error: AxiosError<any>) => {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        "Failed to update question";
      console.log(errorMessage);
    },
  });
};

export default useUpdateAssessmentQuestion;
