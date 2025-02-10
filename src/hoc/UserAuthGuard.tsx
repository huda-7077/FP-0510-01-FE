import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function UserAuthGuard(Component: any) {
  return async function IsAuth(props: any) {
    const session = await auth();

    if (!session) {
      return redirect("/login");
    }

    if (session.user.role !== "USER") {
      return redirect("/");
    }

    return <Component {...props} />;
  };
}
