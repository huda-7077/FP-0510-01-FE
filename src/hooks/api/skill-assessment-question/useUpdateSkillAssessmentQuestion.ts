import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface UpdateSkillAssessmentQuestionPayload {
  skillAssessmentQuestionId: number;
  question: string;
  options: { option: string; isCorrect: boolean }[];
}

const useUpdateSkillAssessmentQuestion = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: UpdateSkillAssessmentQuestionPayload) => {
      const { data } = await axiosInstance.patch(
        `/skill-assessment-questions/${payload.skillAssessmentQuestionId}`,
        payload,
      );
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["skill-assessment-question"],
      });
      toast.success("Question updated successfully");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data?.message || "Failed to update question");
    },
  });
};

export default useUpdateSkillAssessmentQuestion;
