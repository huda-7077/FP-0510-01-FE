"use client";
import PaginationSection from "@/components/PaginationSection";
import { Badge } from "@/components/ui/badge";
import { JobCardSkeleton } from "@/features/jobs/components/JobCardSkeleton";
import useGetJobs from "@/hooks/api/job/useGetJobs";
import { Bookmark, BookmarkCheck, MapPin, SearchIcon } from "lucide-react";
import { Link } from "next-view-transitions";
import Image from "next/image";
import { parseAsInteger, useQueryState } from "nuqs";
import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import PaginationSection from "@/components/PaginationSection";
import { JobCardSkeleton } from "@/features/jobs/components/JobCardSkeleton";
import { useState } from "react";
import { useSession } from "next-auth/react";
import useGetSavedJobs from "@/hooks/api/saved-job/useGetSavedJobs";
import useCreateSavedJob from "@/hooks/api/saved-job/useCreateSavedJob";
import useDeleteSavedJob from "@/hooks/api/saved-job/useDeleteSavedJob";
import { toast } from "react-toastify";

interface OpenJobsProps {
  companyId?: number;
}

const OpenJobs = ({ companyId }: OpenJobsProps) => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated" && !!session;
  const [search, setSearch] = useState("");
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [debouncedSearch] = useDebounceValue(search, 500);

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

  if (!companyId) {
    return (
      <div className="container mx-auto mt-6 space-y-7 p-6">
        <h1 className="text-2xl md:text-3xl">Open Jobs</h1>
        <div className="flex h-96 w-full flex-col items-center justify-center text-center font-semibold text-[#afaeae]">
          <Image
            src="/empty-jobs.svg"
            alt="No Jobs Found"
            width={200}
            height={200}
            className="mb-4"
          />
          <h1>No Company Selected</h1>
          <p>Please select a company to view its open jobs.</p>
        </div>
      </div>
    );
  }

  const { data: jobs, isPending } = useGetJobs({
    search: debouncedSearch,
    companyId: companyId,
    sortBy: "createdAt",
    sortOrder: "desc",
    take: 9,
    page,
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onChangePage = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div>
      <div className="container mx-auto mt-6 space-y-7 p-6">
        <h1 className="text-2xl md:text-3xl">Open Jobs</h1>
        <div className="relative mb-4">
          <input
            type="search"
            placeholder="Search jobs..."
            value={search}
            onChange={handleSearchChange}
            className="peer w-full rounded-md border-[1px] border-gray-300 px-4 py-2 pe-9 ps-9 text-sm focus:border-blue-500 focus:shadow-md focus:outline-none md:w-1/2"
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
            <SearchIcon size={16} />
          </div>
        </div>
        {isPending ? (
          <div className="grid gap-4 md:grid-cols-3">
            {[...Array(3)].map((_, index) => (
              <JobCardSkeleton key={index} />
            ))}
          </div>
        ) : !jobs?.data || jobs?.data.length === 0 ? (
          <>
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {jobs.data.map((job) => (
                <Link
                  key={job.id}
                  href={`/jobs/${job.id}`}
                  className="block rounded-md border-[1px] bg-card p-4 shadow-sm duration-150 hover:border-blue-500 hover:shadow-lg"
                >
                  <div className="flex flex-col gap-4">
                    <h2 className="text-base font-semibold">{job.title}</h2>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="secondary"
                        className="rounded-sm bg-green-100 text-green-600 hover:bg-green-600 hover:text-green-100"
                      >
                        {job.category}
                      </Badge>
                      <p className="text-xs text-gray-500">
                        Salary: Rp
                        {job.salary ? job.salary.toLocaleString() : "N/A"}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Image
                          src={job.company?.logo || "/logos/default.png"}
                          alt={job.company?.name}
                          width={40}
                          height={40}
                          className="rounded object-cover"
                        />
                        <div className="space-y-1">
                          <h3 className="text-sm">{job.company?.name}</h3>
                          <p className="flex items-center gap-1 text-xs text-gray-500">
                            <MapPin className="h-4" />
                            {job.companyLocation?.regency?.regency},{" "}
                            {job.companyLocation?.regency?.province?.province ||
                              ""}
                          </p>
                        </div>
                      </div>
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleBookmarkToggle(job.id);
                        }}
                      >
                        {isJobBookmarked(job.id) ? (
                          <BookmarkCheck className="h-6 cursor-pointer text-blue-600" />
                        ) : (
                          <Bookmark className="h-6 cursor-pointer text-gray-400 hover:text-blue-600" />
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
                  take={jobs.meta.take || 6}
                  total={jobs.meta.total}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OpenJobs;
