import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface UpdateAssessmentQuestionPayload {
  id: number;
  question?: string;
}

const useUpdateAssessmentQuestion = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: UpdateAssessmentQuestionPayload) => {
      const { id, ...dataToUpdate } = payload;
      const { data } = await axiosInstance.patch(
        `/questions/${payload.id}`,
        dataToUpdate,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assessment-questions"] });
      console.log("Assessment Question Updated Successfullly");
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

export default useUpdateAssessmentQuestion;
