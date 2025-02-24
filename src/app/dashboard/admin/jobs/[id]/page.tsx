import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { AdminJobDetailsComponent } from "@/features/admin/job/job-details";
import AdminAuthGuard from "@/hoc/AdminAuthGuard";
import React from "react";

const JobDetails = ({ params }: { params: { id: string } }) => {
  return (
    <DashboardLayout>
      <AdminJobDetailsComponent jobId={parseInt(params.id)} />
    </DashboardLayout>
  );
};

export default AdminAuthGuard(JobDetails);
