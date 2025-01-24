import PreTestAssessmentComponent from "@/features/admin/company/pre-test-assessment";

const UpdatePreTestAssessment = ({ params }: { params: { jobId: string } }) => {
  return <PreTestAssessmentComponent jobId={params.jobId} />;
};

export default UpdatePreTestAssessment;
