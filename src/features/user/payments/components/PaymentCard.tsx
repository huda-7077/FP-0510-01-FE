"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PaymentData, PaymentMethod, PaymentStatus } from "@/types/payment";
import { Eye } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";
import { PaymentMethodBadge } from "./PaymentMethodBadge";
import { PaymentStatusBadge } from "./PaymentStatusBadge";

interface PaymentCardProps {
  payment?: PaymentData;
}

export const PaymentCard = ({ payment }: PaymentCardProps) => {
  const router = useTransitionRouter();
  return (
    <div>
      <Card className="group rounded-2xl border-2 border-gray-200 p-3 px-6 py-4 shadow-none transition-all duration-200 hover:border-blue-600">
        <div className="flex flex-col items-start justify-between gap-3 sm:gap-4 lg:flex-row lg:items-center">
          <div className="w-full space-y-2 sm:w-auto">
            <div className="w-full sm:w-auto">
              <h3 className="line-clamp-2 p-0 text-base font-semibold text-gray-900 group-hover:text-blue-600">
                {payment?.uuid}
              </h3>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
              <span className="font-semibold">
                <PaymentMethodBadge
                  paymentMethod={
                    payment?.paymentMethod
                      ? payment.paymentMethod
                      : PaymentMethod.PAYMENT_GATEWAY
                  }
                />
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-gray-300 sm:block" />
              <span className="inline-flex items-center rounded-md border border-green-200 bg-green-50 px-1.5 py-0.5 text-xs font-bold text-green-700 sm:px-2 sm:py-1">
                Rp {payment?.total.toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          <div className="flex w-full flex-wrap items-center justify-between gap-2 sm:flex-nowrap sm:gap-4 md:gap-5 lg:w-auto">
            <PaymentStatusBadge
              status={
                payment?.status ? payment.status : PaymentStatus.CANCELLED
              }
            />
            <div className="ml-auto flex items-center gap-2 sm:ml-0 sm:gap-4 md:gap-5">
              <Button
                variant="outline"
                className="h-8 flex-1 bg-blue-600 text-xs text-white hover:bg-blue-800 hover:text-white sm:h-9 sm:flex-none sm:px-4 md:h-10 md:px-5"
                onClick={() =>
                  router.push(`/subscriptions/payments/${payment?.uuid}`)
                }
              >
                <Eye />
                View Details
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
