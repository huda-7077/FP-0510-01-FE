import { FC } from "react";
import { SkillAssessmentDetailsComponent } from "./form/SkillAssessmentDetailsComponent";

interface SkillAssessmentDetailsProps {
  slug: string;
}

const SkillAssessmentDetailsPage: FC<SkillAssessmentDetailsProps> = ({
  slug,
}) => {
  return <SkillAssessmentDetailsComponent slug={slug} />;
};

export default SkillAssessmentDetailsPage;
