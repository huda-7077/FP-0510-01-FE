import { UserDashboardLayout } from "@/components/layouts/UserDashboardLayout";
import ApplicationDetailPage from "@/features/user/application-detail";
import UserAuthGuard from "@/hoc/UserAuthGuard";

const ApplicationDetail = ({ params }: { params: { id: string } }) => {
  return (
    <UserDashboardLayout>
      <ApplicationDetailPage jobApplicationId={parseInt(params.id)} />
    </UserDashboardLayout>
  );
};

export default UserAuthGuard(ApplicationDetail);
