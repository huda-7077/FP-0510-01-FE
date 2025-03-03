import UserAuthGuard from "@/hoc/UserAuthGuard";
import { redirect } from "next/navigation";

const DashboardUser = () => {
  redirect("/dashboard/user/overview");
};

export default UserAuthGuard(DashboardUser);
