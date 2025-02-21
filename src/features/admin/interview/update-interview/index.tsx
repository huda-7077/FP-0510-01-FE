"use client";

import DashboardBreadcrumb from "@/components/DashboardBreadcrumb";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { FC } from "react";
import UpdateInterviewForm from "./components/UpdateInterviewForm";

interface UpdateInterviewComponentProps {
  id: number;
}

const UpdateInterviewComponent: FC<UpdateInterviewComponentProps> = ({
  id,
}) => {
  return (
    <DashboardLayout>
      <DashboardBreadcrumb
        route="admin"
        crumb1={{ href: "interviews", label: "Interviews" }}
        lastCrumb="Edit Interview Schedule"
      />
      <UpdateInterviewForm id={id} />
    </DashboardLayout>
  );
};

export default UpdateInterviewComponent;
