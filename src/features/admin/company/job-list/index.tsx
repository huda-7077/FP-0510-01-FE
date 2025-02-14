"use client";
import PaginationSection from "@/components/PaginationSection";
import JobCardSkeleton from "@/components/skeletons/JobCardSkeleton";
import useGetJobCategories from "@/hooks/api/job/useGetJobCategories";
import useGetJobs from "@/hooks/api/job/useGetJobs";
import { useSession } from "next-auth/react";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { JobCard } from "./components/JobCard";
import { JobListHeader } from "./components/JobListHeader";
import { DataNotFound } from "@/components/data-not-found/DataNotFound";
import { useRouter } from "next/navigation";

export const JobListComponent = () => {
  const router = useRouter();
  const session = useSession();
  const user = session.data && session.data.user;

  // Query states
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [sortBy, setSortBy] = useQueryState("sortBy", {
    defaultValue: "createdAt",
  });
  const [category, setCategory] = useQueryState("category", {
    defaultValue: "",
  });

  const [debouncedSearch] = useDebounce(search, 500);

  const { data: jobCategories, isPending: isJobCategoriesPending } =
    useGetJobCategories({ companyId: user?.companyId });

  const {
    data: jobs,
    isPending: isJobsPending,
    refetch: refetchJobs,
  } = useGetJobs({
    page,
    sortOrder: "desc",
    sortBy,
    take: 10,
    category,
    companyId: user?.companyId,
    search: debouncedSearch,
  });

  const [triggerRefetch, setTriggerRefetch] = useState(false);

  useEffect(() => {
    if (triggerRefetch) {
      refetchJobs();
      setTriggerRefetch(false);
    }
  }, [triggerRefetch, refetchJobs]);

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

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  const validCategories = jobCategories?.data ?? [];
  const isLoadingData = isJobsPending && isJobCategoriesPending;

  const notifyDatabaseChange = () => {
    setTriggerRefetch(true);
  };

  return (
    <div className="px-4 py-4">
      <div className="container mx-auto w-full">
        <div>
          <JobListHeader
            totalJobs={jobs?.meta.total || 0}
            jobCategories={validCategories}
            onCategoryChange={onCategoryChange}
            onSortChange={handleSortChange}
            onSearch={handleSearch}
            isDisabled={isJobCategoriesPending}
          />
          <div className="mt-4 grid gap-2 sm:mt-6 sm:space-y-2 md:mt-8">
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
