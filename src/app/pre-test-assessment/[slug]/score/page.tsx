import AssessmentEndScreen from "@/features/pre-test-assessment/component/AssessmentEndScreen";
import UserAuthGuard from "@/hoc/UserAuthGuard";
import React from "react";

const PreTestAssessmentScore = ({ params }: { params: { slug: string } }) => {
  return <AssessmentEndScreen slug={params.slug} />;
};

export default UserAuthGuard(PreTestAssessmentScore);
