import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface VerificationResponse {
  isVerified: boolean;
  message: string;
}

export const useVerifyEmail = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation<VerificationResponse, Error, string>({
    retry: 0,
    mutationFn: async (token: string) => {
      const response = await axiosInstance.get<VerificationResponse>(
        "/auth/verify-email",
        {
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
