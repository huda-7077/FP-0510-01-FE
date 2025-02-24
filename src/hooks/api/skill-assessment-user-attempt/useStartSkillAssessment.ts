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
        `/skill-assessment-user-attempts/${slug}`,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["skill-assessment-user-attempts"],
      });
      toast.success("Skill assessment started successfully");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(
        error.response?.data?.message || "Failed to start skill assessment",
      );
    },
  });
};

export default useStartSkillAssessment;
