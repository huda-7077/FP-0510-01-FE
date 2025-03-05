"use client";

import { FC } from "react";
import useGetInvoice from "@/hooks/api/invoice/useGetInvoice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Receipt, Calendar, Clock, CreditCard, Check } from "lucide-react";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import { Link } from "next-view-transitions";
import Image from "next/image";

interface InvoicePageProps {
  uuid: string;
}

const InvoicePage: FC<InvoicePageProps> = ({ uuid }) => {
  const { data, isLoading: isGetPaymentLoading } = useGetInvoice(uuid);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isGetPaymentLoading) {
    return <LoadingScreen message="Loading invoice details" />;
  }

  return (
    <>
      {data?.status === "PAID" ? (
        <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white px-4 py-12">
          <Card className="mx-auto max-w-2xl shadow-lg">
            <CardHeader className="relative text-center">
              <div className="absolute left-8 top-8">
                <Link href="/">
                  <Image
                    src="/logo.svg"
                    alt="logo"
                    width={125}
                    height={50}
                    className="object-contain"
                    priority
                  />
                </Link>
              </div>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <Receipt className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900">
                Invoice Details
              </CardTitle>
              <p className="mt-2 text-sm text-gray-500">Invoice ID: {uuid}</p>
            </CardHeader>

            <CardContent className="space-y-8">
              <div className="rounded-lg bg-green-50 p-4 text-center">
                <div className="flex items-center justify-between gap-2 px-4">
                  <span className="text-3xl font-bold text-green-600">
                    {data?.status}
                  </span>
                  <Check className="h-6 w-6 text-green-600" />
                </div>
              </div>

              <div className="rounded-xl bg-gray-50 p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-base">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <span>Paid At</span>
                    </div>
                    <span className="font-medium text-gray-900">
                      {data?.paidAt ? formatDate(data.paidAt) : "-"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-base">
                    <div className="flex items-center gap-2 text-gray-600">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                      <span>Payment Method</span>
                    </div>
                    <span className="font-medium text-gray-900">
                      {data?.paymentMethod}
                    </span>
                  </div>

                  <div className="space-y-3 border-t pt-4">
                    <div className="flex justify-between text-base">
                      <span className="text-gray-600">Plan</span>
                      <span className="font-medium text-gray-900">
                        {data?.category.name}
                      </span>
                    </div>
                    <div className="flex justify-between text-base">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-medium text-gray-900">
                        {data?.duration}{" "}
                        {data?.duration === 1 ? "month" : "months"}
                      </span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold text-gray-900">
                        Total Amount
                      </span>
                      <span className="font-bold text-blue-600">
                        Rp {data?.total.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center text-sm text-gray-500">
                This invoice serves as proof of payment for your subscription
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="flex h-screen items-center justify-center">
          <div className="text-lg text-gray-600">Invoice not found</div>
        </div>
      )}
    </>
  );
};

export default InvoicePage;
