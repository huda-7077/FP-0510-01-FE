import { UserDashboardLayout } from "@/components/layouts/UserDashboardLayout";
import UserSettingsPage from "@/features/user/settings";
import UserAuthGuard from "@/hoc/UserAuthGuard";

const UserSettings = () => {
  return (
    <UserDashboardLayout>
      <UserSettingsPage />
    </UserDashboardLayout>
  );
};

export default UserAuthGuard(UserSettings);
