"use client";

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
import useUpdateJobStatus from "@/hooks/api/job/useUpdateJobStatus";
import { Job } from "@/types/job";
import {
  Loader2,
  MoreVertical,
  Pen,
  Plus,
  Save,
  SquarePen,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface JobActionsMenuProps {
  job: Job;
  notifyDatabaseChange: () => void;
}

export const JobActionsMenu = ({
  job,
  notifyDatabaseChange,
}: JobActionsMenuProps) => {
  const router = useRouter();

  const { mutateAsync: updateJobStatus, isPending: isUpdateJobStatusPending } =
    useUpdateJobStatus();

  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);

  const getPublishStatusStyle = () => {
    if (job.isPublished) {
      return "text-red-500";
    }
    return "text-green-500";
  };

  const getPublishStatusText = () => {
    return !job.isPublished ? (
      <>
        <Upload />
        Publish
      </>
    ) : (
      <>
        <Save />
        Save to Draft
      </>
    );
  };

  const getPublishStatusAlertMessage = () => {
    return job.isPublished
      ? "This action will put your job to draft. Anyone but you cannot see this job vacancy."
      : "This action will make your job vacancy visible to users.";
  };

  const handleJobStatus = async (status: boolean, event: React.MouseEvent) => {
    event.preventDefault();
    try {
      await updateJobStatus({
        id: job.id,
        isPublished: !status,
      });
      toast.success("Job Updated Successfully");
      setIsPublishDialogOpen(false);
      notifyDatabaseChange();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-gray-700 sm:h-9 md:h-10"
          >
            <MoreVertical className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 sm:w-56 md:w-64">
          <DropdownMenuItem
            className="cursor-pointer py-2 text-sm"
            onClick={() => router.push(`/dashboard/admin/jobs/edit/${job.id}`)}
            disabled={job.isPublished}
          >
            <SquarePen />
            Edit Job Details
          </DropdownMenuItem>

          {job.requiresAssessment && (
            <>
              {job.preTestAssessments && job.preTestAssessments.length > 0 ? (
                <DropdownMenuItem
                  onClick={() =>
                    router.push(
                      `/dashboard/admin/pre-test-assessment/update/${job.preTestAssessments[0].slug}`,
                    )
                  }
                  disabled={job.isPublished}
                  className="cursor-pointer rounded-md px-2 text-sm font-medium transition-colors hover:bg-gray-100"
                >
                  <Pen /> Edit Assessment
                </DropdownMenuItem>
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
            onSelect={(e) => e.preventDefault()}
            className="m-0 p-0"
          >
            <AlertDialog
              open={isPublishDialogOpen}
              onOpenChange={setIsPublishDialogOpen}
            >
              <AlertDialogTrigger asChild>
                <Button
                  onClick={(e) => {
                    if (job.requiresAssessment) {
                      if (job.preTestAssessments[0]?.status === "DRAFT") {
                        e.preventDefault();
                        toast.error(
                          "Cannot publish job: Please set assessment to published.",
                        );
                      } else if (job.preTestAssessments.length <= 0) {
                        e.preventDefault();
                        toast.error(
                          "Cannot publish job: You haven't create an assessment. ",
                        );
                      }
                    }
                  }}
                  variant="outline"
                  className={`m-0 flex w-full cursor-pointer items-center justify-start border-none bg-transparent px-2 py-0 text-sm shadow-none ${getPublishStatusStyle()}`}
                >
                  {getPublishStatusText()}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    {getPublishStatusAlertMessage()}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isUpdateJobStatusPending}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    disabled={isUpdateJobStatusPending}
                    onClick={(e) => handleJobStatus(job.isPublished, e)}
                  >
                    {isUpdateJobStatusPending ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="animate-spin" />
                        Loading...
                      </span>
                    ) : (
                      "Continue"
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
