import { axiosInstance } from "@/lib/axios";
import { Payment } from "@/types/payment";
import { useQuery } from "@tanstack/react-query";

const useGetInvoice = (uuid: string) => {
  return useQuery({
    queryKey: ["payment", uuid],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Payment>(`/invoices/${uuid}`);
      return data;
    },
  });
};
export default useGetInvoice;
