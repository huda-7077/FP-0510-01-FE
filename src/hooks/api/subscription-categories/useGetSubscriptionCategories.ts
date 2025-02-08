import { axiosInstance } from "@/lib/axios";
import { SubscriptionCategory } from "@/types/subscription";
import { useQuery } from "@tanstack/react-query";

const useGetSubscriptionCategories = () => {
  return useQuery({
    queryKey: ["subscription-categories"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<SubscriptionCategory[]>(
        `/subscription-categories`,
      );
      return data;
    },
  });
};
export default useGetSubscriptionCategories;
