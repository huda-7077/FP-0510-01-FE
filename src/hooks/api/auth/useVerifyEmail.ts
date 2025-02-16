import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

interface VerificationResponse {
  isVerified: boolean;
  message: string;
}

export const useVerifyEmail = () => {
  const queryClient = useQueryClient();

  return useMutation<VerificationResponse, Error, string>({
    retry: 0,
    mutationFn: async (token: string) => {
      const response = await axiosInstance.get<VerificationResponse>(
        "/auth/verify-email",
        {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 15000,
        },
      );

      if (response.data.isVerified) {
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }

      return response.data;
    },
    onSettled: () => {
      queryClient.removeQueries({ queryKey: ["verification"] });
    },
  });
};
