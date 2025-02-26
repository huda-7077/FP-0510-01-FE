import AdminAuthGuard from "@/hoc/AdminAuthGuard";
import { redirect } from "next/navigation";

const DashboardAdmin = () => {
  redirect("/dashboard/admin/overview");
};

export default AdminAuthGuard(DashboardAdmin);
