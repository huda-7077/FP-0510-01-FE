import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useDeleteQuestionOptionByQuestionId = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosInstance.delete(
        `/options/filter/questionId/${id}`,
      );
      return data;
    },
    onSuccess: async () => {
      console.log(`Question option deleted successfully`);
      await queryClient.invalidateQueries({
        queryKey: ["question-options"],
      });
    },
    onError: (error: AxiosError<any>) => {
      console.log(error.response?.data);
    },
  });
};

export default useDeleteQuestionOptionByQuestionId;
