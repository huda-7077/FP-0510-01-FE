import useAxios from "@/hooks/useAxios";
import { Subscription, SubscriptionCategory } from "@/types/subscription";
import { useQuery } from "@tanstack/react-query";

interface GetSubscriptionResponse extends Subscription {
  duration: number;
  category: SubscriptionCategory;
}
const useGetSubscription = () => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<GetSubscriptionResponse>(
        `/subscriptions/current`,
      );
      return data;
    },
  });
};
export default useGetSubscription;
