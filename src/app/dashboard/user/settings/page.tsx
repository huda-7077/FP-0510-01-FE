import { UserDashboardLayout } from "@/components/layouts/UserDashboardLayout";
import UserSettingsPage from "@/features/user/settings";

const UserSettings = () => {
  return (
    <UserDashboardLayout>
      <UserSettingsPage />
    </UserDashboardLayout>
  );
};

export default UserSettings;
