import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

interface GetUserScoreData {
  attemptId: number;
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  slug: string;
}

const useGetUserScore = (attemptId: number) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["skill-assessment-user-attempts", attemptId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<GetUserScoreData>(
        `/skill-assessment-user-attempts/${attemptId}/score`,
      );
      return data;
    },
  });
};

export default useGetUserScore;
