"use client";

import VerifyTokenPage from "@/features/verify-token";
import VerifyEmailGuard from "@/hoc/AuthGuardVerifyEmail";

const VerifyEmailToken = () => {
  return <VerifyTokenPage />;
};

export default VerifyEmailGuard(VerifyEmailToken);
