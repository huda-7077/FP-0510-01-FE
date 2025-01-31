import UserRegisterPage from "@/features/register-user";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const UserRegister = async () => {
  const session = await auth();

  if (session) return redirect("/");
  return <UserRegisterPage />;
};

export default UserRegister;
