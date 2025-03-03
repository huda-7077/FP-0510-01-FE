"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, LoaderCircle, XCircle } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";
import { FC } from "react";
import { toast } from "react-toastify";
import ApplicationAcceptanceAlert from "./ApplicationAcceptanceAlert";
import useUpdateJobApplication from "@/hooks/api/job-applications/useUpdateJobApplication";

interface ApplicationShortlistButtonProps {
  isRequireAssessment: boolean;
  assessmentStatus: string;
  applicantName: string;
  jobApplicationId: number;
  status: string;
}

const ManageApplicationButton: FC<ApplicationShortlistButtonProps> = ({
  isRequireAssessment,
  assessmentStatus,
  applicantName,
  jobApplicationId,
  status,
}) => {
  const router = useTransitionRouter();

  const {
    mutateAsync: updateJobApplication,
    isPending: isUpdateJobApplicationPending,
  } = useUpdateJobApplication();

  const handleJobApplicationUpdate = async (status: string, notes?: string) => {
    try {
      await updateJobApplication({
        id: jobApplicationId,
        status: status,
        notes,
      });
      if (status === "IN_REVIEW") {
        toast.success("User shortlisted successfully");
      } else if (status === "ACCEPTED") {
        toast.success("User accepted. A acceptance email has been sent.");
      } else if (status === "REJECTED") {
        toast.success("User rejected. A rejection email has been sent.");
      }
    } catch (error) {
      toast.error("Failed to update job application");
    }
  };

  if (isUpdateJobApplicationPending)
    return <LoaderCircle className="h-4 w-4 animate-spin" />;

  return (
    <div className="flex gap-3">
      {(assessmentStatus === "Passed" && status === "IN_REVIEW") ||
      (!isRequireAssessment && status === "IN_REVIEW") ? (
        <Button
          className="bg-blue-600 p-3 text-white shadow-none hover:bg-blue-700"
          onClick={() =>
            router.push(
              `/dashboard/admin/interviews/create/${jobApplicationId}`,
            )
          }
        >
          <Clock />
          Schedule Interview
        </Button>
      ) : (
        <ApplicationAcceptanceAlert
          applicantName={applicantName}
          buttonIcon={<CheckCircle className="h-24 w-24" />}
          color="blue"
          handleClick={handleJobApplicationUpdate}
          isDisabled={isUpdateJobApplicationPending}
          status={status}
          updatedStatus={
            status === "INTERVIEW_SCHEDULED" ? "ACCEPTED" : "IN_REVIEW"
          }
        />
      )}
      <ApplicationAcceptanceAlert
        applicantName={applicantName}
        buttonIcon={<XCircle className="h-24 w-24" />}
        color="red"
        handleClick={handleJobApplicationUpdate}
        isDisabled={isUpdateJobApplicationPending}
        status={status}
        updatedStatus="REJECTED"
      />
    </div>
  );
};

export default ManageApplicationButton;
