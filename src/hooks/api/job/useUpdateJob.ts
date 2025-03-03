import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export interface UpdateJobPayload {
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
  generateSlug: boolean;
}

const useUpdateJob = (id: number) => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: UpdateJobPayload) => {
      const formData = new FormData();

      formData.append("title", payload.title);
      formData.append("description", payload.description);
      formData.append("generateSlug", `${payload.generateSlug}`);
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

      const { data } = await axiosInstance.patch(`/jobs/${id}`, formData);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },

    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data?.message || "Failed to update job");
    },
  });
};

export default useUpdateJob;
