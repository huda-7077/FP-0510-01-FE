"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { JobApplication } from "@/types/jobApplication";
import { Download, MoreVertical, Pen } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import ApplicantDetails from "./ApplicantDetails";
import DownloadCVButton from "./DownloadCVButton";

interface InterviewActionsMenuProps {
  application: JobApplication;
  interviewId: number;
}

const InterviewActionsMenu: FC<InterviewActionsMenuProps> = ({
  application,
  interviewId,
}) => {
  const router = useRouter();
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
          <ApplicantDetails applicant={application} />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100"
          onClick={() =>
            router.push(`/dashboard/admin/interviews/edit/${interviewId}`)
          }
        >
          <Button className="flex h-full w-full justify-start border-none bg-transparent p-0 text-start text-black shadow-none hover:bg-transparent hover:text-black">
            <Pen className="h-4 w-4" />
            Edit Interview
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100">
          <DownloadCVButton
            icon={
              <Download className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
            }
            text="Download CV"
            variant="outline"
            url={application.cvFile}
            className="flex h-full w-full justify-start border-none bg-transparent p-0 text-start text-black shadow-none hover:bg-transparent hover:text-black"
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default InterviewActionsMenu;
