"use client";
import HomeBreadcrumb from "@/components/HomeBreadcrumb";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import useGetJob from "@/hooks/api/job/useGetJob";
import { AlertTriangle, Briefcase } from "lucide-react";
import JobContent from "./components/JobContent";
import JobHeader from "./components/JobHeader";
import JobOverview from "./components/JobOverview";
import RelatedJobs from "./components/RelatedJobs";

interface JobDetailsProps {
  jobId: number;
}

const ErrorState = () => (
  <div className="container mx-auto px-6 py-12">
    <div className="mx-auto max-w-2xl rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
      <div className="mb-4 flex justify-center">
        <div className="rounded-full bg-red-100 p-3">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>
      </div>
      <h2 className="mb-2 text-xl font-semibold text-gray-900">
        Job Not Found
      </h2>
      <p className="mb-6 text-gray-600">
        We couldn't find the job posting you're looking for. This could be
        because:
      </p>
      <ul className="mb-6 space-y-2 text-gray-600">
        <li>• The job posting may have expired</li>
        <li>• The position might have been filled</li>
        <li>• The URL might be incorrect</li>
      </ul>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => window.history.back()}
          className="rounded-md bg-gray-100 px-4 py-2 font-medium text-gray-700 hover:bg-gray-200"
        >
          Go Back
        </button>
        <a
          href="/jobs"
          className="rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
        >
          Browse Jobs
        </a>
      </div>
    </div>
  </div>
);

const NoDataState = () => (
  <div className="container mx-auto px-6 py-12">
    <div className="mx-auto max-w-2xl rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
      <div className="mb-4 flex justify-center">
        <div className="rounded-full bg-blue-100 p-3">
          <Briefcase className="h-8 w-8 text-blue-500" />
        </div>
      </div>
      <h2 className="mb-2 text-xl font-semibold text-gray-900">
        Job Posting Unavailable
      </h2>
      <p className="mb-6 text-gray-600">
        This job posting is currently unavailable. It may have been removed or
        archived.
      </p>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => window.history.back()}
          className="rounded-md bg-gray-100 px-4 py-2 font-medium text-gray-700 hover:bg-gray-200"
        >
          Go Back
        </button>
        <a
          href="/jobs"
          className="rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
        >
          View Other Jobs
        </a>
      </div>
    </div>
  </div>
);

const JobPage = ({ jobId }: JobDetailsProps) => {
  const { data: job, isLoading, error } = useGetJob({ jobId });

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorState />;
  }

  if (!job) {
    return <NoDataState />;
  }

  return (
    <div>
      <div className="bg-[#f7f7f8]">
        <div className="container mx-auto flex flex-col justify-between px-6 py-5 md:flex-row md:items-center items-start">
          <h1 className="text-lg font-medium duration-150 hover:pl-3 hover:text-blue-600">
            Job Details
          </h1>
          <HomeBreadcrumb
            crumb1={{ href: "jobs", label: "Find Jobs" }}
            lastCrumb={`${job.title}`}
          />
        </div>
      </div>
      <div className="space-y-5 pb-9">
        <JobHeader job={{ ...job, companyId: job.companyId.toString() }} />
        <div className="container mx-auto flex flex-col justify-between gap-10 px-5 md:flex-row md:px-6">
          <div className="order-2 w-full md:order-1 md:w-7/12">
            <JobContent job={job} />
          </div>
          <div className="order-1 w-full md:order-2 md:w-5/12">
            <JobOverview job={job} />
          </div>
        </div>
        <RelatedJobs categoryFilter={job?.category} />
      </div>
    </div>
  );
};

export default JobPage;
