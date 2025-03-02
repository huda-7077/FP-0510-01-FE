"use client";

import PaginationSection from "@/components/PaginationSection";
import useGetPayments from "@/hooks/api/payment/useGetPayments";
import { parseAsInteger, useQueryState } from "nuqs";
import { useDebounce } from "use-debounce";
import { PaymentCard } from "./components/PaymentCard";
import { PaymentCardSkeleton } from "./components/PaymentCardSkeleton";
import { PaymentHeader } from "./components/PaymentHeader";
import DashboardBreadcrumb from "@/components/DashboardBreadcrumb";

export const PaymentListComponent = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [sortBy, setSortBy] = useQueryState("sortBy", {
    defaultValue: "createdAt",
  });
  const [debouncedSearch] = useDebounce(search, 500);
  const [status, setStatus] = useQueryState("status", {
    defaultValue: "",
  });

  const [paymentMethod, setPaymentMethod] = useQueryState("paymentMethod", {
    defaultValue: "",
  });

  const {
    data: payments,
    isLoading,
    refetch,
  } = useGetPayments({
    page,
    sortOrder: "desc",
    sortBy,
    take: 10,
    search: debouncedSearch,
    status,
    paymentMethod,
  });

  const onChangePage = (page: number) => {
    setPage(page);
  };

  const handleSearch = (query: string) => {
    setSearch(query);
    setPage(1);
  };

  const onStatusChange = (status: string) => {
    if (status === "ALL") {
      setStatus("");
      setPage(1);
      return;
    }
    setStatus(status);
    setPage(1);
  };

  const onPaymentMethodChange = (paymentMethod: string) => {
    if (paymentMethod === "ALL") {
      setPaymentMethod("");
      setPage(1);
      return;
    }
    setPaymentMethod(paymentMethod);
    setPage(1);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  const handleRefetch = () => {
    refetch();
  };

  return (
    <>
      <DashboardBreadcrumb route="developer" lastCrumb="Payments" />
      <div className="my-1 md:my-2">
        <div className="container mx-auto w-full">
          <div>
            <PaymentHeader
              totalPayments={payments?.data.length || 0}
              onStatusChange={onStatusChange}
              onSortChange={handleSortChange}
              onSearch={handleSearch}
              onPaymentMethodChange={onPaymentMethodChange}
            />
            <div className="mt-4 grid gap-2 sm:space-y-2">
              {isLoading && (
                <>
                  <PaymentCardSkeleton />
                  <PaymentCardSkeleton />
                  <PaymentCardSkeleton />
                  <PaymentCardSkeleton />
                  <PaymentCardSkeleton />
                </>
              )}
              {payments?.data.map((payment, index) => (
                <PaymentCard
                  payment={payment}
                  key={index}
                  refetch={handleRefetch}
                />
              ))}
            </div>
          </div>
          {payments &&
            payments.data.length > 0 &&
            payments.meta.total > payments.meta.take && (
              <PaginationSection
                onChangePage={onChangePage}
                page={Number(page)}
                take={payments.meta.take || 4}
                total={payments.meta.total}
              />
            )}
        </div>
      </div>
    </>
  );
};
