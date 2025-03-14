import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export interface UpdateJobStatusPayload {
  id: number;
  isPublished: boolean;
}

const useUpdateJobStatus = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: UpdateJobStatusPayload) => {
      const { id, ...dataToUpdate } = payload;
      const { data } = await axiosInstance.patch(
        `/jobs/status/${id}`,
        dataToUpdate,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },

    onError: (error: AxiosError<any>) => {
      toast.error(
        error.response?.data?.message || "Failed to update job status",
      );
    },
  });
};

export default useUpdateJobStatus;
