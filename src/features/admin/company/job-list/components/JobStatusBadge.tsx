import { cn } from "@/lib/utils";
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
      className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-xs sm:px-2 sm:py-1 md:px-3 md:py-1.5 ${styles[status]} ${className}`}
    >
      <span
        className={`mr-1 h-1 w-1 rounded-full sm:mr-1.5 sm:h-1.5 sm:w-1.5 md:mr-2 md:h-2 md:w-2 ${status === "published" ? "bg-green-500" : "bg-red-500"}`}
      />
      <span className="select-none">
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    </span>
  );
};
