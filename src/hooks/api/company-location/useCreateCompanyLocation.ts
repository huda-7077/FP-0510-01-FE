import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

interface CreateCompanyLocationData {
  regencyId: number;
  address: string;
  postalCode: string;
  latitude: string;
  longitude: string;
}

const useCreateCompanyLocation = () => {
  const queryClient = useQueryClient();
  const { data } = useSession();
  const token = data?.user.token;
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (data: CreateCompanyLocationData) => {
      const response = await axiosInstance.post("/company-locations", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company-locations"] });
      toast.success("Location added successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to add location");
    },
  });
};

export default useCreateCompanyLocation;
