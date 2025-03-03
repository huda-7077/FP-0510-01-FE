"use client";
import { DataNotFound } from "@/components/data-not-found/DataNotFound";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import useGetUserAttempt from "@/hooks/api/assessment-user-attempt/useGetUserAttempt";
import useStartAssessment from "@/hooks/api/assessment-user-attempt/useStartAssessment";
import useGetAssessment from "@/hooks/api/assessment/useGetAssessment";
import useCheckJobApplication from "@/hooks/api/job-applications/useCheckJobApplication";
import { useTransitionRouter } from "next-view-transitions";
import { FC, useEffect } from "react";
import { toast } from "react-toastify";
import AssessmentQuestionsComponent from "./component/AssessmentQuestionsComponent";
import ConfirmStartAssessment from "./component/ConfirmStartAssessment";

interface PreTestAssessmentStartComponentProps {
  slug: string;
}

const PreTestAssessmentStartComponent: FC<
  PreTestAssessmentStartComponentProps
> = ({ slug }) => {
  const router = useTransitionRouter();

  const { data: userAttempt } = useGetUserAttempt();
  const { data: assessments, isLoading: isAssessmentLoading } =
    useGetAssessment(slug);

  const {
    mutateAsync: startSkillAssessment,
    isPending: isStartSkillAssessmentPending,
  } = useStartAssessment();

  const jobId = assessments && assessments?.jobId;

  const { data: checkJobApplication, isPending: isCheckJobApplicationPending } =
    useCheckJobApplication(jobId || 0);

  const handleStartAssessment = async () => {
    sessionStorage.removeItem("attemptId");
    sessionStorage.removeItem("submitted");
    sessionStorage.removeItem("userAnswers");
    sessionStorage.removeItem("currentIndex");
    await startSkillAssessment(slug);
  };

  useEffect(() => {
    if (checkJobApplication && !checkJobApplication.isExist) {
      toast.error("You don't have access to this assessment");
      router.push("/dashboard/user");
    }
  }, [checkJobApplication]);

  if (isAssessmentLoading || isCheckJobApplicationPending)
    return <LoadingScreen />;

  if (!assessments) return <DataNotFound title="Assessment not found" />;

  return (
    <>
      {assessments && (!userAttempt || userAttempt?.status === "ENDED") && (
        <ConfirmStartAssessment
          assessment={assessments}
          userAttemptStatus={userAttempt?.status || ""}
          onStart={handleStartAssessment}
          isPending={isStartSkillAssessmentPending}
        />
      )}
      {assessments && userAttempt && userAttempt?.status === "STARTED" && (
        <AssessmentQuestionsComponent attempt={userAttempt} slug={slug} />
      )}
    </>
  );
};

export default PreTestAssessmentStartComponent;
