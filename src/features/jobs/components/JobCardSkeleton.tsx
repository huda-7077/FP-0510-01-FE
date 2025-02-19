import { Skeleton } from "@/components/ui/skeleton";

export const JobCardSkeleton = () => {
  return (
    <div className="rounded-md border-[1px] bg-card p-4 shadow-sm">
      <div className="flex flex-col gap-4">
        <Skeleton className="h-6 w-3/4" />

        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-20 rounded-sm" />
          <Skeleton className="h-4 w-24" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-36" />
            </div>
          </div>
          <Skeleton className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};