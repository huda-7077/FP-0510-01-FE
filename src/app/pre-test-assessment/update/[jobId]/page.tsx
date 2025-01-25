import { UpdatePreAssessmentTestForm } from "@/features/admin/company/pre-test-assessment/components/form/UpdatePreAssessmentTestForm";

const UpdatePreTestAssessment = ({ params }: { params: { jobId: string } }) => {
  return <UpdatePreAssessmentTestForm jobId={params.jobId} />;
};

export default UpdatePreTestAssessment;
