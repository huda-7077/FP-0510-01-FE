import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import React from "react";
import CreateJobForm from "./components/CreateJobForm";

const CreateJobComponent = () => {
  return (
    <DashboardLayout>
      <CreateJobForm />
    </DashboardLayout>
  );
};

export default CreateJobComponent;
