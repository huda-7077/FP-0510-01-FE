import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface CreateUserAssessmentPayload {
  assessmentId: number;
  userId: number;
}

const useCreateUserAssessment = () => {
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: CreateUserAssessmentPayload) => {
      const { data } = await axiosInstance.post("/user-assessments", payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Good Luck on Your Test!");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useCreateUserAssessment;
