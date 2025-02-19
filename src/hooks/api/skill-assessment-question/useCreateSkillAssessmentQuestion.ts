import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface CreateSkillAssessmentQuestionPayload {
  skillAssessmentId: number;
  question: string;
  options: { option: string; isCorrect: boolean }[];
}

const useCreateSkillAssessmentQuestion = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: CreateSkillAssessmentQuestionPayload) => {
      const { data } = await axiosInstance.post(
        "/skill-assessment-questions",
        payload,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["skill-assessment-question"],
      });
      toast.success("Question added successfully");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data?.message || "Failed to add question");
    },
  });
};

export default useCreateSkillAssessmentQuestion;
