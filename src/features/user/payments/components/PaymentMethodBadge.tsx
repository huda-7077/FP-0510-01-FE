import { PaymentMethod } from "@/types/payment";
import clsx from "clsx";

interface PaymentMethodBadgeProps {
  paymentMethod: PaymentMethod;
  className?: string;
}

const PAYMENT_METHOD_STYLES: Record<PaymentMethod, string> = {
  [PaymentMethod.PAYMENT_MANUAL]:
    "bg-blue-50 text-blue-700 border border-blue-200",
  [PaymentMethod.PAYMENT_GATEWAY]:
    "bg-purple-50 text-purple-700 border border-purple-200",
};

const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  [PaymentMethod.PAYMENT_MANUAL]: "Manual Payment",
  [PaymentMethod.PAYMENT_GATEWAY]: "Payment Gateway",
};

export const PaymentMethodBadge = ({
  paymentMethod,
  className = "",
}: PaymentMethodBadgeProps) => {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-bold sm:px-2 sm:py-1",
        PAYMENT_METHOD_STYLES[paymentMethod],
        className,
      )}
    >
      <span className="select-none">
        {PAYMENT_METHOD_LABELS[paymentMethod]}
      </span>
    </span>
  );
};
