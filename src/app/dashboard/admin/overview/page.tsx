import OverviewComponent from "@/features/admin/overview";
import AdminAuthGuard from "@/hoc/AdminAuthGuard";

const Overview = () => {
  return <OverviewComponent />;
};

export default AdminAuthGuard(Overview);
