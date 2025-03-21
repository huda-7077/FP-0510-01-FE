import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface UpdateEmployeePayload {
  id: number;
  userId: number;
  position: string;
  isEmployee: boolean;
}

const useUpdateEmployee = () => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: UpdateEmployeePayload) => {
      const { id, ...dataToUpdate } = payload;
      const { data } = await axiosInstance.patch(
        `/employees/${id}`,
        dataToUpdate,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data?.message || "Failed to update employee");
    },
  });
};

export default useUpdateEmployee;
