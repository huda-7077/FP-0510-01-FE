import { SubscriptionStatus } from "@/types/subscription";
import clsx from "clsx";

interface SubscriptionStatusBadgeProps {
  status: SubscriptionStatus;
  className?: string;
}

const STATUS_STYLES: Record<SubscriptionStatus, string> = {
  [SubscriptionStatus.INACTIVE]:
    "bg-gray-50 text-gray-700 border border-gray-200",
  [SubscriptionStatus.ACTIVE]:
    "bg-green-50 text-green-700 border border-green-200",
  [SubscriptionStatus.EXPIRED]: "bg-red-50 text-red-700 border border-red-200",
  [SubscriptionStatus.MAILED]:
    "bg-amber-50 text-amber-700 border border-amber-200",
  [SubscriptionStatus.RENEWED]:
    "bg-blue-50 text-blue-700 border border-blue-200",
};

const STATUS_LABELS: Record<SubscriptionStatus, string> = {
  [SubscriptionStatus.INACTIVE]: "Inactive",
  [SubscriptionStatus.ACTIVE]: "Active",
  [SubscriptionStatus.EXPIRED]: "Expired",
  [SubscriptionStatus.MAILED]: "Mailed",
  [SubscriptionStatus.RENEWED]: "Renewed",
};

export const SubscriptionStatusBadge = ({
  status,
  className = "",
}: SubscriptionStatusBadgeProps) => {
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
