import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { EmployeeListComponent } from "@/features/admin/employee/employee-list";
import AdminAuthGuard from "@/hoc/AdminAuthGuard";

const Employee = () => {
  return (
    <DashboardLayout>
      <EmployeeListComponent />
    </DashboardLayout>
  );
};

export default AdminAuthGuard(Employee);
