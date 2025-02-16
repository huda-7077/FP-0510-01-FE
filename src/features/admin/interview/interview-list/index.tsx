"use client";

import { DataNotFound } from "@/components/data-not-found/DataNotFound";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import PaginationSection from "@/components/PaginationSection";
import JobCardSkeleton from "@/components/skeletons/JobCardSkeleton";
import useGetInterviews from "@/hooks/api/interview/useGetInterviews";
import { useRouter } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";
import { useDebounce } from "use-debounce";
import { InterviewCard } from "./components/InterviewCard";
import { InterviewListHeader } from "./components/InterviewListHeader";
import { useEffect } from "react";

const InterviewListComponent = () => {
  const router = useRouter();
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [sortOrder, setSortOrder] = useQueryState("sortOrder", {
    defaultValue: "desc",
  });

  const [debouncedSearch] = useDebounce(search, 500);

  const { data: interviews, isPending: isInterviewsPending } = useGetInterviews(
    {
      page,
      sortOrder,
      take: 10,
      search: debouncedSearch,
    },
  );

  useEffect(() => {
    document.body.style.pointerEvents = "";
  }, [interviews]);

  const onChangePage = (page: number) => {
    setPage(page);
  };

  const handleSearch = (query: string) => {
    setSearch(query);
    setPage(1);
  };

  const handleSortChange = (sortOrder: string) => {
    setSortOrder(sortOrder);
  };

  return (
    <DashboardLayout>
      <div className="px-4 py-4">
        <div className="container mx-auto w-full">
          <InterviewListHeader
            totalInterview={interviews?.meta.total || 0}
            onSortOrderChange={handleSortChange}
            onSearch={handleSearch}
            isDisabled={isInterviewsPending}
          />
          <div className="mt-4 grid gap-2 sm:mt-6 sm:space-y-2 md:mt-8">
            {isInterviewsPending &&
              Array.from({ length: 3 }).map((_, index) => (
                <JobCardSkeleton key={index} />
              ))}
            {interviews?.data.map((interview) => (
              <InterviewCard key={interview.id} interview={interview} />
            ))}
            {interviews?.data &&
              interviews.data.length <= 0 &&
              !isInterviewsPending && (
                <DataNotFound
                  message="Go to Job List and check on job appliaction list to create a new interview schedule"
                  title="No Scheduled Interview Found"
                  actionLabel="Go to Job List"
                  onAction={() => router.push("/dashboard/admin/jobs")}
                />
              )}
          </div>
          {interviews?.data &&
            interviews.data.length > 0 &&
            interviews.meta.total > interviews.meta.take && (
              <PaginationSection
                onChangePage={onChangePage}
                page={Number(page)}
                take={interviews.meta.take || 4}
                total={interviews.meta.total}
              />
            )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewListComponent;
