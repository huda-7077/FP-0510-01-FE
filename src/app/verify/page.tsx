"use client"

import VerificationPage from "@/features/verify";
import VerificationGuard from "@/hoc/AuthGuardVerification";

const Verification = () => {
  return <VerificationPage />;
};

export default VerificationGuard(Verification);
