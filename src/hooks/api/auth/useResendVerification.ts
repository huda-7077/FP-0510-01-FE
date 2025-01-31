import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { toast } from "react-toastify";

export const useResendVerification = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await axiosInstance.post("/auth/resend-verification", {
        email,
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message;

      if (errorMessage === "Email already verified") {
        toast.info("Email is already verified");
      } else if (errorMessage?.includes("Please wait")) {
        toast.info(errorMessage);
      } else {
        toast.error(errorMessage || "Failed to resend verification email");
      }
    },
  });
};
