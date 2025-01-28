"use client";

import { DataNotFound } from "@/components/data-not-found/DataNotFound";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import useGetJob from "@/hooks/api/job/useGetJob";
import { JobApplicationsList } from "./components/JobApplicationList";
import JobDetailsBreadCrumb from "./components/JobDetailsBreadCrumb";
import { JobDetailsHeader } from "./components/JobDetailsHeader";
import { Separator } from "@/components/ui/separator";

interface JobDetailsProps {
  jobId: number;
}

export const AdminJobDetailsComponent = ({ jobId }: JobDetailsProps) => {
  const { data: job, isLoading: isJobLoading } = useGetJob({ jobId });

  if (isJobLoading) {
    return (
      <div className="min-h-[400px]">
        <LoadingScreen message="Loading job details" />
      </div>
    );
  }

  if (!job) {
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
            <div className="overflow-hidden">
              <JobDetailsHeader job={job} />
            </div>

            <div className="overflow-hidden">
              <JobApplicationsList jobId={job.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
