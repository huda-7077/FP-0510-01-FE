import { axiosInstance } from "@/lib/axios";
import { UserAssessment } from "@/types/userAssessment";
import { useQuery } from "@tanstack/react-query";

interface GetUserAssessmentsQuery {
  assessmentId?: number;
  userId?: number;
}

const useGetUserAssessments = (queries: GetUserAssessmentsQuery) => {
  return useQuery({
    queryKey: ["user-assessments", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<UserAssessment>(
        "/user-assessments",
        {
          params: queries,
        },
      );

      return data;
    },
  });
};

export default useGetUserAssessments;
