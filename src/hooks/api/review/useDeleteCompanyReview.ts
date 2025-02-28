import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const useDeleteCompanyReview = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (reviewId: number) => {
      const { data } = await axiosInstance.delete(`/reviews/${reviewId}`);
      return data;
    },
    onSuccess: () => {
      toast.success("Delete company review success");
      queryClient.invalidateQueries({ queryKey: ["review"] });
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

export default useDeleteCompanyReview;
