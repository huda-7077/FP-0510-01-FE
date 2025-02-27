import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton = () => {
  return (
    <div className="flex items-center space-x-4 rounded-lg border p-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div>
        <Skeleton className="mb-2 h-4 w-32" />
        <Skeleton className="mb-2 h-4 w-64" />
        <Skeleton className="h-4 w-80" />
      </div>
      <div className="ml-auto flex space-x-2">
        <Skeleton className="h-8 w-24 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    </div>
  );
};

export default LoadingSkeleton;
