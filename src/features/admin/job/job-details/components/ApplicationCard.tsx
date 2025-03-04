"use client";

import { Card } from "@/components/ui/card";
import useCalculateAge from "@/hooks/useCalculateAge";
import useFormatRupiah from "@/hooks/useFormatRupiah";
import useLongDateFormatter from "@/hooks/useLongDateFormatter";
import { JobApplication } from "@/types/jobApplication";
import { DollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import ApplicantProfilePicture from "./ApplicantProfilePicture";
import ApplicationCardDropdown from "./ApplicationCardDropdown";
import ManageApplicationButton from "./ApplicationShortlistButton";
import ApplicationStatusBadge from "./ApplicationStatusBadge";
import AssessmentBadge from "./AssessmentBadge";
import RegisterEmployeeButton from "./RegisterEmployeeButton";

interface ApplicationCardProps {
  application: JobApplication;
}

export const ApplicationCard = ({ application }: ApplicationCardProps) => {
  const [userAssessment, setUserAssessment] = useState<{
    userId: number;
    score: number;
  }>();
  const [assessmentStatus, setAssessmentStatus] = useState("");
  const { formatLongDate } = useLongDateFormatter();
  const { calculateAge } = useCalculateAge();

  useEffect(() => {
    if (
      application.job.requiresAssessment &&
      application.job.preTestAssessments &&
      application.job.preTestAssessments.length > 0 &&
      Array.isArray(
        application.job.preTestAssessments[0].userPreTestAssessments,
      )
    ) {
      setUserAssessment(
        application.job.preTestAssessments[0].userPreTestAssessments.find(
          (assessment) => assessment.userId === application.userId,
        ),
      );

      if (!userAssessment) {
        setAssessmentStatus("");
      } else {
        if (
          userAssessment.score >=
          application.job.preTestAssessments[0].passingScore
        ) {
          setAssessmentStatus("Passed");
        } else {
          setAssessmentStatus("Failed");
        }
      }
    } else {
      setAssessmentStatus("");
    }
  }, [userAssessment]);

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
                score={userAssessment?.score || 0}
                assessmentStatus={assessmentStatus}
              />
            )}
          </div>
        </div>

        <div className="flex flex-row items-center gap-2 sm:gap-4">
          {application.status === "ACCEPTED" ||
          application.status === "REJECTED" ? (
            <>
              {application.status === "ACCEPTED" ? (
                <RegisterEmployeeButton application={application} />
              ) : (
                <p className="text-sm font-semibold italic text-red-500">
                  Applicant Rejected
                </p>
              )}
            </>
          ) : (
            <ManageApplicationButton
              isRequireAssessment={application.job.requiresAssessment}
              applicantName={application.user.fullName}
              jobApplicationId={application.id}
              status={application.status}
              assessmentStatus={assessmentStatus}
            />
          )}
          <ApplicationCardDropdown
            application={application}
            score={userAssessment?.score || 0}
            assessmentStatus={application.status}
          />
        </div>
      </div>
    </Card>
  );
};
