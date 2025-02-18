import useAxios from "@/hooks/useAxios";
import { SkillAssessmentStatus } from "@/types/skillAssessments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface UpdateSkillAssessmentPayload {
  slug: string;
  title: string;
  description: string;
  passingScore: number;
  badgeImage: File | null;
  generateSlug: boolean;
  status: SkillAssessmentStatus;
}

const useUpdateSkillAssessment = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: UpdateSkillAssessmentPayload) => {
      const updateSkillAssessmentForm = new FormData();

      updateSkillAssessmentForm.append("title", payload.title);
      updateSkillAssessmentForm.append("description", payload.description);
      updateSkillAssessmentForm.append(
        "generateSlug",
        `${payload.generateSlug}`,
      );
      updateSkillAssessmentForm.append(
        "passingScore",
        `${payload.passingScore}`,
      );
      if (payload.badgeImage) {
        updateSkillAssessmentForm.append("badgeImage", payload.badgeImage);
      }
      const { data } = await axiosInstance.patch(
        `/skill-assessments/${payload.slug}`,
        updateSkillAssessmentForm,
      );

      return data;
    },
    onSuccess: (data) => {
      toast.success("update skill assessment details success");
      queryClient.invalidateQueries({ queryKey: ["skill-assessments"] });
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data || error.response?.data.message);
    },
  });
};

export default useUpdateSkillAssessment;
