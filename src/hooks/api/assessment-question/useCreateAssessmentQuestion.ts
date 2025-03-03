import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

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
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data?.message || "Failed to add question");
    },
  });
};

export default useCreateAssessmentQuestion;
