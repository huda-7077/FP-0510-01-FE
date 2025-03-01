import { UserDashboardLayout } from "@/components/layouts/UserDashboardLayout";
import AppliedJobsPage from "@/features/user/jobs";
import UserAuthGuard from "@/hoc/UserAuthGuard";

const Jobs = () => {
  return (
    <UserDashboardLayout>
      <AppliedJobsPage />
    </UserDashboardLayout>
  );
};

export default UserAuthGuard(Jobs);
