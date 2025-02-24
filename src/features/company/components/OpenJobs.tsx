"use client";
import { Badge } from "@/components/ui/badge";
import useGetJobs from "@/hooks/api/job/useGetJobs";
import { Bookmark, MapPin, SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { parseAsInteger, useQueryState } from "nuqs";
import { useDebounceValue } from "usehooks-ts";
import PaginationSection from "@/components/PaginationSection";
import { JobCardSkeleton } from "@/features/jobs/components/JobCardSkeleton";
import { useState } from "react";

interface OpenJobsProps {
  companyId?: number;
}

const OpenJobs = ({ companyId }: OpenJobsProps) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [debouncedSearch] = useDebounceValue(search, 500);

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
        <div className="mb-4 relative">
          <input
            type="search"
            placeholder="Search jobs..."
            value={search}
            onChange={handleSearchChange}
            className="md:w-1/2 w-full peer ps-9 pe-9 rounded-md border-[1px] border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:shadow-md"
          />
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
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
                      <Bookmark className="h-6 text-gray-400" />
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
