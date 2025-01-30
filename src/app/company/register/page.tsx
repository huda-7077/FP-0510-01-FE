import CompanyRegisterPage from "@/features/register-company";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const CompanyRegister = async () => {
  const session = await auth();

  if (session) return redirect("/");
  return <CompanyRegisterPage />;
};

export default CompanyRegister;
