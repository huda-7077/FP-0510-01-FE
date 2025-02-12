import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export interface CreateJobPayload {
  companyId: number;
  title: string;
  description: string;
  bannerImage?: File | null;
  category: string;
  salary?: number;
  tags: string[];
  applicationDeadline: string;
  isPublished: boolean;
  requiresAssessment: boolean;
  companyLocationId: number;
}

const useCreateJob = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: CreateJobPayload) => {
      const formData = new FormData();

      formData.append("companyId", `${payload.companyId}`);
      formData.append("title", payload.title);
      formData.append("description", payload.description);
      if (payload.bannerImage) {
        formData.append("bannerImage", payload.bannerImage);
      }
      formData.append("category", payload.category);
      if (payload.salary) {
        formData.append("salary", `${payload.salary}`);
      }
      formData.append("tags", payload.tags.join(","));
      formData.append("applicationDeadline", payload.applicationDeadline);
      formData.append("isPublished", `${payload.isPublished}`);
      formData.append("requiresAssessment", `${payload.requiresAssessment}`);
      formData.append("companyLocationId", `${payload.companyLocationId}`);

      const { data } = await axiosInstance.post(`/jobs`, formData);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      console.log("Job Created Successfullly");
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

export default useCreateJob;
