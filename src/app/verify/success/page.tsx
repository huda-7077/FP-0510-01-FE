"use client";

import VerifySuccessPage from "@/features/verify-success";
import VerifySuccessGuard from "@/hoc/AuthGuardVerifySuccess";

const VerificationSuccess = () => {
  return <VerifySuccessPage />;
};

export default VerifySuccessGuard(VerificationSuccess);
