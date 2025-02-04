import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface GetGetEducationLevelsByJobIdQuery {
  jobId: number;
}

interface UserEducationLevels {
  data: string[];
}

const useGetEducationLevelsByJobId = (
  query: GetGetEducationLevelsByJobIdQuery,
) => {
  return useQuery({
    queryKey: ["users", query],
    queryFn: async () => {
      const { data } = await axiosInstance.get<UserEducationLevels>(
        `/users/education-levels?jobId=${query.jobId}`,
      );
      return data;
    },
  });
};

export default useGetEducationLevelsByJobId;
