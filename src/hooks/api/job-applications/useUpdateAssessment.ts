import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export interface UpdateJobApplicationPayload {
  id: number;
  jobId?: number;
  userId?: number;
  cvFile?: string;
  attachment?: string;
  expectedSalary?: number;
  status?: string;
  notes?: string;
}

const useUpdateJobApplication = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: UpdateJobApplicationPayload) => {
      const { id, ...dataToUpdate } = payload;
      const { data } = await axiosInstance.patch(
        `/job-applications/${payload.id}`,
        dataToUpdate,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-applications"] });
      console.log("Job Application Updated Successfullly");
    },

    onError: (error: AxiosError<any>) => {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        "An error occurred";
      toast.error(errorMessage);
    },
  });
};

export default useUpdateJobApplication;
