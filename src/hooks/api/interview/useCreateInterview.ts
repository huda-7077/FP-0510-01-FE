import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export interface CreateInterviewPayload {
  jobApplicationId: number;
  scheduledDate: string;
  interviewerName: string;
  location: string;
  meetingLink?: string;
  notes?: string;
}

const useCreateInterview = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: CreateInterviewPayload) => {
      const { data } = await axiosInstance.post("/interviews", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interviews"] });
    },
    onError: (error: AxiosError<any>) => {
      toast.error(
        error.response?.data?.message || "Failed to create interview",
      );
    },
  });
};

export default useCreateInterview;
