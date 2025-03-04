import useAxios from "@/hooks/useAxios";
import { JobApplication } from "@/types/jobApplication";
import { useQuery } from "@tanstack/react-query";

interface GetJobQuery {
  jobApplicationId: number;
}

const useGetJobApplication = ({ jobApplicationId }: GetJobQuery) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["job-applications"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<JobApplication>(
        `/job-applications/${jobApplicationId}`,
      );
      return data;
    },
    enabled: !!jobApplicationId,
  });
};

export default useGetJobApplication;
