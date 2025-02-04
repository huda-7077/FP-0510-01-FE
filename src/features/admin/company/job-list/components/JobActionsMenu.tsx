import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useGetAssessments from "@/hooks/api/assessment/useGetAssessments";
import useGetAssessmentPath from "@/hooks/assessment/useGetAssessmentPath";
import { MoreVertical, Pencil, SquarePen } from "lucide-react";
import Link from "next/link";

interface JobActionsMenuProps {
  jobId: number;
  isRequireAssessment: boolean;
  isPublished: boolean;
  onEditJobDetails?: (id: number) => void;
}

export const JobActionsMenu = ({
  jobId,
  isRequireAssessment,
  isPublished,
  onEditJobDetails,
}: JobActionsMenuProps) => {
  const { data: assessment } = useGetAssessments({
    jobId,
  });

  const { getAssessmentPath } = useGetAssessmentPath(
    (assessment && assessment?.data.length) || 0,
    jobId.toString(),
  );

  const getPublishStatusStyle = () => {
    if (
      (!isPublished && assessment && assessment.data.length < 1) ||
      isPublished
    ) {
      return "text-red-500";
    }
    return "text-green-500";
  };

  const getPublishStatusText = () => {
    if (!isPublished && assessment && assessment.data.length < 1) {
      return "Save to Draft";
    }
    return isPublished ? "Save to Draft" : "Publish";
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
        <DropdownMenuItem
          onClick={() => onEditJobDetails?.(jobId)}
          className="cursor-pointer text-sm"
        >
          <SquarePen />
          Edit Job Details
        </DropdownMenuItem>

        {isRequireAssessment && (
          <Link href={getAssessmentPath}>
            <DropdownMenuItem className="cursor-pointer text-sm">
              <Pencil />
              {assessment && assessment.data.length > 0 ? "Edit " : "Create "}
              Assessment
            </DropdownMenuItem>
          </Link>
        )}

        <DropdownMenuItem
          className={`cursor-pointer text-sm ${getPublishStatusStyle()}`}
        >
          {getPublishStatusText()}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
