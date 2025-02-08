import { DeveloperLayout } from "@/components/layouts/DeveloperLayout";
import DeveloperAuthGuard from "@/hoc/DeveloperAuthGuard";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <DeveloperLayout>{children}</DeveloperLayout>;
};

export default DeveloperAuthGuard(DashboardLayout);
