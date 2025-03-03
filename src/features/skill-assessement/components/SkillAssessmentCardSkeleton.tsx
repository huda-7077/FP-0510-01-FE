import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SkillAssessmentCardSkeleton = () => {
  return (
    <div>
      <Card className="rounded-2xl border-2 border-gray-200 p-3 px-6 py-4 shadow-none">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center">
            <Skeleton className="h-20 w-20 rounded-full" />
          </div>

          <div className="w-full space-y-2">
            <div className="w-full sm:w-auto">
              <Skeleton className="h-6 w-3/4 rounded-md" />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <Skeleton className="h-4 w-24 rounded-md" />
            </div>
          </div>
        </div>

        <div className="mt-2 flex w-full items-center justify-between gap-2 sm:gap-4 md:gap-5">
          <Skeleton className="h-8 w-full rounded-md" />
        </div>
      </Card>
    </div>
  );
};

export default SkillAssessmentCardSkeleton;
