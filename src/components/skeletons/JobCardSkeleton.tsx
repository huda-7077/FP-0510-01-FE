import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const JobCardSkeleton = () => {
  return (
    <Card className="border border-gray-100 p-3 sm:p-4 md:p-5">
      <div className="flex flex-col items-start justify-between gap-3 sm:gap-4 lg:flex-row lg:items-center">
        <div className="w-full flex-1 space-y-3 sm:w-auto">
          <div className="w-full sm:w-auto">
            <Skeleton className="h-6 w-3/4 sm:h-7 md:h-8" />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Skeleton className="h-4 w-24 sm:h-5" />
            <div className="hidden h-1 w-1 rounded-full bg-gray-300 sm:block" />
            <Skeleton className="h-4 w-32 sm:h-5" />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default JobCardSkeleton;
