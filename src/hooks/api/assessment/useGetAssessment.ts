import { axiosInstance } from "@/lib/axios";
import { AssessmentData } from "@/types/assessment";
import { useQuery } from "@tanstack/react-query";

interface GetAssessmentQuery {
  id: number;
}

const useGetAssessment = (query: GetAssessmentQuery) => {
  return useQuery({
    queryKey: ["assessments", query],
    queryFn: async () => {
      const { data } = await axiosInstance.get<AssessmentData>(
        `/assessments/${query.id}`,
      );

      return data;
    },
  });
};

export default useGetAssessment;
