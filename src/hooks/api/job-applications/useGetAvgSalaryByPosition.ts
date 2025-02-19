import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface AvgSalaryByPosition {
  data: { position: string; avgSalary: number }[];
}

interface AvgSalaryByPositionQuery {
  timeRange?: string;
}

const useGetAvgSalaryByPosition = ({ timeRange }: AvgSalaryByPositionQuery) => {
  return useQuery({
    queryKey: ["avg-salary-by-position", timeRange],
    queryFn: async () => {
      const { data } = await axiosInstance.get<AvgSalaryByPosition>(
        `/job-applications/avg-salary/position`,
        {
          params: { timeRange },
        },
      );
      return data;
    },
  });
};

export default useGetAvgSalaryByPosition;
