"use client";
import DashboardBreadcrumb from "@/components/DashboardBreadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useDeleteSubscription from "@/hooks/api/subscription/useDeleteSubscription";
import useGetSubscription from "@/hooks/api/subscription/useGetSubscription";
import { useTransitionRouter } from "next-view-transitions";
import SubscriptionDetails from "./components/SubscriptionDetails";
import SubscriptionSkeleton from "./components/SubscriptionSkeleton";

const UserSubscriptionsPage = () => {
  const router = useTransitionRouter();

  const { data: subscription, isLoading, refetch } = useGetSubscription();

  const { mutateAsync: deleteSubscription, isPending } =
    useDeleteSubscription();

  const handleDelete = async (id: number) => {
    await deleteSubscription(id);
    router.replace("/dashboard/user/subscriptions");
    refetch();
  };

  const handleOpenSubscription = () => {
    router.push("/subscriptions");
  };

  return (
    <>
      <DashboardBreadcrumb route="user" lastCrumb="Subscriptions" />

      <div className="my-1 md:my-2">
        <div className="container mx-auto w-full px-1">
          <div>
            <div className="space-y-4 border-b border-gray-200 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-semibold text-gray-900">
                    Subscriptions
                  </h1>
                </div>
              </div>
            </div>
            <div className="mt-4 gap-2">
              {isLoading ? (
                <>
                  <SubscriptionSkeleton />
                </>
              ) : subscription && subscription.status !== "INACTIVE" ? (
                <SubscriptionDetails
                  subscription={subscription}
                  handleDelete={handleDelete}
                  handleOpenSubscription={handleOpenSubscription}
                  isPending={isPending}
                />
              ) : (
                <Card className="overflow-hidden border-0 shadow-md transition-shadow hover:shadow-lg">
                  <CardContent className="space-y-8 p-6">
                    <div className="space-y-6">
                      <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
                        <p className="text-lg font-semibold text-blue-700">
                          Currently you don't have any active subscription
                        </p>
                        <p className="mt-2 text-sm text-blue-500">
                          Subscribe now to unlock all the premium features
                        </p>
                      </div>

                      <div className="flex flex-col items-center border-t pt-6">
                        <Button
                          onClick={() => router.push("/subscriptions")}
                          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md"
                          size="lg"
                        >
                          Subscribe Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSubscriptionsPage;
