"use client";

import { DataNotFound } from "@/components/data-not-found/DataNotFound";
import { JobDetailsHeaderSkeleton } from "@/components/skeletons/JobDetailsHeaderSkeleton";
import useGetJob from "@/hooks/api/job/useGetJob";
import { useSession } from "next-auth/react";
import { JobApplicationsList } from "./components/JobApplicationList";
import JobDetailsBreadCrumb from "./components/JobDetailsBreadCrumb";
import { JobDetailsHeader } from "./components/JobDetailsHeader";

interface JobDetailsProps {
  jobId: number;
}

export const AdminJobDetailsComponent = ({ jobId }: JobDetailsProps) => {
  const session = useSession();
  const user = session.data && session.data.user;

  const { data: job, isLoading: isJobLoading } = useGetJob({
    jobId,
    companyId: user?.companyId || 0,
  });

  if (!job && !isJobLoading) {
    return (
      <div className="space-y-6">
        <JobDetailsBreadCrumb />
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
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <div className="space-y-8">
          <div className="px-1">
            <JobDetailsBreadCrumb />
          </div>

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
    </div>
  );
};
