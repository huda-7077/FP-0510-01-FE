"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import useCreateSubscription from "@/hooks/api/subscription/useCreateSubscription";
import { PaymentData } from "@/types/payment";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SubscriptionAlertDialog from "./SubscriptionAlertDialog";

interface PaymentDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  payment: PaymentData;
  refetch?: () => void;
}

export function PaymentDetailsDialog({
  isOpen,
  onClose,
  payment,
  refetch,
}: PaymentDetailsDialogProps) {
  const { mutateAsync: createSubscription, isPending } =
    useCreateSubscription();
  const [isProcessing, setIsProcessing] = useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState<"ACCEPTED" | "REJECTED">(
    "ACCEPTED",
  );

  const handleSubscriptionAction = async (action: "ACCEPTED" | "REJECTED") => {
    setIsProcessing(true);
    try {
      await createSubscription({ uuid: payment.uuid, action });
      onClose();
    } catch (error) {
      console.error("Subscription action failed", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const openAlertDialog = (action: "ACCEPTED" | "REJECTED") => {
    setCurrentAction(action);
    setAlertDialogOpen(true);
    refetch?.();
  };

  const closeAlertDialog = () => {
    setAlertDialogOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto rounded-xl border-0 p-0 shadow-xl">
          <DialogHeader className="border-b bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <DialogTitle className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
              Payment Details
            </DialogTitle>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Review user payment details below
            </p>
          </DialogHeader>
          <div className="bg-gray-50 p-6 dark:bg-gray-900">
            <div className="space-y-4">
              <Card className="border-0 shadow-none">
                <CardContent className="space-y-3 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {payment.user.fullName}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {payment.user.email}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-none">
                <CardContent className="space-y-3 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        Subscription Details
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {payment.duration}{" "}
                        {payment.duration === 1 ? "Month" : "Months"} -{" "}
                        {payment.category.name}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-none">
                <CardContent className="space-y-4 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Created At
                    </span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {format(
                        new Date(payment.createdAt),
                        "MMM dd, yyyy hh:mm aa",
                      )}
                    </span>
                  </div>
                  {payment.paymentProof && (
                    <div className="space-y-2">
                      <Label className="text-sm text-gray-500 dark:text-gray-400">
                        Payment Proof
                      </Label>
                      <div className="overflow-hidden rounded-lg">
                        <Image
                          src={payment.paymentProof}
                          alt="payment-proof"
                          width={0}
                          height={0}
                          sizes="100vw"
                          className="h-auto w-full object-contain"
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="border-t bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            {payment.status === "WAITING_ADMIN" && (
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  onClick={() => openAlertDialog("ACCEPTED")}
                  disabled={isProcessing || isPending}
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  Accept
                </Button>
                <Button
                  onClick={() => openAlertDialog("REJECTED")}
                  disabled={isProcessing || isPending}
                  className="flex-1 rounded-lg bg-gray-200 px-4 py-2.5 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-300 disabled:opacity-50 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
                >
                  Reject
                </Button>
              </div>
            )}
            {payment.status === "PAID" && (
              <div className="flex justify-center">
                <Link
                  href={payment.invoiceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  View Payment Invoice
                </Link>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <SubscriptionAlertDialog
        isOpen={alertDialogOpen}
        onConfirm={() => {
          handleSubscriptionAction(currentAction);
          closeAlertDialog();
        }}
        onCancel={closeAlertDialog}
        action={currentAction}
      />
    </>
  );
}
