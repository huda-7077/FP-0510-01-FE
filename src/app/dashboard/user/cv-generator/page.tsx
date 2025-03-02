import { UserDashboardLayout } from "@/components/layouts/UserDashboardLayout";
import CVGeneratorPage from "@/features/cv-generator";
import UserAuthGuard from "@/hoc/UserAuthGuard";

const CvGenerator = () => {
  return (
    <UserDashboardLayout>
      <CVGeneratorPage />
    </UserDashboardLayout>
  );
};

export default UserAuthGuard(CvGenerator);
