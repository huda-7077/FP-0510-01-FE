import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const useDeleteSavedJob = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosInstance.delete(`/saved-jobs/${id}`);
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["savedJobs"],
      });
      toast.success("Job removed from bookmarks");
    },
    onError: (error: AxiosError<any>) => {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        "Failed to remove bookmark";
      toast.error(errorMessage);
      console.log(error.response?.data);
    },
  });
};

export default useDeleteSavedJob;
