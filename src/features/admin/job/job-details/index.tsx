"use client";

import DashboardBreadcrumb from "@/components/DashboardBreadcrumb";
import { DataNotFound } from "@/components/data-not-found/DataNotFound";
import { JobDetailsHeaderSkeleton } from "@/components/skeletons/JobDetailsHeaderSkeleton";
import useGetCompanyJob from "@/hooks/api/job/useGetCompanyJob";
import { JobApplicationsList } from "./components/JobApplicationList";
import { JobDetailsHeader } from "./components/JobDetailsHeader";

interface JobDetailsProps {
  jobId: number;
}

export const AdminJobDetailsComponent = ({ jobId }: JobDetailsProps) => {
  const { data: job, isLoading: isJobLoading } = useGetCompanyJob({
    jobId,
  });

  if (!job && !isJobLoading) {
    return (
      <div className="space-y-6">
        <DashboardBreadcrumb
          route="admin"
          crumb1={{ href: "jobs", label: "Jobs" }}
          lastCrumb="Job Details"
        />
        <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50/50 p-8">
          <DataNotFound
            title="Job Not Found"
            message="We couldn't find the job you're looking for"
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <DashboardBreadcrumb
        route="admin"
        crumb1={{ href: "jobs", label: "Jobs" }}
        lastCrumb="Job Details"
      />
      <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="px-1"></div>
          <div className="space-y-12">
            {isJobLoading ? (
              <JobDetailsHeaderSkeleton />
            ) : job ? (
              <JobDetailsHeader job={job} />
            ) : null}
            {job && <JobApplicationsList jobId={job.id} />}
          </div>
        </div>
      </div>
    </>
  );
};
