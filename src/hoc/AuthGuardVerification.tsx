import { useTransitionRouter } from "next-view-transitions";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function VerificationGuard(Component: any) {
  return function IsVerifying(props: any) {
    const router = useTransitionRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");

    useEffect(() => {
      // Only allow access if there's an email in the URL (coming from registration)
      if (!email) {
        router.push("/login");
      }
    }, [email, router]);

    if (!email) {
      return (
        <div className="flex h-screen w-full items-center justify-center">
          <p>Loading...</p>
        </div>
      );
    }

    return <Component {...props} />;
  };
}
