"use client";

import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import useGetUserAssessments from "@/hooks/api/user-assessment/useGetUserAssessments";
import useUpdateUserAssessment from "@/hooks/api/user-assessment/useUpdateUserAssessment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import { toast } from "react-toastify";
import ConfirmStartAssessment from "./components/ConfirmStartAssessment";

interface PreAssessmentTestProps {
  assessmentId: number;
}

const PreTestAssessmentComponent: FC<PreAssessmentTestProps> = ({
  assessmentId,
}) => {
  const session = useSession();
  const userId = session.data?.user.id;
  const router = useRouter();
  const { mutateAsync: updateUserAssessment } = useUpdateUserAssessment();

  const { data: userAssessments, isLoading: isUserAssessmentLoading } =
    useGetUserAssessments({ assessmentId, userId });

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
      router.push("/");
    } else if (userAssessment.status !== "PENDING") {
      toast.error("You cannot redo an assessment");
      router.push("/");
    } else if (!userAssessment.assessment) {
      toast.error("Assessment data not found");
      router.push("/");
    }
  }, [userAssessments, isUserAssessmentLoading, router]);

  const handleStartAssessment = async () => {
    try {
      const userAssessment = userAssessments?.data?.[0];
      if (!userAssessment) return;

      await updateUserAssessment({ id: userAssessment.id, status: "STARTED" });

      const initialRemainingTime = 7200;
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
