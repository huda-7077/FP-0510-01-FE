import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const { data } = await axiosInstance.post("/auth/login", payload);
      return data;
    },
    onSuccess: async (data) => {
      toast.success("Login successful");
      await signIn("credentials", { ...data, redirect: false });
      const lastPath = localStorage.getItem("lastPath") || "/";
      console.log('Retrieved path:', lastPath);
      window.location.href = lastPath;
    },
    onError: (error: any) => {
      toast.error(error.response?.data.message || "Login failed");
    },
  });
};
