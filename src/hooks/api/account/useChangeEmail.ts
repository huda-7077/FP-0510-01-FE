"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useTransitionRouter } from "next-view-transitions";
import { toast } from "react-toastify";

interface ChangeEmailPayload {
  email: string;
}

const useChangeEmail = () => {
  const router = useTransitionRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: ChangeEmailPayload) => {
      const { data } = await axiosInstance.patch("/accounts/email", payload);
      return data;
    },
    onSuccess: async () => {
      toast.success("Change email success, please verify your account");
      await queryClient.invalidateQueries({ queryKey: ["account"] });
      router.refresh();
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message || error.response?.data);
    },
  });
};

export default useChangeEmail;
