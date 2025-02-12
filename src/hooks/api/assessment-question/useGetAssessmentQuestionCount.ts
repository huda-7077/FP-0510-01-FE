import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface GetAssessmentQuestionCountQuery {
  assessmentId: number;
}

interface AssessmentQuestionCount {
  count: number;
}

const useGetAssessmentQuestionCount = (
  query: GetAssessmentQuestionCountQuery,
) => {
  return useQuery({
    queryKey: ["questions", query],
    queryFn: async () => {
      const { data } = await axiosInstance.get<AssessmentQuestionCount>(
        `/questions/count/${query.assessmentId}`,
      );

      return data;
    },
    refetchOnWindowFocus: false,
    enabled: true, // Ensure this is controlled by the hook's internal logic
    retry: false, // Disable retries to avoid excessive API calls
    staleTime: Infinity, // Cache the data indefinitely to prevent unnecessary refetches
    placeholderData: { count: 0 },
  });
};

export default useGetAssessmentQuestionCount;
