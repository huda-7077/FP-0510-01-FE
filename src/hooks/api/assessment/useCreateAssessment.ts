import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface CreateAssessmentPayload {
  jobId: number;
  title: string;
  description: string;
  passingScore: number;
}

const useCreateAssessment = () => {
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: CreateAssessmentPayload) => {
      const { data } = await axiosInstance.post("/assessments", payload);
      return data;
    },
    onSuccess: () => {
      console.log("Assessment Created Successfullly");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data || error.response?.data.message);
    },
  });
};

export default useCreateAssessment;
