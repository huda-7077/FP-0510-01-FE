"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { signOut } from "next-auth/react";
import { useTransitionRouter } from "next-view-transitions";
import { toast } from "react-toastify";

const useDeleteAccount = () => {
  const router = useTransitionRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (password: string) => {
      const { data } = await axiosInstance.delete("/accounts/profile", {
        data: { password },
      });
      return data;
    },
    onSuccess: async () => {
      toast.success(
        "Your account has been deleted, but you're welcome any time",
      );
      await queryClient.invalidateQueries({ queryKey: ["account"] });
      await signOut({ redirect: false });
      router.push("/login");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message || error.response?.data);
    },
  });
};

export default useDeleteAccount;
