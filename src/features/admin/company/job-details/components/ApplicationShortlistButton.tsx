"use client";

import { Button } from "@/components/ui/button";
import useUpdateJobApplication from "@/hooks/api/job-applications/useUpdateAssessment";
import { CheckCircle, Clock, LoaderCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { toast } from "react-toastify";

interface ApplicationShortlistButtonProps {
  jobApplicationId: number;
  status: string;
  userAssessmentStatus: string;
}

const ManageApplicationButton: FC<ApplicationShortlistButtonProps> = ({
  jobApplicationId,
  userAssessmentStatus,
  status,
}) => {
  const router = useRouter();

  const {
    mutateAsync: updateJobApplication,
    isPending: isUpdateJobApplicationPending,
  } = useUpdateJobApplication();

  const handleJobApplicationUpdate = async (status: string) => {
    try {
      await updateJobApplication({ id: jobApplicationId, status: status });
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
      {userAssessmentStatus === "DONE" && status === "IN_REVIEW" ? (
        <Button
          onClick={() => router.push(`/schedule-interview/${jobApplicationId}`)}
        >
          <Clock />
          Schedule Interview
        </Button>
      ) : (
        <Button
          className="bg-green-600 p-3 text-white shadow-none hover:bg-green-700"
          disabled={isUpdateJobApplicationPending || status === "IN_REVIEW"}
          onClick={() =>
            status === "INTERVIEW_SCHEDULED"
              ? handleJobApplicationUpdate("ACCEPTED")
              : handleJobApplicationUpdate("IN_REVIEW")
          }
        >
          {isUpdateJobApplicationPending ? (
            <LoaderCircle className="h-24 w-24 animate-spin" />
          ) : (
            <CheckCircle className="h-24 w-24" />
          )}
        </Button>
      )}
      <Button
        className="border-2 border-red-600 bg-transparent p-3 text-red-600 shadow-none hover:bg-red-600 hover:text-white"
        disabled={isUpdateJobApplicationPending}
        onClick={() => handleJobApplicationUpdate("REJECTED")}
      >
        <XCircle className="h-24 w-24" />
      </Button>
    </div>
  );
};

export default ManageApplicationButton;
