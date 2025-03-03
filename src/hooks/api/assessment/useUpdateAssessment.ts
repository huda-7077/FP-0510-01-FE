import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export interface UpdateAssessmentPayload {
  slug: string;
  title: string;
  description: string;
  passingScore: number;
  generateSlug: boolean;
}

const useUpdateAssessment = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: UpdateAssessmentPayload) => {
      const { slug, ...dataToUpdate } = payload;
      const { data } = await axiosInstance.patch(
        `/assessments/${slug}`,
        dataToUpdate,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assessments"] });
      console.log("Assessments Updated Successfullly");
    },

    onError: (error: AxiosError<any>) => {
      toast.error(
        error.response?.data?.message || "Failed to update assessment status",
      );
    },
  });
};

export default useUpdateAssessment;
