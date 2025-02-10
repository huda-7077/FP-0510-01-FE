import { axiosInstance } from "@/lib/axios";
import { UserAssessmentData } from "@/types/userAssessment";
import { useQuery } from "@tanstack/react-query";

interface GetUserAssessmentQuery {
  id: number;
}

const useGetUserAssessment = (query: GetUserAssessmentQuery) => {
  return useQuery({
    queryKey: ["user-assessments", query],
    queryFn: async () => {
      const { data } = await axiosInstance.get<UserAssessmentData>(
        `/user-assessments/${query.id}`,
      );

      return data;
    },
  });
};

export default useGetUserAssessment;
