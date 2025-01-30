import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface CreateQuestionOptionsPayload {
  questionId: number;
  options: string[];
  isCorrect: boolean[];
}

const useCreateQuestionOptions = () => {
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: CreateQuestionOptionsPayload) => {
      const { data } = await axiosInstance.post("/options/bulk", payload);
      return data;
    },
    onSuccess: () => {
      console.log("Question Options Created Successfullly");
    },
    onError: (error: AxiosError<any>) => {
      console.log(error.response?.data);
    },
  });
};

export default useCreateQuestionOptions;
