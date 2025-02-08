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
import { Textarea } from "@/components/ui/textarea";
import useUpdateJobApplication from "@/hooks/api/job-applications/useUpdateAssessment";
import { CheckCircle, Clock, LoaderCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { toast } from "react-toastify";
import ApplicationAcceptanceAlert from "./ApplicationAcceptanceAlert";

interface ApplicationShortlistButtonProps {
  isRequireAssessment: boolean;
  applicantName: string;
  jobApplicationId: number;
  status: string;
  userAssessmentStatus: string;
}

const ManageApplicationButton: FC<ApplicationShortlistButtonProps> = ({
  isRequireAssessment,
  applicantName,
  jobApplicationId,
  userAssessmentStatus,
  status,
}) => {
  const router = useRouter();

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

  return (
    <div className="flex gap-3">
      {(userAssessmentStatus === "DONE" && status === "IN_REVIEW") ||
      (!isRequireAssessment && status === "IN_REVIEW") ? (
        <Button
          onClick={() => router.push(`/schedule-interview/${jobApplicationId}`)}
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
