import { axiosInstance } from "@/lib/axios";
import { PaymentData } from "@/types/payment";
import { useQuery } from "@tanstack/react-query";

const useGetPayment = (uuid: string) => {
  return useQuery({
    queryKey: ["payment", uuid],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PaymentData>(
        `/payments/invoice/${uuid}`,
      );
      return data;
    },
  });
};
export default useGetPayment;
