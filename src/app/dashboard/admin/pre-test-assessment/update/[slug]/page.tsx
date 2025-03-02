import { AssessmentDetailsComponent } from "@/features/admin/pre-test-assessment/components/AssessmentDetailsComponent";

const EditPreTestAssessment = ({ params }: { params: { slug: string } }) => {
  return <AssessmentDetailsComponent slug={params.slug} />;
};

export default EditPreTestAssessment;
