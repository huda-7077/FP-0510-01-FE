import { UserDashboardLayout } from "@/components/layouts/UserDashboardLayout";
import { UserPaymentsPage } from "@/features/user/payments";
import UserAuthGuard from "@/hoc/UserAuthGuard";

const UserPayments = () => {
  return (
    <UserDashboardLayout>
      <UserPaymentsPage />
    </UserDashboardLayout>
  );
};

export default UserAuthGuard(UserPayments);
