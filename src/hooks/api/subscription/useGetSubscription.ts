import useAxios from "@/hooks/useAxios";
import { Subscription, SubscriptionCategory } from "@/types/subscription";
import { useQuery } from "@tanstack/react-query";

export interface GetSubscriptionResponse extends Subscription {
  duration: number;
  category: SubscriptionCategory;
}
const useGetSubscription = (options: { enabled?: boolean }) => {
  const { enabled = true } = options;
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<GetSubscriptionResponse>(
        `/subscriptions/current`,
      );
      return data;
    },
    enabled,
    ...options,
  });
};
export default useGetSubscription;
