import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: async (token: string) => {
      const response = await axiosInstance.get("/auth/verify-email", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });
};
