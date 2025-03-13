import { Skeleton } from "@/components/ui/skeleton";

export const JobCardSkeleton = () => {
  return (
    <div className="rounded-md border-[1px] bg-card p-4 shadow-sm">
      <div className="flex flex-col gap-4">
        <Skeleton className="h-6 w-3/4" />
        
        <div className="flex flex-wrap items-center gap-3">
          <Skeleton className="h-8 w-1/5 min-w-[80px] rounded-sm" />
          <Skeleton className="h-4 w-1/4 min-w-[90px]" />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-2 w-[85%]">
            <div className="h-10 w-10 flex-shrink-0">
              <Skeleton className="h-full w-full rounded-full" />
            </div>
            <div className="min-w-0 space-y-1 w-[80%]">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
          <div className="flex-shrink-0 self-start">
            <Skeleton className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  );
};