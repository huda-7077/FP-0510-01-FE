"use client";
import { useParams } from "next/navigation";
import useGetJob from "@/hooks/api/job/useGetJob";
import JobBreadCrumb from "./components/JobBreadCrumb";
import JobContent, { JobContentSkeleton } from "./components/JobContent";
import JobHeader, { JobHeaderSkeleton } from "./components/JobHeader";
import JobOverview, { JobOverviewSkeleton } from "./components/JobOverview";
import RelatedJobs from "./components/RelatedJobs";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";

interface JobDetailsProps {
  jobId: number;
}
const JobPage = ({ jobId }: JobDetailsProps) => {
  const { data: job, isLoading, error } = useGetJob({ jobId });

  if (error) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-2xl font-semibold">Error loading job</h1>
        <p className="mt-4 text-gray-600">
          Unable to load job details. Please try again later.
        </p>
      </div>
    );
  }
  if (isLoading) {
    return (
      <LoadingScreen/>
    );
  }
  if (!job) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-2xl font-semibold">No Data</h1>
        <p className="mt-4 text-gray-600">
          Unable to load this job. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-[#f7f7f8]">
        <div className="container mx-auto flex justify-between gap-24 px-6 py-5 md:gap-0">
          <h1 className="text-lg font-medium duration-150 hover:pl-3 hover:text-blue-600">
            Job Details
          </h1>
          <JobBreadCrumb />
        </div>
      </div>
      <div className="space-y-5 pb-9">
        {isLoading ? <JobHeaderSkeleton /> : <JobHeader job={{...job, companyId: job.companyId.toString()}} />}
        <div className="container mx-auto flex flex-col justify-between gap-10 px-5 md:flex-row md:px-6">
          <div className="order-2 w-full md:order-1 md:w-7/12">
            {isLoading ? <JobContentSkeleton /> : <JobContent job={job} />}
          </div>
          <div className="order-1 w-full md:order-2 md:w-5/12">
            {isLoading ? <JobOverviewSkeleton /> : <JobOverview job={job} />}
          </div>
        </div>
        <RelatedJobs categoryFilter={job?.category} />
      </div>
    </div>
  );
};

export default JobPage;
