"use client";

import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import PaginationSection from "@/components/PaginationSection";
import useGetJobCategories from "@/hooks/api/job/useGetJobCategories";
import useGetJobs from "@/hooks/api/job/useGetJobs";
import { useDebounce } from "use-debounce";
import { parseAsInteger, useQueryState } from "nuqs";
import { JobCard } from "./components/JobCard";
import { JobListHeader } from "./components/JobListHeader";
import { cn } from "@/lib/utils";

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
    take: 12,
    category,
    companyId: 1,
    search: debouncedSearch,
  });

  const onChangePage = (page: number) => {
    setPage(page);
  };

  const handleSearch = (query: string) => {
    setSearch(query);
  };

  const onCategoryChange = (category: string) => {
    if (category === "all") {
      setCategory("");
      return;
    }
    setCategory(category);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };

  const handleViewJobDetails = (jobId: number) => {
    console.log("View details for job:", jobId);
  };

  const validCategories = jobCategories?.data ?? [];

  if (isJobsPending && isJobCategoriesPending) {
    return <LoadingScreen message="Loading Jobs Data" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-4 sm:px-6 sm:py-6 md:py-8">
      <div className="mx-auto w-full max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-5xl">
        <div className="rounded-lg bg-white p-4 shadow-sm sm:p-6 sm:shadow-md md:p-8">
          <JobListHeader
            totalJobs={jobs?.data.length || 0}
            jobCategories={validCategories}
            onCategoryChange={onCategoryChange}
            onSortChange={handleSortChange}
            onSearch={handleSearch}
          />

          <div className="mt-4 space-y-3 sm:mt-6 sm:space-y-4 md:mt-8">
            {jobs?.data.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onViewDetails={handleViewJobDetails}
              />
            ))}
          </div>

          {jobs && jobs.data.length > 0 && jobs.meta.total > jobs.meta.take && (
            <div className="flex w-full items-center justify-center pt-4 sm:justify-end sm:pt-6 md:pt-8">
              <PaginationSection
                onChangePage={onChangePage}
                page={Number(page)}
                take={jobs.meta.take || 4}
                total={jobs.meta.total}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
