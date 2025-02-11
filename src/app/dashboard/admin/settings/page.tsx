import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import CompanySettingsPage from "@/features/admin/company/settings";

const CompanySettings = () => {
  return (
    <DashboardLayout>
      <CompanySettingsPage />
    </DashboardLayout>
  );
};

export default CompanySettings;
