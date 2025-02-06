import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface UpdateUserAssessmentPayload {
  id: number;
  score?: number;
  status: string;
}

const useUpdateUserAssessment = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: UpdateUserAssessmentPayload) => {
      const { id, ...dataToUpdate } = payload;
      const { data } = await axiosInstance.patch(
        `/user-assessments/${id}`,
        dataToUpdate,
      );
      return data;
    },
    onSuccess: () => {
      console.log("User Assessment Updated Successfullly");
    },
    onError: (error: AxiosError<any>) => {
      queryClient.invalidateQueries({ queryKey: ["user-assessments"] });
      toast.error(error.response?.data);
    },
  });
};

export default useUpdateUserAssessment;
