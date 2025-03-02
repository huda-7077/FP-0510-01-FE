import useAxios from "@/hooks/useAxios";
import { Assessment } from "@/types/assessment";
import { useQuery } from "@tanstack/react-query";

const useGetAssessment = (slug: string) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["assessments", slug],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Assessment>(
        `/assessments/${slug}`,
      );

      return data;
    },
  });
};

export default useGetAssessment;
