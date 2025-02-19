import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useDeleteWorkExperience = () => {
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids: number | number[]) => {
      if (Array.isArray(ids)) {
        const { data } = await axiosInstance.delete("/work-experiences/bulk", {
          data: { ids },
        });
        return data;
      }
      const { data } = await axiosInstance.delete(`/work-experiences/${ids}`);
      return data;
    },
    onSuccess: (_, variables) => {
      const count = Array.isArray(variables) ? variables.length : 1;
      toast.success(`${count} work experience(s) deleted successfully`);
      queryClient.invalidateQueries({ queryKey: ["workExperiences"] });
    },
    onError: () => {
      toast.error("Failed to delete work experience(s)");
    },
  });
};
