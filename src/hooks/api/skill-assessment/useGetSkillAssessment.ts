import useAxios from "@/hooks/useAxios";
import { SkillAssessment } from "@/types/skillAssessments";
import { useQuery } from "@tanstack/react-query";

const useGetSkillAssessment = (slug: string) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["skill-assessments", slug],
    queryFn: async () => {
      const { data } = await axiosInstance.get<SkillAssessment>(
        `/skill-assessments/${slug}`,
      );
      return data;
    },
  });
};
export default useGetSkillAssessment;
