import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const SkillAssessments = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default SkillAssessments;
