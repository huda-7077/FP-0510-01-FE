import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useDeleteAssessmentQuestion = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosInstance.delete(`/questions/${id}`);
      return data;
    },
    onSuccess: async () => {
      console.log(`Assessment Question deleted successfully`);
      await queryClient.invalidateQueries({
        queryKey: ["assessment-questions"],
      });
    },
    onError: (error: AxiosError<any>) => {
      console.log(error.response?.data);
    },
  });
};

export default useDeleteAssessmentQuestion;
