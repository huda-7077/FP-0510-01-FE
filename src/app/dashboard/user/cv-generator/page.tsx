import { UserDashboardLayout } from "@/components/layouts/UserDashboardLayout";
import CVGeneratorPage from "@/features/cv-generator";

const CvGenerator = () => {
  return (
    <UserDashboardLayout>
      <CVGeneratorPage />
    </UserDashboardLayout>
  );
};

export default CvGenerator;
