"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useTransitionRouter } from "next-view-transitions";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

interface ResetPasswordPayload {
  password: string;
  confirmPassword: string;
}

interface ResetPasswordResponse {
  message: string;
}

const useResetPassword = () => {
  const router = useTransitionRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { axiosInstance } = useAxios();

  return useMutation<
    ResetPasswordResponse,
    AxiosError<any>,
    ResetPasswordPayload
  >({
    mutationFn: async (payload: ResetPasswordPayload) => {
      if (!token) {
        throw new Error("Reset token is missing");
      }

      const { data } = await axiosInstance.patch("/auth/reset-password", {
        password: payload.password,
      });
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Password has been successfully reset");
      router.push("/login");
    },
    onError: (error: AxiosError<any>) => {
      const errorMessage =
        error.response?.data?.message || "Failed to reset password";
      toast.error(errorMessage);

      // If token is invalid or expired, redirect to forgot password page
      if (error.response?.status === 401) {
        router.push("/forgot-password");
      }
    },
  });
};

export default useResetPassword;
