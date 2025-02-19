import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import React, { FC } from "react";
import UpdateInterviewForm from "./components/UpdateInterviewForm";
import UpdateInterviewFormBreadCrumb from "./components/UpdateInterviewFormBreadCrumb";

interface UpdateInterviewComponentProps {
  id: number;
}

const UpdateInterviewComponent: FC<UpdateInterviewComponentProps> = ({
  id,
}) => {
  return (
    <DashboardLayout>
      <UpdateInterviewFormBreadCrumb crumb="Edit Interview" />
      <UpdateInterviewForm id={id} />
    </DashboardLayout>
  );
};

export default UpdateInterviewComponent;
