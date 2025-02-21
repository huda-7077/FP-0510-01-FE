import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface AvgSalaryByProvince {
  data: { province: string; avgSalary: number }[];
}

interface AvgSalaryByProvinceQuery {
  timeRange?: string;
}

const useGetAvgSalaryByProvince = ({ timeRange }: AvgSalaryByProvinceQuery) => {
  return useQuery({
    queryKey: ["avg-salary-by-province", timeRange],
    queryFn: async () => {
      const { data } = await axiosInstance.get<AvgSalaryByProvince>(
        `/job-applications/avg-salary/province`,
        {
          params: { timeRange },
        },
      );
      return data;
    },
  });
};

export default useGetAvgSalaryByProvince;
