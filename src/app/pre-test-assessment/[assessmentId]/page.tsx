import PreTestAssessmentComponent from "@/features/pre-test-assessment";

const PreTestAssessment = ({
  params,
}: {
  params: { assessmentId: string };
}) => {
  return (
    <PreTestAssessmentComponent assessmentId={parseInt(params.assessmentId)} />
  );
};

export default PreTestAssessment;
