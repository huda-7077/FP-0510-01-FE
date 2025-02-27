"use client";

import DeleteLoadingScreen from "@/components/loading-screen/DeleteLoadingScreen";
import MarkDown from "@/components/Markdown";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import useDeleteJob from "@/hooks/api/job/useDeleteJob";
import useLongDateFormatter from "@/hooks/useLongDateFormatter";
import { Job } from "@/types/job";
import {
  Calendar,
  Clock,
  MapPin,
  MoreVertical,
  Pen,
  PenSquare,
  Plus,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { AssessmentStatusBadge } from "../../job-list/components/AssessmentStatusBadge";
import { JobStatusBadge } from "../../job-list/components/JobStatusBadge";

interface JobDetailsHeaderProps {
  job: Job;
}

export const JobDetailsHeader = ({ job }: JobDetailsHeaderProps) => {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { mutateAsync: deleteJob, isPending: isDeleteJobPending } =
    useDeleteJob();

  const { formatLongDate } = useLongDateFormatter();

  const handleJobDelete = async (event: React.MouseEvent) => {
    event.preventDefault();
    try {
      await deleteJob(job.id);
      setIsDeleteDialogOpen(false);
      toast.success("Job Deleted Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed Updating Job");
    } finally {
      document.body.style.pointerEvents = "";
      router.push("/dashboard/admin/jobs");
    }
  };

  if (isDeleteJobPending)
    return <DeleteLoadingScreen message="Deleting Job Data" />;

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
            <Link href={`/dashboard/admin/jobs/edit/${job.id}`}>
              <DropdownMenuItem className="cursor-pointer rounded-md p-2 text-sm font-medium transition-colors hover:bg-gray-100">
                <PenSquare /> Edit Job Details
              </DropdownMenuItem>
            </Link>
            {job.requiresAssessment && (
              <>
                {job.preTestAssessments && job.preTestAssessments.length > 0 ? (
                  <Link
                    href={`/dashboard/admin/pre-test-assessment/update/${job.preTestAssessments[0].slug}`}
                  >
                    <DropdownMenuItem className="cursor-pointer rounded-md px-2 text-sm font-medium transition-colors hover:bg-gray-100">
                      <Pen /> Edit Assessment
                    </DropdownMenuItem>
                  </Link>
                ) : (
                  <Link
                    href={`/dashboard/admin/pre-test-assessment/create/${job.id}`}
                  >
                    <DropdownMenuItem className="cursor-pointer rounded-md px-2 text-sm font-medium transition-colors hover:bg-gray-100">
                      <Plus size={16} />
                      Create Assessment
                    </DropdownMenuItem>
                  </Link>
                )}
              </>
            )}
            <DropdownMenuItem
              className="m-0 rounded-md p-0"
              onSelect={(e) => e.preventDefault()}
            >
              <AlertDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
              >
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="m-0 flex w-full cursor-pointer justify-start border-none px-2 text-sm font-medium text-red-600 shadow-none hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 /> Delete Job
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action will delete this job and remove your data from
                      the list. if you accidentaly delete your data, you can
                      contact the developer to recover it.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleteJobPending}>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={(e) => handleJobDelete(e)}
                      disabled={isDeleteJobPending}
                    >
                      {isDeleteJobPending ? "Deleting..." : "Continue"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
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
        <ScrollArea className="h-[320px] w-full rounded-xl border-2 bg-gray-50/60 px-8">
          <div className="my-4">
            <MarkDown content={job.description} />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
