interface AssessmentStatusBadgeProps {
  className?: string;
}

export const AssessmentStatusBadge = ({
  className,
}: AssessmentStatusBadgeProps) => {
  return (
    <span
      className={`inline-flex items-center rounded-md border border-yellow-300 bg-yellow-50/90 px-1.5 py-0.5 text-xs font-bold text-yellow-600 sm:bg-yellow-50 sm:px-2 sm:py-1 md:px-2.5 md:py-1 ${className}`}
    >
      Require Assessment
    </span>
  );
};
