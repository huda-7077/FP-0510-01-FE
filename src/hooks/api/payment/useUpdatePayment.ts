import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export interface UpdatePaymentPayload {
  uuid: string;
  action: "CANCEL" | "CONFIRM";
  paymentProof: File | null;
}

const useUpdatePayment = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: UpdatePaymentPayload) => {
      const updatePaymentForm = new FormData();

      updatePaymentForm.append("uuid", payload.uuid);
      updatePaymentForm.append("action", payload.action);
      if (payload.paymentProof) {
        updatePaymentForm.append("paymentProof", payload.paymentProof);
      }

      const { data } = await axiosInstance.patch(
        "/payments/update",
        updatePaymentForm,
      );
      return data;
    },
    onSuccess: () => {
      toast.success("update payment success");
      queryClient.invalidateQueries({ queryKey: ["payment"] });
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

export default useUpdatePayment;
