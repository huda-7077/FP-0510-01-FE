import PreTestAssessmentComponent from "@/features/admin/company/pre-test-assessment";
import AdminAuthGuard from "@/hoc/AdminAuthGuard";

const CreatePreTestAssessment = ({ params }: { params: { jobId: string } }) => {
  return <PreTestAssessmentComponent jobId={params.jobId} />;
};

export default AdminAuthGuard(CreatePreTestAssessment);
