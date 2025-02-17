import InterviewListComponent from "@/features/admin/interview/interview-list";
import AdminAuthGuard from "@/hoc/AdminAuthGuard";
import React from "react";

const InterviewList = () => {
  return <InterviewListComponent />;
};

export default AdminAuthGuard(InterviewList);
