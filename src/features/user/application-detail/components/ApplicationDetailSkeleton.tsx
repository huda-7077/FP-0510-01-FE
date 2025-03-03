import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ApplicationDetailSkeleton = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-md" />
              <div>
                <Skeleton className="mb-2 h-8 w-64" />
                <Skeleton className="h-4 w-48" />
                <Skeleton className="mt-1 h-4 w-56" />
              </div>
            </div>
            <Skeleton className="h-6 w-24" />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <Skeleton className="mb-1 h-4 w-24" />
                <Skeleton className="h-6 w-32" />
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Skeleton className="mb-2 h-6 w-32" />
            <Skeleton className="mb-2 h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-6 md:flex-row">
        <Card className="md:w-2/3">
          <CardContent className="p-6">
            <Skeleton className="mb-4 h-6 w-48" />
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>

        <Card className="md:w-1/3">
          <CardContent className="p-6">
            <Skeleton className="mb-4 h-6 w-40" />
            {[...Array(4)].map((_, i) => (
              <div key={i} className="mb-4 flex items-start gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="mb-1 h-4 w-24" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplicationDetailSkeleton;
