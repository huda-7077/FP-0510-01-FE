import useAxios from "@/hooks/useAxios";
import { UserPreTestAssessment } from "@/types/assessment";
import { useQuery } from "@tanstack/react-query";

const useGetUserScore = (attemptId: number) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["assessment-user-attempts", attemptId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<UserPreTestAssessment>(
        `/assessment-user-attempts/${attemptId}/score`,
      );
      return data;
    },
  });
};

export default useGetUserScore;
