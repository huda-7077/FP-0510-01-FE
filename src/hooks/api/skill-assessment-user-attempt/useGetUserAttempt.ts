import useAxios from "@/hooks/useAxios";
import { SkillAssessmentUserAttempt } from "@/types/skillAssessments";
import { useQuery } from "@tanstack/react-query";

const useGetUserAttempt = (slug: string) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["skill-assessment-user-attempts", slug],
    queryFn: async () => {
      const { data } = await axiosInstance.get<SkillAssessmentUserAttempt>(
        `/skill-assessment-user-attempts/${slug}`,
      );
      return data;
    },
  });
};

export default useGetUserAttempt;
