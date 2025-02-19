import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SkillAssessmentCardSkeleton = () => {
  return (
    <div>
      <Card className="group rounded-2xl border-2 border-gray-200 p-3 px-6 py-4 shadow-none transition-all duration-200 hover:border-blue-600">
        <div className="flex flex-col items-start justify-between gap-3 sm:gap-4 lg:flex-row lg:items-center">
          <div className="hidden h-20 w-20 flex-shrink-0 items-center justify-center lg:flex">
            <Skeleton className="h-20 w-20 rounded-md" />
          </div>

          <div className="w-full space-y-2 sm:w-auto">
            <Skeleton className="h-4 w-full sm:w-48" />
            <Skeleton className="h-3 w-full sm:w-64" />
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2 sm:ml-0 sm:gap-4 md:gap-5">
            <Skeleton className="h-8 w-24 sm:h-9 sm:w-32 md:h-10 md:w-36" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SkillAssessmentCardSkeleton;
