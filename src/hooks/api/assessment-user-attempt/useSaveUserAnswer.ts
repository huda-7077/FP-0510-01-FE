import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface SaveUserAnswerPayload {
  attemptId: number;
  questionId: number;
  selectedOptionId: number;
}

const useSaveUserAnswer = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: SaveUserAnswerPayload) => {
      const { data } = await axiosInstance.patch(
        `/assessment-user-attempts/${payload.attemptId}`,
        payload,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["assessment-user-attempts"],
      });
    },
    onError: (error: AxiosError<any>) => {
      toast.error(
        error.response?.data?.message || "Failed to save user answers",
      );
    },
  });
};

export default useSaveUserAnswer;
