"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SubscriptionCategory } from "@/types/subscription";
import { Eye } from "lucide-react";
import { useState } from "react";
import { SubscriptionCategoryDetailsDialog } from "./SubscriptionCategoryDetailsDialog";

interface SubscriptionCategoryCardProps {
  subscriptionCategory?: SubscriptionCategory;
}

export const SubscriptionCategoryCard = ({
  subscriptionCategory,
}: SubscriptionCategoryCardProps) => {
  const [openDetails, setOpenDetails] = useState(false);
  return (
    <div>
      <Card className="group rounded-2xl border border-gray-300 p-4 shadow-md transition-all duration-200 hover:border-blue-600 hover:shadow-lg">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
              {subscriptionCategory?.name}
            </h3>

            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <span className="font-medium">
                {subscriptionCategory?.description}
              </span>
              {subscriptionCategory?.price !== undefined && (
                <>
                  <span className="hidden h-1 w-1 rounded-full bg-gray-400 sm:inline-block" />
                  <span className="font-semibold text-gray-700">
                    Rp{subscriptionCategory?.price.toLocaleString("id-ID")}
                  </span>
                </>
              )}
            </div>

            {subscriptionCategory?.features.length && (
              <ul className="mt-1 list-inside list-disc text-sm text-gray-600">
                {subscriptionCategory.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            )}
          </div>

          <Button
            variant="outline"
            className="flex items-center gap-2 rounded-lg border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:border-blue-700 hover:bg-blue-700"
            onClick={() => setOpenDetails(true)}
          >
            <Eye size={16} />
            View Details
          </Button>
        </div>
      </Card>

      {subscriptionCategory && (
        <SubscriptionCategoryDetailsDialog
          isOpen={openDetails}
          onClose={() => setOpenDetails(false)}
          category={subscriptionCategory}
        />
      )}
    </div>
  );
};
