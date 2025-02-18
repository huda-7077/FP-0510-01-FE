import { FC } from "react";
import { UpdateSkillAssessmentDetails } from "./form/CreatePreAssessmentTestForm";

interface SkillAssessmentDetailsProps {
  slug: string;
}

const SkillAssessmentDetailsPage: FC<SkillAssessmentDetailsProps> = ({
  slug,
}) => {
  return <UpdateSkillAssessmentDetails slug={slug} />;
};

export default SkillAssessmentDetailsPage;
