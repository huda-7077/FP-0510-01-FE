import ForgotPasswordPage from "@/features/forgot-password";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const ForgotPassword = async () => {
  const session = await auth();

  if (session) return redirect("/");
  return <ForgotPasswordPage />;
};

export default ForgotPassword;
