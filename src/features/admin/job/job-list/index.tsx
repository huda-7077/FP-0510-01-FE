"use client";
import { DataNotFound } from "@/components/data-not-found/DataNotFound";
import PaginationSection from "@/components/PaginationSection";
import JobCardSkeleton from "@/components/skeletons/JobCardSkeleton";
import useGetCompanyJobs from "@/hooks/api/job/useGetCompanyJobs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { JobCard } from "./components/JobCard";
import { JobListHeader } from "./components/JobListHeader";
import { JobCategory } from "../consts";

export const JobListComponent = () => {
  const router = useRouter();
  const session = useSession();
  const user = session.data && session.data.user;

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [sortBy, setSortBy] = useQueryState("sortBy", {
    defaultValue: "createdAt",
  });
  const [sortOrder, setSortOrder] = useQueryState("sortOrder", {
    defaultValue: "desc",
  });
  const [category, setCategory] = useQueryState("category", {
    defaultValue: "",
  });
  const [startDate, setStartDate] = useQueryState("startDate", {
    defaultValue: "",
  });

  const [endDate, setEndDate] = useQueryState("endDate", {
    defaultValue: "",
  });

  const [debouncedSearch] = useDebounce(search, 500);

  // const { data: jobCategories, isPending: isJobCategoriesPending } =
  //   useGetJobCategories({ companyId: user?.companyId });

  const {
    data: jobs,
    isPending: isJobsPending,
    refetch: refetchJobs,
  } = useGetCompanyJobs({
    page,
    sortOrder,
    sortBy,
    take: 10,
    category,
    search: debouncedSearch,
    startDate,
    endDate,
  });

  const [triggerRefetch, setTriggerRefetch] = useState(false);

  useEffect(() => {
    if (triggerRefetch) {
      refetchJobs();
      setTriggerRefetch(false);
    }
  }, [triggerRefetch, refetchJobs]);

  useEffect(() => {
    document.body.style.pointerEvents = "";
  }, [jobs]);

  const onChangePage = (page: number) => {
    setPage(page);
  };

  const handleSearch = (query: string) => {
    setSearch(query);
    setPage(1);
  };

  const onCategoryChange = (category: string) => {
    if (category === "all") {
      setCategory("");
      setPage(1);
      return;
    }
    setCategory(category);
    setPage(1);
  };

  const handleSortOrderChange = (sortOrder: string) => {
    setSortOrder(sortOrder);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  const handleStartEndDate = (startDate: string, endDate: string) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const isLoadingData = isJobsPending;

  const notifyDatabaseChange = () => {
    setTriggerRefetch(true);
  };

  return (
    <div className="px-4 py-4">
      <div className="container mx-auto w-full">
        <div>
          <JobListHeader
            totalJobs={jobs?.meta.total || 0}
            jobCategories={JobCategory}
            onCategoryChange={onCategoryChange}
            onSortChange={handleSortChange}
            onSortOrderChange={handleSortOrderChange}
            onStartEndDateChange={handleStartEndDate}
            onSearch={handleSearch}
            isDisabled={isLoadingData}
          />
          <p className="my-6 text-start text-xs font-semibold italic text-gray-400 sm:text-end">
            <span className="text-red-600">*</span> You cannot edit a job or
            assessment after it has been published. Save it to draft to make
            changes.
          </p>
          <div className="mt-4 grid gap-2 sm:space-y-2">
            {isLoadingData &&
              Array.from({ length: 3 }).map((_, index) => (
                <JobCardSkeleton key={index} />
              ))}
            {jobs?.data.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                notifyDatabaseChange={notifyDatabaseChange}
              />
            ))}
            {jobs?.data && jobs.data.length <= 0 && !isJobsPending && (
              <DataNotFound
                message="Please create a job by pressing button below."
                title="No Job Found"
                actionLabel="Post A Job"
                onAction={() => router.push("/dashboard/admin/jobs/create")}
              />
            )}
          </div>
        </div>
        {jobs && jobs.data.length > 0 && jobs.meta.total > jobs.meta.take && (
          <PaginationSection
            onChangePage={onChangePage}
            page={Number(page)}
            take={jobs.meta.take || 4}
            total={jobs.meta.total}
          />
        )}
      </div>
    </div>
  );
};
