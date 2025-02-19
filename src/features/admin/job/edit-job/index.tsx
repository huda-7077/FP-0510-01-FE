import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import React, { FC } from "react";
import EditJobForm from "./components/EditJobForm";
import EditJobFormBreadCrumb from "./components/EditFormFormBreadCrumb";

interface EditJobComponentProps {
  id: number;
}

const EditJobComponent: FC<EditJobComponentProps> = ({ id }) => {
  return (
    <DashboardLayout>
      <EditJobFormBreadCrumb jobId={id} crumb="Edit" />
      <EditJobForm key={id} id={id} />
    </DashboardLayout>
  );
};

export default EditJobComponent;
