import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface CreateAssessmentPayload {
  jobId: number;
  title: string;
  description: string;
  passingScore: number;
  status: string;
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
      console.log(error.response?.data);
    },
  });
};

export default useCreateAssessment;
