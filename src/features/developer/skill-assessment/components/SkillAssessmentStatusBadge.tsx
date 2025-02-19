import { SkillAssessmentStatus } from "@/types/skillAssessments";
import clsx from "clsx";

interface SkillAssessmentStatusBadgeProps {
  status: SkillAssessmentStatus;
  className?: string;
}

const STATUS_STYLES: Record<SkillAssessmentStatus, string> = {
  [SkillAssessmentStatus.DRAFT]: "bg-red-50 text-red-700 border border-red-200",
  [SkillAssessmentStatus.PUBLISHED]:
    "bg-green-50 text-green-700 border border-green-200",
};

const STATUS_LABELS: Record<SkillAssessmentStatus, string> = {
  [SkillAssessmentStatus.DRAFT]: "Draft",
  [SkillAssessmentStatus.PUBLISHED]: "Published",
};

export const SkillAssessmentStatusBadge = ({
  status,
  className = "",
}: SkillAssessmentStatusBadgeProps) => {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-bold sm:px-2 sm:py-1",
        STATUS_STYLES[status],
        className,
      )}
    >
      <span className="select-none">{STATUS_LABELS[status]}</span>
    </span>
  );
};
