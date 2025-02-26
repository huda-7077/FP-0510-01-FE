import { axiosInstance } from "@/lib/axios";
import { UserAssessment } from "@/types/assessment";
import { useQuery } from "@tanstack/react-query";

interface GetUserAssessmentQuery {
  id: number;
}

const useGetUserAssessment = (query: GetUserAssessmentQuery) => {
  return useQuery({
    queryKey: ["user-assessments", query],
    queryFn: async () => {
      const { data } = await axiosInstance.get<UserAssessment>(
        `/user-assessments/${query.id}`,
      );

      return data;
    },
  });
};

export default useGetUserAssessment;
