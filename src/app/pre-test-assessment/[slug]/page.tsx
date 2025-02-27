import PreTestAssessmentStartComponent from "@/features/pre-test-assessment";
import UserAuthGuard from "@/hoc/UserAuthGuard";

const PreTestAsessmentStart = ({ params }: { params: { slug: string } }) => {
  return <PreTestAssessmentStartComponent slug={params.slug} />;
};

export default UserAuthGuard(PreTestAsessmentStart);
