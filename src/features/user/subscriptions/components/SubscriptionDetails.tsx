"use client";
import { AlertDialogComponent } from "@/components/AlertDialogComponent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RenewSubscriptionDialog } from "@/features/subscriptions/components/RenewDialog";
import { GetSubscriptionResponse } from "@/hooks/api/subscription/useGetSubscription";
import { format } from "date-fns";
import { Bell, Briefcase } from "lucide-react";
import { FC, useState } from "react";

interface SubscriptionDetailsProps {
  subscription: GetSubscriptionResponse;
  handleDelete: (id: number) => void;
  handleOpenSubscription: () => void;
  isPending?: boolean;
}
const SubscriptionDetails: FC<SubscriptionDetailsProps> = ({
  subscription,
  handleDelete,
  handleOpenSubscription,
  isPending,
}) => {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "MAILED":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "EXPIRED":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="overflow-hidden border-0 shadow-md transition-shadow hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="rounded-xl bg-blue-50 p-3">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Category</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {subscription.category.name}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-0 shadow-md transition-shadow hover:shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="rounded-xl bg-purple-50 p-3">
                <Bell className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <Badge
                  className={`mt-1 px-3 py-1 text-sm font-medium ${getStatusColor(subscription.status)}`}
                >
                  {subscription.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {subscription.status === "EXPIRED" ? (
        <div className="space-y-8">
          <div className="rounded-xl border border-red-200 bg-red-50 p-6">
            <p className="font-semibold text-red-800">
              Your subscription has expired
            </p>
            <p className="mt-2 text-sm text-red-600">
              Buy a new subscription to continue using our premium features
            </p>
          </div>
          <div className="flex items-center justify-center">
            <Button
              onClick={() => handleOpenSubscription()}
              className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
            >
              Buy Subscription
            </Button>
          </div>
        </div>
      ) : (
        <>
          <Card className="overflow-hidden border-0 shadow-md transition-shadow hover:shadow-lg">
            <CardHeader className="border-b bg-gray-50 px-6 py-4">
              <CardTitle className="text-xl font-semibold text-gray-900">
                Subscription Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="text-sm font-medium text-gray-500">End Date</p>
                  <p className="mt-2 text-lg font-semibold text-gray-900">
                    {format(subscription.expiredDate, "MMMM dd, yyyy")}
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="text-sm font-medium text-gray-500">Price</p>
                  <p className="mt-2 text-lg font-semibold text-blue-600">
                    Rp
                    {subscription.category.price.toLocaleString("id-ID")}
                  </p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm">
                  <p className="text-sm font-medium text-gray-500">Duration</p>
                  <p className="mt-2 text-lg font-semibold text-gray-900">
                    {subscription.duration}{" "}
                    {subscription.duration === 1 ? "month" : "months"}
                  </p>
                </div>
              </div>

              {subscription.status === "MAILED" && (
                <div className="space-y-6">
                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
                    <p className="font-semibold text-amber-800">
                      Your subscription will end tomorrow
                    </p>
                    <p className="mt-2 text-sm text-amber-600">
                      Renew now to maintain uninterrupted access to all
                      features.
                    </p>
                  </div>

                  <div className="flex flex-col items-center border-t pt-6">
                    <Button
                      onClick={() => setCheckoutOpen(true)}
                      className="w-full bg-blue-600 px-8 py-3 text-white transition-colors hover:bg-blue-700 md:w-auto"
                      size="lg"
                    >
                      Renew Subscription
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          <Card className="overflow-hidden border-0 shadow-md transition-shadow hover:shadow-lg">
            <CardContent className="space-y-4 p-6">
              <div className="rounded-xl border border-red-200 bg-red-50 p-6">
                <p className="text-lg font-semibold text-red-700">
                  Danger Zone: Unsubscribe
                </p>
                <p className="text-sm text-red-600">
                  You are about to cancel your subscription. Proceed with
                  caution.
                </p>
              </div>
              <div className="flex flex-col items-center border-t pt-3">
                <Button
                  onClick={() => setIsDialogOpen(true)}
                  className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white shadow-sm transition-all hover:bg-red-700 hover:shadow-md"
                  size="lg"
                >
                  Proceed
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      <RenewSubscriptionDialog
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        categoryName={subscription.category.name}
        basePrice={subscription.category.price}
      />
      <AlertDialogComponent
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={() => {
          handleDelete(subscription.id);
          setIsDialogOpen(false);
        }}
        title="Unsubscribe"
        description="Are you sure you want to unsubscribe? This action cannot be undone."
        confirmText="Unsubscribe"
        cancelText="Cancel"
        buttonClassName="bg-red-600 hover:bg-red-700"
        isPending={isPending}
      />
    </div>
  );
};

export default SubscriptionDetails;
