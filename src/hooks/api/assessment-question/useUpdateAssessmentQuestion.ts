import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

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
    },

    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data?.message || "Failed to update question");
    },
  });
};

export default useUpdateAssessmentQuestion;
