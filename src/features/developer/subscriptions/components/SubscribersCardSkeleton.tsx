import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const SubscribersCardSkeleton = () => {
  return (
    <Card className="group rounded-2xl border-2 border-gray-200 p-3 px-6 py-4 shadow-none transition-all duration-200 hover:border-blue-600">
      <div className="flex flex-col items-start justify-between gap-3 sm:gap-4 lg:flex-row lg:items-center">
        <div className="w-full space-y-2 sm:w-auto">
          <div className="w-full sm:w-auto">
            <Skeleton className="h-6 w-3/4 rounded-md" />{" "}
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <Skeleton className="h-4 w-20 rounded-md" />{" "}
            <Skeleton className="hidden h-1 w-1 rounded-full sm:block" />{" "}
            <Skeleton className="h-4 w-16 rounded-md" />{" "}
          </div>
        </div>

        <div className="flex w-full flex-wrap items-center justify-between gap-2 sm:flex-nowrap sm:gap-4 md:gap-5 lg:w-auto">
          <Skeleton className="h-8 w-24 rounded-md" />
          <div className="ml-auto flex items-center gap-2 sm:ml-0 sm:gap-4 md:gap-5">
            <Skeleton className="h-8 w-24 rounded-md sm:h-9 md:h-10" />{" "}
          </div>
        </div>
      </div>
    </Card>
  );
};
