import { JobStatus } from "@/types/job";

interface JobStatusBadgeProps {
  status: JobStatus;
  className?: string;
}

export const JobStatusBadge = ({ status, className }: JobStatusBadgeProps) => {
  const styles = {
    published: "bg-green-50 text-green-700 border border-green-200",
    draft: "bg-red-50 text-red-700 border border-red-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-xs sm:px-2 sm:py-1 ${styles[status]} ${className} font-bold`}
    >
      <span className="select-none">
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    </span>
  );
};
