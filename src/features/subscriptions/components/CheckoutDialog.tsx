"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCreatePayments from "@/hooks/api/payment/useCreatePayment";
import { CreditCard, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CheckoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName: string;
  basePrice: number;
}

const DURATION_OPTIONS = [
  { months: 1, label: "1 Month" },
  { months: 3, label: "3 Months" },
  { months: 6, label: "6 Months" },
  { months: 12, label: "12 Months" },
];

export function CheckoutDialog({
  isOpen,
  onClose,
  categoryName,
  basePrice,
}: CheckoutDialogProps) {
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<
    "PAYMENT_GATEWAY" | "PAYMENT_MANUAL"
  >("PAYMENT_GATEWAY");
  const router = useRouter();

  const { mutateAsync: createPayment, isPending: createPaymentPending } =
    useCreatePayments();

  const totalAmount = basePrice * selectedDuration;

  const handleCreatePayment = async () => {
    try {
      const payment = await createPayment({
        duration: selectedDuration,
        category: categoryName,
        paymentMethod: paymentMethod,
        isRenewal: false,
      });
      return payment;
    } catch (error) {
      console.error("Payment creation failed:", error);
      throw error;
    }
  };

  const handlePayment = async () => {
    try {
      const data = await handleCreatePayment();
      router.push(`/subscriptions/payments/${data.payment.uuid}`);
    } catch (error) {
      console.error("Payment processing failed:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-screen max-w-lg overflow-y-auto p-6 sm:p-8 md:max-h-[90vh]">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Complete Your Purchase
          </DialogTitle>
          <DialogDescription className="mt-2 text-base text-gray-600">
            Select your preferred duration and payment method to continue
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8">
          <div className="space-y-3">
            <Label
              htmlFor="duration"
              className="text-lg font-semibold text-gray-900"
            >
              Subscription Duration
            </Label>
            <Select
              value={selectedDuration.toString()}
              onValueChange={(value) => setSelectedDuration(Number(value))}
            >
              <SelectTrigger
                id="duration"
                className="h-12 border-gray-200 bg-white text-base"
              >
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                {DURATION_OPTIONS.map((option) => (
                  <SelectItem
                    key={option.months}
                    value={option.months.toString()}
                    className="text-base"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">
              Payment Method
            </h3>
            <RadioGroup
              value={paymentMethod}
              onValueChange={(value) =>
                setPaymentMethod(value as "PAYMENT_GATEWAY" | "PAYMENT_MANUAL")
              }
              className="space-y-3"
            >
              <label
                htmlFor="PAYMENT_GATEWAY"
                className="block cursor-pointer rounded-xl border-2 border-gray-200 p-4 transition-all duration-200 hover:border-blue-600"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value="PAYMENT_GATEWAY"
                    id="PAYMENT_GATEWAY"
                    className="h-5 w-5 border-2 text-blue-600"
                  />
                  <div className="flex items-center gap-3 text-base font-medium">
                    <div className="rounded-full bg-blue-100 p-2">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                    </div>
                    Payment Gateway
                  </div>
                </div>
              </label>
              <label
                htmlFor="PAYMENT_MANUAL"
                className="block cursor-pointer rounded-xl border-2 border-gray-200 p-4 transition-all duration-200 hover:border-blue-600"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value="PAYMENT_MANUAL"
                    id="PAYMENT_MANUAL"
                    className="h-5 w-5 border-2 text-blue-600"
                  />
                  <div className="flex items-center gap-3 text-base font-medium">
                    <div className="rounded-full bg-blue-100 p-2">
                      <Upload className="h-5 w-5 text-blue-600" />
                    </div>
                    Manual Payment
                  </div>
                </div>
              </label>
            </RadioGroup>
          </div>

          <div className="space-y-4 rounded-xl bg-gray-50 p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Order Summary
            </h3>
            <div className="space-y-3 border-b border-gray-200 pb-4">
              <div className="flex justify-between text-base">
                <span className="text-gray-600">Selected Plan</span>
                <span className="font-medium text-gray-900">
                  {categoryName}
                </span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium text-gray-900">
                  {selectedDuration}{" "}
                  {selectedDuration === 1 ? "month" : "months"}
                </span>
              </div>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-lg font-semibold text-gray-900">
                Total Amount
              </span>
              <span className="text-lg font-bold text-blue-600">
                Rp {totalAmount.toLocaleString("id-ID")}
              </span>
            </div>
          </div>

          <Button
            className="h-12 w-full bg-blue-600 text-base font-semibold text-white transition-all duration-200 hover:bg-blue-700 disabled:bg-gray-400"
            onClick={handlePayment}
            disabled={createPaymentPending}
          >
            {createPaymentPending ? "Processing..." : "Proceed to Payment"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
