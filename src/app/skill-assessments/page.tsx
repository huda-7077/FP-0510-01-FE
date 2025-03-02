import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { SkillAssessmentListPage } from "@/features/skill-assessement";

const SkillAssessments = () => {
  return (
    <>
      <Navbar />
      <SkillAssessmentListPage />
      <Footer />
    </>
  );
};

export default SkillAssessments;
