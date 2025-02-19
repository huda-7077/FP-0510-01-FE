import useAxios from "@/hooks/useAxios";
import { SkillAssessmentStatus } from "@/types/skillAssessments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface UpdateSkillAssessmentStatusPayload {
  slug: string;
  status: SkillAssessmentStatus;
}

const useUpdateSkillAssessmentStatus = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: UpdateSkillAssessmentStatusPayload) => {
      const { data } = await axiosInstance.patch(
        `/skill-assessments/${payload.slug}/status`,
        payload,
      );
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["skill-assessments"],
      });
      toast.success("Skill assessment status updated successfully");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to update skill assessment status",
      );
    },
  });
};

export default useUpdateSkillAssessmentStatus;
