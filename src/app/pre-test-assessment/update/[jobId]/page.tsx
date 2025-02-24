import { UpdatePreAssessmentTestForm } from "@/features/admin/pre-test-assessment/components/form/UpdatePreAssessmentTestForm";
import AdminAuthGuard from "@/hoc/AdminAuthGuard";

const UpdatePreTestAssessment = ({ params }: { params: { jobId: string } }) => {
  return <UpdatePreAssessmentTestForm jobId={params.jobId} />;
};

export default AdminAuthGuard(UpdatePreTestAssessment);
