import useAxios from "@/hooks/useAxios";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { PaymentData } from "@/types/payment";
import { useQuery } from "@tanstack/react-query";

interface GetPaymentsQuery extends PaginationQueries {
  search?: string;
  status?: string;
  paymentMethod?: string;
}

const useGetPayments = (queries: GetPaymentsQuery) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["payment", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<PaymentData>>(
        "/payments",
        {
          params: queries,
        },
      );
      return data;
    },
  });
};

export default useGetPayments;
