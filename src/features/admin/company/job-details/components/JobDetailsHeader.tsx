import { MoreVertical, Calendar, Clock, MapPin, Building2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Job } from "@/types/job";
import { JobStatusBadge } from "../../job-list/components/JobStatusBadge";
import { AssessmentStatusBadge } from "../../job-list/components/AssessmentStatusBadge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import useGetAssessments from "@/hooks/api/assessment/useGetAssessments";
import MarkDown from "@/components/Markdown";

interface JobDetailsHeaderProps {
  job: Job;
}

export const JobDetailsHeader = ({ job }: JobDetailsHeaderProps) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const { data: assessment } = useGetAssessments({
    jobId: job.id,
  });

  const getAssessmentPath = () => {
    const baseUrl = "/pre-test-assessment/";
    const action =
      assessment && assessment.data.length > 0
        ? `/update/${job.id}`
        : `/create/${job.id}`;
    return baseUrl + action;
  };

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
              <Link href={getAssessmentPath()}>
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
        <span className="font-medium text-gray-700">{job.category}</span>
        <span className="h-1 w-1 rounded-full bg-gray-300" />
        <div className="flex flex-wrap items-center gap-2">
          <JobStatusBadge status={job.isPublished ? "published" : "draft"} />
          {job.requiresAssessment && <AssessmentStatusBadge />}
        </div>
      </div>

      <div className="flex flex-col flex-wrap gap-4 sm:flex-row sm:gap-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span>Created {formatDate(job.createdAt)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="h-4 w-4 text-gray-400" />
          <span>Deadline {formatDate(job.applicationDeadline)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span>Jakarta, Indonesia</span>
        </div>
      </div>

      <MarkDown content={job.description} />
    </div>
  );
};
