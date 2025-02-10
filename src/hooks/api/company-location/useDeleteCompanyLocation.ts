import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

export const useDeleteCompanyLocation = () => {
  const { data: session } = useSession();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids: number) => {
      const { data } = await axiosInstance.delete(`/company-locations/${ids}`, {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      });
      return data;
    },
    onSuccess: () => {
      toast.success("company location deleted");
      queryClient.invalidateQueries({ queryKey: ["companyLocations"] });
    },
    onError: () => {
      toast.error("Failed to delete company location");
    },
  });
};
