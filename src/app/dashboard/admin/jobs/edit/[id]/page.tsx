import EditJobComponent from "@/features/admin/company/edit-job";
import AdminAuthGuard from "@/hoc/AdminAuthGuard";
import React from "react";

const EditJob = ({ params }: { params: { id: string } }) => {
  return <EditJobComponent id={Number(params.id)} />;
};

export default AdminAuthGuard(EditJob);
