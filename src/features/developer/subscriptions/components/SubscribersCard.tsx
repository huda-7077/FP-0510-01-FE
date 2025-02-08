"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Subscription, SubscriptionStatus } from "@/types/subscription";
import { Eye } from "lucide-react";
import { useState } from "react";
import { DetailsDialog } from "./DetailsDialog";
import { SubscriptionStatusBadge } from "./SubscriptionStatusBadge";

interface SubscribersCardProps {
  subscription?: Subscription;
}

export const SubscribersCard = ({ subscription }: SubscribersCardProps) => {
  const [openDetails, setOpenDetails] = useState(false);
  return (
    <div>
      <Card className="group rounded-2xl border-2 border-gray-200 p-3 px-6 py-4 shadow-none transition-all duration-200 hover:border-blue-600">
        <div className="flex flex-col items-start justify-between gap-3 sm:gap-4 lg:flex-row lg:items-center">
          <div className="w-full space-y-2 sm:w-auto">
            <div className="w-full sm:w-auto">
              <h3 className="line-clamp-2 p-0 text-base font-semibold text-gray-900 group-hover:text-blue-600">
                {subscription?.user.email}
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
              <span className="font-semibold">
                {subscription?.payment.category.name}
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-gray-300 sm:block" />
              <span>
                {subscription?.payment.duration}{" "}
                {subscription?.payment.duration === 1 ? "month" : "months"}
              </span>
            </div>
          </div>

          <div className="flex w-full flex-wrap items-center justify-between gap-2 sm:flex-nowrap sm:gap-4 md:gap-5 lg:w-auto">
            <SubscriptionStatusBadge
              status={
                subscription?.status
                  ? subscription.status
                  : SubscriptionStatus.INACTIVE
              }
            />
            <div className="ml-auto flex items-center gap-2 sm:ml-0 sm:gap-4 md:gap-5">
              <Button
                variant="outline"
                className="h-8 flex-1 bg-blue-600 text-xs text-white hover:bg-blue-800 hover:text-white sm:h-9 sm:flex-none sm:px-4 md:h-10 md:px-5"
                onClick={() => setOpenDetails(true)}
              >
                <Eye />
                View Details
              </Button>
            </div>
          </div>
        </div>
      </Card>
      {subscription && (
        <DetailsDialog
          isOpen={openDetails}
          onClose={() => setOpenDetails(false)}
          subscription={subscription}
        />
      )}
    </div>
  );
};
