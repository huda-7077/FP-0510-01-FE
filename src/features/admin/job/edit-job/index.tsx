"use client";

import DashboardBreadcrumb from "@/components/DashboardBreadcrumb";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { FC } from "react";
import EditJobForm from "./components/EditJobForm";

interface EditJobComponentProps {
  id: number;
}

const EditJobComponent: FC<EditJobComponentProps> = ({ id }) => {
  return (
    <DashboardLayout>
      <DashboardBreadcrumb
        route="admin"
        crumb1={{ href: "jobs", label: "Jobs" }}
        crumb2={{ href: `${id}`, label: "Jobs Details" }}
        lastCrumb="Edit Job Details"
      />
      <EditJobForm key={id} id={id} />
    </DashboardLayout>
  );
};

export default EditJobComponent;
