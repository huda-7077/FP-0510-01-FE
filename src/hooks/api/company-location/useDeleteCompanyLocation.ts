import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useDeleteCompanyLocation = () => {
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids: number) => {
      const { data } = await axiosInstance.delete(`/company-locations/${ids}`);
      return data;
    },
    onSuccess: () => {
      toast.success("company location deleted");
      queryClient.invalidateQueries({ queryKey: ["company-locations"] });
    },
    onError: () => {
      toast.error("Failed to delete company location");
    },
  });
};
