import { UserDashboardLayout } from "@/components/layouts/UserDashboardLayout";
import UserDashboardPage from "@/features/user/dashboard";
import UserAuthGuard from "@/hoc/UserAuthGuard";

const UserDashboard = () => {
  return (
    <UserDashboardLayout>
      <UserDashboardPage />
    </UserDashboardLayout>
  );
};

export default UserAuthGuard(UserDashboard);
