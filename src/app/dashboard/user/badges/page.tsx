import { UserDashboardLayout } from "@/components/layouts/UserDashboardLayout";
import UserBadgesPage from "@/features/user/badges";
import UserAuthGuard from "@/hoc/UserAuthGuard";

const UserBadges = () => {
  return (
    <UserDashboardLayout>
      <UserBadgesPage />
    </UserDashboardLayout>
  );
};

export default UserAuthGuard(UserBadges);
