import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

interface CheckEmployeeExistance {
  isExist: boolean;
}

const useCheckEmployeeExistance = (userId: number) => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["employees", userId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<CheckEmployeeExistance>(
        `employees/check-employee?userId=${userId}`,
      );
      return data;
    },
  });
};

export default useCheckEmployeeExistance;
