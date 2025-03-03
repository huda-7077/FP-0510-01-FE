import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export interface UpdateIntervewPayload {
  id: number;
  isDeleted: boolean;
  jobApplicationId: number;
  scheduledDate: string;
  interviewerName: string;
  location: string;
  meetingLink?: string | null;
  notes?: string | null;
}

const useUpdateInterview = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: UpdateIntervewPayload) => {
      const { id, ...dataToUpdate } = payload;
      const { data } = await axiosInstance.patch(
        `/interviews/${id}`,
        dataToUpdate,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interviews"] });
    },
    onError: (error: AxiosError<any>) => {
      toast.error(
        error.response?.data?.message || "Failed to update interview",
      );
    },
  });
};

export default useUpdateInterview;
