import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export interface CreateSubscriptionCategoryPayload {
  name: string;
  description: string;
  price: number;
  features: string[];
}

const useCreateSubscriptionCategory = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: CreateSubscriptionCategoryPayload) => {
      const { data } = await axiosInstance.post(
        `/subscription-categories`,
        payload,
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Create subscription category success");
      queryClient.invalidateQueries({ queryKey: ["subscription-categories"] });
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

export default useCreateSubscriptionCategory;
