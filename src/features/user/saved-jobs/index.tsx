"use client";
import { DataNotFound } from "@/components/data-not-found/DataNotFound";
import PaginationSection from "@/components/PaginationSection";
import useDeleteSavedJob from "@/hooks/api/saved-job/useDeleteSavedJob";
import useGetSavedJobs from "@/hooks/api/saved-job/useGetSavedJobs";
import { parseAsInteger, useQueryState } from "nuqs";
import { useMemo } from "react";
import { useDebounce } from "use-debounce";
import { SavedJobsHeader } from "./components/SavedJobsHeader";
import SavedJobsList from "./components/SavedJobsList";
import DashboardBreadcrumb from "@/components/DashboardBreadcrumb";

export const SavedJobsPage = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [category, setCategory] = useQueryState("category", {
    defaultValue: "",
  });
  const [startDate, setStartDate] = useQueryState("startDate", {
    defaultValue: "",
  });
  const [endDate, setEndDate] = useQueryState("endDate", { defaultValue: "" });

  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading } = useGetSavedJobs({
    page: page,
    take: 10,
    search: debouncedSearch,
    category: category,
    startDate: startDate,
    endDate: endDate,
  });

  const { mutate: deleteSavedJob } = useDeleteSavedJob();

  const savedJobs = useMemo(() => {
    return data?.data || [];
  }, [data]);

  const onChangePage = (page: number) => {
    setPage(page);
  };

  const handleSearch = (query: string) => {
    setSearch(query);
    setPage(1);
  };

  const handleCategoryChange = (category: string) => {
    if (category === "all") {
      setCategory("");
    } else {
      setCategory(category);
    }
    setPage(1);
  };

  const handleDateChange = (startDate: string, endDate: string) => {
    setStartDate(startDate);
    setEndDate(endDate);
    setPage(1);
  };

  const handleUnbookmark = (jobId: number) => {
    const savedJob = savedJobs.find((job) => job.job.id === jobId);
    if (savedJob) {
      deleteSavedJob(savedJob.job.id);
    }
  };

  return (
    <>
      <DashboardBreadcrumb route="user" lastCrumb="Favorite Jobs" />
      <div className="container mx-auto px-1 py-2">
        <div>
          <div>
            <SavedJobsHeader
              totalSavedJobs={data?.meta.total || 0}
              onSearch={handleSearch}
              onCategoryChange={handleCategoryChange}
              onDateChange={handleDateChange}
              isDisabled={isLoading}
            />
            <div className="mt-4 sm:mt-6 md:mt-8">
              {savedJobs.length === 0 && !isLoading ? (
                <DataNotFound
                  message="You haven't saved any jobs yet. Explore our job listings to find opportunities."
                  title="No Saved Jobs Found"
                  actionLabel="Browse Jobs"
                  onAction={() => (window.location.href = "/jobs")}
                />
              ) : (
                <SavedJobsList
                  savedJobs={savedJobs}
                  isLoading={isLoading}
                  error={null}
                  onUnbookmark={handleUnbookmark}
                />
              )}
            </div>
          </div>
          {data && data.data.length > 0 && data.meta.total > data.meta.take && (
            <PaginationSection
              onChangePage={onChangePage}
              page={Number(page)}
              take={10}
              total={data.meta.total}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SavedJobsPage;
