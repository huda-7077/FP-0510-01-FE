import ResetPasswordPage from "@/features/reset-password";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

interface SearchParams {
  token?: string;
}

interface Props {
  searchParams: SearchParams;
}

const ResetPassword = async ({ searchParams }: Props) => {
  const session = await auth();
  if (session) return redirect("/");

  const { token } = searchParams;
  if (!token) return redirect("/login");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordPage />
    </Suspense>
  );
};

export default ResetPassword;
