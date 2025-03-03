import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

interface AssessmentSlug {
  slug: number;
}

const useGetAssessmentSlug = () => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["assessments"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<AssessmentSlug>(`/assessments`);
      return data;
    },
  });
};

export default useGetAssessmentSlug;
