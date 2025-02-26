import useAxios from "@/hooks/useAxios";
import { AssessmentStatus } from "@/types/assessment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface UpdateAssessmentStatusPayload {
  slug: string;
  status: AssessmentStatus;
}

const useUpdateAssessmentStatus = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: UpdateAssessmentStatusPayload) => {
      const { data } = await axiosInstance.patch(
        `/assessments/${payload.slug}/status`,
        payload,
      );
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["assessments"],
      });
      console.log("Assessment status updated successfully");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(
        error.response?.data?.message || "Failed to update assessment status",
      );
    },
  });
};

export default useUpdateAssessmentStatus;
