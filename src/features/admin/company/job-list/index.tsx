"use client";

import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import PaginationSection from "@/components/PaginationSection";
import useGetJobCategories from "@/hooks/api/job/useGetJobCategories";
import useGetJobs from "@/hooks/api/job/useGetJobs";
import { parseAsInteger, useQueryState } from "nuqs";
import { useDebounce } from "use-debounce";
import { JobCard } from "./components/JobCard";
import { JobListHeader } from "./components/JobListHeader";
import JobCardSkeleton from "@/components/skeletons/JobCardSkeleton";

export const JobListComponent = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [sortBy, setSortBy] = useQueryState("sortBy", { defaultValue: "id" });
  const [debouncedSearch] = useDebounce(search, 500);
  const [category, setCategory] = useQueryState("category", {
    defaultValue: "",
  });

  const { data: jobCategories, isPending: isJobCategoriesPending } =
    useGetJobCategories({
      companyId: 1,
    });

  const { data: jobs, isPending: isJobsPending } = useGetJobs({
    page,
    sortOrder: "asc",
    sortBy,
    take: 10,
    category,
    companyId: 1,
    search: debouncedSearch,
  });

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

  return (
    <div className="px-4 py-4">
      <div className="container mx-auto w-full">
        <div>
          <JobListHeader
            totalJobs={jobs?.data.length || 0}
            jobCategories={validCategories}
            onCategoryChange={onCategoryChange}
            onSortChange={handleSortChange}
            onSearch={handleSearch}
          />

          <div className="mt-4 grid gap-2 sm:mt-6 sm:space-y-2 md:mt-8">
            {isLoadingData &&
              Array.from({ length: 3 }).map((_, index) => (
                <JobCardSkeleton key={index} />
              ))}

            {jobs?.data.map((job) => <JobCard key={job.id} job={job} />)}
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
