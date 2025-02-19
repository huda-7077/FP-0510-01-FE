import useAxios from "@/hooks/useAxios";
import { Interview } from "@/types/interviews";
import { useQuery } from "@tanstack/react-query";

interface GetInterviewQuery {
  id: number;
}

const useGetInterview = (query: GetInterviewQuery) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["assessments", query],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Interview>(
        `/interviews/${query.id}`,
      );

      return data;
    },
  });
};

export default useGetInterview;
