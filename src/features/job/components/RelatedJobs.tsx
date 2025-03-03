"use client";
import { Badge } from "@/components/ui/badge";
import { JobCardSkeleton } from "@/features/jobs/components/JobCardSkeleton";
import useGetJobs from "@/hooks/api/job/useGetJobs";
import { Bookmark, MapPin } from "lucide-react";
import { Link } from "next-view-transitions";
import Image from "next/image";

interface RelatedJobsProps {
  categoryFilter?: string;
}

const RelatedJobs = ({ categoryFilter }: RelatedJobsProps) => {
  const { data: jobs, isPending } = useGetJobs({
    category: categoryFilter || "",
    sortBy: "createdAt",
    take: 6,
  });

  return (
    <div className="border-t-[1px]">
      <div className="container mx-auto mt-6 space-y-7 p-6">
        <h1 className="text-2xl md:text-3xl">Related Jobs</h1>
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
                          src={job.company?.logo || "/anonymous.svg"}
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
          </>
        )}
      </div>
    </div>
  );
};

export default RelatedJobs;
