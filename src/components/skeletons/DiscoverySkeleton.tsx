import { Skeleton } from "@/components/ui/skeleton";

const DiscoverySkeleton = () => (
  <div className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex items-center gap-4">
      <Skeleton className="h-12 w-12 rounded" />
      <div>
        <Skeleton className="h-5 w-48" />
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <Skeleton className="h-10 w-28" />
    </div>
  </div>
);

export default DiscoverySkeleton;
