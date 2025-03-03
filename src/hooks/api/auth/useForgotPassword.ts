"use client";

import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useTransitionRouter } from "next-view-transitions";
import { toast } from "react-toastify";

interface ForgotPasswordPayload {
  email: string;
}

interface ForgotPasswordResponse {
  message: string;
}

const useForgotPassword = () => {
  const router = useTransitionRouter();

  return useMutation<
    ForgotPasswordResponse,
    AxiosError<any>,
    ForgotPasswordPayload
  >({
    mutationFn: async (payload: ForgotPasswordPayload) => {
      const { data } = await axiosInstance.post(
        "/auth/forgot-password",
        payload,
      );
      return data;
    },
    onSuccess: (data) => {
      toast.success(
        data.message || "Reset password link has been sent to your email",
      );

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    },
    onError: (error: AxiosError<any>) => {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        "Failed to send reset password link";

      toast.error(errorMessage);

      if (error.response?.status === 429) {
        toast.error("Too many requests. Please try again later.");
      }

      if (error.response?.status === 404) {
        toast.error("No account found with this email address.");
      }
    },
  });
};

export default useForgotPassword;
