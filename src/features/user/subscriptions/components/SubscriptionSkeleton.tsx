import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SubscriptionSkeleton() {
  return (
    <div className="space-y-8">
      <Card className="overflow-hidden border-0 shadow-md transition-shadow hover:shadow-lg">
        <CardContent className="space-y-8 p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <Skeleton className="mb-2 h-4 w-20" />
              <Skeleton className="h-6 w-32" />
            </div>

            <div className="rounded-lg bg-white p-4 shadow-sm">
              <Skeleton className="mb-2 h-4 w-20" />
              <Skeleton className="h-6 w-32" />
            </div>

            <div className="rounded-lg bg-white p-4 shadow-sm">
              <Skeleton className="mb-2 h-4 w-20" />
              <Skeleton className="h-6 w-32" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
              <Skeleton className="mb-2 h-6 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>

            <div className="flex flex-col items-center border-t pt-6">
              <Skeleton className="h-10 w-40" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
