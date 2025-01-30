import PreTestAssessmentComponent from "@/features/admin/company/pre-test-assessment";

const CreatePreTestAssessment = ({ params }: { params: { jobId: string } }) => {
  return <PreTestAssessmentComponent jobId={params.jobId} />;
};

export default CreatePreTestAssessment;
