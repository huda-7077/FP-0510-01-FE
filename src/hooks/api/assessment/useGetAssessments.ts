import { axiosInstance } from "@/lib/axios";
import { Assessment } from "@/types/assessment";
import { useQuery } from "@tanstack/react-query";

interface GetAssessmentsQuery {
  jobId: number;
}

const useGetAssessments = (queries: GetAssessmentsQuery) => {
  return useQuery({
    queryKey: ["assessments", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Assessment>("/assessments", {
        params: queries,
      });

      return data;
    },
  });
};

export default useGetAssessments;
