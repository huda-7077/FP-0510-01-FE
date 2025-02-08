import { PaymentStatus } from "@/types/payment";
import clsx from "clsx";

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
  className?: string;
}

const STATUS_STYLES: Record<PaymentStatus, string> = {
  [PaymentStatus.WAITING_ADMIN]:
    "bg-yellow-100 text-yellow-700 border border-yellow-300", // Light yellow
  [PaymentStatus.PENDING]:
    "bg-yellow-50 text-yellow-700 border border-yellow-200",
  [PaymentStatus.EXPIRED]: "bg-red-50 text-red-700 border border-red-200",
  [PaymentStatus.PAID]: "bg-green-50 text-green-700 border border-green-200",
  [PaymentStatus.CANCELLED]: "bg-gray-200 text-gray-600 border border-gray-300",
  [PaymentStatus.REJECTED]: "bg-red-100 text-red-800 border border-red-300",
};

const STATUS_LABELS: Record<PaymentStatus, string> = {
  [PaymentStatus.PENDING]: "Pending",
  [PaymentStatus.WAITING_ADMIN]: "Waiting Admin",
  [PaymentStatus.EXPIRED]: "Expired",
  [PaymentStatus.PAID]: "Paid",
  [PaymentStatus.CANCELLED]: "Cancelled",
  [PaymentStatus.REJECTED]: "Rejected",
};

export const PaymentStatusBadge = ({
  status,
  className = "",
}: PaymentStatusBadgeProps) => {
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
