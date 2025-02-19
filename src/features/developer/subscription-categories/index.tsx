"use client";

import useGetSubscriptionCategories from "@/hooks/api/subscription-categories/useGetSubscriptionCategories";
import { SubscriptionCategoriesHeader } from "./components/SubscriptionCategoriesHeader";
import { SubscriptionCategoryCard } from "./components/SubscriptionCategoryCard";
import SubscriptionCategoryCardSkeleton from "./components/SubscriptionCategoryCardSkeleton";
import DashboardBreadcrumb from "@/components/DashboardBreadcrumb";

const SubscriptionCategoriesPage = () => {
  const { data: subscriptionCategories, isLoading } =
    useGetSubscriptionCategories();

  return (
    <>
      <DashboardBreadcrumb
        route="developer"
        lastCrumb="Subscription Categories"
      />
      <div className="my-1 md:my-2">
        <div className="container mx-auto w-full">
          <div>
            <SubscriptionCategoriesHeader
              totalSubscriptionCategories={subscriptionCategories?.length || 0}
            />
            <div className="mt-4 grid gap-2 sm:space-y-2">
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
    </>
  );
};

export default SubscriptionCategoriesPage;
