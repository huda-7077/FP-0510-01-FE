"use client";

import useGetSubscriptionCategories from "@/hooks/api/subscription-categories/useGetSubscriptionCategories";
import { SubscriptionCategoriesHeader } from "./components/SubscriptionCategoriesHeader";
import { SubscriptionCategoryCard } from "./components/SubscriptionCategoryCard";
import SubscriptionCategoryCardSkeleton from "./components/SubscriptionCategoryCardSkeleton";

const SubscriptionCategoriesPage = () => {
  const { data: subscriptionCategories, isLoading } =
    useGetSubscriptionCategories();

  return (
    <div className="px-4 py-4">
      <div className="container mx-auto w-full">
        <div>
          <SubscriptionCategoriesHeader
            totalSubscriptionCategories={subscriptionCategories?.length || 0}
          />
          <div className="mt-4 grid gap-2 sm:mt-6 sm:space-y-2 md:mt-8">
            {isLoading && (
              <>
                <SubscriptionCategoryCardSkeleton />
                <SubscriptionCategoryCardSkeleton />
              </>
            )}
            {subscriptionCategories?.map((category) => (
              <SubscriptionCategoryCard
                subscriptionCategory={category}
                key={category.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCategoriesPage;
