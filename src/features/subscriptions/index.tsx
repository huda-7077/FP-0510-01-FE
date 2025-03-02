"use client";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import useGetSubscription from "@/hooks/api/subscription/useGetSubscription";
import SubscriptionBanner from "./components/SubscriptionBanner";
import HomeBreadcrumb from "@/components/HomeBreadcrumb";

const SubscriptionPage = () => {
  const { data: subscription, isLoading } = useGetSubscription();

  if (isLoading) {
    return <LoadingScreen message="Loading subscription plans" />;
  }

  return (
    <div className="min-h-screen">
      <div className="bg-[#f7f7f8]">
        <div className="container mx-auto flex items-center justify-between px-6 py-5">
          <h1 className="text-lg font-medium duration-150 hover:pl-3 hover:text-blue-600">
            Subscriptions
          </h1>
          <HomeBreadcrumb lastCrumb="Subscriptions" />
        </div>
      </div>
      <div className="mx-auto max-w-4xl space-y-8 p-4">
        {subscription &&
        (subscription.status === "INACTIVE" ||
          subscription.status === "EXPIRED") ? (
          <SubscriptionBanner isActive={false} />
        ) : (
          <SubscriptionBanner isActive={true} />
        )}
      </div>
    </div>
  );
};

export default SubscriptionPage;
