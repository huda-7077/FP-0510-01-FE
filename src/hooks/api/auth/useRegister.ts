"use client";

import useAxios from "@/hooks/useAxios";
import { RegisterPayload, RegisterResponse } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useRegister = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();

  return useMutation<
    RegisterResponse,
    AxiosError<{ message: string }>,
    RegisterPayload
  >({
    mutationFn: async (payload) => {
      const { data } = await axiosInstance.post("/auth/register", payload);
      return data;
    },
    onSuccess: (data, variables) => {
      toast.success(data.message);
      const payload = variables;
      router.push(`/verify?email=${encodeURIComponent(payload.email)}`);
    },
    onError: (error) => {
      toast.error(error.response?.data.message || "Registration failed");
    },
  });
};

export default useRegister;
