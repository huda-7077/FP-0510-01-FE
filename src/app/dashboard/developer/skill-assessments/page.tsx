import { SkillAssessmentListComponent } from "@/features/developer/skill-assessment";
import DeveloperAuthGuard from "@/hoc/DeveloperAuthGuard";

const SkillAssessments = () => {
  return <SkillAssessmentListComponent />;
};

export default DeveloperAuthGuard(SkillAssessments);
