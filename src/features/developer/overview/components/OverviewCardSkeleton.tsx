import { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface OverviewCardSkeletonProps {
  bgColor: string;
}

const OverviewCardSkeleton: FC<OverviewCardSkeletonProps> = ({ bgColor }) => {
  return (
    <div className={`rounded-lg p-6 shadow-md ${bgColor} text-white`}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24 rounded-md" />
          <Skeleton className="h-6 w-16 rounded-md" />
        </div>

        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    </div>
  );
};

export default OverviewCardSkeleton;
