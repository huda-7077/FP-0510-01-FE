import AssessmentQuestionComponent from "@/features/pre-test-assessment/components/AssessmentQuestionComponent";
import React from "react";

const AssessmentQuestion = ({
  params,
}: {
  params: { userAssessmentId: string };
}) => {
  return (
    <AssessmentQuestionComponent
      userAssessmentId={parseInt(params.userAssessmentId)}
    />
  );
};

export default AssessmentQuestion;
