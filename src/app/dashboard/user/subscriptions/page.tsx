import { UserDashboardLayout } from "@/components/layouts/UserDashboardLayout";
import UserSubscriptionsPage from "@/features/user/subscriptions";
import UserAuthGuard from "@/hoc/UserAuthGuard";
import React from "react";

const UserSubscriptions = () => {
  return (
    <UserDashboardLayout>
      <UserSubscriptionsPage />
    </UserDashboardLayout>
  );
};

export default UserAuthGuard(UserSubscriptions);
