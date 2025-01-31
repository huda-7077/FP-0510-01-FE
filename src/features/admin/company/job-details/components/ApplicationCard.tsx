"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Check,
  DollarSign,
  Download,
  Eye,
  GraduationCap,
  MoreVertical,
  UserPlus,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { JobApplication } from "@/types/jobApplication";
import useLongDateFormatter from "@/hooks/useLongDateFormatter";
import useCalculateAge from "@/hooks/useCalculateAge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import useFormatRupiah from "@/hooks/useFormatRupiah";
import Link from "next/link";
import ApplicantDetails from "./ApplicantDetails";
import useGetInitials from "@/hooks/useGetInitials";
import AssessmentBadge from "./AssessmentBadge/AssessmentBadge";
import ApplicantProfilePicture from "./ApplicantProfilePicture";

interface ApplicationCardProps {
  application: JobApplication;
}

export const ApplicationCard = ({ application }: ApplicationCardProps) => {
  const { formatLongDate } = useLongDateFormatter();
  const { calculateAge } = useCalculateAge();

  return (
    <Card className="group relative overflow-hidden rounded-lg border border-gray-100 bg-white px-6 py-4 transition-all duration-300 ease-in-out hover:border-blue-100 hover:shadow-md">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="flex-shrink-0">
          <ApplicantProfilePicture
            profilePicture={application.user.profilePicture}
            fullName={application.user.fullName}
            ringColor="ring-gray-200"
          />
        </div>

        <div className="flex-grow space-y-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold tracking-tight text-gray-900">
                {application.user.fullName}
              </h3>
              {application.job.requiresAssessment && (
                <AssessmentBadge userId={application.userId} />
              )}
            </div>
            <div className="flex flex-wrap items-center gap-1 text-gray-400 sm:gap-2">
              <p className="text-xs font-medium transition-colors group-hover:text-blue-600">
                {calculateAge(application.user.dateOfBirth.toLocaleString())}{" "}
                years old
              </p>
              <span className="h-0.5 w-0.5 rounded-full bg-gray-300 sm:block sm:h-1 sm:w-1" />
              <div className="flex items-center gap-2">
                <span className="text-xs group-hover:text-blue-600">
                  {application.user.educationLevel}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4 text-gray-400" />
              <span className="text-xs text-gray-400">
                Expecting {useFormatRupiah(application.expectedSalary)} / mo.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
              <p className="text-xs text-gray-400">
                Applied on {formatLongDate(application.createdAt)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center gap-2 sm:items-end sm:gap-4">
          <Button
            variant="default"
            className="h-8 flex-1 bg-blue-600 text-xs text-white hover:bg-blue-800 hover:text-white sm:h-9 sm:flex-none sm:px-4 md:h-10 md:px-5"
          >
            <UserPlus className="h-4 w-4" />
            <span className="font-medium">Hire Candidate</span>
          </Button>
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
              <Link href={application.cvFile} target="_blank">
                <DropdownMenuItem className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100">
                  <Download />
                  Download CV
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50">
                <X />
                Reject Application
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
};
