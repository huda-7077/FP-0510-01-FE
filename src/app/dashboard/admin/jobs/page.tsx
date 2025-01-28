import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { JobListComponent } from "@/features/admin/company/job-list";

const JobList = () => {
  return (
    <DashboardLayout>
      <JobListComponent />
    </DashboardLayout>
  );
};

export default JobList;
