import { UserDashboardLayout } from "@/components/layouts/UserDashboardLayout";
import UserDashboardPage from "@/features/user/dashboard";

const UserDashboard = () => {
  return (
    <UserDashboardLayout>
      <UserDashboardPage />
    </UserDashboardLayout>
  );
};

export default UserDashboard;
