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
import useGetAssessments from "@/hooks/api/assessment/useGetAssessments";
import useUpdateJobStatus from "@/hooks/api/job/useUpdateJobStatus";
import useGetAssessmentPath from "@/hooks/useGetAssessmentPath";
import {
  Loader2,
  MoreVertical,
  Pencil,
  Save,
  SquarePen,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

interface JobActionsMenuProps {
  jobId: number;
  isRequireAssessment: boolean;
  isPublished: boolean;
  notifyDatabaseChange: () => void;
}

export const JobActionsMenu = ({
  jobId,
  isRequireAssessment,
  isPublished,
  notifyDatabaseChange,
}: JobActionsMenuProps) => {
  const { mutateAsync: updateJobStatus, isPending: isUpdateJobStatusPending } =
    useUpdateJobStatus();

  const { data: assessment, isPending: isAssessmentPending } =
    isRequireAssessment
      ? useGetAssessments({
          jobId,
        })
      : { data: undefined, isPending: false };

  const { getAssessmentPath } = useGetAssessmentPath(
    (assessment && assessment?.data.length) || 0,
    jobId.toString(),
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getPublishStatusStyle = () => {
    if (isPublished) {
      return "text-red-500";
    }
    return "text-green-500";
  };

  const getPublishStatusText = () => {
    return isPublished ? (
      <>
        <Save />
        Save to Draft
      </>
    ) : (
      <>
        <Upload />
        Publish
      </>
    );
  };

  const getPublishStatusAlertMessage = () => {
    return isPublished
      ? "This action will put your job to draft. Anyone but you cannot see this job vacancy."
      : "This action will make your job vacancy visible to users.";
  };

  const handleJobStatus = async (status: boolean, event: React.MouseEvent) => {
    event.preventDefault();
    try {
      await updateJobStatus({
        id: jobId,
        isPublished: !status,
      });
      toast.success("Job Updated Successfully");
      setIsDialogOpen(false);
      notifyDatabaseChange();
    } catch (error) {
      console.log(error);
      toast.error("Failed Updating Job");
    }
  };

  return (
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
        <Link href={`/dashboard/admin/jobs/edit/${jobId}`}>
          <DropdownMenuItem className="cursor-pointer py-2 text-sm">
            <SquarePen />
            Edit Job Details
          </DropdownMenuItem>
        </Link>
        {isRequireAssessment && (
          <Link href={getAssessmentPath}>
            <DropdownMenuItem className="cursor-pointer py-2 text-sm">
              <Pencil />
              {assessment && assessment.data.length > 0 ? "Edit " : "Create "}
              Assessment
            </DropdownMenuItem>
          </Link>
        )}
        <DropdownMenuItem
          disabled={
            isUpdateJobStatusPending ||
            (isRequireAssessment && assessment && assessment.data.length <= 0)
          }
          onSelect={(e) => e.preventDefault()}
          className="m-0 p-0"
        >
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button
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
                  onClick={(e) => handleJobStatus(isPublished, e)}
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
  );
};
