"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Subscription } from "@/types/subscription";
import { format } from "date-fns";
import Link from "next/link";

interface DetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  subscription: Subscription;
}

export function DetailsDialog({
  isOpen,
  onClose,
  subscription,
}: DetailsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-lg dark:bg-gray-900 sm:p-8">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Subscription Details
          </DialogTitle>
          <DialogDescription className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Review user subscription details below
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="space-y-2 rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
            <Label className="text-base font-semibold text-gray-900 dark:text-gray-100">
              {subscription.user.fullName}
            </Label>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {subscription.user.email}
            </p>
          </div>

          <div className="space-y-2 rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              {subscription.payment.duration}{" "}
              {subscription.payment.duration === 1 ? "Month" : "Months"}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {subscription.payment.category.name}
            </p>
          </div>

          <div className="space-y-2 rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <span className="text-xs text-gray-600 dark:text-gray-400">
                Start Date:
              </span>
              <span className="text-base font-semibold text-gray-900 dark:text-gray-100">
                {format(
                  new Date(subscription.createdAt),
                  "hh:mm aa dd MMM yyyy",
                )}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <span className="text-xs text-gray-600 dark:text-gray-400">
                Expiry Date:
              </span>
              <span className="text-base font-semibold text-gray-900 dark:text-gray-100">
                {format(
                  new Date(subscription.expiredDate),
                  "hh:mm aa dd MMM yyyy",
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-2 flex justify-center">
          <Link
            href={subscription.payment.invoiceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
          >
            View Payment Invoice
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
