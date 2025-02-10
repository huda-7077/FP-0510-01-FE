"use client";

import PaginationSection from "@/components/PaginationSection";
import useGetSubscriptions from "@/hooks/api/subscription/useGetSubscriptions";
import { parseAsInteger, useQueryState } from "nuqs";
import { useDebounce } from "use-debounce";
import { SubscribersCard } from "./components/SubscribersCard";
import { SubscribersCardSkeleton } from "./components/SubscribersCardSkeleton";
import { SubscribersHeader } from "./components/SubscribersHeader";

export const SubscriptionListComponent = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [sortBy, setSortBy] = useQueryState("sortBy", {
    defaultValue: "createdAt",
  });
  const [debouncedSearch] = useDebounce(search, 500);
  const [status, setStatus] = useQueryState("status", {
    defaultValue: "",
  });

  const { data: subscriptions, isLoading } = useGetSubscriptions({
    page,
    sortOrder: "desc",
    sortBy,
    take: 10,
    search: debouncedSearch,
    status,
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

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  return (
    <div className="px-4 py-4">
      <div className="container mx-auto w-full">
        <div>
          <SubscribersHeader
            totalSubscribers={subscriptions?.data.length || 0}
            onStatusChange={onStatusChange}
            onSortChange={handleSortChange}
            onSearch={handleSearch}
          />
          <div className="mt-4 grid gap-2 sm:mt-6 sm:space-y-2 md:mt-8">
            {isLoading && (
              <>
                <SubscribersCardSkeleton />
                <SubscribersCardSkeleton />
                <SubscribersCardSkeleton />
                <SubscribersCardSkeleton />
                <SubscribersCardSkeleton />
              </>
            )}
            {subscriptions?.data.map((subscription, index) => (
              <SubscribersCard subscription={subscription} key={index} />
            ))}
          </div>
        </div>
        {subscriptions &&
          subscriptions.data.length > 0 &&
          subscriptions.meta.total > subscriptions.meta.take && (
            <PaginationSection
              onChangePage={onChangePage}
              page={Number(page)}
              take={subscriptions.meta.take || 4}
              total={subscriptions.meta.total}
            />
          )}
      </div>
    </div>
  );
};
