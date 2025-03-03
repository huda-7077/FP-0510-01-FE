"use client";
import { DataNotFound } from "@/components/data-not-found/DataNotFound";
import PaginationSection from "@/components/PaginationSection";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { JobApplication } from "@/types/jobApplication";
import useGetUserJobApplications from "@/hooks/api/job-applications/useGetUserJobApplications";
import { AppliedJobsHeader } from "./components/AppliedJobsHeader";
import AppliedJobsList from "./components/AppliedJobsList";
import DashboardBreadcrumb from "@/components/DashboardBreadcrumb";

export const AppliedJobsPage = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const [status, setStatus] = useQueryState("status", { defaultValue: "" });
  const [category, setCategory] = useQueryState("category", {
    defaultValue: "",
  });
  const [startDate, setStartDate] = useQueryState("startDate", {
    defaultValue: "",
  });
  const [endDate, setEndDate] = useQueryState("endDate", { defaultValue: "" });

  const [debouncedSearch] = useDebounce(search, 500);

  const {
    data: applications,
    isPending: isApplicationsPending,
    refetch: refetchApplications,
  } = useGetUserJobApplications({
    page,
    search: debouncedSearch,
    status,
    category,
    startDate,
    endDate,
    take: 10,
  });

  useEffect(() => {
    document.body.style.pointerEvents = "";
  }, [applications]);

  const onChangePage = (page: number) => {
    setPage(page);
  };

  const handleSearch = (query: string) => {
    setSearch(query);
    setPage(1);
  };

  const handleStatusChange = (status: string) => {
    if (status === "all") {
      setStatus("");
    } else {
      setStatus(status);
    }
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

  const showDataNotFound =
    !isApplicationsPending &&
    applications?.data &&
    applications.data.length === 0;

  return (
    <>
      <DashboardBreadcrumb route="user" lastCrumb="Applied Jobs" />
      <div className="container mx-auto px-1 py-2">
        <div>
          <div>
            <AppliedJobsHeader
              totalApplications={applications?.meta.total || 0}
              onSearch={handleSearch}
              onStatusChange={handleStatusChange}
              onCategoryChange={handleCategoryChange}
              onDateChange={handleDateChange}
              isDisabled={isApplicationsPending}
            />
            <div className="mt-4 sm:mt-6 md:mt-8">
              {showDataNotFound ? (
                <DataNotFound
                  message="You haven't applied to any jobs yet. Explore our job listings to find opportunities."
                  title="No Applications Found"
                  actionLabel="Browse Jobs"
                  onAction={() => (window.location.href = "/jobs")}
                />
              ) : (
                <AppliedJobsList
                  applications={applications?.data || []}
                  isLoading={isApplicationsPending}
                  error={null}
                />
              )}
            </div>
          </div>
          {applications &&
            applications.data.length > 0 &&
            applications.meta.total > applications.meta.take && (
              <PaginationSection
                onChangePage={onChangePage}
                page={Number(page)}
                take={applications.meta.take || 10}
                total={applications.meta.total}
              />
            )}
        </div>
      </div>
    </>
  );
};

export default AppliedJobsPage;
