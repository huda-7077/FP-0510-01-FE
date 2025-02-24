import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Job } from "@/types/job";
import { formatDaysRemaining } from "@/utils/formatDaysRemaining";
import { Eye } from "lucide-react";
import Link from "next/link";
import { ApplicantCount } from "./ApplicantCount";
import { AssessmentStatusBadge } from "./AssessmentStatusBadge";
import { JobActionsMenu } from "./JobActionsMenu";
import { JobStatusBadge } from "./JobStatusBadge";

interface JobCardProps {
  job: Job;
  notifyDatabaseChange: () => void;
}

export const JobCard = ({ job, notifyDatabaseChange }: JobCardProps) => {
  return (
    <Card className="group rounded-2xl border-2 border-gray-200 p-3 px-6 py-4 shadow-none transition-all duration-200 hover:border-blue-600">
      <div className="flex flex-col items-start justify-between gap-3 sm:gap-4 lg:flex-row lg:items-center">
        <div className="w-full space-y-2 sm:w-auto">
          <div className="w-full sm:w-auto">
            <h3 className="line-clamp-2 p-0 text-base font-semibold text-gray-900 group-hover:text-blue-600">
              {job.title}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span className="font-semibold">{job.category}</span>
            <span className="hidden h-1 w-1 rounded-full bg-gray-300 sm:block" />
            <span>
              {formatDaysRemaining(job.applicationDeadline.toString())}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <JobStatusBadge status={job.isPublished ? "published" : "draft"} />
            {job.requiresAssessment && <AssessmentStatusBadge />}
          </div>
        </div>

        <div className="flex w-full flex-wrap items-center justify-between gap-2 sm:flex-nowrap sm:gap-4 md:gap-5 lg:w-auto">
          <ApplicantCount jobId={job.id} />
          <div className="ml-auto flex items-center gap-2 sm:ml-0 sm:gap-4 md:gap-5">
            <Link href={`/dashboard/admin/jobs/${job.id}`} key={job.id}>
              <Button
                variant="outline"
                className="h-8 flex-1 bg-blue-600 text-xs text-white hover:bg-blue-800 hover:text-white sm:h-9 sm:flex-none sm:px-4 md:h-10 md:px-5"
              >
                <Eye />
                View Details
              </Button>
            </Link>
            <JobActionsMenu
              notifyDatabaseChange={notifyDatabaseChange}
              jobId={job.id}
              isPublished={job.isPublished}
              isRequireAssessment={job.requiresAssessment}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
