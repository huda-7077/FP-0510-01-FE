import SkillAssessmentDetailsPage from "@/features/developer/skill-assessment/components/SkillAssessmentDetailsPage";
import DeveloperAuthGuard from "@/hoc/DeveloperAuthGuard";

interface PageProps {
  params: {
    slug: string;
  };
}
const SkillAssessmentDetails = ({ params }: PageProps) => {
  return <SkillAssessmentDetailsPage slug={params.slug} />;
};

export default DeveloperAuthGuard(SkillAssessmentDetails);
