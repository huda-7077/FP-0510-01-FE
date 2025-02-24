import SkillAssessmentScorePage from "@/features/skill-assessement/skill-assessment-start/score";

interface PageProps {
  params: {
    slug: string;
  };
}
const SkillAssessmentScore = ({ params }: PageProps) => {
  return <SkillAssessmentScorePage slug={params.slug} />;
};

export default SkillAssessmentScore;
