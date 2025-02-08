import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SubscriptionCategoryCardSkeleton = () => {
  return (
    <div>
      <Card className="rounded-2xl border border-gray-300 p-4 shadow-md">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-6 w-48 rounded-lg" />
            <Skeleton className="h-4 w-64 rounded-lg" />
            <Skeleton className="h-4 w-24 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full rounded-lg" />
              <Skeleton className="h-4 w-full rounded-lg" />
              <Skeleton className="h-4 w-full rounded-lg" />
            </div>
          </div>
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>
      </Card>
    </div>
  );
};

export default SubscriptionCategoryCardSkeleton;
