import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { JobApplication } from "@/types/jobApplication";
import { MoreVertical } from "lucide-react";
import { FC } from "react";
import ApplicantDetails from "./ApplicantDetails";
import DownloadCVButton from "./DownloadCVButton";

interface ApplicationCardDropdownProps {
  application: JobApplication;
  score: number;
  assessmentStatus: string;
}

const ApplicationCardDropdown: FC<ApplicationCardDropdownProps> = ({
  application,
  score,
  assessmentStatus,
}) => {
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
          className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100"
          onSelect={(e) => e.preventDefault()}
        >
          <ApplicantDetails
            applicant={application}
            score={score}
            assessmentStatus={assessmentStatus}
          />
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100">
          <DownloadCVButton
            cvUrl={application.cvFile}
            clasName="flex h-full w-full justify-start border-none bg-transparent p-0 text-start text-black shadow-none hover:bg-transparent hover:text-black"
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ApplicationCardDropdown;
