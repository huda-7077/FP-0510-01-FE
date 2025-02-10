import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export interface CreateSubscriptionPayload {
  uuid: string;
  action: "ACCEPTED" | "REJECTED";
}

const useCreateSubscription = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: CreateSubscriptionPayload) => {
      const { data } = await axiosInstance.post(`/subscriptions`, payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Create subscription  success");
      queryClient.invalidateQueries({ queryKey: ["payment", "subscription"] });
    },

    onError: (error: AxiosError<any>) => {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        "An error occurred";
      toast.error(errorMessage);
    },
  });
};

export default useCreateSubscription;
