"use client";
import HomeBreadcrumb from "@/components/HomeBreadcrumb";
import { LocationPermission } from "@/components/LocationPermission";
import PaginationSection from "@/components/PaginationSection";
import { Badge } from "@/components/ui/badge";
import useGetJobs from "@/hooks/api/job/useGetJobs";
import { Bookmark, BookmarkCheck, MapPin } from "lucide-react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { parseAsInteger, useQueryState } from "nuqs";
import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { JobCardSkeleton } from "./components/JobCardSkeleton";
import { JobSearchSidebar } from "./components/JobsSearchSidebar";
import { useSession } from "next-auth/react";
import useGetSavedJobs from "@/hooks/api/saved-job/useGetSavedJobs";
import useCreateSavedJob from "@/hooks/api/saved-job/useCreateSavedJob";
import useDeleteSavedJob from "@/hooks/api/saved-job/useDeleteSavedJob";
import { toast } from "react-toastify";

const formatSalary = (amount: number | null | undefined): string | null => {
  if (!amount) return null;
  return `Rp${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};

const JobsPage = () => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated" && !!session;
  const [search] = useQueryState("search", { defaultValue: "" });
  const [category] = useQueryState("category", { defaultValue: "" });
  const [location] = useQueryState("location", { defaultValue: "" });
  const [timeRange] = useQueryState("timeRange", { defaultValue: "" });
  const [startDate] = useQueryState("startDate", { defaultValue: "" });
  const [endDate] = useQueryState("endDate", { defaultValue: "" });
  const [sortOrder] = useQueryState("sortOrder", { defaultValue: "desc" });
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [debouncedValue] = useDebounceValue(search, 500);
  const [userLat, setUserLat] = useQueryState("userLat");
  const [userLng, setUserLng] = useQueryState("userLng");
  const [isUsingLocation, setIsUsingLocation] = useState(
    !!userLat && !!userLng,
  );

  const { data: jobs, isPending } = useGetJobs({
    search: debouncedValue,
    category,
    location,
    timeRange,
    startDate,
    endDate,
    sortBy: "createdAt",
    sortOrder,
    take: 10,
    page,
    userLatitude: userLat ? parseFloat(userLat) : undefined,
    userLongitude: userLng ? parseFloat(userLng) : undefined,
  });

  const { data: savedJobsData } = useGetSavedJobs(
    {
      page: 1,
      take: 100,
    },
    {
      enabled: isAuthenticated,
      staleTime: 5 * 60 * 1000,
    },
  );

  const createSavedJobMutation = useCreateSavedJob();
  const deleteSavedJobMutation = useDeleteSavedJob();

  const isJobBookmarked = (jobId: number) => {
    if (!isAuthenticated || !savedJobsData || !savedJobsData.data) return false;
    return savedJobsData.data.some((savedJob) => savedJob.job.id === jobId);
  };

  const getSavedJobId = (jobId: number) => {
    if (!isAuthenticated || !savedJobsData || !savedJobsData.data) return null;
    const savedJob = savedJobsData.data.find(
      (savedJob) => savedJob.job.id === jobId,
    );
    return savedJob ? savedJob.id : null;
  };

  const handleBookmarkToggle = (jobId: number) => {
    if (!isAuthenticated) {
      toast.info("Please log in to bookmark jobs");
      return;
    }

    const bookmarked = isJobBookmarked(jobId);

    if (bookmarked) {
      const savedJobId = getSavedJobId(jobId);
      if (savedJobId) {
        deleteSavedJobMutation.mutate(jobId);
      }
    } else {
      createSavedJobMutation.mutate({ jobId });
    }
  };

  const onChangePage = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="min-h-screen">
      <div className="bg-[#f7f7f8]">
        <div className="container mx-auto flex items-center justify-between px-6 py-5">
          <h1 className="text-lg font-medium duration-150 hover:pl-3 hover:text-blue-600">
            Find Job
          </h1>
          <HomeBreadcrumb lastCrumb="Find Job" />
        </div>
      </div>
      <div className="container relative mx-auto flex flex-col bg-background p-4 md:flex-row md:gap-7">
        <JobSearchSidebar />
        <main className="flex-1">
          <div className="container mx-auto p-4">
            <div className="mb-4 flex items-center justify-between">
              <LocationPermission
                onLocationUpdate={(coordinates) => {
                  if (coordinates) {
                    setUserLat(coordinates.lat.toString());
                    setUserLng(coordinates.lng.toString());
                  } else {
                    setUserLat(null);
                    setUserLng(null);
                  }
                  setIsUsingLocation(!!coordinates);
                }}
                isUsingLocation={isUsingLocation}
              />
            </div>

            {isPending ? (
              <div className="grid gap-4 md:grid-cols-2">
                {[...Array(6)].map((_, index) => (
                  <JobCardSkeleton key={index} />
                ))}
              </div>
            ) : !jobs?.data || jobs?.data.length === 0 ? (
              <>
                <h1 className="mb-4 text-2xl font-bold">No Results</h1>
                <div className="flex h-96 w-full flex-col items-center justify-center text-center font-semibold text-[#afaeae]">
                  <Image
                    src="/empty-jobs.svg"
                    alt="No Jobs Found"
                    width={200}
                    height={200}
                    className="mb-4"
                  />
                  <h1>No Jobs Found</h1>
                </div>
              </>
            ) : (
              <>
                <h1 className="mb-4 text-2xl font-bold">
                  {jobs.meta.total} Results
                </h1>
                <div className="grid gap-4 md:grid-cols-2">
                  {jobs.data.map((job) => (
                    <Link
                      key={job.id}
                      href={`/jobs/${job.slug}`}
                      className="block rounded-md border-[1px] bg-card p-4 shadow-sm duration-150 hover:border-blue-500 hover:shadow-lg"
                    >
                      <div className="flex flex-col gap-4">
                        <h2 className="line-clamp-1 text-base font-semibold">
                          {job.title}
                        </h2>

                        <div className="flex flex-wrap items-center gap-3">
                          <Badge
                            variant="secondary"
                            className="rounded-sm bg-green-100 text-center text-green-600 hover:bg-green-600 hover:text-green-100 text-xs"
                          >
                            {job.category}
                          </Badge>
                          <p className="text-xs text-gray-500">
                            Salary: {formatSalary(job.salary) || "N/A"}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex max-w-[85%] items-start gap-2">
                            <div className="min-w-[40px] flex-shrink-0">
                              <div className="h-12 w-12 overflow-hidden rounded">
                                <img
                                  src={job.company.logo || "/anonymous.svg"}
                                  alt={job.company.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            </div>
                            <div className="min-w-0 space-y-1">
                              <h3 className="line-clamp-1 text-sm font-medium">
                                {job.company.name}
                              </h3>
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <MapPin className="h-4 w-4 flex-shrink-0" />
                                <span className="line-clamp-1">
                                  {job.companyLocation.regency.regency},{" "}
                                  {job.companyLocation.regency.province
                                    .province || ""}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleBookmarkToggle(job.id);
                            }}
                            className="flex-shrink-0 self-start"
                          >
                            {isJobBookmarked(job.id) ? (
                              <BookmarkCheck className="h-6 w-6 cursor-pointer text-blue-600" />
                            ) : (
                              <Bookmark className="h-6 w-6 cursor-pointer text-gray-400 hover:text-blue-600" />
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-6 flex justify-center gap-2 border-t border-gray-100 pt-6">
                  {jobs && jobs.meta.total > jobs.meta.take && (
                    <PaginationSection
                      onChangePage={onChangePage}
                      page={Number(page)}
                      take={jobs.meta.take || 10}
                      total={jobs.meta.total}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default JobsPage;
