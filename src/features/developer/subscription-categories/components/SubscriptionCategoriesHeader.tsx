"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateSubscriptionCategoryDialog } from "./CreateSubscriptionCategoryDialog";

interface PaymentsHeaderProps {
  totalSubscriptionCategories: number;
}

export const SubscriptionCategoriesHeader = ({
  totalSubscriptionCategories,
}: PaymentsHeaderProps) => {
  const [openDetails, setOpenDetails] = useState(false);

  return (
    <>
      <div className="space-y-4 border-b border-gray-200 pb-4">
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">
              Subscription Categories
            </h1>
            <Badge
              variant="secondary"
              className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
            >
              {totalSubscriptionCategories}
            </Badge>
          </div>

          <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Button
              variant="outline"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:border-blue-700 hover:bg-blue-700 sm:w-auto"
              onClick={() => setOpenDetails(true)}
            >
              <Plus size={16} />
              Add Subscription Category
            </Button>
          </div>
        </div>
      </div>
      {openDetails && (
        <CreateSubscriptionCategoryDialog
          isOpen={openDetails}
          onClose={() => setOpenDetails(false)}
        />
      )}
    </>
  );
};
