import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { toast } from "react-toastify";

interface VerificationResponse {
  message: string;
  nextAllowedTime?: string;
}

export const useResendVerification = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await axiosInstance.post<VerificationResponse>(
        "/auth/resend-verification",
        {
          email,
        },
      );
      return response.data;
    },
    onSuccess: (data: VerificationResponse) => {
      toast.success(data.message);
      return data.nextAllowedTime;
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message;
      const nextAllowedTime = error.response?.data?.nextAllowedTime;

      if (errorMessage === "Email already verified") {
        toast.info("Email is already verified");
      } else if (errorMessage?.includes("Please wait")) {
        toast.info(errorMessage);
      } else {
        toast.error(errorMessage || "Failed to send verification email");
      }

      return nextAllowedTime;
    },
  });
};
