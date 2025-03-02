"use client";

import { AlertDialogComponent } from "@/components/AlertDialogComponent";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useGetPayment from "@/hooks/api/payment/useGetPayment";
import useUpdatePayment from "@/hooks/api/payment/useUpdatePayment";
import { useFormik } from "formik";
import { Clock, Receipt, Upload, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";

interface PaymentPageProps {
  uuid: string;
}

const PaymentPage: FC<PaymentPageProps> = ({ uuid }) => {
  const [countdown, setCountdown] = useState(0);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const { data, isLoading: isGetPaymentLoading } = useGetPayment(uuid);
  const { mutateAsync: updatePayment, isPending: isUpdatePaymentPending } =
    useUpdatePayment();

  const [selectedImage, setSelectedImage] = useState<string>("");
  const paymentProofRef = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues: {
      uuid: uuid as string,
      action: "" as "CANCEL" | "CONFIRM",
      paymentProof: null as File | null,
    },
    onSubmit: async (values) => {
      await updatePayment(values);
    },
  });

  const handlePaymentProofChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      const file = files[0];
      formik.setFieldValue("paymentProof", file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleRemovePaymentProof = () => {
    formik.setFieldValue("paymentProof", null);
    setSelectedImage("");
    if (paymentProofRef.current) {
      paymentProofRef.current.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length) {
      const file = files[0];
      formik.setFieldValue("paymentProof", file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleCancel = () => {
    setIsCancelDialogOpen(true);
  };

  const handleConfirm = () => {
    setIsConfirmDialogOpen(true);
  };

  const onCancelConfirm = () => {
    formik.setFieldValue("action", "CANCEL");
    formik.handleSubmit();
    setIsCancelDialogOpen(false);
  };

  const onConfirmConfirm = () => {
    formik.setFieldValue("action", "CONFIRM");
    formik.handleSubmit();
    setIsConfirmDialogOpen(false);
  };

  useEffect(() => {
    if (data?.expiredAt) {
      const expiredAt = new Date(data.expiredAt).getTime();
      const now = new Date().getTime();
      const remainingTime = Math.max(0, Math.floor((expiredAt - now) / 1000));
      setCountdown(remainingTime);

      const timer = setInterval(() => {
        setCountdown((prev) => Math.max(0, prev - 1));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [data?.expiredAt]);

  useEffect(() => {
    if (data) {
      formik.setValues({
        ...formik.values,
        paymentProof: null,
      });
      setSelectedImage(data?.paymentProof || "");
    }
  }, [data]);

  const formatCountdown = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${
      secs < 10 ? `0${secs}` : secs
    }`;
  };

  if (isGetPaymentLoading) {
    return <LoadingScreen message="Loading payment details" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white px-4 py-12">
      <Card className="mx-auto max-w-2xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-900">
            Payment Details
          </CardTitle>
          <p className="mt-2 text-sm text-gray-500">Payment ID: {uuid}</p>
          {data?.expiredAt && (
            <div className="mt-4 flex items-center justify-center gap-2 rounded-full bg-red-50 px-4 py-2 text-red-600">
              <Clock className="h-5 w-5" />
              <p className="font-semibold">
                Expires in {formatCountdown(countdown)}
              </p>
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="rounded-xl bg-gray-50 p-6">
            <div className="space-y-4">
              <div className="flex justify-between text-base">
                <span className="text-gray-600">Email</span>
                <span className="font-medium text-gray-900">
                  {data?.user.email}
                </span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-gray-600">Status</span>
                <span className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-600">
                  {data?.status}
                </span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-gray-600">Payment Method</span>
                <span className="font-medium text-gray-900">
                  {data?.paymentMethod}
                </span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-gray-600">Plan</span>
                <span className="font-medium text-gray-900">
                  {data?.category.name}
                </span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium text-gray-900">
                  {data?.duration} {data?.duration === 1 ? "Month" : "Months"}
                </span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg">
                  <span className="font-semibold text-gray-900">
                    Total Amount
                  </span>
                  <span className="font-bold text-blue-600">
                    Rp{data?.total.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {data?.paymentProof && data.status === "PAID" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Receipt className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Payment Proof
                </h3>
              </div>

              <div className="overflow-hidden rounded-lg">
                <Image
                  src={data?.paymentProof}
                  alt="Payment Proof Preview"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>
          )}

          {data?.expiredAt && data?.paymentMethod === "PAYMENT_MANUAL" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Receipt className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Upload Payment Proof
                </h3>
              </div>

              <div
                className="relative mt-2 flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition-all hover:bg-gray-100"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                {selectedImage ? (
                  <div className="overflow-hidden rounded-lg">
                    <Image
                      src={selectedImage}
                      alt="Payment Proof Preview"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="h-auto w-full object-contain"
                    />
                    {!data?.paymentProof && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute right-2 top-2"
                        onClick={handleRemovePaymentProof}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 p-4 text-center">
                    <Upload className="h-8 w-8 text-blue-600" />
                    <p className="text-sm text-gray-600">
                      Drag & drop your payment proof here or
                    </p>
                    <Input
                      ref={paymentProofRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePaymentProofChange}
                      className="hidden"
                      id="paymentProof"
                    />
                    <Label
                      htmlFor="paymentProof"
                      className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      click to upload
                    </Label>
                  </div>
                )}
              </div>

              {data?.status === "PENDING" && (
                <div className="flex justify-end gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isUpdatePaymentPending}
                    className="border-2"
                  >
                    Cancel Payment
                  </Button>
                  <Button
                    type="submit"
                    onClick={handleConfirm}
                    disabled={isUpdatePaymentPending}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isUpdatePaymentPending
                      ? "Processing..."
                      : "Confirm Payment"}
                  </Button>
                </div>
              )}
            </div>
          )}

          {data?.expiredAt && data?.paymentMethod === "PAYMENT_GATEWAY" && (
            <div className="flex justify-center pt-4">
              <Link href={data.invoiceUrl}>
                <Button className="h-12 bg-blue-600 px-8 text-base font-semibold hover:bg-blue-700">
                  Proceed to Payment
                </Button>
              </Link>
            </div>
          )}

          {data?.status === "PAID" && (
            <div className="flex justify-center">
              <Link href={data?.invoiceUrl}>
                <Button
                  variant="outline"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  View Invoice
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialogComponent
        isOpen={isCancelDialogOpen}
        onClose={() => setIsCancelDialogOpen(false)}
        onConfirm={onCancelConfirm}
        title="Cancel Payment"
        description="Are you sure you want to cancel this payment?"
        confirmText="Yes, Cancel"
        cancelText="No"
      />

      <AlertDialogComponent
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={onConfirmConfirm}
        title="Confirm Payment"
        description="Are you sure you want to confirm this payment?"
        confirmText="Yes, Confirm"
        cancelText="No"
      />
    </div>
  );
};

export default PaymentPage;
