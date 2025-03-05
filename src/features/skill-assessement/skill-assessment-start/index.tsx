"use client";

import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import useGetUserAttempt from "@/hooks/api/skill-assessment-user-attempt/useGetUserAttempt";
import useStartSkillAssessment from "@/hooks/api/skill-assessment-user-attempt/useStartSkillAssessment";
import useGetSkillAssessment from "@/hooks/api/skill-assessment/useGetSkillAssessment";
import { FC, useEffect, useState } from "react";
import ConfirmStartSkillAssessment from "./components/ConfirmStartSkillAssessment";
import SkillAssessmentQuestionsComponent from "./components/SkillAssessmentQuestionsComponent";
import useGetSubscription from "@/hooks/api/subscription/useGetSubscription";
import { FeatureLocked } from "@/components/FeatureLocked";

interface SkillAssessmentStartProps {
  slug: string;
}

const SkillAssessmentStartPage: FC<SkillAssessmentStartProps> = ({ slug }) => {
  const [createdAt, setCreatedAt] = useState<number | null>(null);
  const [isPassed, setIsPassed] = useState<boolean | null>(null);

  const { data: userAttempt } = useGetUserAttempt(slug);
  const { data: subscription, isLoading: isSubscriptionLoading } =
    useGetSubscription({ enabled: true });
  const { data: skillAssessments, isLoading: isSkillAssessmentLoading } =
    useGetSkillAssessment(slug);

  const {
    mutateAsync: startSkillAssessment,
    isPending: isStartSkillAssessmentPending,
  } = useStartSkillAssessment();

  const handleStartAssessment = async () => {
    sessionStorage.removeItem("attemptId");
    sessionStorage.removeItem("submitted");
    sessionStorage.removeItem("userAnswers");
    sessionStorage.removeItem("currentIndex");
    await startSkillAssessment(slug);
  };

  useEffect(() => {
    if (userAttempt && createdAt === null && isPassed === null) {
      setCreatedAt(new Date(userAttempt.createdAt).getTime());
      setIsPassed(userAttempt.isPassed);
    }
  }, [userAttempt, createdAt, isPassed]);

  const isLoading = isSkillAssessmentLoading || isSubscriptionLoading;

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      {subscription &&
        (subscription.status === "EXPIRED" ||
          subscription.status === "INACTIVE" ||
          subscription.status === "RENEWED") && (
          <>
            <FeatureLocked />
          </>
        )}
      {skillAssessments &&
        (!userAttempt || userAttempt?.status === "ENDED") && (
          <ConfirmStartSkillAssessment
            skillAssessment={skillAssessments}
            onStart={handleStartAssessment}
            isPending={isStartSkillAssessmentPending}
            createdAt={createdAt}
            isPassed={isPassed}
          />
        )}
      {skillAssessments && userAttempt && userAttempt?.status === "STARTED" && (
        <SkillAssessmentQuestionsComponent
          key={slug}
          attempt={userAttempt}
          slug={slug}
        />
      )}
    </>
  );
};

export default SkillAssessmentStartPage;
