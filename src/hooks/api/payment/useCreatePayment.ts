import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface CreatePaymentsPayload {
  category: string;
  paymentMethod: "PAYMENT_MANUAL" | "PAYMENT_GATEWAY";
  isRenewal: boolean;
}

const useCreatePayments = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: CreatePaymentsPayload) => {
      const { data } = await axiosInstance.post("/payments", payload);
      return data;
    },
    onSuccess: () => {
      toast.success("create payment success");
      queryClient.invalidateQueries({ queryKey: ["payment"] });
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data || error.response?.data.message);
    },
  });
};

export default useCreatePayments;
