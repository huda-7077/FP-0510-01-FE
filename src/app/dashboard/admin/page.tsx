"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

const DashboardAdmin = () => {
  useEffect(() => {
    redirect("/dashboard/admin/overview");
  }, []);

  return null;
};

export default DashboardAdmin;
