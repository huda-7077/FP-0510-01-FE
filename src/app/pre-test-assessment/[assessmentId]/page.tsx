import PreTestAssessmentComponent from "@/features/pre-test-assessment";
import UserAuthGuard from "@/hoc/UserAuthGuard";

const PreTestAssessment = ({
  params,
}: {
  params: { assessmentId: string };
}) => {
  return (
    <PreTestAssessmentComponent assessmentId={parseInt(params.assessmentId)} />
  );
};

export default UserAuthGuard(PreTestAssessment);
