import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface CreateAssessmentQuestionPayload {
  assessmentId: number;
  question: string;
}

const useCreateAssessmentQuestion = () => {
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: CreateAssessmentQuestionPayload) => {
      const { data } = await axiosInstance.post("/questions", payload);
      return data;
    },
    onSuccess: () => {
      console.log("Assessment Question Created Successfullly");
    },
    onError: (error: AxiosError<any>) => {
      console.log(error.response?.data);
    },
  });
};

export default useCreateAssessmentQuestion;
