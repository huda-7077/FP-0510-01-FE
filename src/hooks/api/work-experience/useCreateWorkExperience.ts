import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import {
  CreateWorkExperienceDTO,
  WorkExperience,
} from "@/types/workExperience";

export const useCreateWorkExperience = () => {
  const { data: session } = useSession();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: CreateWorkExperienceDTO) => {
      const { data } = await axiosInstance.post("/work-experiences", values, {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      });
      return data;
    },
    onSuccess: () => {
      toast.success("Work experience added successfully");
      queryClient.invalidateQueries({ queryKey: ["workExperiences"] });
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Failed to add work experience",
      );
    },
  });
};
