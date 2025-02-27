import { CreateAssessmentComponent } from "@/features/admin/pre-test-assessment/components/CreateAssessmentComponent";

const CreatePreTestAssessment = ({ params }: { params: { jobId: string } }) => {
  return <CreateAssessmentComponent jobId={parseInt(params.jobId)} />;
};

export default CreatePreTestAssessment;
