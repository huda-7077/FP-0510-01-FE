import { UserDashboardLayout } from "@/components/layouts/UserDashboardLayout";
import SavedJobsPage from "@/features/user/saved-jobs";
import UserAuthGuard from "@/hoc/UserAuthGuard";

const SavedJobs = () => {
  return (
    <UserDashboardLayout>
      <SavedJobsPage />
    </UserDashboardLayout>
  );
};

export default UserAuthGuard(SavedJobs);
