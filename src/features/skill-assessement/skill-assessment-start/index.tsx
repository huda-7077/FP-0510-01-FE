"use client";

import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import useGetUserAttempt from "@/hooks/api/skill-assessment-user-attempt/useGetUserAttempt";
import useStartSkillAssessment from "@/hooks/api/skill-assessment-user-attempt/useStartSkillAssessment";
import useGetSkillAssessment from "@/hooks/api/skill-assessment/useGetSkillAssessment";
import { FC } from "react";
import ConfirmStartSkillAssessment from "./components/ConfirmStartSkillAssessment";
import SkillAssessmentQuestionsComponent from "./components/SkillAssessmentQuestionsComponent";

interface SkillAssessmentStartProps {
  slug: string;
}

const SkillAssessmentStartPage: FC<SkillAssessmentStartProps> = ({ slug }) => {
  const { data: userAttempt } = useGetUserAttempt();

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

  const isLoading = isSkillAssessmentLoading;

  if (isLoading) return <LoadingScreen />;

  return (
    <>
      {skillAssessments &&
        (!userAttempt || userAttempt?.status === "ENDED") && (
          <ConfirmStartSkillAssessment
            skillAssessment={skillAssessments}
            onStart={handleStartAssessment}
            isPending={isStartSkillAssessmentPending}
          />
        )}
      {skillAssessments && userAttempt && userAttempt?.status === "STARTED" && (
        <SkillAssessmentQuestionsComponent attempt={userAttempt} slug={slug} />
      )}
    </>
  );
};

export default SkillAssessmentStartPage;
