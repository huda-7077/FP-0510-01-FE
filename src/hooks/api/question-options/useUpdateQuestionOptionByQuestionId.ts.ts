import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface UpdateQuestionOptionsPayload {
  questionId: number;
  options?: string[];
  isCorrect?: boolean[];
}

const useUpdateQuestionOptionByQuestionId = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: UpdateQuestionOptionsPayload) => {
      const { questionId, ...dataToUpdate } = payload;
      const { data } = await axiosInstance.patch(
        `/options/filter/questionId/${questionId}`,
        dataToUpdate,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["question-options"] });
      console.log("Question options Updated Successfullly");
    },

    onError: (error: AxiosError<any>) => {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        "An error occurred";
      console.log(errorMessage);
    },
  });
};

export default useUpdateQuestionOptionByQuestionId;
