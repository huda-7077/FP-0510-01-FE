"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useTransitionRouter } from "next-view-transitions";
import { toast } from "react-toastify";

interface ChangePasswordPayload {
  newPassword: string;
  password: string;
}

const useChangePassword = () => {
  const router = useTransitionRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: ChangePasswordPayload) => {
      const { data } = await axiosInstance.patch("/accounts/password", payload);
      return data;
    },
    onSuccess: async () => {
      toast.success("Change password success");
      await queryClient.invalidateQueries({ queryKey: ["account"] });
      router.refresh();
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message || error.response?.data);
    },
  });
};

export default useChangePassword;
