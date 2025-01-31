import MarkDown from "@/components/Markdown";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useGetAssessments from "@/hooks/api/assessment/useGetAssessments";
import useGetAssessmentPath from "@/hooks/assessment/useGetAssessmentPath";
import useLongDateFormatter from "@/hooks/useLongDateFormatter";
import { Job } from "@/types/job";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Calendar, Clock, MapPin, MoreVertical } from "lucide-react";
import Link from "next/link";
import { AssessmentStatusBadge } from "../../job-list/components/AssessmentStatusBadge";
import { JobStatusBadge } from "../../job-list/components/JobStatusBadge";

interface JobDetailsHeaderProps {
  job: Job;
}

export const JobDetailsHeader = ({ job }: JobDetailsHeaderProps) => {
  const { data: assessment } = useGetAssessments({
    jobId: job.id,
  });

  const { formatLongDate } = useLongDateFormatter();
  const { getAssessmentPath } = useGetAssessmentPath(
    (assessment && assessment?.data.length) || 0,
    job.id.toString(),
  );

  return (
    <div className="space-y-4 rounded-lg bg-white">
      <div className="flex items-start justify-between gap-4">
        <h1 className="flex-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {job.title}
        </h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-9 w-9 shrink-0 p-0 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200"
            >
              <MoreVertical className="h-4 w-4 text-gray-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 space-y-1 p-2">
            <DropdownMenuItem className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100">
              Edit Job Details
            </DropdownMenuItem>
            {job.requiresAssessment && (
              <Link href={getAssessmentPath}>
                <DropdownMenuItem className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100">
                  {assessment && assessment.data.length > 0
                    ? "Edit "
                    : "Create "}
                  Assessment
                </DropdownMenuItem>
              </Link>
            )}
            <DropdownMenuItem className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50">
              Delete Job
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="font-semibold text-gray-700">{job.category}</span>
        <span className="h-1 w-1 rounded-full bg-gray-300" />
        <div className="flex flex-wrap items-center gap-2">
          <JobStatusBadge status={job.isPublished ? "published" : "draft"} />
          {job.requiresAssessment && <AssessmentStatusBadge />}
        </div>
      </div>

      <div className="flex flex-col flex-wrap gap-4 sm:flex-row sm:items-center sm:gap-6">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span>Created {formatLongDate(job.createdAt)}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Clock className="h-4 w-4 text-gray-400" />
          <span>Deadline {formatLongDate(job.applicationDeadline)}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span>
            {job.companyLocation.address}, {job.companyLocation.regency.regency}
          </span>
        </div>
      </div>
      <div className="space-y-2 pt-4">
        <h2 className="text-xl font-semibold text-gray-900 md:text-2xl">
          Description
        </h2>
        <ScrollArea className="mas-h-[320px] h-fit w-full rounded-md border bg-gray-50 p-4">
          <MarkDown content={job.description} />
        </ScrollArea>
      </div>
    </div>
  );
};
