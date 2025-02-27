import useAxios from "@/hooks/useAxios";
import { AssessmentUserAttempt } from "@/types/assessment";
import { useQuery } from "@tanstack/react-query";

const useGetUserAttempt = () => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["assessment-user-attempts"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<AssessmentUserAttempt>(
        `/assessment-user-attempts`,
      );
      return data;
    },
  });
};

export default useGetUserAttempt;
