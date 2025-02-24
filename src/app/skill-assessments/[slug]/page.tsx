import SkillAssessmentStartPage from "@/features/skill-assessement/skill-assessment-start";
import UserAuthGuard from "@/hoc/UserAuthGuard";

interface PageProps {
  params: {
    slug: string;
  };
}
const SkillAssessmentStart = ({ params }: PageProps) => {
  return <SkillAssessmentStartPage slug={params.slug} />;
};

export default UserAuthGuard(SkillAssessmentStart);
