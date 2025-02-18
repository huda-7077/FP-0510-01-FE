import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface CreateSkillAssessmentPayload {
  title: string;
  description: string;
  passingScore: number;
  badgeImage: File | null;
}

const useCreateSkillAssessment = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: CreateSkillAssessmentPayload) => {
      const createSkillAssessmentForm = new FormData();

      createSkillAssessmentForm.append("title", payload.title);
      createSkillAssessmentForm.append("description", payload.description);
      createSkillAssessmentForm.append(
        "passingScore",
        `${payload.passingScore}`,
      );
      if (payload.badgeImage) {
        createSkillAssessmentForm.append("badgeImage", payload.badgeImage);
      }
      const { data } = await axiosInstance.post(
        "/skill-assessments",
        createSkillAssessmentForm,
      );

      return data;
    },
    onSuccess: () => {
      toast.success("create skill assessment success");
      queryClient.invalidateQueries({ queryKey: ["skill-assessments"] });
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data || error.response?.data.message);
    },
  });
};

export default useCreateSkillAssessment;
