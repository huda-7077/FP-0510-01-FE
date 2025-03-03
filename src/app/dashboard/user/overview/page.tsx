import { UserDashboardLayout } from "@/components/layouts/UserDashboardLayout";
import OverviewPage from "@/features/user/overview";
import UserAuthGuard from "@/hoc/UserAuthGuard";

const Overview = () => {
  return (
    <UserDashboardLayout>
      <OverviewPage />
    </UserDashboardLayout>
  );
};

export default UserAuthGuard(Overview);
