"use client";

import React from "react";
import EmailSettings from "./EmailSettings";
import PasswordSettings from "./PasswordSettings";
import DeleteAccount from "./DeleteAccount";

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
