import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const useSubmitUserAnswers = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (attemptId: number) => {
      const { data } = await axiosInstance.patch(
        `/assessment-user-attempts/${attemptId}/submit`,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["assessment-user-attempts"],
      });
      toast.success("User answers submitted successfully");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(
        error.response?.data?.message || "Failed to submit user answers",
      );
    },
  });
};

export default useSubmitUserAnswers;
