import { axiosInstance } from "@/lib/axios";
import { Employee } from "@/types/employee";
import { useQuery } from "@tanstack/react-query";

interface Options {
  enabled?: boolean;
}

const useGetCompanyEmployee = (companyId: number, options: Options = {}) => {
  const { enabled = true } = options;
  return useQuery({
    queryKey: ["employee", companyId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Employee>(
        `/employees/check-employee/${companyId}`,
      );
      return data;
    },
    enabled,
    ...options,
  });
};

export default useGetCompanyEmployee;
