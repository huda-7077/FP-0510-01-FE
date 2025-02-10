"use client";

import DeleteAccount from "@/features/user/settings/components/account-settings/DeleteAccount";
import EmailSettings from "@/features/user/settings/components/account-settings/EmailSettings";
import PasswordSettings from "@/features/user/settings/components/account-settings/PasswordSettings";
import React from "react";

const AccountSettings = () => {
  return (
    <div className="container mx-auto space-y-10 p-6 text-sm">
      <EmailSettings />
      <PasswordSettings />
      <DeleteAccount />
    </div>
  );
};

export default AccountSettings;
