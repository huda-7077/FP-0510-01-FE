import { cn } from "@/lib/utils";
import { JobStatus } from "@/types/job";

interface AssessmentStatusBadgeProps {
  className?: string;
}

export const AssessmentStatusBadge = ({
  className,
}: AssessmentStatusBadgeProps) => {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-yellow-300 bg-yellow-50/90 px-1.5 py-0.5 text-xs font-normal text-yellow-600 sm:bg-yellow-50 sm:px-2 sm:py-1 sm:text-sm sm:font-medium md:px-2.5 md:py-1 md:text-xs ${className}`}
    >
      <span className="mr-1 h-1 w-1 rounded-full bg-yellow-600 sm:mr-1.5 sm:h-1.5 sm:w-1.5 md:mr-1.5 md:h-1.5 md:w-1.5" />
      <span className="select-none">Require Assessment</span>
    </span>
  );
};
