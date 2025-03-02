import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const useDeleteAssessmentQuestion = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosInstance.delete(
        `/assessment-questions/${id}`,
      );
      return data;
    },
    onSuccess: async () => {
      console.log(`Assessment Question deleted successfully`);
      await queryClient.invalidateQueries({
        queryKey: ["assessment-questions"],
      });
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data?.message || "Failed to delete question");
    },
  });
};

export default useDeleteAssessmentQuestion;
