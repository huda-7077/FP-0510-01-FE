import useAxios from "@/hooks/useAxios";
import { Employee } from "@/types/employee";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface GetEmployeesQuery extends PaginationQueries {
  search?: string;
  isDeleted?: string;
  startDate?: string;
  endDate?: string;
}

const useGetEmployees = (queries: GetEmployeesQuery) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["employees", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Employee>>(
        "/employees",
        {
          params: queries,
        },
      );
      return data;
    },
  });
};

export default useGetEmployees;
