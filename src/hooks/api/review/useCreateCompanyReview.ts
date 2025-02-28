import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export interface CreateCompanyReviewPayload {
  salaryEstimate: number;
  workCultureRating: number;
  workLifeBalanceRating: number;
  facilitiesRating: number;
  careerGrowthRating: number;
  comment: string;
}

const useCreateCompanyReview = (companyId: number) => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: CreateCompanyReviewPayload) => {
      const { data } = await axiosInstance.post(
        `/reviews/${companyId}`,
        payload,
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Create company review success");
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

export default useCreateCompanyReview;
