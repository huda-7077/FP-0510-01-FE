import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import CompanySettingsPage from "@/features/admin/settings";
import AdminAuthGuard from "@/hoc/AdminAuthGuard";

const CompanySettings = () => {
  return (
    <DashboardLayout>
      <CompanySettingsPage />
    </DashboardLayout>
  );
};

export default AdminAuthGuard(CompanySettings);
