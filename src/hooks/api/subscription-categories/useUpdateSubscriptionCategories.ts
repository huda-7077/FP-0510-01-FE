import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export interface UpdateSubscriptionCategoryPayload {
  id: number;
  description: string;
  price: number;
  features: string[];
}

const useUpdateSubscriptionCategory = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: UpdateSubscriptionCategoryPayload) => {
      const { id, ...dataToUpdate } = payload;
      const { data } = await axiosInstance.patch(
        `/subscription-categories/${id}`,
        dataToUpdate,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription-categories"] });
      toast.success("update subscription category success");
    },

    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message || error.response?.data);
    },
  });
};

export default useUpdateSubscriptionCategory;
