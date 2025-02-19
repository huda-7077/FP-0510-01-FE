import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const useDeleteSkillAssessmentQuestion = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosInstance.delete(
        `/skill-assessment-questions/${id}`,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["skill-assessment-question"],
      });
      toast.success("Question deleted successfully");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message || "Failed to delete question");
    },
  });
};

export default useDeleteSkillAssessmentQuestion;
