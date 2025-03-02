import { Skeleton } from "@/components/ui/skeleton";

export default function CVFormSkeleton() {
  return (
    <div>
      <div className="mx-auto w-full space-y-3 bg-white p-2 shadow-sm">
        <div>
          <Skeleton className="h-8 w-48 rounded-md" />
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-20 w-full rounded-md" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-16 w-full rounded-md" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-16 w-full rounded-md" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-16 w-full rounded-md" />
          </div>
        </div>

        <div>
          <Skeleton className="h-8 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
}
