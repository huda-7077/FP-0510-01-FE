"use client";

import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import ConfirmStartAssessment from "./components/ConfirmStartAssessment";
import useGetUserAssessments from "@/hooks/api/user-assessment/useGetUserAssessments";
import useUpdateUserAssessment from "@/hooks/api/user-assessment/useUpdateUserAssessment";

interface PreAssessmentTestProps {
  assessmentId: number;
}

const PreTestAssessmentComponent: FC<PreAssessmentTestProps> = ({
  assessmentId,
}) => {
  const router = useRouter();
  const { mutateAsync: updateUserAssessment } = useUpdateUserAssessment();

  const { data: userAssessments, isLoading: isUserAssessmentLoading } =
    useGetUserAssessments({ assessmentId, userId: 2 });

  useEffect(() => {
    if (isUserAssessmentLoading) return;

    const userAssessment = userAssessments?.data?.[0];

    if (!userAssessment) {
      toast.error("You do not have access to this assessment");
      router.push("/");
      return;
    }

    if (userAssessment.status === "EXPIRED") {
      toast.error("Your assessment test has expired");
    } else if (userAssessment.status !== "PENDING") {
      toast.error("You cannot redo an assessment");
    } else if (!userAssessment.assessment) {
      toast.error("Assessment data not found");
    }

    if (
      userAssessment.status !== "PENDING" &&
      userAssessment.status !== "EXPIRED"
    ) {
      router.push("/");
    }
  }, [userAssessments, isUserAssessmentLoading, router]);

  const handleStartAssessment = async () => {
    try {
      const userAssessment = userAssessments?.data?.[0];
      if (!userAssessment) return;

      await updateUserAssessment({ id: userAssessment.id, status: "STARTED" });

      const initialRemainingTime = 20;
      localStorage.setItem("remainingTime", initialRemainingTime.toString());

      toast.success("Good Luck!");
      router.push(`/pre-test-assessment/${assessmentId}/${userAssessment.id}`);
    } catch (error) {
      console.error("Error updating user assessment:", error);
      toast.error("Failed to start assessment");
      router.push("/");
    }
  };

  if (isUserAssessmentLoading) return <LoadingScreen />;

  return (
    userAssessments &&
    userAssessments.data.length > 0 && (
      <ConfirmStartAssessment
        assessment={userAssessments.data[0].assessment}
        onStart={handleStartAssessment}
      />
    )
  );
};

export default PreTestAssessmentComponent;
