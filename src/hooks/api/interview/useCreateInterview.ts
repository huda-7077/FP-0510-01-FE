import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface CreateInterviewPayload {
  jobApplicationId: number;
  scheduledDate: string;
  interviewerName: string;
  location: string;
  meetingLink?: string;
  notes?: string;
}

const useCreateInterview = () => {
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: CreateInterviewPayload) => {
      const { data } = await axiosInstance.post("/interviews", payload);
      return data;
    },
    onSuccess: () => {
      console.log("Interview Created Successfullly");
    },
    onError: (error: AxiosError<any>) => {
      console.log(error.response?.data);
    },
  });
};

export default useCreateInterview;
