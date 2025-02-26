import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const useStartSkillAssessment = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (slug: string) => {
      const { data } = await axiosInstance.post(
        `/assessment-user-attempts/${slug}`,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["assessment-user-attempts"],
      });
      toast.success("Assessment started successfully");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(
        error.response?.data?.message || "Failed to start assessment",
      );
    },
  });
};

export default useStartSkillAssessment;
