import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MoreVertical } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export const JobDetailsHeaderSkeleton = () => {
  return (
    <div className="space-y-4 rounded-lg bg-white">
      <div className="flex items-start justify-between gap-4">
        <Skeleton className="h-8 w-2/3 sm:h-9" />
        <Button
          variant="ghost"
          className="h-9 w-9 shrink-0 p-0 hover:bg-gray-100"
          disabled
        >
          <MoreVertical className="h-4 w-4 text-gray-300" />
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-sm">
        <Skeleton className="h-5 w-24" />
        <span className="h-1 w-1 rounded-full bg-gray-200" />
        <div className="flex flex-wrap items-center gap-2">
          <Skeleton className="h-5 w-20" />
        </div>
      </div>

      <div className="flex flex-col flex-wrap gap-4 sm:flex-row sm:items-center sm:gap-6">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-64" />
        </div>
      </div>

      <div className="space-y-2 pt-4">
        <Skeleton className="h-7 w-32 md:h-8" />
        <ScrollArea className="h-[260px] w-full rounded-md border bg-gray-50 p-4">
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
