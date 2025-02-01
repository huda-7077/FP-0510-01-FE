"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useGetAssessments from "@/hooks/api/assessment/useGetAssessments";
import useCalculateAge from "@/hooks/useCalculateAge";
import useFormatRupiah from "@/hooks/useFormatRupiah";
import useLongDateFormatter from "@/hooks/useLongDateFormatter";
import { JobApplication } from "@/types/jobApplication";
import { DollarSign, MoreVertical, X } from "lucide-react";
import { useEffect, useState } from "react";
import ApplicantDetails from "./ApplicantDetails";
import ApplicantProfilePicture from "./ApplicantProfilePicture";
import ApplicationShortlistButton from "./ApplicationShortlistButton";
import ApplicationStatusBadge from "./ApplicationStatusBadge";
import AssessmentBadge from "./AssessmentBadge";
import DownloadCVButton from "./DownloadCVButton";

interface ApplicationCardProps {
  application: JobApplication;
}

export const ApplicationCard = ({ application }: ApplicationCardProps) => {
  const [score, setScore] = useState(0);
  const [assessmentStatus, setAssessmentStatus] = useState("");
  const { formatLongDate } = useLongDateFormatter();
  const { calculateAge } = useCalculateAge();

  const { data: assessments } = useGetAssessments({
    jobId: application.jobId,
  });

  useEffect(() => {
    if (
      application.job.requiresAssessment &&
      assessments &&
      assessments.data.length > 0
    ) {
      setScore(
        (assessments.data[0]?.userAssessments || []).find(
          (userAssessment) => userAssessment.userId === application.userId,
        )?.score || 0,
      );
    }
  }, [assessments]);

  useEffect(() => {
    if (
      application.job.requiresAssessment &&
      assessments &&
      assessments.data &&
      assessments.data.length > 0 &&
      Array.isArray(assessments.data[0].userAssessments)
    ) {
      const userAssessment = assessments.data[0].userAssessments.find(
        (userAssessment) => userAssessment.userId === application.userId,
      );

      if (!userAssessment) {
        setAssessmentStatus("");
      } else {
        if (score >= assessments.data[0].passingScore) {
          setAssessmentStatus("Passed");
        } else {
          setAssessmentStatus("Failed");
        }
      }
    } else {
      setAssessmentStatus("");
    }
  }, [score]);

  return (
    <Card className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 bg-white px-6 py-4 shadow-none transition-all duration-300 ease-in-out hover:border-blue-600">
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
            </div>
            <div className="flex flex-wrap items-center gap-1 text-gray-500 sm:gap-2">
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
              <DollarSign className="h-4 w-4 text-gray-500" />
              <span className="text-xs text-gray-500">
                Expecting {useFormatRupiah(application.expectedSalary)} / mo.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
              <p className="text-xs text-gray-500">
                Applied on {formatLongDate(application.createdAt)}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <ApplicationStatusBadge
              currentStatus={application.status}
              className="px-2 py-1"
            />
            {application.job.requiresAssessment && (
              <AssessmentBadge
                score={score}
                assessmentStatus={assessmentStatus}
              />
            )}
          </div>
        </div>

        <div className="flex flex-row items-center gap-2 sm:items-end sm:gap-4">
          <ApplicationShortlistButton
            className="bg-blue-600 text-white hover:bg-blue-800 hover:text-white"
            isDisabled={application.status !== "PENDING"}
          />
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
