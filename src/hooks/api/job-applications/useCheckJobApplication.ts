import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

interface CheckJobApplication {
  isExist: boolean;
}

const useCheckJobApplication = (jobId: number) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["job-applications", jobId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<CheckJobApplication>(
        `job-applications/check-applicant?jobId=${jobId}`,
      );
      return data;
    },
  });
};

export default useCheckJobApplication;
