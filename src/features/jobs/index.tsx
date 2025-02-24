"use client";
import { Badge } from "@/components/ui/badge";
import useGetJobs from "@/hooks/api/job/useGetJobs";
import { Bookmark, MapPin } from "lucide-react";
import Image from "next/image";
import { parseAsInteger, useQueryState } from "nuqs";
import { useDebounceValue } from "usehooks-ts";
import { JobSearchSidebar } from "./components/JobsSearchSidebar";
import PaginationSection from "@/components/PaginationSection";
import Link from "next/link";
import { JobCardSkeleton } from "./components/JobCardSkeleton";
import HomeBreadcrumb from "@/components/HomeBreadcrumb";
import { useState } from "react";
import { LocationPermission } from "@/components/LocationPermission";

const JobsPage = () => {
  const [search] = useQueryState("search", { defaultValue: "" });
  const [category] = useQueryState("category", { defaultValue: "" });
  const [location] = useQueryState("location", { defaultValue: "" });
  const [timeRange] = useQueryState("timeRange", { defaultValue: "" });
  const [startDate] = useQueryState("startDate", { defaultValue: "" });
  const [endDate] = useQueryState("endDate", { defaultValue: "" });
  const [sortOrder] = useQueryState("sortOrder", { defaultValue: "desc" });
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [debouncedValue] = useDebounceValue(search, 500);
  const [userCoordinates, setUserCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
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
          <HomeBreadcrumb lastCrumb="Find Jobs" />
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
                  {jobs.data.length} Results
                </h1>
                <div className="grid gap-4 md:grid-cols-2">
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
                            Salary: Rp{job.salary || "N/A"}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            <Image
                              src={job.company.logo}
                              alt={job.company.name}
                              width={40}
                              height={40}
                              className="rounded object-cover"
                            />
                            <div className="space-y-1">
                              <h3 className="text-sm">{job.company.name}</h3>
                              <p className="flex items-center gap-1 text-xs text-gray-500">
                                <MapPin className="h-4" />
                                {job.companyLocation.regency.regency},{" "}
                                {job.companyLocation.regency.province
                                  .province || ""}
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
