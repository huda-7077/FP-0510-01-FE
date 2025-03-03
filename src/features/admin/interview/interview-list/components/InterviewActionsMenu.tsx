"use client";
import DeleteLoadingScreen from "@/components/loading-screen/DeleteLoadingScreen";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useDeleteInterview from "@/hooks/api/interview/useDeleteInterview";
import { JobApplication } from "@/types/jobApplication";
import { Loader2, MoreVertical, Pen, Trash2 } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";
import { FC, useState } from "react";
import ApplicantDetails from "./ApplicantDetails";

interface InterviewActionsMenuProps {
  application: JobApplication;
  interviewId: number;
}

const InterviewActionsMenu: FC<InterviewActionsMenuProps> = ({
  application,
  interviewId,
}) => {
  const router = useTransitionRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { mutateAsync: deleteInterview, isPending: isDeleteInterviewPending } =
    useDeleteInterview();

  const handleDeleteInterview = async (event: React.MouseEvent) => {
    event.preventDefault();
    try {
      await deleteInterview(interviewId);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDialogOpen(false);
      document.body.style.pointerEvents = "";
    }
  };

  if (isDeleteInterviewPending)
    return <DeleteLoadingScreen message="Deleting Interview Schedule" />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-9 w-9 p-0 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200"
        >
          <MoreVertical className="h-4 w-4 text-gray-600" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 space-y-1 p-2">
        <DropdownMenuItem
          className="cursor-pointer rounded-md p-2 text-sm font-medium transition-colors hover:bg-gray-100"
          onSelect={(e) => e.preventDefault()}
        >
          <ApplicantDetails applicant={application} />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="p-2text-sm cursor-pointer rounded-md font-medium transition-colors hover:bg-gray-100"
          onClick={() =>
            router.push(`/dashboard/admin/interviews/edit/${interviewId}`)
          }
        >
          <Button className="flex h-full w-full justify-start border-none bg-transparent p-0 text-start text-black shadow-none hover:bg-transparent hover:text-black">
            <Pen className="h-4 w-4" />
            Edit Interview
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="m-0 rounded-md p-0"
          onSelect={(e) => e.preventDefault()}
        >
          <Button
            variant="outline"
            onClick={() => setIsDialogOpen(true)}
            className="m-0 flex w-full cursor-pointer justify-start border-none px-2 text-sm font-medium text-red-600 shadow-none hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 />
            Delete Interview
          </Button>
          {isDialogOpen && (
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will delete this interview and remove your data
                    from the list. If you accidentally delete your data, you can
                    contact the developer to recover it.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isDeleteInterviewPending}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={(e) => handleDeleteInterview(e)}
                    disabled={isDeleteInterviewPending}
                  >
                    {isDeleteInterviewPending ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="animate-spin" />
                        Deleting...
                      </span>
                    ) : (
                      "Continue"
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default InterviewActionsMenu;
