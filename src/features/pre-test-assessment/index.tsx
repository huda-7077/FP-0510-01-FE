"use client";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import useGetUserAttempt from "@/hooks/api/assessment-user-attempt/useGetUserAttempt";
import useStartAssessment from "@/hooks/api/assessment-user-attempt/useStartSkillAssessment";
import useGetAssessment from "@/hooks/api/assessment/useGetAssessment";
import { useSession } from "next-auth/react";
import { FC, useEffect } from "react";
import AssessmentQuestionsComponent from "./component/AssessmentQuestionsComponent";
import ConfirmStartAssessment from "./component/ConfirmStartAssessment";
import useGetJobApplications from "@/hooks/api/job-applications/useGetJobApplications";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { DataNotFound } from "@/components/data-not-found/DataNotFound";
import useCheckJobApplication from "@/hooks/api/job-applications/useCheckJobApplication";

interface PreTestAssessmentStartComponentProps {
  slug: string;
}

const PreTestAssessmentStartComponent: FC<
  PreTestAssessmentStartComponentProps
> = ({ slug }) => {
  const router = useRouter();

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
