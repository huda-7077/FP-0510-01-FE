import useAxios from "@/hooks/useAxios";
import { PaymentData } from "@/types/payment";
import { useQuery } from "@tanstack/react-query";

const useGetPayment = (uuid: string) => {
  const { axiosInstance } = useAxios();
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
