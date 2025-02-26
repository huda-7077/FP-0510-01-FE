"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const BadgeCardSkeleton = () => {
  return (
    <div className="h-full">
      <Card className="group relative h-full overflow-hidden rounded-xl border-2 border-gray-300 transition-all duration-300">
        <Skeleton className="ml-3 mt-3 h-5 w-5" />

        <CardContent>
          <div className="flex flex-col items-center">
            <div className="relative">
              <Skeleton className="h-24 w-24 rounded-full" />
            </div>
          </div>
        </CardContent>

        <div className="mx-auto bg-blue-100 px-4 py-3">
          <Skeleton className="h-6 w-full" />
        </div>
      </Card>
    </div>
  );
};
