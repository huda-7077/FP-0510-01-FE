import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { JobListComponent } from "@/features/admin/job/job-list";
import AdminAuthGuard from "@/hoc/AdminAuthGuard";

const JobList = () => {
  return (
    <DashboardLayout>
      <JobListComponent />
    </DashboardLayout>
  );
};

export default AdminAuthGuard(JobList);
