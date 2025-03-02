import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const useAutoSubmitUserAnswers = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (attemptId: number) => {
      const { data } = await axiosInstance.patch(
        `/assessment-user-attempts/${attemptId}/auto-submit`,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["assessment-user-attempts"],
      });
      toast.success("Time is up, you answer submitted automatically");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(
        error.response?.data?.message || "Failed to auto submit user answers",
      );
    },
  });
};

export default useAutoSubmitUserAnswers;
